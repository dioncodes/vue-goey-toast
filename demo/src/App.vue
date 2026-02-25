<template>
	<main class="app">
		<GoeyToaster position="bottom-right" />
		<h1>goey-toast for Vue 3</h1>
		<p>Simple, typed, and reusable toast notifications.</p>
		<div class="actions">
			<button @click="goeyToast('Neutral notification')">Default</button>
			<button @click="goeyToast.success('Saved')">Success</button>
			<button @click="goeyToast.error('Something went wrong')">Error</button>
			<button @click="runPromise">Promise</button>
		</div>
	</main>
</template>

<script setup lang="ts">
import { GoeyToaster, goeyToast } from 'goey-toast'

const runPromise = async (): Promise<void> => {
	await goeyToast.promise(
		new Promise((resolve) => setTimeout(() => resolve('Synced'), 900)),
		{
			loading: 'Syncing...',
			success: (message) => `${message}`,
			error: 'Sync failed'
		}
	)
}
</script>

<style scoped>
.app {
	min-height: 100vh;
	display: grid;
	place-content: center;
	gap: 14px;
	text-align: center;
}

.actions {
	display: flex;
	gap: 8px;
	flex-wrap: wrap;
	justify-content: center;
}

button {
	border-radius: 999px;
	border: 1px solid #d1d5db;
	background: white;
	padding: 9px 14px;
	font-weight: 600;
	cursor: pointer;
}
</style>
