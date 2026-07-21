import { Starfield } from "@/components/starfield"
import { SiteHeader } from "@/components/site-header"
import { AssessmentFlow } from "@/components/assessment-flow"

export default function AssessmentPage() {
  return (
    <main className="relative min-h-dvh">
      <Starfield />
      <SiteHeader />
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <AssessmentFlow />
      </div>
    </main>
  )
}
