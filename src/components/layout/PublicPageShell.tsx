import PublicHeader from "@/components/layout/PublicHeader";
import PublicFooter from "@/components/layout/PublicFooter";

/**
 * Wraps public marketing pages with the site header (logo + nav tabs) + footer.
 * The header is fixed (h-14), so content is offset by pt-14 to sit below it.
 */
export default function PublicPageShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PublicHeader />
      <main className="pt-14">{children}</main>
      <PublicFooter />
    </>
  );
}
