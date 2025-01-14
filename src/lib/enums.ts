export enum ErrorCode { 
    YT_PRIVATE_PLAYLIST, YT_PRIVATE_VIDEO, YT_EXPIRED_TOKEN, DEFAULT, MUSIC_EXPIRED_TOKEN
}
export enum APIErrorCode {
    EXPIRED_TOKEN, FAILED_TOKEN_REFRESH, LOGIN_IN, LOG_OUT, RESOURCE_NOT_FOUND, RESOURCE_UNAVAILABLE, 
    AUTHORIZATION_ERROR, UNAUTHORIZED, API_ERROR, GENERAL, RATE_LIMIT_HIT, PLAYER, APP_SERVER, AUTH_DENIED,
    PLAYER_MEDIA_INVALID, API_SERVER
}
/* General */
export enum CoreStatus {
    Healthy, Normal, Lacking
}
export enum TextTab {
    Workspace, Productivity, Goals, Habits, Mindhub, Routines
}
export enum LogoIcon {
    YoutubeMusic, Youtube, Session, Google, Somara, Todoist
}
export enum Icon {
    Settings, Dropdown, Add, Close, ChevronLeft, ChevronRight, DragDots, Archive, Tune, Sun, Moon, Pin, Sublink,
    ColorSun, ColorMoon, MiniPlayer
}
export enum ModalType { 
    Settings, Music, Themes, Quote, NewSession, ActiveSession,
    EditSession, SesssionFinished, SessionCanceled, Shortcuts, ImgUpload, CustomVidBg,
    EditGoal, EditRoutine, Confirmation, SessionSummary, Text, Spaces
}
export enum ToasterPosition {
    TOP_LEFT, TOP_RIGHT, BOTTOM_LEFT, BOTTOM_RIGHT, TOP_CENTER, BOTTOM_CENTER
}
export enum HrsMinsFormatOption {
    LETTERS, MIN_LETTERS, NO_LETTERS
}
export enum ShortcutSectionInFocus {
    MAIN, TASK_BAR
}

/* Dates */
export enum DatePickerUserInput {
    InvalidYr, BeyondMin, BeyondMax, InBounds, Invalid
}

export enum DateBoundState{
    InvalidYr, BeyondMin, BeyondMax, InBounds
}

/* Image Upload */
export enum ImgUploadError {
    General, Format, InvalidURL, Size, Dims
}

/* Tasks */
export enum RightSideTab { 
    TASKS, OVERVIEW
}
export enum ContextMenuOption {
    ADD_SUBTASK, DELETE_TASK, DELETE_SUBTASK
}

/* Goals */
export enum GoalStatus {
    OnHold , InProgress, Accomplished
}
export enum JournalTab {
    Goals, Summary
}
export enum GoalsDropdown { 
    ViewOption,
    TuneDropdown
}
export enum GoalItemUI {
    RepoList, BoardList, RepoCard, BoardCard 
}
export enum GoalViewOption {
    Board = "Board", History = "History", AllGoals = "All Goals"
}
export enum GoalItemView {
    List, Board
}
export enum EditMilestoneOption {
    EditTitle, ChangeDate, Delete
}
export enum EditGoalOption {
    ChangeImage, ToggleHideImg, DelteGoal, RemoveImage, TogglePinGoal
}
export enum EditGoalContextMenu {
    Milestone, Date, Img, Goal
}

/* Sessions */
export enum SessionState {
    EMPTY, FOCUSING, ON_BREAK, WAITING_TO_PROGRESS_BREAK, 
    WAITING_TO_PROGRESS_FOCUS, FINISHED, CANCELED, FINISH_TOO_EARLY,
    TOOK_TOO_LONG
}
export enum ProgressVisualPartType {
    FOCUS, BREAK, CHECKPOINT
}

/* Youtube */
export enum YTAPIErrorContext { 
    USER_LOGIN, USER_PLAYLISTS, VIDEO, CHANNEL, PLAYLIST 
}
export enum YTMediaLinkType {
    PLAYLIST, VIDEO
}

/* Music */
export enum PlaybackGesture {
    SHUFFLE, PLAY_PAUSE, SKIP_NEXT, SKIP_PREV, SEEK, LOOP
}
export enum LibError {
    REFRESH, NEW_COLLECTION, MORE_ITEMS
}
export enum MusicPlatform { 
    AppleMusic, Spotify, YoutubeMusic, Soundcloud 
}
export enum MusicMediaType {
    Playlist, Track, Album, PodcastEpisode, AudioBook, RadioStation, SavedTracks, SavedAudioBooks, SavedEpisodes, Podcast
}
export enum UserLibraryMedia {
    Playlists = "Playlists", LikedTracks = "Tracks", Albums = "Albums", PodcastEps = "Episodes", Audiobooks = "Audiobooks", Artists = "Artists"
}

/* Routines */
export enum RoutineActivityType {
    Work, Body, Mind, SelfCare, Nap
}

/* Toasts */
export enum SwipeStateTypes {
	SwipedOut = 'SwipedOut',
	SwipedBack = 'SwipedBack',
	NotSwiped = 'NotSwiped'
}