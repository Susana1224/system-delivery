<script>

	import { superForm } from 'sveltekit-superforms';
	let { data } = $props();
	const { form, message, enhance, errors, delayed } = superForm(data.form, {
		resetForm: true
	});
</script>

<h1 class="my-10 ml-10 text-3xl">CRUD para usuarios</h1>

{#if $message}
	<div class="mb-4 ml-10 rounded bg-blue-100 p-4 text-blue-900">
		{$message}
	</div>
{/if}

<div>
	{#if $form.id}
		<form action="/usuarios">
			<button
				type="submit"
				class="focus:shadow-outline mx-10 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
			>
				Crear usuario
			</button>
		</form>
	{/if}
	{#each data.usuarios as usuario (usuario.id)}
		<a class="mx-10 my-5 block text-blue-600 underline" href="/usuarios/{usuario.id}"
			>{usuario.name}</a
		>
	{:else}
		<p class="ml-10">No hay usuarios</p>
	{/each}
</div>

<form method="POST" use:enhance class="ml-10 w-full max-w-sm rounded bg-white p-6 shadow-md">
	<input type="hidden" name="id" bind:value={$form.id} />

	<div class="mb-4">
		<label for="name" class="mb-2 block text-sm font-bold text-gray-700">Nombre:</label>
		<input
			type="text"
			id="name"
			name="name"
			bind:value={$form.name}
			class="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
			placeholder="Nombre"
		/>
		{#if $errors.name}
			<p class="text-xs italic text-red-500">{$errors.name}</p>
		{/if}
	</div>

	<div class="mb-4">
		<label for="email" class="mb-2 block text-sm font-bold text-gray-700">Correo:</label>
		<input
			type="email"
			id="email"
			name="email"
			bind:value={$form.email}
			class="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
			placeholder="Correo"
		/>
		{#if $errors.email}
			<p class="text-xs italic text-red-500">{$errors.email}</p>
		{/if}
	</div>

	<div class="flex items-center justify-between">
		<button
			type="submit"
			class="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
		>
			Guardar
		</button>
		{#if $form.id}
			<button
				type="submit"
				name="borrar"
				class="focus:shadow-outline rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
			>
				Borrar usuario
			</button>
		{/if}
		{#if $delayed}
		    <p class="text-xs italic text-gray-500">Guardando...</p>
        {/if}
	</div>
</form>
