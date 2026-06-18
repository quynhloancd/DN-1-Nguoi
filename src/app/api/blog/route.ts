import { NextRequest, NextResponse } from "next/server";
import { createClient, createAdminClient } from "@/lib/supabase/server";

// GET /api/blog?id=xxx — fetch single blog post for editing
export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (!["admin", "manager", "marketing"].includes(profile?.role ?? "")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const id = req.nextUrl.searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    const admin = await createAdminClient();
    const { data: post, error } = await admin
      .from("blog_posts")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !post) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ post });
  } catch (err) {
    console.error("[GET /api/blog]", err);
    return NextResponse.json({ error: "Không thể thực hiện. Vui lòng thử lại." }, { status: 500 });
  }
}

// POST /api/blog — create or update blog post
export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (!["admin", "manager", "marketing"].includes(profile?.role ?? "")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const {
      id,
      title,
      slug,
      excerpt,
      content,
      body,
      category,
      tags,
      status,
      thumbnail,
      sendEmail,
      focus_keyword,
      author_name,
      author_avatar,
    } = await req.json();

    if (!title?.trim())
      return NextResponse.json({ error: "Title required" }, { status: 400 });

    const admin = await createAdminClient();

    // Generate slug if not provided
    const finalSlug =
      slug?.trim() ||
      title
        .trim()
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .slice(0, 80);

    // Cột chắc chắn tồn tại theo schema gốc (supabase/schema.sql)
    const coreData: Record<string, unknown> = {
      title: title.trim(),
      slug: finalSlug,
      excerpt: excerpt?.trim() || null,
      content: content?.trim() || body?.trim() || null,
      category: category?.trim() || null,
      tags: tags || null,
      status: status || "draft",
      thumbnail: thumbnail || null,
    };

    // Cột mở rộng — có thể chưa có trên DB; nếu thiếu sẽ tự bỏ qua khi lưu
    const optionalData: Record<string, unknown> = {
      body: body?.trim() || content?.trim() || null,
      focus_keyword: focus_keyword?.trim() || null,
      author_name: author_name?.trim() || null,
      author_avatar: author_avatar?.trim() || null,
    };

    // Only set published_at when first publishing
    if (status === "published") {
      if (id) {
        // Check if already published — don't overwrite published_at
        const { data: existing } = await admin
          .from("blog_posts")
          .select("published_at")
          .eq("id", id)
          .single();
        if (!existing?.published_at) {
          coreData.published_at = new Date().toISOString();
        }
      } else {
        coreData.published_at = new Date().toISOString();
      }
    }

    // Nhận biết lỗi "cột không tồn tại" để retry với bộ cột tối thiểu
    const isUnknownColumn = (e: { code?: string; message?: string } | null) =>
      !!e &&
      (e.code === "PGRST204" ||
        /column .* does not exist|could not find the .* column/i.test(e.message || ""));

    const persist = (payload: Record<string, unknown>) =>
      id
        ? admin.from("blog_posts").update(payload).eq("id", id).select().single()
        : admin.from("blog_posts").insert(payload).select().single();

    let saveRes = await persist({ ...coreData, ...optionalData });
    if (saveRes.error && isUnknownColumn(saveRes.error)) {
      // DB thiếu cột mở rộng → lưu bằng cột cốt lõi để không chặn người dùng
      saveRes = await persist(coreData);
    }
    if (saveRes.error) {
      console.error("[Blog Save] Error:", saveRes.error);
      return NextResponse.json(
        { error: `Lỗi lưu bài viết: ${saveRes.error.message}` },
        { status: 500 }
      );
    }
    const result = saveRes.data;

    // Only send email if explicitly requested
    if (status === "published" && sendEmail === true) {
      try {
        await sendBlogNotificationEmail(admin, result);
      } catch {
        // Don't fail the request if email fails
      }
    }

    return NextResponse.json({ post: result });
  } catch (err) {
    console.error("[POST /api/blog]", err);
    return NextResponse.json({ error: "Không thể thực hiện. Vui lòng thử lại." }, { status: 500 });
  }
}

// DELETE /api/blog?id=xxx — delete blog post
export async function DELETE(req: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (!["admin", "manager"].includes(profile?.role ?? "")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const id = req.nextUrl.searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    const admin = await createAdminClient();
    const { error } = await admin.from("blog_posts").delete().eq("id", id);

    if (error) {
      console.error("[Blog Delete] Error:", error);
      return NextResponse.json({ error: "Có lỗi xảy ra khi xóa bài viết. Vui lòng thử lại." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[DELETE /api/blog]", err);
    return NextResponse.json({ error: "Không thể thực hiện. Vui lòng thử lại." }, { status: 500 });
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function sendBlogNotificationEmail(admin: any, post: any) {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.EMAIL_FROM || "no-reply@doanhnghiep1nguoi.online";
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://doanhnghiep1nguoi.online";
  const siteDomain = (() => { try { return new URL(baseUrl).hostname; } catch { return "doanhnghiep1nguoi.online"; } })();

  if (!apiKey || apiKey.startsWith("re_your")) return;

  // Get all user emails
  const { data: authUsers } = await admin.auth.admin.listUsers({ perPage: 500 });
  if (!authUsers?.users) return;

  const emails = authUsers.users
    .map((u: { email?: string }) => u.email)
    .filter((e: string | undefined): e is string => !!e);

  if (emails.length === 0) return;

  // Send via Resend batch (max 50 per batch)
  const batches = [];
  for (let i = 0; i < emails.length; i += 50) {
    batches.push(emails.slice(i, i + 50));
  }

  for (const batch of batches) {
    await fetch("https://api.resend.com/emails/batch", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        batch.map((email: string) => {
          const safeTitle = escapeHtml(post.title);
          const safeExcerpt = post.excerpt ? escapeHtml(post.excerpt) : "";
          return {
          from: fromEmail,
          to: email,
          subject: `Bài viết mới: ${post.title}`,
          html: `
            <div style="font-family: -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #E85D04;">${safeTitle}</h2>
              ${safeExcerpt ? `<p style="color: #666;">${safeExcerpt}</p>` : ""}
              <a href="${baseUrl}/blog/${post.slug}"
                 style="display: inline-block; padding: 12px 24px; background: #E85D04; color: white; text-decoration: none; border-radius: 8px; font-weight: bold;">
                Đọc bài viết
              </a>
              <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
              <p style="font-size: 12px; color: #999;">
                Bạn nhận email này vì đã đăng ký tài khoản tại ${siteDomain}
              </p>
            </div>
          `,
        };})
      ),
    });
  }
}
