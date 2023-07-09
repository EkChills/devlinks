import LinksNav from "@/components/LinksNav"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <main>
    <LinksNav />
{children}
  </main>
}