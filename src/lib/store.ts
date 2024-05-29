import { derived, writable } from 'svelte/store'
import type { Session } from './pom-session'
import type { MusicPlayer } from './music-player'
import type { MusicUserData } from './music-user-data'
import type { YoutubePlayer } from './youtube-player'
import type { YoutubeUserData } from './youtube-user-data'
import type { PomSessionManger } from './pom-session-manager'
import type { TasksViewManager } from './tasks-view-manager'
import type { GoalsManager } from './goals-manager'
import { ShortcutSectionInFocus } from './enums'
import type { EditGoalManager } from './edit-goal-manager'
import type { DatePickerManager } from './date-picker-manager'
import type { AppleMusicUserData } from './music-apple-user-data'
import type { SpotifyMusicUserData } from './music-spotify-user-data'
import type { MusicSettingsManager } from './music-settings-manager'
import { WEEKLY_ROUTINES } from '../tests/routines/routines.data'

/* App UI State */
export const globalContext = writable<GlobalContext>({
    isLeftNarrowBarOpen: true,
    isRightBarOpen: true,
    isLeftBarFloating: true,
    isVideoViewOpen: false,
    isMusicPlayerOpen: false,
    isLeftWideMenuOpen: true,
    doOpenActiveRoutine: false,
    shortcutsFocus: ShortcutSectionInFocus.MAIN,
    minModeSrc: null,
    hasToaster: false,
    modalsOpen: [],
    lastKeysPressed: {
        shiftKey: false,
        metaKey: false,
        altKey: false,
        keyCode: ""
    }
})
export const themeState = writable<ThemeState>({
    title: "Dark Mode",
    isDarkTheme: true,
    themeToggleBtnIconColor: "#3F3F3F",
    twinTheme: { sectionName: "default", index: 1 }
})

/* General Authentication Stuff */
export const googleData = writable<GoogleUserData | null>(null)

/* Home View Stuff */
export const tasksViewStore  = writable<TasksViewManager | null>(null)
export const mediaEmbedStore = writable<FloatingMediaEmbed | null>(null)
export const weekRoutine     = writable<WeeklyRoutine | null>(WEEKLY_ROUTINES[0])

export const wkRoutine = derived(weekRoutine, ($weekRoutine) => {
    return $weekRoutine
}, WEEKLY_ROUTINES[0])

/* Goals Stuff */
export const goalsManager = writable<GoalsManager | null>(null)
export const editGoalManger = writable<EditGoalManager | null>(null)

/* YT Stuff */
export const ytUserDataStore = writable<YoutubeUserData| null>(null)
export const ytPlayerStore = writable<YoutubePlayer| null>(null)

/* Music Stuff: Music Player State */
export const musicPlayerStore = writable<MusicPlayer | null>(null)
export const musicDataStore = writable<AppleMusicUserData | SpotifyMusicUserData | null>(null)

export const musicPlayerManager = writable<MusicPlayerManagerState | null>(null)
export const musicSettingsManager = writable<MusicSettingsManager | null>(null)

/* Session Stuff */
export const sessionStore = writable<Session | null>(null)
export const sessionManager = writable<PomSessionManger | null>(null)

/* General Stuff */
export const datePickerManager = writable<DatePickerManager | null>(null)

