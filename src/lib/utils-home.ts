import { get } from "svelte/store"
import { globalContext, sessionStore } from "./store"
import { ModalType, MusicPlatform, ShortcutSectionInFocus } from "./enums"

import { loadTheme } from "./utils-appearance"
import { conintueWorkSession, didInitSession } from "./utils-session"
import { didInitMusicPlayer, didInitMusicUser, initMusicPlayer, musicLogin } from "./utils-music"
import { didInitYtUser, initYoutubePlayer, youtubeLogin, didInitYtPlayer } from "./utils-youtube"
import { isTargetTextEditor } from "./utils-general"
import { initMusicSettings } from "./utils-music-settings"

export const LEFT_BAR_WIDTH = 63
const LEFT_BAR_LEFT_BOUND = 20

/**
 * Initialize app state.
 * Load data from previously saved state (if there is any).
 */
export const initAppState = async () => {
    loadTheme()
    loadHomeViewLayOutUIData()

    if (didInitSession()) {
        conintueWorkSession()
    }
    if (didInitYtUser()) {
        youtubeLogin()
    }
    if (didInitYtPlayer()) {
        await initYoutubePlayer(true)
    }
    if (didInitMusicPlayer()) {
        await initMusicPlayer(MusicPlatform.YoutubeMusic, !didInitYtPlayer())
    }
    if (didInitMusicUser()) {
        await musicLogin()
    }

    initMusicSettings()
}

/**
 * Keyboard shortcut handler for key down events. 
 * @param event                  The keyboard key down event to handle.
 * @param toggledLeftBarWithKey  If user opened the left side bar with a short cut.
 * @param width                  Total window width
 * 
 * @returns                             If user still has toggled left side bar.
 */
export const keyboardShortCutHandlerKeyDown = (event: KeyboardEvent, toggledLeftBarWithKey: boolean, totalWidth: number) => {    
    const target = event.target as HTMLElement
    const context = get(globalContext)
    const { altKey, metaKey, shiftKey, code, key, ctrlKey } = event
    const isTargetContentEditable = target.contentEditable === "true"

    updateGlobalContext({ 
        ...context, 
        lastKeysPressed: { keyCode: code, altKey, metaKey, shiftKey }
    })
    
    if (isTargetTextEditor(target)) { 
        // Enter for save, Shift + Enter for break.
        if (isTargetContentEditable && ((key === "Enter" && !shiftKey) || key == "Escape")) {
            target.blur()
        }
        else if (!isTargetContentEditable && (key === "Escape" || (key === "Enter"))) {
            target.blur()
        }

        return toggledLeftBarWithKey
    }

    const doNotOpenRightBar = false

    // if (key === "Escape" && context.modalsOpen.length != 0) {
    //     const modals = get(globalContext).modalsOpen
    //     console.log(event)

    //     closeModal(modals[modals.length - 1])
    // }
    if (event.ctrlKey && key === "]" && !doNotOpenRightBar) {
        updateGlobalContext({ ...context, rightBarOpen: !context.rightBarOpen })
    }
    else if (ctrlKey && key === "[") {
        updateGlobalContext({ ...context, leftBarOpen: !context.leftBarOpen })
        return true
    }
    else if (key === "?" && (context.modalsOpen.length === 0 || isModalOpen(ModalType.Shortcuts))) {
        isModalOpen(ModalType.Shortcuts) ? closeModal(ModalType.Shortcuts) : openModal(ModalType.Shortcuts)
    }
    else if (key === "q" && (context.modalsOpen.length === 0 || isModalOpen(ModalType.Quote))) {
        isModalOpen(ModalType.Quote) ? closeModal(ModalType.Quote) : openModal(ModalType.Quote)
    }

    return toggledLeftBarWithKey
}

/**
 * Keyboard shortcut handler for key up events. 
 * @param event  The keyboard key up event to handle.
 */
export const keyboardShortCutHandlerKeyUp = (event: KeyboardEvent) => {
    const target = event.target as HTMLElement
    const { key } = event

    if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.contentEditable) {
        return
    }

    if (!get(sessionStore) && key === "n" && get(globalContext).modalsOpen.length === 0) {
        openModal(ModalType.NewSession)
    }
}

/**
 * On mouse move handler for home page.
 * Toggles left side bar based on the positioning of the mouse.
 * @param event                         Mouse Event
 * @param toggledLeftBarWithKey     If user opened the left side bar with a short cut, then must be hidden again from using the same short cut. Cannot be closed from mouse event.
 * @returns                             If user still has toggled left side bar.
 */
export const onMouseMoveHandler = (event: MouseEvent, toggledLeftBarWithKey: boolean): boolean => {
    const mouseX = event.clientX
    const context = get(globalContext)
    const target = event.target as HTMLElement

    if (target.classList.value.includes("media-player")) {
        return toggledLeftBarWithKey
    }

    let isInArea = mouseX < LEFT_BAR_LEFT_BOUND
    let isActiveRoutineOpen = context.doOpenActiveRoutine
    let leftBarOpen = context.leftBarOpen

    if (!leftBarOpen && !isActiveRoutineOpen && isInArea) {
        updateGlobalContext({ ...get(globalContext), leftBarOpen: true  })
        return false
    }
    else if (!toggledLeftBarWithKey && context.leftBarOpen && mouseX > LEFT_BAR_WIDTH) { 
        updateGlobalContext({ ...get(globalContext), leftBarOpen: false  })
    }

    return toggledLeftBarWithKey
}

/**
 * Update UI Layout of app.
 * @param newLayout      New layout
 */
export const updateGlobalContext = (newLayout: GlobalContext) => {
    globalContext.set(newLayout)
    localStorage.setItem("home-ui", JSON.stringify(newLayout))
}
  
/**
 * Load previously set layout state.
 */
const loadHomeViewLayOutUIData = () => {
    const storedData = localStorage.getItem("home-ui")
    if (!storedData) return


    const data: GlobalContext = JSON.parse(storedData)

    updateGlobalContext({ ...data, modalsOpen: [] })
}

export function hideRightBar() {
    updateGlobalContext({ ...get(globalContext), rightBarOpen: false  })
}

export function showRightBar() {
    updateGlobalContext({ ...get(globalContext), rightBarOpen: true  })
}
/**
 * Add modal to "open modals" array
 * @param modal  Modal to be opened
 */
export const openModal = (modal: ModalType) => {
    globalContext.update((data: GlobalContext) => {
        return { ...data, modalsOpen: [ ...data.modalsOpen, modal ]}
    })
}

/**
 * Remove modal from modals array
 * @param modal  Modal to be opened
 */
export const closeModal = (modalToRemove: ModalType) => {
    globalContext.update((data: GlobalContext) => {
        const newArray = data.modalsOpen.filter((modal: ModalType) => modal !== modalToRemove)
        return { ...data, modalsOpen: newArray }
    })
}

/**
 * @param modal  See if this modal is already open.
 * @returns      If modal is open.
 */
export const isModalOpen = (modal: ModalType) => {
    const modalsOpen = get(globalContext).modalsOpen
    return modalsOpen.includes(modal)
}

export const setShortcutsFocus = (section: ShortcutSectionInFocus) => {
    globalContext.update((state: GlobalContext) => {
        return { ...state, shortcutsFocus: section }
    })
}

export function toggleActiveRoutine() {
    globalContext.update((state: GlobalContext) => {
        return { ...state, doOpenActiveRoutine: !state.doOpenActiveRoutine }
    })
}

export function toggleYoutubePlayerFloat() {
    const oldState    = get(globalContext)
    const mediaPlayer = oldState.mediaPlayer ?? { music: false, youtube: false }

    updateGlobalContext({ 
        ...oldState, 
        mediaPlayer: { ...mediaPlayer, youtube: !mediaPlayer.youtube } 
    })   
}