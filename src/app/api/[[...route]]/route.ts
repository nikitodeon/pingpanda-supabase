import { httpHandler } from "@/server";
//import { appRouter } from "@/server/index";
export const runtime = "edge";
//export const handler = appRouter;//didnt help
export { httpHandler as GET, httpHandler as POST };
