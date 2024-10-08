import type { ComponentProps, ComponentType } from 'svelte'
import type { HTMLOlAttributes } from 'svelte/elements'
import type { LogoIcon } from './enums'

export type MakeToastFn = (message: string | ComponentType, data?: ExternalToast) => string | number

export type ToastAPI = MakeToastFn & {
    message: MakeToastFn
    success: MakeToastFn
    info: MakeToastFn
    warning: MakeToastFn
    error: MakeToastFn
    promise: <T>(promise: PromiseT<T>, data?: PromiseData<T>) => string | number | undefined
    loading: MakeToastFn
    custom: <T extends ComponentType = ComponentType>(component: T, data?: ExternalToast<T>) => string | number
    dismiss: MakeToastFn
}

export type ToastTypes =
	| 'default'
	| 'message'
	| 'action'
	| 'success'
	| 'info'
	| 'warning'
	| 'promise'
	| 'error'
	| 'loading'

export type PromiseT<Data = unknown> = Promise<Data> | (() => Promise<Data>)

export type PromiseData<ToastData = unknown> = ExternalToast & {
	loading?: string
	success?: string | ComponentType | ((data: ToastData) => ComponentType | string)
	error?: string | ComponentType | ((error: unknown) => ComponentType | string)
	finally?: () => void | Promise<void>
}

export type ToastT<T extends ComponentType = ComponentType> = {
	id: number | string
	title?: string
	type?: ToastTypes
	icon?: LogoIcon | string,
	component?: T
	componentProps?: ComponentProps<InstanceType<T>>
	invert?: boolean
	description?: string | ComponentType
	contextId?: string
	groupExclusive?: boolean
	exclusive?: boolean
	cancelButtonStyle?: string
	actionButtonStyle?: string
	duration?: number
	delete?: boolean
	important?: boolean
	action?: {
		label: string
		onClick: (event: MouseEvent) => void
	}
	cancel?: {
		label: string
		onClick?: () => void
	}
	onDismiss?: (toast: ToastT) => void
	onAutoClose?: (toast: ToastT) => void
	dismissable?: boolean
	promise?: PromiseT
	style?: string
	class?: string
	classes?: ToastClassnames
	descriptionClass?: string
	position?: Position
	unstyled?: boolean
	/**
	 * @internal This is used to determine if the toast has been updated to determine when to reset timer. Hacky but works.
	 */
	updated?: boolean
}

export type Position =
	| 'top-left'
	| 'top-right'
	| 'bottom-left'
	| 'bottom-right'
	| 'top-center'
	| 'bottom-center'

export type HeightT = {
	height: number
	toastId: number | string
}

export type ToastTheme = 'light' | 'dark'

export type ToastToDismiss = {
	id: number | string
	dismiss: boolean
}

export type ExternalToast<T extends ComponentType = ComponentType> = Omit<ToastT<T>, 'id' | 'type' | 'title' | 'promise' | 'updated'> & {
	id?: number | string
}

export type ToasterProps = Partial<{
	/**
	 * Dark toasts in light mode and vice versa.
	 *
	 * @default false
	 */
	invert: boolean

	/**
	 * Toast's theme, either light, dark, or system
	 *
	 * @default 'light'
	 */
	theme: 'light' | 'dark' | 'system'

	/**
	 * Place where the toasts will be rendered
	 *
	 * @default 'bottom-right'
	 */
	position: Position

	/**
	 * Keyboard shortcut that will move focus to the toaster area.
	 *
	 * @default '⌥/alt + T'
	 */
	hotkey: string[]

	/**
	 * Makes error and success state more colorful
	 *
	 * @default false
	 */
	richColors: boolean

	/**
	 * Toasts will be expanded by default
	 *
	 * @default false
	 */
	expand: boolean

	/**
	 * The duration of the toast in milliseconds.
	 *
	 * @default 4000
	 */
	duration: number

	/**
	 * Amount of visible toasts
	 *
	 * @default 3
	 */
	visibleToasts: number

	/**
	 * Adds a close button to all toasts, shows on hover
	 *
	 * @default false
	 */
	closeButton: boolean

	/**
	 * These will act as default options for all toasts.
	 *
	 * @default {}
	 */
	toastOptions: ToastOptions

	/**
	 * Offset from the edges of the screen.
	 *
	 * @default '32px'
	 */
	offset: string | number | null

	/**
	 * Directionality of toast's text
	 *
	 * @default 'auto'
	 */
	dir: 'ltr' | 'rtl' | 'auto'

	/**
	 * Gap between toasts when expanded, in pixels.
	 *
	 * @default '14px'
	 */
	gap: number
}> &
	HTMLOlAttributes

export type ToastOptions = {
	/**
	 * The classes applied to the toast element.
	 */
	class?: string

	/**
	 * The classes applied to the toast description element.
	 */
	descriptionClass?: string

	/**
	 * The CSS styles applied to the toast element.
	 */
	style?: string

	/**
	 * The CSS styles applied to the cancel button element.
	 */
	cancelButtonStyle?: string

	/**
	 * The CSS styles applied to the action button element.
	 */
	actionButtonStyle?: string

	/**
	 * The duration of the toast in milliseconds.
	 */
	duration?: number

	/**
	 * Whether the toast should be unstyled or not.
	 */
	unstyled?: boolean

	/**
	 * Classes to apply to the various elements of the toast.
	 */
	classes?: Expand<ToastClassnames>
}

/**
 * The classes applied to the various elements of the toast.
 */
export type ToastClassnames = {
	toast?: string
	title?: string
	description?: string
	loader?: string
	closeButton?: string
	cancelButton?: string
	actionButton?: string
} & ToastTypeClasses

export type ToastTypeClasses = Partial<Record<ToastTypes, string>>

export type ToastProps = {
	toast: ToastT
	index: number
	expanded: boolean
	invert: boolean
	position: Position
	visibleToasts: number
	expandByDefault: boolean
	closeButton: boolean
	interacting: boolean
	cancelButtonStyle: string
	actionButtonStyle: string
	duration: number
	class: string
	descriptionClass: string
	classes: ToastClassnames
	unstyled: boolean
}


// Define a type 'Expand' that takes a generic type 'T'
export type Expand<T> = T extends object 
							? T extends infer O 
								? { [K in keyof O]: O[K] } 
								: never 
							: T