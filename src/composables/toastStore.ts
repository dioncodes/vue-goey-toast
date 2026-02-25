import { computed, reactive } from 'vue'
import type { GoeyToastItem, GoeyToastOptions, GoeyPromiseData, GoeyToastType } from '../types'

interface ToastState {
	items: GoeyToastItem[]
	defaultDuration: number
	maxToasts: number
}

const state = reactive<ToastState>({
	items: [],
	defaultDuration: 4000,
	maxToasts: 5
})

const timers = new Map<string | number, ReturnType<typeof setTimeout>>()

const ensureId = (id?: string | number): string | number => id ?? `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`

const clearTimer = (id: string | number): void => {
	const timer = timers.get(id)
	if (timer) {
		clearTimeout(timer)
		timers.delete(id)
	}
}

const scheduleDismiss = (id: string | number, duration: number): void => {
	clearTimer(id)
	if (duration <= 0) {
		return
	}
	timers.set(
		id,
		setTimeout(() => {
			dismiss(id)
		}, duration)
	)
}

const upsert = (options: GoeyToastOptions): string | number => {
	const id = ensureId(options.id)
	const existing = state.items.find((item) => item.id === id)
	const duration = options.duration ?? state.defaultDuration
	if (existing) {
		existing.title = options.title ?? existing.title
		existing.description = options.description ?? existing.description
		existing.type = options.type ?? existing.type
		existing.duration = duration
		existing.action = options.action ?? existing.action
		existing.icon = options.icon ?? existing.icon
		existing.closable = options.closable ?? existing.closable
		existing.visible = true
		scheduleDismiss(id, duration)
		return id
	}
	state.items.unshift({
		id,
		title: options.title ?? '',
		description: options.description ?? '',
		type: options.type ?? 'default',
		duration,
		action: options.action,
		icon: options.icon,
		closable: options.closable ?? true,
		createdAt: Date.now(),
		visible: true
	})
	if (state.items.length > state.maxToasts) {
		const removed = state.items.splice(state.maxToasts)
		removed.forEach((item) => clearTimer(item.id))
	}
	scheduleDismiss(id, duration)
	return id
}

export const dismiss = (id?: string | number): void => {
	if (id === undefined) {
		state.items.forEach((item) => clearTimer(item.id))
		state.items = []
		return
	}
	clearTimer(id)
	state.items = state.items.filter((item) => item.id !== id)
}

const createByType = (type: GoeyToastType) => (title: string, options: GoeyToastOptions = {}) => upsert({ ...options, title, type })

export const goeyToast = Object.assign(
	(title: string, options: GoeyToastOptions = {}) => upsert({ ...options, title, type: 'default' }),
	{
		success: createByType('success'),
		error: createByType('error'),
		warning: createByType('warning'),
		info: createByType('info'),
		loading: createByType('loading'),
		dismiss,
		promise: async <T>(promise: Promise<T>, data: GoeyPromiseData<T>): Promise<T> => {
			const id = upsert({
				title: data.loading,
				description: data.description?.loading,
				type: 'loading',
				duration: 0
			})
			try {
				const value = await promise
				upsert({
					id,
					title: typeof data.success === 'function' ? data.success(value) : data.success,
					description: typeof data.description?.success === 'function' ? data.description.success(value) : data.description?.success,
					type: 'success'
				})
				return value
			} catch (error) {
				upsert({
					id,
					title: typeof data.error === 'function' ? data.error(error) : data.error,
					description: typeof data.description?.error === 'function' ? data.description.error(error) : data.description?.error,
					type: 'error'
				})
				throw error
			}
		}
	}
)

export const configureToaster = (options: { duration?: number; maxToasts?: number }): void => {
	if (typeof options.duration === 'number') {
		state.defaultDuration = options.duration
	}
	if (typeof options.maxToasts === 'number' && options.maxToasts > 0) {
		state.maxToasts = options.maxToasts
	}
}

export const useToastStore = () => ({
	toasts: computed(() => state.items),
	dismiss
})
