import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import GoeyToaster from '../components/GoeyToaster.vue'
import { goeyToast } from '../composables/toastStore'

describe('GoeyToaster', () => {
	it('renders toast content', async () => {
		goeyToast('Hello world', { description: 'Body text' })
		const wrapper = mount(GoeyToaster)
		await wrapper.vm.$nextTick()
		expect(wrapper.text()).toContain('Hello world')
		expect(wrapper.text()).toContain('Body text')
	})
})
