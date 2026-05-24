import 'dotenv/config'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

const databaseUrl = process.env.DATABASE_URL ?? 'postgres://postgres:postgres@localhost:5433/nuxt_orpc_playground'

const globalForDatabase = globalThis as typeof globalThis & {
  __orpcPostgresClient?: postgres.Sql
}

export const databaseClient = globalForDatabase.__orpcPostgresClient ?? postgres(databaseUrl, {
  max: 10,
})

globalForDatabase.__orpcPostgresClient = databaseClient

export const db = drizzle(databaseClient, { schema })

export async function closeDatabaseConnection() {
  await databaseClient.end()
}
