{
  /* // import { Pool } from "@neondatabase/serverless"
// import { PrismaNeon } from "@prisma/adapter-neon"
import { PrismaClient } from "@prisma/client"

declare global {
  // eslint-disable-next-line no-var
  var cachedPrisma: PrismaClient | undefined
}

// let prisma: PrismaClient
// if (process.env.NODE_ENV === "production") {
//   const pool = new Pool({ connectionString: process.env.DATABASE_URL })
//   const adapter = new PrismaNeon(pool)
//   prisma = new PrismaClient({ adapter })
// } else {
//   if (!global.cachedPrisma) {
//     const pool = new Pool({ connectionString: process.env.DATABASE_URL })
//     const adapter = new PrismaNeon(pool)
//     global.cachedPrisma = new PrismaClient({ adapter })
//   }
//   prisma = global.cachedPrisma
// }

// export const db = prisma

const prisma = global.cachedPrisma || new PrismaClient()

if (process.env.NODE_ENV !== "production") {
  global.cachedPrisma = prisma
}
export const db = prisma */
}

// lib/prisma.ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const db = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
