import { getClients } from "@/app/actions/assessments"
import { Starfield } from "@/components/starfield"
import { SiteHeader } from "@/components/site-header"
import { DashboardClientList } from "@/components/dashboard-client-list"

export const dynamic = "force-dynamic"

export default async function DashboardPage() {
  const clients = await getClients()

  return (
    <main className="relative min-h-dvh">
      <Starfield />
      <SiteHeader />
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <DashboardClientList clients={clients} />
      </div>
    </main>
  )
}
