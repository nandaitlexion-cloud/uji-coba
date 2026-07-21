import { integer, jsonb, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core"

export const clients = pgTable("clients", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  gender: text("gender"),
  age: integer("age"),
  phone: text("phone"),
  email: text("email"),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
})

export const assessments = pgTable("assessments", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id").notNull(),
  answers: jsonb("answers").notNull(),
  scores: jsonb("scores").notNull(),
  dominant: text("dominant").notNull(),
  secondary: text("secondary"),
  tertiary: text("tertiary"),
  intensity: text("intensity"),
  flags: jsonb("flags"),
  practitionerNotes: text("practitioner_notes"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
})

export type Client = typeof clients.$inferSelect
export type Assessment = typeof assessments.$inferSelect
