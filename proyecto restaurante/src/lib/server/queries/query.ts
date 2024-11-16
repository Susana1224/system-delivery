import { db } from "../database/ index";
import { users } from "$lib/server/database/schema";
import { eq } from "drizzle-orm";

export const queryUsers = async ()=>{
 const usuarios = await db.select().from(users);
  return usuarios;
}

export const queryByUserId = async (id: string)=>{
  const usuario = await db.query.users.findFirst({
    where: eq(users.id, id)
  });
  return usuario;
}
