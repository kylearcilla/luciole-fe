import { writable } from 'svelte/store'
import type { YoutubePlayer } from './youtube-player'
import type { YoutubeUserData } from './youtube-user-data'
import type { SessionManager } from './session-manager'

import type { DatePickerManager } from './date-picker-manager'
import { WEEKLY_ROUTINES } from '../tests/routines/routines.data'
import { themes } from './data-themes'
import type { GoalsViewManager } from './goals-view-manager'

/* global ui */
export const globalContext = writable<GlobalContext>({
    leftBarOpen: true,
    rightBarOpen: true,
    rightBarFixed: false,
    leftBarFixed: false,
    hasToaster: false,
    route: "workspace",
    hotkeyFocus: "default",
    modalsOpen: []
})
export const themeState = writable<ThemeState>({
    isDarkTheme: true,
    lightTheme: "light",
    current: themes[0],
    darkTheme: "dark"
})

export const timer = writable<{ date: Date }>({ date: new Date() })

export const habitTracker = writable<HabitStore>({
    habits: [],
    monthMetrics: null,
    activeStreak: null,
    viewHabit: null,
    yearMetrics: null,
    yearHeatMap: []
})

export const goalTracker = writable<GoalsStore>({
    init: false,
    viewGoal: null,
    goals: [],
    yearData: { 
        year: new Date().getFullYear(),
        data: null
    },
    quarterData: {
        quarter: 1,
        data: null
    },
    monthData: {
        month: 1,
        data: null
    }
})

/* general authentication stuff */
export const googleData = writable<GoogleUserData | null>(null)

/* routine */
export const weekRoutine = writable<WeeklyRoutine | null>(WEEKLY_ROUTINES[0])

/* youtube */
export const ytUserStore = writable<YoutubeUserData| null>(null)
export const ytPlayerStore = writable<YoutubePlayer| null>(null)

/* session */
export const sessionManager = writable<SessionManager | null>(null)

/* general */
export const datePickerManager = writable<DatePickerManager | null>(null)

