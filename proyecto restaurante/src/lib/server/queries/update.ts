import { db } from "../database/ index";
import { users } from "$lib/server/database/schema";
import { eq } from "drizzle-orm";

export const updateUsuario = async (id: string, nombre: string, email: string)=>{
await db.update(users).set({
    name: nombre,
    email: email
  }).where(eq(users.id, id)).returning();
}
