/** @type {import('./$types).PageServerLoad} */
import { superValidate, message } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { crudSchema } from '$lib/utils/types/tipos';
import { queryByUserId, queryUsers } from '$lib/server/queries/query';

import type { UserSelect } from '$lib/server/database/schema';
import { error, fail, redirect } from '@sveltejs/kit';
import { crearUsuario } from '$lib/server/queries/create';
import { updateUsuario } from '$lib/server/queries/update';
import { borrarUsuario } from '$lib/server/queries/delete';

export async function load({ params }: { params: { id: string } }) {
	let user: UserSelect | undefined;
	//if(params.id && !user)
	if (params.id) {
		user = await queryByUserId(params.id);
		if (!user) throw error(404, 'No se encontró el usuario');
	}

	const form = await superValidate(user, zod(crudSchema));
	const usuarios = await queryUsers();
	return { form, usuarios };
}

export const actions = {
	default: async ({ request }: { request: Request }) => {
		const formData = await request.formData()
		const form = await superValidate(formData, zod(crudSchema));
		console.log(form)
		if (!form.valid) return fail(400, { form });
		if (form.data.id) {
			if (formData.has('borrar')) {
				await borrarUsuario(form.data.id);
				return redirect(303, "/usuarios");
			} else {
				await updateUsuario(form.data.id, form.data.name, form.data.email);
				return message(form, 'Usuario actualizado con éxito');
			}
		} else {
			await crearUsuario(form.data.name, form.data.email);
			return message(form, 'Usuario creado con éxito');
		}
	}
};
