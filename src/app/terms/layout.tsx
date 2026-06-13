import PublicPageShell from "@/components/layout/PublicPageShell";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <PublicPageShell>{children}</PublicPageShell>;
}
