<template>
	<article :class="['goey-toast', `goey-toast--${toast.type}`]" role="status" aria-live="polite">
		<div class="goey-toast__blob" aria-hidden="true" />

		<div class="goey-toast__icon-wrap" aria-hidden="true">
			<component :is="toast.icon" v-if="toast.icon" class="goey-toast__custom-icon" />
			<span v-else class="goey-toast__icon">{{ typeIcon }}</span>
		</div>

		<div class="goey-toast__content">
			<div class="goey-toast__title-row">
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
import { computed } from 'vue'
import type { GoeyToastItem } from '../types'

const props = defineProps<{
	toast: GoeyToastItem
}>()

defineEmits<{
	(event: 'dismiss', id: string | number): void
}>()

const typeIcon = computed<string>(() => {
	if (props.toast.type === 'success') {
		return '✓'
	}
	if (props.toast.type === 'error') {
		return '✕'
	}
	if (props.toast.type === 'warning') {
		return '!'
	}
	if (props.toast.type === 'info') {
		return 'i'
	}
	if (props.toast.type === 'loading') {
		return '…'
	}
	return '•'
})
</script>
