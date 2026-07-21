import { getAssessmentsForClient, getClient } from "@/app/actions/assessments"
import { Starfield } from "@/components/starfield"
import { SiteHeader } from "@/components/site-header"
import { ClientDetail } from "@/components/client-detail"
import { notFound } from "next/navigation"

export const dynamic = "force-dynamic"

export default async function ClientDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const clientId = Number(id)
  if (Number.isNaN(clientId)) notFound()

  const [client, assessments] = await Promise.all([getClient(clientId), getAssessmentsForClient(clientId)])
  if (!client) notFound()

  return (
    <main className="relative min-h-dvh">
      <Starfield />
      <SiteHeader />
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <ClientDetail client={client} assessments={assessments} />
      </div>
    </main>
  )
}
