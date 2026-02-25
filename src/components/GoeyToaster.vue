<template>
	<section :class="['goey-toaster', `goey-toaster--${props.position}`]" :style="toasterStyle">
		<TransitionGroup name="goey-toast-list" tag="div" class="goey-toaster__stack">
			<GoeyToast
				v-for="toast in toasts"
				:key="toast.id"
				:toast="toast"
				@dismiss="dismiss"
			/>
		</TransitionGroup>
	</section>
</template>

<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import type { GoeyToasterProps } from '../types'
import { configureToaster, useToastStore } from '../composables/toastStore'
import GoeyToast from './GoeyToast.vue'

const props = withDefaults(defineProps<GoeyToasterProps>(), {
	position: 'bottom-right',
	offset: '24px',
	gap: '12px',
	duration: 4000,
	maxToasts: 5
})

const { toasts, dismiss } = useToastStore()

watchEffect(() => {
	configureToaster({
		duration: props.duration,
		maxToasts: props.maxToasts
	})
})

const toasterStyle = computed(() => ({
	'--goey-toast-offset': props.offset,
	'--goey-toast-gap': props.gap
}))
</script>
