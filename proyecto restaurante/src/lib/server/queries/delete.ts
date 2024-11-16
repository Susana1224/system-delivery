import { db } from "../database/ index";
import {users} from "$lib/server/database/schema";
import {eq} from "drizzle-orm";

export const borrarUsuario = async (id: string)=>{
   const usuario =await db.delete(users).where(eq(users.id, id)).returning();
   console.log(usuario);
}
