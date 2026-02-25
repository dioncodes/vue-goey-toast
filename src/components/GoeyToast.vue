<template>
	<article :class="['goey-toast', `goey-toast--${toast.type}`]" role="status" aria-live="polite">
		<div class="goey-toast__content">
			<div class="goey-toast__title-row">
				<span class="goey-toast__dot" aria-hidden="true" />
				<h3 class="goey-toast__title">{{ toast.title }}</h3>
			</div>
			<p v-if="toast.description" class="goey-toast__description">{{ toast.description }}</p>
			<button
				v-if="toast.action"
				type="button"
				class="goey-toast__action"
				@click="toast.action.onClick"
			>
				{{ toast.action.label }}
			</button>
		</div>
		<button
			v-if="toast.closable"
			type="button"
			class="goey-toast__close"
			aria-label="Dismiss toast"
			@click="$emit('dismiss', toast.id)"
		>
			×
		</button>
	</article>
</template>

<script setup lang="ts">
import type { GoeyToastItem } from '../types'

defineProps<{
	toast: GoeyToastItem
}>()

defineEmits<{
	(event: 'dismiss', id: string | number): void
}>()
</script>
