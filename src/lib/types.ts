// @ts-nocheck

// avoid checking, issues occur when enums are imported

/* Misc. */
type Result<T, E> = {
    result: T
    error: E
}
InputOptions
type HhMmFormat = "full-letters" | "mid-letters" | "min-letters" | "numbers"

type RoutineBlockEditContext = "old-stretch" | "lift" | "details" | "new-stretch" | "duplicate"

type Position = "top-left" | "top" | "top-right" | "bottom-left" | "middle" | "right" | "left" | "bottom-right" | "bottom"

type IconOptions = {
    id?: string
    width?: number
    height?: number
    strokeWidth?: number
    scale?: number
    color?: string
    opacity?: number   
    fullOnHover?: boolean
}

type AsyncButtonOptions = {
    title: string
    isLoading: boolean
    actionFunc: AsyncFunc
    styling?: StylingOptions
}

type RoutineActvity = keyof RoutineCores

type InputOptions = {
    id?: string
    placeholder: string
    initValue: string
    maxLength?: number
    doAllowEmpty?: boolean
    handlers?: {
        onInputHandler?: FunctionParam
        onBlurHandler?: FunctionParam
        onFocusHandler?: FunctionParam
        onError?: FunctionParam
    }
}

type TimeInputOptions = {
    min?: number
    max?: number
} & InputOptions

type TimeInputValue = {
    num: number,
    isAM: boolean
}

type TimePickerOptions = {
    min?: number,
    max?: number,
    start?: number
}

type DropdownBtnOptions = {
    pickedOptionName: string | null
    allowEmpty?: boolean
    hasArrow?: boolean
    bgOnactive?: boolean
    noBg?: boolean
    arrowLeft?: boolean
    arrowOnHover?: boolean
    styles?: StylingOptions
    arrowStyles?: StylingsOptions
    onClick: FunctionParam
    onRemove?: FunctionParam
}

type OffsetPoint = {
    top: number, left: number
}

type HotKeyCombo = string[]
type DropdDownListItemIconType = "default" | "fa" | "unit" | "hotkey" | "right-arrow"

type DropdownOption = {
    name: string,
    leftIcon?: string,
    rightIcon?: { 
        type: DropdDownListItemIconType
        icon?: string | HotKeyCombo 
    }
    onPointerOver?: FunctionParam
    onPointerLeave?: FunctionParam
}

type DropdownOptionSection = {
    sectionName?: string
    options: DropdownOption[]
}

type DOMQueryOption = "id" | "class" | "tag"

type AncestoryQueryOptions = {
    child: HTMLElement
    queryStr: string
    queryBy?: DOMQueryOption
    max?: number
    strict?: boolean
}

type DashboardType = "min" | "default"
type DashboardView = "goals" | "habits"

type DashboardOptions = {
    type: string
    view?: DashboardView
}


type CSSAbsPos = {
    top?: string, left?: string, bottom?: string, right?: string
}

type ConfirmType = "default" | "delete"

type ConfirmOptions = {
    type?: ConfirmType
    cancel?: string
    ok?: string
    caption?: string
}

type DropdownListItem = DropdownOptionSection | DropdownOption
type DropdownItemClickedContext = {
    event: Event, idx: number, parentName?: string
}

type DropdownListOptions = {
    listItems: DropdownListItem[]
    childId?: string
    parent?: {
        id: string,
        optnIdx: number
        optnName: string
    }
    pickedItem?: string | number
    onListItemClicked: (context: DropdownItemClickedContext) => void
    onClickOutside?: FunctionParam
    onDismount?: FunctionParam
    onPointerLeave?: FunctionParam
    position?: CSSAbsPos
    scroll?: {
        bar?: boolean
        goToIdx?: number
    }
    styling?: {
        zIndex?: number
        width?: string
        height?: string
        maxHeight?: string
        optionWidth?: string
        optionHeight?: string
        fontSize?: string,
        fontFamily?: string
        overflow?: "scroll" | "visible"
    }
}

type Color = {
    id: string
    primary: string
    light1: string
    light2: string
    light3: string
    dark1: string
    dark2: string
    dark3: string
    isLight: boolean
    isDark: boolean
}

/* Routines */

type RoutineBlock = {
    title: string
    color: Color
    description: string
    startTime: number
    endTime: number
    order?: BlockOrderContext | null
    tag: Tag | null
    activity: RoutineActvity | null
    tasks: Task[]
}

type RoutineBlockElem = {
    id: string, height: number, xOffset: number, yOffset: number
} & RoutineBlock

type RoutineEditBlock = RoutineBlockElem & { 
    isDragging: boolean
    dropArea?: {
        top: number,
        left: number
        offsetIdx: number
        doShow: boolean
    } 
}

type DailyRoutine = {
    id: string
    name: string
    description: string
    blocks: RoutineBlock[]
}

type WeeklyRoutine = {
    id: string
    name: string
    description: string
    blocks: WeeklyRoutineBlocks
}

type WeeklyRoutineBlocks = {
    Monday: RoutineBlock[] | DailyRoutine, Tuesday: RoutineBlock[] | DailyRoutine
    Wednesday: RoutineBlock[] | DailyRoutine, Thursday: RoutineBlock[] | DailyRoutine
    Friday: RoutineBlock[] | DailyRoutine, Saturday: RoutineBlock[] | DailyRoutine
    Sunday: RoutineBlock[] | DailyRoutine
}

type WeekBlockElems = {
    Monday: RoutineBlockElem[], Tuesday: RoutineBlockElem[]
    Wednesday: RoutineBlockElem[], Thursday: RoutineBlockElem[]
    Friday: RoutineBlockElem[], Saturday: RoutineBlockElem[]
    Sunday: RoutineBlockElem[]
}

type RoutineTags = {
    tag: Tag
    data: {
        avgTime: number
        totalTime : number
        total: number
    }
}

type RoutineCores = { 
    sleeping: {
        status: CoreStatus | null
        totalTime: number
        avgTime: number
        total: number
    },
    working: {
        status: CoreStatus | null
        totalTime: number
        avgTime: number
        total: number
    },
    mind: {
        status: CoreStatus | null
        totalTime: number
        avgTime: number
        total: number
    },
    awake: {
        status: CoreStatus | null
        totalTime: number
        avgTime: number
        total: number
    },
    body: {
        status: CoreStatus | null
        totalTime: number
        avgTime: number
        total: number
    },
    selfCare: {
        status: CoreStatus | null
        totalTime: number
        avgTime: number
        total: number
    }
}

type BlockOrderContext = "first" | "only" | "middle" | "last"

// Dates 
type MonthData = {
    monthIdx: number,
    firstDay: Date,    
    year: number,
    days: ({ date: Date, isInCurrMonth: boolean })[]
}

type ProductivityDay = {
    date: Date, 
    isInCurrMonth: boolean, 
    hadGoal: boolean, 
    hadSession: boolean
}

type ProductivityDate = {
    monthIdx: number,
    firstDay: Date,    
    year: number,
    days: ProductivityDay[]
} 

type CalendarOptions = {
    forwards?: boolean
    minDate?: Date | null 
    maxDate?: Date | null 
}

type DatePickerOptions = CalendarOptions

type FunctionParam = ((...args: any[]) => any) | ((...args: any[]) => Promise<any>)

type AsyncFunc = ((...args: any[]) => Promise<any>)

// maps string section to corresponging theme arrays
type AppearanceSectionToThemeMap = { 
    default: DefaultTheme[], 
    light: ColorTheme[],
    dark: ColorTheme[],
    image: ImageTheme[],
    video: VideoTheme[]
}

type LogoContainerOptions = {
    hasBgColor?: boolean
    containerWidth?: string
    iconWidth?: string
    borderRadius?: string
}

/* Authentication */
type GoogleUserData = {
    email: string,
    name: string,
    profileImgSrc: string
}


type KeyContext = {
    shiftKey: boolean
    metaKey: boolean
    altKey: boolean
    keyCode: string
}
  
/* Home */
type GlobalContext = {
    leftBarOpen: boolean
    rightBarOpen: boolean
    isVideoViewOpen: boolean
    isMusicPlayerOpen: boolean
    hasToaster: boolean
    minModeSrc: string | null
    doOpenActiveRoutine: boolean
    shortcutsFocus: ShortcutSectionInFocus
    modalsOpen: ModalType[]
    lastKeysPressed: KeyContext
    mediaPlayer: {
        youtube: boolean,
        music: boolean
    } | null
}

type ToastInitOptions = {
    message: string
    action?: {
        label: string,
        onClick: (event: MouseEvent) => void
    }
}

interface DOMToastItem extends ToastItem {
    offsets: {
        start: string,
        end: string
    }
    scales: {
        start: string,
        end: string
    }
    opacity: {
        start: number,
        end: number
    }
}


type Quote = {
    text: string,
    bgImgSrc: string,
    artCredit: string,
    quoteCredit: string
}


type HozScrollMaskedGradient = {
    styling: string,
    scrollStatus: HozScrollStatus
}

type VertScrollMaskedGradient = {
    styling: string,
    scrollStatus: VertScrollStatus
}

type BoxSize = {
    width: number,
    height: number
}
  

type HozScrollStatus = {
    hasReachedEnd: boolean,
    hasReachedStart: boolean,
    details: { 
        scrollLeft: number
        scrollWidth: number
        windowWidth: number 
    }
}

type VertScrollStatus = {
    hasReachedBottom: boolean,
    hasReachedTop: boolean,
    details: { 
        scrollTop: number
        scrollHeight: number
        windowHeight: number 
    }
}

/* Tasks */
type TaskGroup = {
    title: string,
    tasks: Task_[]
}
type Task_ = {
    title: string,
    subtasks: SubTask_[],
    description: string,
    isFinished: boolean
}
type SubTask_ = {
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
    id: string
    orderIdx: number
    name: string,
    symbol: {
        color: Color,
        emoji: string
    }
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

type FloatingMediaEmbed = {
    mediaEmbedType: MediaEmbedType
    topPos: string
    leftPos: string
    fixed: MediaEmbedFixed
    width: string
    height: string
    leftTransform?: string
    topTransform?: string
}

type ProgressVisualPart = {
    type: ProgressVisualPartType
    offSetPerc: number,
    widthPerc: number | null, 
    periodIdx: number,
    segmentIdx: number
}

/* Music Stuff */
// music player plays media
type UserLibraryCollection = {
    items: Album[] | Playlist[] | Track[] | AudioBook[] | PodcastEpisode[] | Artist[]
    hasFetchedAll: boolean
    offset: number
    totalItems: number
}

interface Task {
    id: string,
    idx: number,
    isChecked: boolean,
    title: string,
    description: string
    subtasks?: Subtask[]
}
interface Subtask implements Omit<Task, "description" | "subtasks"> { 
    id: string,
    idx: number,
    isChecked: boolean,
    title: string,
    taskId: string
}

type TaskListType = "numbered" | "tasks-linked" | "subtasks-linked" | "subtasks"

type TaskListTypeCombos = `${TaskListType} ${TaskListType} ${TaskListType} ${TaskListType}` | 
                          `${TaskListType} ${TaskListType} ${TaskListType}` | 
                          `${TaskListType} ${TaskListType}` |
                          `${TaskListType}`

type TaskListReorder = {
    taskId: string
    newIdx: number
    oldIdx: number
}

type CSSPxVal   = `${number}px`
type CSSREMVal   = `${number}rem`
type CSSUnitVal = CSSPxVal | `${number}%` | `calc(${string})` | "auto"
type CSSMultiDimPxVal = `${number}px` | 
                        `${number}px ${number}px` | 
                        `${number}px ${number}px ${number}px` | 
                        `${number}px ${number}px ${number}px ${number}px` 

type ContextMenuOptions = {
    width: CSSUnitVal
}

type DayBreakdown = {
    cores: RoutineCores,
    tags: RoutineTags[],
    day: keyof WeeklyRoutineBlocks,
    dayIdx: number,
    blocksLength: number
    linkedRoutine: {
        name: string,
        description: string,
    } | null
}

type StylingOptions = {
    width?: CSSUnitVal
    maxWidth?: CSSUnitVal
    height?: CSSUnitVal
    maxHeight?: CSSUnitVal
    padding?: CSSMultiDimPxVal
    margin?: CSSMultiDimPxVal
    fontSize?: CSSREMVal
    fontWeight?: string
    color?: string
    borderRadius?: CSSPxVal
    backgroundColor?: string
    fontFamily?: string
    opacity?: number
}

type TasksListOptions = {
    id: string
    tasks: Task[]
    isCreatingNewTask?: boolean
    containerRef: HTMLElement
    settings?: {
        numbered?: boolean,
        tasksLinked?: boolean
        subtasks?: boolean,
        subtasksLinked?: boolean
    }
    styling?: {
        list?: StylingOptions
        task?: StylingOptions
        subtask?: StylingOptions
        checkbox?: StylingOptions
        description?: StylingOptions
        num?: StylingOptions
        descriptionInput?: { fontSize: CSSREMVal }
    }
    ui?: {
        showDragHandle?: boolean
        sidePadding?: CSSUnitVal
        hasTaskDivider?: boolean
        listHeight?: CSSUnitVal
    }
    cssVariables?: {
        checkBoxFill?: string
        checkBoxEmpty?: string
        checkIcon?: string
        taskBgColor?: string
        taskHoverBgColor?: string
        floatingItemBgColor?: string
        maxTitleLines?: number
        maxDescrLines?: number
    },
    addBtn?: {
        iconScale?: number,
        doShow?: boolean,
        style?: StylingOptions,
        text?: string,
        pos?: "top" | "bottom",
    }
    dragAndDrop?: DragAndDropHandler
    contextMenuOptions: ContextMenuOptions
    max?: number,
    subtaskMax?: number,
    maxToastMsg?: string
    subtaskMaxToastMsg?: string
}

// interface TaskListOptionsInterface extends TasksListOptions<TaskListTypeCombos> { }

type MediaCollection = Playlist | Album | LibTracks | LibAlbums | LibEpisodes | LibAudiobooks

interface Media {
    id: string
    name: string
    author: string
    authorUrl: string
    artworkImgSrc: string | { url: string, artist: string }
    genre: string
    url: string
    type: MusicMediaType
    fromLib?: boolean
    description?: string
}

interface ArtistTopSongs extends Media {
    length: number
    description: string
}
interface Playlist extends Media {
    length: number
    description: string
}
interface Album extends Media {
    length: number
    description: string
}
interface Track extends Media {
    duration: number
    album: string
    albumId: string
    playlistId: string
}
interface PodcastEpisode extends Media {
    description: string
    duration: number
}
interface RadioStation extends Media {
    description: string
    isLive: boolean
}
interface AudioBook extends Media {
    description: string
}

// Library
interface LibTracks extends Media {
    length: number
    description: string
}
interface LibAlbums extends Media {
    length: number
    description: string
}
interface LibEpisodes extends Media {
    length: number
    description: string
}
interface LibAudiobooks extends Media {
    length: number
    description: string
}

type MediaClickedContext = {
    collection: MediaCollection
    idx: number
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

type MusicPlayerManagerState = {
    progressMs: number
    durationMs: number
    trackTitleElAnimationObj: Animation | null
    trackArtistElAnimationObj: Animation | null
    isSeeking: boolean
    isMouseDownOnInput: boolean
    isPausePlayBtnActive: boolean
    isPrevBtnActive: boolean
    isNextBtnActive: boolean
    onCooldown: boolean
    isMuted: boolean
    volume: number
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

type MusicPlatformPropNames = "youtube"

type DiscoverCollection = {
    [platform in MusicPlatformPropNames]: MediaCollection[]
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

type MusicUserDataChildren = AppleMusicUserData | SpotifyMusicUserData

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

/* Spotify Music Stuff */
type SpotifyInitData = {
    accessToken: string
    expiresIn: number
    refreshToken: string
    authCode: string
}
type SpotifyAuthTokenResponse = {
    access_token: string
    expires_in: number
    scope: string
    refresh_token: string
    tokenType: string
}
type MusicUserDetails = {
    id: string,
    username: string,
    url: string,
    isPremiumUser: boolean
    profileImgSmall: string
    profileImgBig: string
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
    accessTokenCreationDate: Date
}

type YoutubeUserPlaylistResponse = {
    userPlaylists: YoutubePlaylist[]
    userPlsNextPageToken: string
    userPlaylistsTotal: number
}

type YoutubePlaylistResponse = {
    videos: YoutubeVideo[]
    nextPageToken: string
    playlistLength: number
}

type YoutubePlayerData = {
    playlist: YoutubePlaylist
    vid: YoutubeVideo
    floatLayout: BoxLayout
    playlistVidIdx: number
    doShowPlayer: boolean
}

type BoxLayout = { 
    width: number 
    height: number 
    top: number 
    left: number 
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

type YoutubePlaylistGroup = {
    title: string
    playlists: YoutubePlaylist[]
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
    thumbnailSrc: string
    channelId: string
    channelName: string
    channelImgSrc: string
    channelSubs: string
    channelUrl: string
    embeddable?: boolean
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
    globalIdx: number
    sectionId: number
    sectionIdx: number
    imgSrc: string
    isImgHidden: boolean
    isArchived: boolean
    isPinned: boolean
}
type GoalSection = {
    name: string
    orderIdx: number
    length: number
    isExpanded: boolean
    tagRef: ""
}
interface Milestone implements Task { 
    id: string,
    idx: number,
    isChecked: boolean,
    title: string,
    description: string
    date: Date | null 
}

type GoalSectionItemId = {
    sectionId: number,
    sectionItemIdx: number
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
    title: string
    isDarkTheme: boolean
    themeToggleBtnIconColor: string
    twinTheme: { sectionName: keyof AppearanceSectionToThemeMap, index: number } | null
}

interface Theme {
    title: string
    sectionDetails: { title: keyof AppearanceSectionToThemeMap, index: number }
}

interface ColorTheme extends Theme {
    colorPalette: string[]
    styling: ColorThemeProps
    twinTheme: { sectionName: keyof AppearanceSectionToThemeMap, index: number } | null
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
    vidSrc: string
    thumbnailSrc: string
    channelName: string
}

type ColorThemeProps = {
    isDark: boolean
    hasTwin: boolean
    backgroundOne: string
    backgroundTwo: string
    backgroundThree: string
    fgColor1: string
    fgColor2: string
    sessionBgColor: string
    sessionBorderVal: string
    sessionShadowVal: string
    textColor1: string
    textColor2: string
    hoverColor: string
    hoverColor2: string
    hoverColor3: string
    tabColor: string
    tabHighlightColor: string
    tabHighlightBoxShadow: string
    headerBgColor: string
    headerBorder: string
    headerBoxShadow: string
    headerTextColor: string
    headerIconColor: string
    headerProgressColor1: string
    headerProgressColor2: string
    headerTrackColor1: string
    headerTrackColor2: string
    baseProgressColor1: string
    baseProgressColor2: string
    baseTrackColor1: string
    baseTrackColor2: string
    progressBallGlow: string
    pomToolTipBgColor: string
    pomToolTipTextColor: string
    modalBgAccentColor: string
    modalBgColor: string
    bentoBoxBgColor: string
    bentoBoxBorder: string
    bentoBoxShadow: string
    muiscPlayerBgColor: string
    musicProgressFgColor: string
    navMenuBgColor: string
    navIconColor: string
    navIconBgColor: string
    navMenuBorder: string
    navMenuBoxShadow: string
    wideLeftBarColor: string
    wideLeftBarBorder: string
    wideLeftBarBoxShadow: string
    wideLeftBarTabColor: string
    wideLeftBarTabIconColor: string
    sessionBlockColor: string
    rightBarMindNoteBgColor: string
    themeToggleBtnBgColor: string
    iconToggleBtnBgColor: string
    highlighterToggleBtnBgColor: string
    midPanelBorder: string
    midPanelShadow: string            
    midPanelBaseColor: string
    midPanelAccentColor1: string
    midPanelAccentColor2: string
    midPanelAccentColor3: string
    midPanelAccentTextColor: string
    sidePanelBorder: string
    sidePanelShadow: string
    sidePanelTabBgColor: string
    sidePanelTabHighlightColor: string
    sidePanelLightAccentColor: string
    rightBarBgColor: string
    rightBarBgBoxShadow: string
    tasksCheckBoxColorDefault: string
    tasksCheckBoxColorComplete: string
    tasksSubtaskFocusColor: string
    tasksCheckColor: string
    tasksLightTextColor: string
}