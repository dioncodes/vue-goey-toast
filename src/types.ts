import type { Component } from 'vue'

export type GoeyToastType = 'default' | 'success' | 'error' | 'warning' | 'info' | 'loading'

export interface GoeyToastAction {
	label: string
	onClick: () => void
}

export interface GoeyToastOptions {
	id?: string | number
	type?: GoeyToastType
	title?: string
	description?: string
	duration?: number
	action?: GoeyToastAction
	closable?: boolean
	icon?: Component
}

export interface GoeyToastItem extends Required<Omit<GoeyToastOptions, 'id' | 'icon' | 'action'>> {
	id: string | number
	action?: GoeyToastAction
	icon?: Component
	createdAt: number
	visible: boolean
}

export interface GoeyPromiseData<T> {
	loading: string
	success: string | ((value: T) => string)
	error: string | ((reason: unknown) => string)
	description?: {
		loading?: string
		success?: string | ((value: T) => string)
		error?: string | ((reason: unknown) => string)
	}
}

export interface GoeyToasterProps {
	position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'
	offset?: string
	gap?: string
	duration?: number
	maxToasts?: number
	theme?: 'light' | 'dark'
}
