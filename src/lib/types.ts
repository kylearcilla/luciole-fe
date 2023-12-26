// avoid checking, issues occur when enums are imported
// @ts-nocheck

/* Misc. */
type AsyncResult = {
    sucess: boolean
    message?: string
}

type Result<T, E> = {
    result: T
    error: E
}

type FunctionParam = ((...args: any[]) => any) | ((...args: any[]) => Promise<any>) | null

type AppearanceThemes = { 
    default: DefaultTheme[], 
    light: ColorTheme[],
    dark: ColorTheme[],
    image: ImageTheme[],
    video: VideoTheme[]
}

type LogoContainerOptions = {
    hasBgColor?: boolean      // default: has bg
    containerWidth?: string,  // default: 24px
    iconWidth?: string,       // default: 50%, can be px
    borderRadius?: string,    // default: 100%
}

/* Authentication */
type GoogleUserData = {
    email: string,
    name: string,
    profileImgSrc: string
}
  
/* Home */
type HomeLayout = {
    isNavMenuOpen: boolean,
    isTaskMenuOpen: boolean,
    isVideoViewOpen: boolean,
    isMusicPlayerOpen: boolean,
    minModeSrc: string | null,
    shortcutsFocus: ShortcutSectionInFocus
    modalsOpen: ModalType[]
}
type ToastMsg = {
    context: ToastContext
    message: string
    action?: {
        msg: string
        func: ((...args: any[]) => any) | ((...args: any[]) => Promise<any>)
    }
}
type ToastMsg = {
    type: ToastType
    context: ToastContext
    message: string
    actionFunction: FunctionParam
}
type Quote = {
    text: string,
    bgImgSrc: string,
    artCredit: string,
    quoteCredit: string
}

/* Tasks */
type TaskGroup = {
    title: string,
    tasks: Task[]
}
type Task = {
    title: string,
    subtasks: SubTask[],
    description: string,
    isFinished: boolean
}
type SubTask = {
    title: string, 
    isFinished: boolean
}

/* Session Stuff */
type Medal = "🏅" | "🥈" | "🥉"

type SessionResult = { 
    score: number, 
    medal: Medal ,
    message: string,
    resultImgUrl: string
}

type Tag = {
    name: string,
    color: string,
    symbol: string
}

type SessionInputData = {
    name: string
    tag: Tag
    pomTime: number
    pomPeriods: number
    breakTime: number
    startTime: Date
    isPlaying: boolean
    endTime: Date | null
    calculatedEndTime: Date
    totalElapsedTime: string
    timePeriodString: string
    currentIndex: number
    currentPomPeriod: number
    lastFinishedPeriodIdx
    sessionResult: SessionResult | null
    todos: { title: string, isChecked: boolean }[]
    todosCheckedCount: number
    pomMessage: string,
    state: SessionState
    result: SessionResult | null
    currentTime: { minutes: number, seconds: number },
    userFocusTimeSecs: number,
    userBreakTimeSecs: number,
    currentSessionTimeSecs: number,
    sessionDurationMins: number,
}

type ActiveSessionState = {
    name: string,
    tag: Tag,
    pomTime: number,
    pomPeriods: number,
    breakTime: number,
    startTime: Date,
    calculatedEndTime: Date
    totalElapsedTime: string,
    timePeriodString: string,
    currentIndex: number,
    todos: { title: string, isChecked: boolean }[],
    todosCheckedCount: number,
    currentTime: { minutes: number, seconds: number } | null,
    currentPomPeriod: number,
    sessionState: SessionState,
    resultScore: SessionResult | null,
    pomMessage: string    
}

type ProgressVisualPart = {
    type: ProgressVisualPartType
    offSetPerc: number,
    widthPerc: number | null, 
    periodIdx: number,
    segmentIdx: number
}

/* Music Stuff */
type Track = {
    id: string;
    name: string;
    artist: string;
    collection: string;
    artworkImgSrc: string;
    playlistId: string;
    playlistName: string;
    playlistArtworkSrc: string;
}

type MusicCollection = {
    id: string,
    name: string,
    author: string,
    artworkImgSrc: string,
    songCount: number,
    genre: string,
    description: string,
    type: string,
    url: string | null,
}

type MusicPlayerState = {
    doShowPlayer: boolean,
    isPlaying: boolean,
    error: any,
    isDisabled: boolean,
    isRepeating: boolean,
    isShuffled: boolean,
    hasJustEnded: boolean
}

type MusicShufflerData = {
    startTrackIndex: number,
    trackIndex: number
    indexPointer: number,
    shuffledIndexes: number[],
    songCount: number
    totalPlayed: number
    hasCompleted: boolean
    state: MusicShufflerState
}

type MusicPlatformPropNames = "appleMusic"

type DiscoverCollection = {
    [platform in MusicPlatformPropNames]: MusicCollection[]
}

type MusicContext = {
    platform: MusicPlatform | null,
    platformName: string | null
}

type MusicCollectionCategory = {
    moodType: MusicMoodCategory
    artworkSrc: string
    artworkBlurredSrc: string
    artistCredit: string
    description: string
}

type MusicCollectionCategoryCollections = {
    appleMusic: MusicCollection[],
    spotify: MusicCollection[],
    soundcloud: MusicCollection[]
}

/* Apple Music Stuff */
type AppleMusicUserCollection = {
    artworkSrc: string
    description: string
    globalId: string
    id: string
    isOwn: true
    name: string
}

type AppleUserCredentials = {
    devToken: string,
    musicUserToken: string
}

/* Youtube Stuff */
type YTOAuthResponse = {
    accessToken: string,
    email: string,
    username: string,
    profileImgSrc: string,
}

type YoutubeUserCreds = {
    accessToken: string,
    refreshToken: string
}

type YoutubeUserPlaylistResponse = {
    userPlaylists: YoutubePlaylist[]
    userPlaylistsNextPageToken: string
    userPlaylistLength: number
}

type YoutubePlaylistResponse = {
    videos: YoutubeVideo[]
    nextPageToken: string
    playlistLength: number
}

type YoutubeUserInfo = {
    username: string,
    profileImgSrc: string,
    email: string,
    userPlaylists: YoutubePlaylist[]
    userPlaylistsNextPageToken: string
    userPlaylistLength: number
    hasFetchedAllUserPls: boolean
}

type YoutubePlayerData = {
    playlist: YoutubePlaylist
    vid: YoutubeVideo
    playlistVidIdx: number
    doShowPlayer: boolean
}

type YoutubePlaylist = {
    id: string,
    title: string,
    description: string,
    vidCount: number,
    channelId: string,
    channelTitle: string,
    thumbnailURL: string,
    channelImgSrc: string,
    channelURL: string,
    firstVidId: string | null
}

type YoutubePlayerOptions = {
    height: string,
    width: string,
    playerVars: { autoplay: number, modestbranding: number, rel: number, volume: number }
    events: {
        onReady: null | ((...args: any[]) => void) | ((...args: any[]) => Promise<void>),
        onStateChange: null | ((...args: any[]) => void) | ((...args: any[]) => Promise<void>),
        onError: null | ((...args: any[]) => void) | ((...args: any[]) => Promise<void>),
    }
}

type YoutubeChannel = {
    channelId: string
    channelName: string
    channelImgSrc: string
    channelSubs: string
    channelUrl: string
}

type YoutubeVideo = {
    id: string
    title: string
    likeCount: string
    viewCount: string
    publishedAt: string
    channelId: string
    channelName: string
    channelImgSrc: string
    channelSubs: string
    channelUrl: string
};

type YoutubeMediaId = { 
    type: YTMediaLinkType
    id: string 
}

/* Goals */
type Goal = {
    id: string
    tag: Tag
    title: string
    description: string
    dueDate: Date | null
    creationDate: Date
    accomplishedDate: Date | null
    status: GoalStatus
    milestonesDone: number,
    milestones: Milestone[]
    idx: number
    imgSrc: string
    isImgHidden: boolean
}
type Milestone = {
    title: string
    id: string
    idx: number
    endDate: Date | null
}
type YrAccomplishmentsOverview = {
    newGoals: number,
    milestonesReached: number,
    goalsAccomplished: number,
    accomplishments: Accomplishment[]
}
type Accomplishment = {
    title: string
    date: Date
    tagRef: {
        id: string
        title: string
        symbol: string,
        color: string
    },
    goalRef: {
        id: string
        title: string
    }
    isMilestone: boolean
}

type DatePickerOptions = {
    forwards?: boolean
    minDate?: Date | null 
    maxDate?: Date | null 
}

/* Analytics Stuff */
type SessionInputData = { 
    tagName: string, 
    hours: number, 
    color: string  
}

type DaySessionData = {
    date: Date,
    sessions: SessionInputData[]
}

type ProdOverviewData = { 
    chartData: ChartData
    timeFrameInsightData: PordOverViewInisightData
}

type PordOverViewInisightData = {
    tagDistrData: TagDistrDataPoint[],
    sessionCountData: SessionCountData
    focusTimeData: FocusTimeData
}

type ChartData = {
    dayToBarDataArr: any[]
    maxHours: number,
    tags: Tag[]
}

type TagDistrDataPoint = { 
    name: string, 
    color: string, 
    hours: number,
    hoursStr: string,
    fraction: number
}

type SessionCountData = {
    isDay: boolean,
    percChange: number
    count: number
}

type FocusTimeData = {
    isDay: boolean
    percChange: number
    hours: number
}

type TimeFrameActivity = {
    timeFrame: string
    allTimeMins: number
}

type TagMonthlyActivity = {
    month: string,
    sessionsDone: number
    focusHrs: number
}
  
/* Theme Stuff */
type ThemeState = {
    title: string,  
    isDarkTheme: boolean,
    themeToggleBtnIconColor: string,
    twinTheme: { sectionName: keyof AppearanceThemes, index: number } | null
}

interface Theme {
    title: string,
    sectionDetails: { title: keyof AppearanceThemes, index: number }
}

interface ColorTheme extends Theme {
    colorPalette: string[]
    styling: ColorThemeProps
    twinTheme: { sectionName: keyof AppearanceThemes, index: number } | null
}

interface DefaultTheme extends ColorTheme {
    thumbnailImgSrc: string
}

interface ImageTheme extends Theme {
    fullImgSrc: string
    thumbnailImgSrc: string
    artist: string
}

interface VideoTheme extends Theme {
    vidSrc: string,
    thumbnailSrc: string,
    channelName: string
}

type ColorThemeProps = {
    isDark: boolean,
    hasTwin: boolean,
    isHeaderElementTextLight: boolean,
    primaryBgColor: string,
    fgColor1: string,
    fgColor2: string,
    sessionBgColor: string,
    sessionBorderVal: string,
    sessionShadowVal: string,
    textColor1: string,
    textColor2: string,
    hoverColor: string,
    hoverColor2: string,
    hoverColor3: string,
    tabColor: string,
    tabHighlightColor: string,
    tabHighlightBoxShadow: string,
    headerElementBgColor: string,
    headerElementBorderVal: string,
    headerElementTextColor: string,
    headerElementShadow: string,
    headerTimeColor: string,
    headerProgressColor1: string,
    headerProgressColor2: string,
    headerTrackColor1: string,
    headerTrackColor2: string,
    baseProgressColor1: string,
    baseProgressColor2: string,
    baseTrackColor1: string,
    baseTrackColor2: string,
    progressBallGlow: string,
    modalBgAccentColor: string,
    modalBgColor: string,
    bentoBoxBgColor: string,
    bentoBoxBorder: string,
    bentoBoxShadow: string,
    muiscPlayerBgColor: string,
    musicProgressFgColor: string,
    navMenuBgColor: string,
    navIconColor: string,
    navIconBgColor: string,
    themeToggleBtnBgColor: string,
    iconToggleBtnBgColor: string,
    highlighterToggleBtnBgColor: string,
    midPanelBorder: string,
    midPanelShadow: string,            
    midPanelBaseColor: string,
    midPanelAccentColor1: string,
    midPanelAccentColor2: string,
    midPanelAccentColor3: string,
    midPanelAccentTextColor: string,
    sidePanelBorder: string,
    sidePanelShadow: string,
    sidePanelTabBgColor: string,
    sidePanelTabHighlightColor: string,
    sidePanelContextMenuBgColor: string,
    sidePanelContextMenuHoverColor: string,
    sidePanelContextMenuBorder: string,
    sidePanelContextMenuBoxShadow: string,
    sidePanelLightAccentColor: string,
    rightBarBgColor: string,
    rightBarBgBoxShadow: string,
    tasksCheckBoxColorDefault: string,
    tasksCheckBoxColorComplete: string,
    tasksSubtaskFocusColor: string,
    tasksCheckColor: string,
    tasksLightTextColor: string,
    dropdownMenuBgColor1: string,
    dropdownMenuBgHoverColor1: string,
    dropdownMenuBgColor2: string
    dropdownMenuBgHoverColor2: string
}