import { Starfield } from "@/components/starfield"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { AURAS, AURA_ORDER } from "@/lib/aura"
import { ArrowRight, ClipboardList, LayoutDashboard, Sparkles, Activity, HeartPulse } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function HomePage() {
  return (
    <main className="relative min-h-dvh">
      <Starfield />
      <SiteHeader />

      {/* Hero */}
      <section className="mx-auto flex max-w-5xl flex-col items-center px-6 pb-20 pt-16 text-center md:pt-24">
        <Image
          src="/aura-emblem.png"
          alt="Lambang Yayasan Nur Qolbu Bunda Yayula"
          width={120}
          height={120}
          className="animate-float-slow drop-shadow-[0_0_25px_rgba(230,200,140,0.35)]"
          priority
        />
        <p className="mt-6 flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-primary backdrop-blur">
          <Sparkles className="h-3.5 w-3.5" />
          Yayasan Nur Qolbu Bunda Yayula
        </p>
        <h1 className="mt-6 text-balance font-serif text-5xl font-semibold leading-tight text-glow md:text-7xl">
          Aura Reader
        </h1>
        <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
          Alat bantu asesmen profesional untuk membaca kondisi energi, emosi, pola hidup, relasi, dan spiritual klien
          sebelum sesi konsultasi. Terstruktur, mendalam, dan penuh ketenangan.
        </p>
        <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
          <Button asChild size="lg" className="shadow-glow">
            <Link href="/assessment">
              Mulai Asesmen Aura
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-border bg-card/40 backdrop-blur">
            <Link href="/dashboard">
              <LayoutDashboard className="h-4 w-4" />
              Dashboard Praktisi
            </Link>
          </Button>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-5xl px-6 pb-20">
        <div className="grid gap-5 md:grid-cols-3">
          {STEPS.map((s) => (
            <div
              key={s.title}
              className="rounded-2xl border border-border bg-card p-6 backdrop-blur-md transition-colors hover:border-primary/40"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/30 text-primary">
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-serif text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Aura spectrum */}
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <div className="text-center">
          <h2 className="text-balance font-serif text-3xl font-semibold md:text-4xl">Sembilan Spektrum Aura</h2>
          <p className="mx-auto mt-3 max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground">
            Setiap jawaban dipetakan ke dalam sembilan kategori energi untuk membentuk profil aura klien yang utuh.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {AURA_ORDER.map((key) => {
            const a = AURAS[key]
            return (
              <div
                key={key}
                className="group flex items-center gap-3 rounded-xl border border-border bg-card p-4 backdrop-blur-md"
              >
                <span
                  className="h-9 w-9 shrink-0 rounded-full ring-2 ring-white/10 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: a.hex, boxShadow: `0 0 16px ${a.hex}66` }}
                  aria-hidden="true"
                />
                <div className="min-w-0">
                  <p className="truncate font-medium">{a.name.replace("Aura ", "")}</p>
                  <p className="truncate text-xs text-muted-foreground">{a.characters[0]}</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <footer className="border-t border-border/60 py-8 text-center text-xs text-muted-foreground">
        <p>Aura Reader — dipersembahkan oleh Yayasan Nur Qolbu Bunda Yayula</p>
      </footer>
    </main>
  )
}

const STEPS = [
  {
    icon: ClipboardList,
    title: "Asesmen Terstruktur",
    desc: "15 pertanyaan mendalam mengenai emosi, relasi, tubuh, dan spiritualitas klien.",
  },
  {
    icon: Activity,
    title: "Analisis Energi",
    desc: "Sistem skoring memetakan jawaban menjadi profil aura dominan, pendukung, dan tambahan.",
  },
  {
    icon: HeartPulse,
    title: "Riwayat & Laporan",
    desc: "Simpan histori klien, pantau perubahan energi, dan cetak laporan PDF profesional.",
  },
]
