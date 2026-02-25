<template>
	<article :class="['goey-wrapper', `goey-wrapper--${toast.type}`]" role="status" aria-live="polite">
		<svg class="goey-blobSvg" :width="svgWidth" :height="svgHeight" viewBox="0 0 380 96" preserveAspectRatio="none" aria-hidden="true">
			<rect x="1" y="1" width="378" height="94" rx="48" :fill="fillColor" :stroke="borderColor" stroke-width="1.5" />
		</svg>

		<div class="goey-content goey-contentExpanded">
			<div class="goey-header">
				<div class="goey-iconWrapper" aria-hidden="true">
					<component :is="toast.icon" v-if="toast.icon" />
					<span v-else>{{ typeIcon }}</span>
				</div>
				<h3 :class="['goey-title', titleClass]">{{ toast.title }}</h3>
			</div>

			<p v-if="toast.description" class="goey-description">{{ toast.description }}</p>

			<div v-if="toast.action" class="goey-actionWrapper">
				<button type="button" :class="['goey-actionButton', actionClass]" @click="toast.action.onClick">
					{{ toast.action.label }}
				</button>
			</div>
		</div>

		<button
			v-if="toast.closable"
			type="button"
			class="goey-close"
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
		return '⚠'
	}
	if (props.toast.type === 'info') {
		return 'i'
	}
	if (props.toast.type === 'loading') {
		return '◌'
	}
	return '•'
})

const titleClass = computed<string>(() => {
	if (props.toast.type === 'success') {
		return 'goey-titleSuccess'
	}
	if (props.toast.type === 'error') {
		return 'goey-titleError'
	}
	if (props.toast.type === 'warning') {
		return 'goey-titleWarning'
	}
	if (props.toast.type === 'info') {
		return 'goey-titleInfo'
	}
	if (props.toast.type === 'loading') {
		return 'goey-titleLoading'
	}
	return 'goey-titleDefault'
})

const actionClass = computed<string>(() => {
	if (props.toast.type === 'success') {
		return 'goey-actionSuccess'
	}
	if (props.toast.type === 'error') {
		return 'goey-actionError'
	}
	if (props.toast.type === 'warning') {
		return 'goey-actionWarning'
	}
	if (props.toast.type === 'info') {
		return 'goey-actionInfo'
	}
	return 'goey-actionDefault'
})

const fillColor = computed<string>(() => {
	if (props.toast.type === 'success') {
		return '#F5FFF5'
	}
	if (props.toast.type === 'error') {
		return '#FFF5F5'
	}
	if (props.toast.type === 'warning') {
		return '#FFFBF0'
	}
	if (props.toast.type === 'info') {
		return '#F2F8FF'
	}
	if (props.toast.type === 'loading') {
		return '#FAFAFA'
	}
	return '#FFFFFF'
})

const borderColor = computed<string>(() => {
	if (props.toast.type === 'success') {
		return '#C8E6C9'
	}
	if (props.toast.type === 'error') {
		return '#FFCDD2'
	}
	if (props.toast.type === 'warning') {
		return '#FFE082'
	}
	if (props.toast.type === 'info') {
		return '#BBDEFB'
	}
	if (props.toast.type === 'loading') {
		return '#E0E0E0'
	}
	return '#E8E8E8'
})

const svgWidth = 380
const svgHeight = 96
</script>
