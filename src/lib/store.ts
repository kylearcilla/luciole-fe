import { writable } from 'svelte/store'
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

/* App UI State */
export const globalContext = writable<GlobalContext>({
    isNavMenuOpen: true,
    isTaskMenuOpen: true,
    isVideoViewOpen: false,
    isMusicPlayerOpen: false,
    isLeftWideMenuOpen: true,
    shortcutsFocus: ShortcutSectionInFocus.MAIN,
    minModeSrc: null,
    hasToaster: false,
    modalsOpen: []
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
export const tasksViewStore = writable<TasksViewManager | null>(null)
export const mediaEmbedStore = writable<FloatingMediaEmbed | null>(null)

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

