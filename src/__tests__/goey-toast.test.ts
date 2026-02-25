import { describe, expect, it } from 'vitest'
import { goeyToast } from '../composables/toastStore'
import { useToastStore } from '../composables/toastStore'

describe('goeyToast API', () => {
	it('creates typed toasts', () => {
		goeyToast.success('Saved')
		const { toasts } = useToastStore()
		expect(toasts.value).toHaveLength(1)
		expect(toasts.value[0].type).toBe('success')
	})

	it('updates promise toasts', async () => {
		await goeyToast.promise(Promise.resolve('ok'), {
			loading: 'Loading',
			success: (value) => `Done: ${value}`,
			error: 'Failed'
		})
		const { toasts } = useToastStore()
		expect(toasts.value[0].title).toBe('Done: ok')
		expect(toasts.value[0].type).toBe('success')
	})
})
