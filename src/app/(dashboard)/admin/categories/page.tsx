import TopBar from "@/components/layout/TopBar";
import Link from "next/link";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient, createAdminClient } from "@/lib/supabase/server";
import { Plus, Save, FolderTree, Trash2, X } from "lucide-react";

async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();
  if (!profile || !["admin", "manager", "editor"].includes(profile.role)) {
    redirect("/dashboard");
  }
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/gu, "")
    .replace(/[đĐ]/gu, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function createCategory(formData: FormData) {
  "use server";
  await requireAdmin();
  const name = String(formData.get("name") ?? "").trim();
  let slug = String(formData.get("slug") ?? "").trim();
  const sortOrder = parseInt(String(formData.get("sort_order") ?? "0"), 10) || 0;

  if (!name) {
    redirect("/admin/categories?error=" + encodeURIComponent("Tên danh mục không được để trống."));
  }
  if (!slug) slug = generateSlug(name);
  else slug = generateSlug(slug);
  if (!slug) {
    redirect("/admin/categories?error=" + encodeURIComponent("Slug không hợp lệ."));
  }

  const adminClient = await createAdminClient();
  const { error } = await adminClient
    .from("tool_categories")
    .insert({ name, slug, sort_order: sortOrder });

  if (error) {
    const msg =
      error.code === "23505"
        ? `Slug "${slug}" đã tồn tại. Vui lòng chọn slug khác.`
        : "Không thể thêm danh mục: " + error.message;
    redirect("/admin/categories?error=" + encodeURIComponent(msg));
  }
  revalidatePath("/admin/categories");
  redirect("/admin/categories");
}

async function updateCategory(formData: FormData) {
  "use server";
  await requireAdmin();
  const id = String(formData.get("id"));
  const name = String(formData.get("name") ?? "").trim();
  let slug = String(formData.get("slug") ?? "").trim();
  const sortOrder = parseInt(String(formData.get("sort_order") ?? "0"), 10) || 0;

  if (!name) {
    redirect("/admin/categories?error=" + encodeURIComponent("Tên danh mục không được để trống."));
  }
  if (!slug) slug = generateSlug(name);
  else slug = generateSlug(slug);
  if (!slug) {
    redirect("/admin/categories?error=" + encodeURIComponent("Slug không hợp lệ."));
  }

  const adminClient = await createAdminClient();
  const { error } = await adminClient
    .from("tool_categories")
    .update({ name, slug, sort_order: sortOrder })
    .eq("id", id);

  if (error) {
    const msg =
      error.code === "23505"
        ? `Slug "${slug}" đã tồn tại. Vui lòng chọn slug khác.`
        : "Không thể cập nhật danh mục: " + error.message;
    redirect(`/admin/categories?edit=${id}&error=` + encodeURIComponent(msg));
  }
  revalidatePath("/admin/categories");
  redirect("/admin/categories");
}

async function deleteCategory(formData: FormData) {
  "use server";
  await requireAdmin();
  const id = String(formData.get("id"));
  const adminClient = await createAdminClient();
  const { error } = await adminClient.from("tool_categories").delete().eq("id", id);
  if (error) {
    redirect(
      "/admin/categories?error=" +
        encodeURIComponent("Không thể xóa danh mục: " + error.message),
    );
  }
  revalidatePath("/admin/categories");
  redirect("/admin/categories");
}

export default async function AdminCategoriesPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; edit?: string }>;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile || !["admin", "manager", "editor"].includes(profile.role)) {
    redirect("/dashboard");
  }

  const params = await searchParams;
  const errorMsg = params.error;
  const editId = params.edit;

  const adminClient = await createAdminClient();
  const { data: categories } = await adminClient
    .from("tool_categories")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  const items = categories ?? [];

  return (
    <div>
      <TopBar
        title="Danh mục Tool"
        subtitle="Quản lý danh mục cho Tool AI trên nền tảng"
      />

      <div className="p-6 max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="font-bold text-[#1B2A4A] text-base">Danh mục Tool</h2>
            <p className="text-xs text-gray-500 mt-0.5">{items.length} danh mục</p>
          </div>
        </div>

        {/* Error banner */}
        {errorMsg && (
          <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            <X size={16} className="mt-0.5 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Add form */}
        <div
          className="rounded-xl bg-white p-5"
          style={{ border: "1px solid #E2E8F0" }}
        >
          <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-[#1B2A4A]">
            <Plus size={16} className="text-[#F97316]" />
            Thêm danh mục mới
          </h3>
          <form action={createCategory} className="grid grid-cols-1 gap-4 sm:grid-cols-12">
            <div className="sm:col-span-5">
              <label className="mb-1 block text-xs font-medium text-gray-600">
                Tên danh mục <span className="text-red-500">*</span>
              </label>
              <input
                name="name"
                required
                placeholder="VD: Tạo ảnh AI"
                className="w-full rounded-lg border px-3 py-2 text-sm text-[#1B2A4A] outline-none focus:border-[#F97316]"
                style={{ borderColor: "#E2E8F0" }}
              />
            </div>
            <div className="sm:col-span-4">
              <label className="mb-1 block text-xs font-medium text-gray-600">
                Slug
              </label>
              <input
                name="slug"
                placeholder="tu-dong-tao-neu-de-trong"
                className="w-full rounded-lg border px-3 py-2 text-sm text-[#1B2A4A] outline-none focus:border-[#F97316]"
                style={{ borderColor: "#E2E8F0" }}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-xs font-medium text-gray-600">
                Thứ tự
              </label>
              <input
                name="sort_order"
                type="number"
                defaultValue={0}
                className="w-full rounded-lg border px-3 py-2 text-sm text-[#1B2A4A] outline-none focus:border-[#F97316]"
                style={{ borderColor: "#E2E8F0" }}
              />
            </div>
            <div className="flex items-end sm:col-span-1">
              <button
                type="submit"
                className="flex h-[38px] w-full items-center justify-center gap-1.5 rounded-lg text-xs font-semibold text-white transition-colors"
                style={{ background: "#F97316" }}
              >
                <Plus size={15} />
              </button>
            </div>
          </form>
          <p className="mt-2 text-[11px] text-gray-400">
            Để trống Slug sẽ tự tạo từ tên (bỏ dấu, chữ thường, thay khoảng trắng bằng dấu gạch ngang).
          </p>
        </div>

        {/* List */}
        <div
          className="overflow-hidden rounded-xl bg-white"
          style={{ border: "1px solid #E2E8F0" }}
        >
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <FolderTree size={40} className="mb-3 text-gray-300" />
              <p className="text-sm text-gray-500">Chưa có danh mục nào.</p>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-gray-500" style={{ background: "#F8FAFC" }}>
                  <th className="px-4 py-3 font-medium">Tên</th>
                  <th className="px-4 py-3 font-medium">Slug</th>
                  <th className="px-4 py-3 font-medium">Thứ tự</th>
                  <th className="px-4 py-3 text-right font-medium">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {items.map((cat) => {
                  const isEditing = editId === cat.id;
                  if (isEditing) {
                    return (
                      <tr key={cat.id} style={{ borderTop: "1px solid #E2E8F0", background: "#FFF7ED" }}>
                        <td colSpan={4} className="px-4 py-3">
                          <form
                            action={updateCategory}
                            className="grid grid-cols-1 gap-3 sm:grid-cols-12 sm:items-end"
                          >
                            <input type="hidden" name="id" value={cat.id} />
                            <div className="sm:col-span-5">
                              <label className="mb-1 block text-xs font-medium text-gray-600">Tên</label>
                              <input
                                name="name"
                                required
                                defaultValue={cat.name}
                                className="w-full rounded-lg border px-3 py-2 text-sm text-[#1B2A4A] outline-none focus:border-[#F97316]"
                                style={{ borderColor: "#E2E8F0" }}
                              />
                            </div>
                            <div className="sm:col-span-4">
                              <label className="mb-1 block text-xs font-medium text-gray-600">Slug</label>
                              <input
                                name="slug"
                                defaultValue={cat.slug}
                                className="w-full rounded-lg border px-3 py-2 text-sm text-[#1B2A4A] outline-none focus:border-[#F97316]"
                                style={{ borderColor: "#E2E8F0" }}
                              />
                            </div>
                            <div className="sm:col-span-1">
                              <label className="mb-1 block text-xs font-medium text-gray-600">Thứ tự</label>
                              <input
                                name="sort_order"
                                type="number"
                                defaultValue={cat.sort_order ?? 0}
                                className="w-full rounded-lg border px-3 py-2 text-sm text-[#1B2A4A] outline-none focus:border-[#F97316]"
                                style={{ borderColor: "#E2E8F0" }}
                              />
                            </div>
                            <div className="flex gap-2 sm:col-span-2">
                              <button
                                type="submit"
                                className="flex h-[38px] flex-1 items-center justify-center gap-1.5 rounded-lg text-xs font-semibold text-white"
                                style={{ background: "#F97316" }}
                              >
                                <Save size={13} />
                                Lưu
                              </button>
                              <Link
                                href="/admin/categories"
                                className="flex h-[38px] items-center justify-center rounded-lg px-3 text-xs font-medium text-gray-600"
                                style={{ border: "1px solid #E2E8F0" }}
                              >
                                Hủy
                              </Link>
                            </div>
                          </form>
                        </td>
                      </tr>
                    );
                  }
                  return (
                    <tr
                      key={cat.id}
                      className="hover:bg-[#F8FAFC]"
                      style={{ borderTop: "1px solid #E2E8F0" }}
                    >
                      <td className="px-4 py-3 font-medium text-[#1B2A4A]">{cat.name}</td>
                      <td className="px-4 py-3">
                        <span
                          className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold"
                          style={{
                            background: "rgba(249,115,22,0.1)",
                            color: "#F97316",
                            border: "1px solid rgba(249,115,22,0.2)",
                          }}
                        >
                          {cat.slug}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-500">{cat.sort_order ?? 0}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/admin/categories?edit=${cat.id}`}
                            className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors"
                            style={{
                              background: "rgba(249,115,22,0.1)",
                              color: "#F97316",
                              border: "1px solid rgba(249,115,22,0.2)",
                            }}
                          >
                            <Save size={12} />
                            Sửa
                          </Link>
                          <form action={deleteCategory}>
                            <input type="hidden" name="id" value={cat.id} />
                            <button
                              type="submit"
                              className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-red-500 transition-colors hover:text-red-600"
                              style={{ border: "1px solid #FECACA" }}
                            >
                              <Trash2 size={12} />
                              Xóa
                            </button>
                          </form>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
