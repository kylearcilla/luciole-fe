import { writable } from 'svelte/store'
import type { Session } from './pom-session'
import type { MusicPlayer } from './music-player'
import type { MusicUserData } from './music-user-data'
import type { YoutubePlayer } from './youtube-player'
import type { YoutubeUserData } from './youtube-user-data'
import type { PomSessionManger } from './pom-session-manager'
import type { TasksViewManager } from './tasks-view-manager'
import { ShortcutSectionInFocus } from './enums'

/* App UI State */
export const homeViewLayout = writable<HomeLayout>({
    isNavMenuOpen: true,
    isTaskMenuOpen: true,
    isVideoViewOpen: false,
    isMusicPlayerOpen: false,
    shortcutsFocus: ShortcutSectionInFocus.MAIN,
    minModeSrc: null,
    modalsOpen: []
})
export const themeState = writable<ThemeState>({
    title: "Dark Mode",
    isDarkTheme: true,
    themeToggleBtnIconColor: "#3F3F3F",
    twinTheme: { sectionName: "default", index: 1 }
})
export const toastMessages = writable<ToastMsg[]>([])

/* General Authentication Stuff */
export const googleData = writable<GoogleUserData | null>(null)

/* Home View Stuff */
export const tasksViewStore = writable<TasksViewManager | null>(null)

/* YT Stuff */
export const ytUserDataStore = writable<YoutubeUserData| null>(null)
export const ytPlayerStore = writable<YoutubePlayer| null>(null)

/* Music Stuff: Music Player State */
export const musicPlayerStore = writable<MusicPlayer | null>(null)
export const musicDataStore = writable<MusicUserData | null>(null)

/* Session Stuff */
export const sessionStore = writable<Session | null>(null)
export const sessionManager = writable<PomSessionManger | null>(null)