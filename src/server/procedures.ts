import { j } from "./__internals/j"
// import { PrismaNeon } from "@prisma/adapter-neon"
// import { Pool } from "@neondatabase/serverless"
import { PrismaClient } from "@prisma/client"
import { Redis } from "@upstash/redis/cloudflare"
import { env } from "hono/adapter"
import { cacheExtension } from "./__internals/db/cache-extension"
/**
 * Public (unauthenticated) procedures
 *
 * This is the base piece you use to build new queries and mutations on your API.
 */
// const extendedDatabaseMiddleware = j.middleware(async ({ c, next }) => {
//   const variables = env(c)
//   const pool = new Pool({
//     connectionString: variables.DATABASE_URL,
//   })
//   // const adapter = new PrismaNeon(pool)

//   const db = new PrismaClient({
//     // adapter,
//   })
//   return await next({ db })
// })

const authMiddleware = j.middleware(({ next }) => {
  const user = { name: "John" }
  return next({ user })
})

export const baseProcedure = j.procedure
export const publicProcedure =
  baseProcedure /*.use(extendedDatabaseMiddleware)*/
export const privateProcedure = publicProcedure.use(authMiddleware)
