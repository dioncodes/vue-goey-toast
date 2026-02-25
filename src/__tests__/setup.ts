import { afterEach } from 'vitest'
import { goeyToast } from '../composables/toastStore'

afterEach(() => {
	goeyToast.dismiss()
})
