import { db } from "@/db";
import { currentUser } from "@clerk/nextjs/server";
import { HTTPException } from "hono/http-exception";
import { router } from "../__internals/router";
import { publicProcedure } from "../procedures";

export const dynamic = "force-dynamic";

export const authRouter = router({
  getDatabaseSyncStatus: publicProcedure.query(async ({ c, ctx }) => {
    try {
      console.log("Starting database sync status check...");

      // Получаем текущего пользователя из Clerk
      const auth = await currentUser();
      console.log("Current user from Clerk:", auth);

      if (!auth) {
        console.log("No authenticated user found.");
        return c.json({ isSynced: false });
      }

      // Проверяем наличие пользователя в базе данных
      const user = await db.user.findFirst({
        where: { externalId: auth.id },
      });

      console.log("USER IN DB:", user);

      if (!user) {
        console.log(
          "User not found in database. Attempting to create a new user..."
        );

        // Пробуем создать пользователя
        const newUser = await db.user.create({
          data: {
            quotaLimit: 100,
            externalId: auth.id,
            email: auth.emailAddresses[0]?.emailAddress || "Unknown",
          },
        });

        console.log("New user created in database:", newUser);

        return c.json({ isSynced: true });
      }

      console.log("User is already synced with the database.");
      return c.json({ isSynced: true });
    } catch (error) {
      console.error("Error occurred during database sync process:", error);

      // Если произошла ошибка, возвращаем статус ошибки
      throw new HTTPException(500, { message: "Internal Server Error" });
    }
  }),
});
