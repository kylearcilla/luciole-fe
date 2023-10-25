import { get } from "svelte/store"
import { musicDataStore } from "./store"
import { getUserPlaylists } from "./api-apple-music"
import { MusicAPIErrorContext, MusicPlatform } from "./enums"
import { MusicUserData, type MusicUserDataStore } from "./music-user-data"
import { ApiError, AppServerError, AuthorizationError, ExpiredTokenError } from "./errors"
import { 
         removeAppleMusicTokens, getMusicAPIError, removeMusicPlayerData, 
         saveMusicUserData, loadMusicUserData, USER_PLAYLISTS_REQUEST_LIMIT, deleteMusicUserData  
} from "./utils-music"


/**
 * User data class for the Apple Music Musc Kit API. Extends MusicUsesrData Abastract class.
 * Manages and stores user data information, app tokens, and authorization functionality.
 * Errors are handled in function calls to this instance.
 * 
 * @extends     {MusicUserData}
 * @implements  {MusicUserDataStore}
 */
export class AppleMusicUserData extends MusicUserData implements MusicUserDataStore<AppleMusicUserData> {
    musicKit: any = null
    musicPlayerInstance: any
    
    // assume true for now, issue with API where non-sub log in will lead to auth error, so cannot distinguish between failed client permission and non-sub log in
    isUserASubscriber = true 
    isSignedIn = false
    hadPreviousSession = false
    hasTokenExpired = false
    accessToken: string = ""   // described as Developer Token in Docs
    userToken: string = ""

    userPlaylistsOffset = -1
    hasUserPlaylistsLoaded = false
    hasFetchedAllUserPls = false

    userPlaylists: MusicCollection[] = []
    musicPlatform: MusicPlatform | null = null
 
    constructor(hasUserSignedIn: boolean = false) { 
        super()
        musicDataStore.set(this)

        this.hadPreviousSession = hasUserSignedIn

        if (this.hadPreviousSession) this.loadAndSetUserData()
    }

    /**
     * Configures new music kit instance.
     * Fetches & stores necessary tokens, user data, and state.
     * Called when user logs in the first time or after a refresh (used again since it's the same functionality).
     * Saves data locally. Called after a refresh of page / session.
     * 
     * @param hasUserSignedIn        If user has previously logged in already. Used to decide to fetch saved token or get a new one.
     * @throws {APIError}            Error from Music Kit Configuration
     * @throws {AuthorizationError}  Error from Music Kit authorization step.
     * @throws {AppServerError}      Error fetching token from app server.
     * @throws {ExpiredTokenError}   Error in re-initializing Music Kit API after a sign in due to an expired token.
     */
    async initMusicData (): Promise<void> {
        try {
            if (this.hadPreviousSession) {
                this.userToken = await this.initAppleMusic(this.accessToken)            
            }
            else {
                this.accessToken = await this.fetchAPIToken()
                this.userToken = await this.initAppleMusic(this.accessToken)            
                this.musicPlatform = MusicPlatform.AppleMusic
                this.setMusicUserPlaylistData()

                this.updateState({ 
                    musicPlatform: this.musicPlatform, accessToken: this.accessToken,
                    isSignedIn: this.isSignedIn, userToken: this.userToken
                })
            }
            this.isSignedIn = true
        }
        catch(e: any) {
            throw e
        }
    }

    /**
     * 
     * Get Apple Music User / Access Token from the back end. 
     * Will be included in the requests to Apple Music API.
     * Needed to initialize Apple Music Kit.
     * 
     * @returns                   Apple Music User Token / Access Token (Active for 60 Days by Default)
     * @throws {AppServerError}   Error occured when fetching token from app server.
     */
    async fetchAPIToken(): Promise<string> {
        const options = { method: 'GET', headers: { 'Content-Type': 'application/json' } }
        const res = await fetch("http://localhost:3000/", options)

        if (!res.ok) {
            console.error(`Error fetching Apple Music Kit dev token from app server. Status: ${res.status}`)
            throw new AppServerError("App server error. Try again later.")
        }

        const { token } = await res.json()
        return token
    }

    /**
     * From access token, initialize & configure Music Kit and create an instance of it.
     * Invoke user authorization to access user’s Apple Music data & save auth token. 
     * Must be called every time Apple Music Kit is used.
     * 
     * @param accessToken            Access / Dev token returned from server
     * @param hasUserSignedIn        Used to check if user has already signed in.
     * @returns                      Returns token returned from completed authorization flow. Returns null if user is not a subscriber.
     * @throws {APIError}            Error interacting with Apple Music Kit API
     * @throws {AuthorizationError}  Error in user authorization step.
     * @throws {ExpiredTokenError}   Error in re-initializing Music Kit API after a sign in due to an expired token.
     */
    async initAppleMusic (accessToken: string, hasUserSignedIn: boolean = false): Promise<string> {
        try {
            const options = { developerToken: accessToken, app: { name: 'Luciole', build: '1.1' } }
            // @ts-ignore
            this.musicKit = MusicKit
        
            if (!this.musicKit) {
                console.error(`Error initializing Music Kit.`)
                throw getMusicAPIError(500, MusicAPIErrorContext.USER_PLAYLISTS)
            }

            this.musicPlayerInstance = await this.musicKit.configure(options)
            return await this.musicPlayerInstance.authorize()
        }
        catch(e: any) { 
            const errorStr = e.toString()

            if (errorStr.includes("AUTHORIZATION_ERROR")) {
                console.error(`Error initializing Music Kit ${e}. User authorization failed.`)
                this.quit()

                throw new AuthorizationError("User authorization failed.")
            }
            else if (hasUserSignedIn) {
                console.error(`Error initializing Music Kit. Error: ${e}. Token expired.`)
                throw new ExpiredTokenError("Error refresing token. Try again.")
            }
            else {
                console.error(`Error initializing Music Kit. Error: ${e}.`)
                throw new ApiError("Error interacting with Apple Music Try again later.")
            }
        }
    }

    /**
     * Request new user token after a current token has expired.
     * Separate from initMusicData as other platfroms might do fresh token / relogging in requests differently.
     * 
     * @throws {APIError}            Error from Music Kit Configuration
     * @throws {AuthorizationError}  Error from Music Kit authorization step.
     * @throws {AppServerError}      Error fetching token from app server.
     */
    async refreshMusicSession() {
        try {
            this.accessToken = await this.fetchAPIToken()
            this.userToken = await this.initAppleMusic(this.accessToken, true)
            this.hasTokenExpired = false

            this.updateState({ 
                accessToken: this.accessToken, 
                userToken: this.userToken, 
                hasTokenExpired: this.hasTokenExpired 
            })

        }
        catch(e) {
            console.error("Error continuing Apple Music user session.")
            throw e
        }
    }

    /**
     * Called when user wants to lout out of music account.
     */
    quit() {
        this.deleteMusicUserData()
        musicDataStore.set(null)
    }

    /**
     * Update the state of user music data.
     * Saves to local storage to persist state between refreshes.
     * @param newState  New version of current state
     */
    updateState(newState: Partial<AppleMusicUserData>, doSave: boolean = true) {
        musicDataStore.update((data: MusicUserData | null) => {
            return this.getNewStateObj(newState, data! as AppleMusicUserData)
        })

        if (doSave) this.saveState()
    }

    /**
     * Removes data saved by music player.
     * Handled here since player store obj won't be instantiated due to a failure in auth (expired token).
     */
    clearPlayerDataAfterLogIn() {
        removeMusicPlayerData()
    }

    /**
     * Fetches and updates state after fetching user playlists.
     * Used to get fresh user playlist data.
     * 
     * @param accessToken           Token needed to access user content.
     * @returns                     Youtube user playlis meta data (playlists, next page token, length)
     * @throws {APIError}           Error interacting with Apple Music Kit API.
     * @throws {ExpiredTokenError}  Fetch for user playlists failed due to expired token.
     */
    async setMusicUserPlaylistData () {
        let playlists: MusicCollection[] = []
        
        try {
            playlists = await getUserPlaylists(
                    USER_PLAYLISTS_REQUEST_LIMIT, 0, 
                    { accessToken: this.accessToken, userToken: this.userToken }
            )

            const userPlaylists = [...this.userPlaylists, ...playlists]
            const userPlaylistsOffset = playlists.length
            const hasFetchedAllUserPls = playlists.length < USER_PLAYLISTS_REQUEST_LIMIT

            this.userPlaylists = userPlaylists
            this.userPlaylistsOffset = userPlaylistsOffset
            this.hasFetchedAllUserPls = hasFetchedAllUserPls

            this.updateState({  userPlaylists, userPlaylistsOffset, hasFetchedAllUserPls })
        }
        catch(error) {
            throw (error)
        }
    }

    /**
     * Fetches user library playlists using Apple Music API and updates state.
     * After each call, the API will return the USER_PLAYLISTS_REQUEST_LIMIT # of items.
     * 
     * @throws {APIError}           Error interacting with Apple Music Kit API.
     * @throws {ExpiredTokenError}  Fetch for user playlists failed due to expired token.
     */
    async fetchMoreUserPlaylists() {
        let playlists: MusicCollection[] = []
        
        try {
            playlists = await getUserPlaylists(
                USER_PLAYLISTS_REQUEST_LIMIT, this.userPlaylistsOffset, 
                { accessToken: this.accessToken, userToken: this.userToken }
            )

            const userPlaylists = [...this.userPlaylists, ...playlists]
            const userPlaylistsOffset = this.userPlaylistsOffset + playlists.length
            const hasFetchedAllUserPls = playlists.length < USER_PLAYLISTS_REQUEST_LIMIT

            this.userPlaylists = userPlaylists
            this.userPlaylistsOffset = userPlaylistsOffset
            this.hasFetchedAllUserPls = hasFetchedAllUserPls
            
            // do not save subseq playlist response data in local storage, will always use the initial request after a refresh
            this.updateState({  userPlaylists, userPlaylistsOffset, hasFetchedAllUserPls }, false)
        }
        catch(error) {
            throw (error)
        }
    }

    /**
     * Empty user playlists.
     */
    removeUserPlaylists(): void {
        this.updateState({  userPlaylists: [] })
    }

    /**
     * @returns Save data from previous session.
     */
    loadAndSetUserData() {
        const savedUserData = loadMusicUserData()! as Partial<AppleMusicUserData>

        this.hasTokenExpired = savedUserData.hasTokenExpired!,
        this.accessToken = savedUserData.accessToken!,
        this.musicPlatform = savedUserData.musicPlatform!,
        this.userPlaylistsOffset = savedUserData.userPlaylistsOffset!,
        this.userPlaylists = savedUserData.userPlaylists!

        this.updateState({ ...savedUserData })
    }

    /**
     * Saves updated data to persist state between refreshes.
     * Only saves what it needs to.
     */
    saveState() {
        const userDataState = get(musicDataStore)!
        
        // user token is not saved as a new one is made after refresh
        saveMusicUserData({
            hasTokenExpired: userDataState.hasTokenExpired,
            accessToken: userDataState.accessToken,
            musicPlatform: userDataState.musicPlatform,
            userPlaylistsOffset: userDataState.userPlaylistsOffset,
            userPlaylists: userDataState.userPlaylists
        })
    }

    /**
     * @param newState  New state changes to be incorporated
     * @param oldState  Current state
     * @returns         New state with the latest incorporated changes.
     */
    getNewStateObj(newState: Partial<AppleMusicUserData>, oldState: AppleMusicUserData): AppleMusicUserData {
        const newStateObj = oldState

        if (newState.isSignedIn != undefined)          newStateObj.isSignedIn = newState.isSignedIn
        if (newState.hasTokenExpired != undefined)     newStateObj.hasTokenExpired = newState.hasTokenExpired
        if (newState.userPlaylistsOffset != undefined)    newStateObj.userPlaylistsOffset = newState.userPlaylistsOffset
        if (newState.hasFetchedAllUserPls != undefined)   newStateObj.hasFetchedAllUserPls = newState.hasFetchedAllUserPls
        if (newState.userPlaylists != undefined)          newStateObj.userPlaylists = newState.userPlaylists
        if (newState.accessToken != undefined)            newStateObj.accessToken = newState.accessToken
        if (newState.musicPlatform != undefined)          newStateObj.musicPlatform = newState.musicPlatform

        return newStateObj
    }

    /**
     * lear music user and creds data from local storage. 
     */
    deleteMusicUserData() {
        deleteMusicUserData()
        removeAppleMusicTokens()
    }
}
