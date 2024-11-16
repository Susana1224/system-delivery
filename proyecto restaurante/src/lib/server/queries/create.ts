import { db } from "../database/ index";
import { users } from "$lib/server/database/schema";


export const crearUsuario = async (nombre: string, email: string)=>{
  const usuario = await db.insert(users).values({
    name: nombre,
    email: email
  }).returning();
  return usuario;
}
