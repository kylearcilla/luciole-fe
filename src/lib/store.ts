import { writable } from 'svelte/store';
import type { MusicData } from './MusicData';
import type { MusicPlayer } from './MusicPlayer';
import colorThemes from './color-themes';
import { defaultThemes } from './data-themes';

/* General Authentication Stuff */
export const googleData = writable<GoogleUserData>({
    email: '',
    name: '',
    profileImgSrc: ''
})

/* YT Stuff */
export const ytCredentials = writable<YoutubeUserCreds>({
    accessToken: '',
    refreshToken: ''
})

export const ytUserData = writable<YoutubeUserData>({
    username: '',
    channelImgSrc: '',
    email: '',
    selectedPlaylist: null,
    playlists: []
});

export const currentYtVidId = writable(0)
export const ytCurrentVid = writable<any>({
    id: "",
    title: "",
    likeCount: "",
    viewCount: "",
    publishedAt: "",
    channelName: "",
    channelImgSrc: "",
    channelSubs: ""
})

/* Music Stuff */
export const appleMusicPlayerState = writable<MusicPlayer>()
export const musicDataState = writable<MusicData>()

export const appleUserCredentials = writable<AppleUserCredentials | null>(null)
export const userMusicPlaylists = writable<MusicCollection[] | null>(null)
export const curentPlaylist = writable<MusicCollection | null>(null)
export const currentTrack = writable<Track | null>(null)
export const musicPlayerData = writable<MusicPlayerData | null>(null)

/* Color Stuff */

export const colorThemeState = writable<any>({
    title: "Dark Mode",  // to set styling specific only to Default Dark Mode
    isDarkTheme: true     // to change styling specific only to dark / light themes
})