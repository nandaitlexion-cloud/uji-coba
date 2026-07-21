"use client"

import { useState, useTransition } from "react"
import Link from "next/link"
import { AURAS, type AuraKey } from "@/lib/aura"
import { updateClientNotes } from "@/app/actions/assessments"
import type { Assessment, Client } from "@/lib/db/schema"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import { ArrowLeft, Calendar, Loader2, Plus, Save, Sparkles, FileText } from "lucide-react"

function formatDate(d: Date | string) {
  return new Date(d).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

export function ClientDetail({
  client,
  assessments,
}: {
  client: Client
  assessments: Assessment[]
}) {
  const [notes, setNotes] = useState(client.notes ?? "")
  const [isPending, startTransition] = useTransition()

  const latest = assessments[0]

  const saveNotes = () => {
    startTransition(async () => {
      try {
        await updateClientNotes(client.id, notes)
        toast.success("Catatan klien berhasil disimpan.")
      } catch (e) {
        console.log("[v0] save notes error", e)
        toast.error("Terjadi kesalahan saat menyimpan catatan.")
      }
    })
  }

  return (
    <div className="animate-fade-up">
      <Toaster position="top-center" theme="dark" />

      {/* Back link */}
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Kembali ke Dashboard
      </Link>

      {/* Client header */}
      <div className="mt-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="font-serif text-3xl font-semibold text-glow">{client.name}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {[client.gender, client.age ? `${client.age} tahun` : null].filter(Boolean).join(" • ") || "-"}
          </p>
        </div>
        <Button asChild className="shadow-glow">
          <Link href="/assessment">
            <Plus className="h-4 w-4" />
            Asesmen Baru
          </Link>
        </Button>
      </div>

      {/* Contact + latest aura */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Card className="border-border bg-card backdrop-blur-md">
          <CardHeader>
            <CardTitle className="font-serif text-lg">Data Kontak</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1.5 text-sm">
            <InfoRow label="No. Telepon" value={client.phone || "-"} />
            <InfoRow label="Email" value={client.email || "-"} />
            <InfoRow label="Terdaftar sejak" value={formatDate(client.createdAt)} />
          </CardContent>
        </Card>

        <Card className="border-border bg-card backdrop-blur-md">
          <CardHeader>
            <CardTitle className="font-serif text-lg">Aura Terkini</CardTitle>
          </CardHeader>
          <CardContent>
            {latest ? (
              <div className="flex items-center gap-3">
                <span
                  className="h-10 w-10 shrink-0 rounded-full"
                  style={{
                    backgroundColor: AURAS[latest.dominant as AuraKey].hex,
                    boxShadow: `0 0 16px ${AURAS[latest.dominant as AuraKey].hex}88`,
                  }}
                />
                <div>
                  <p className="font-medium">{AURAS[latest.dominant as AuraKey].name}</p>
                  <p className="text-xs text-muted-foreground">{latest.intensity}</p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Belum ada hasil asesmen.</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Notes */}
      <Card className="mt-4 border-border bg-card backdrop-blur-md">
        <CardHeader>
          <CardTitle className="font-serif text-lg">Catatan Klien</CardTitle>
          <CardDescription>Catatan internal praktisi mengenai klien ini.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Tulis catatan mengenai klien ini..."
            className="min-h-28"
          />
          <div className="flex justify-end">
            <Button onClick={saveNotes} disabled={isPending} size="sm">
              {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              Simpan Catatan
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Assessment history */}
      <div className="mt-8">
        <h2 className="font-serif text-xl font-semibold">Riwayat Asesmen</h2>
        {assessments.length === 0 ? (
          <Card className="mt-4 border-border bg-card backdrop-blur-md">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <FileText className="h-9 w-9 text-muted-foreground" />
              <p className="mt-3 font-medium">Belum ada asesmen</p>
              <p className="mt-1 text-sm text-muted-foreground">Mulai asesmen pertama untuk klien ini.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="mt-4 space-y-3">
            {assessments.map((a) => {
              const dom = AURAS[a.dominant as AuraKey]
              return (
                <Link key={a.id} href={`/result/${a.id}`}>
                  <Card className="border-border bg-card backdrop-blur-md transition-all hover:border-primary/40 hover:shadow-glow">
                    <CardContent className="flex flex-wrap items-center gap-4 pt-6">
                      <span
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
                        style={{
                          backgroundColor: `${dom.hex}22`,
                          boxShadow: `0 0 12px ${dom.hex}44`,
                        }}
                      >
                        <Sparkles className="h-5 w-5" style={{ color: dom.hex }} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium">{dom.name}</p>
                        <p className="text-xs text-muted-foreground">{a.intensity}</p>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Calendar className="h-3.5 w-3.5" />
                        {formatDate(a.createdAt)}
                      </div>
                      <Badge variant="secondary" className="bg-secondary/60 text-xs">
                        No. AR-{String(a.id).padStart(5, "0")}
                      </Badge>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2">
      <span className="w-32 shrink-0 text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  )
}
