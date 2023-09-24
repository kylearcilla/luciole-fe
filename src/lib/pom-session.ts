import type { Writable } from "svelte/store"
import { formatTimeToHHMM } from "./utils-date"
import { globalSessionObj, globalSessionState } from "./store"
import { sessionCopy } from "$lib/data-pom"

enum SessionState {
    EMPTY, PAUSED, FOCUSING, ON_BREAK, WAITING_TO_PROGRESS_BREAK, WAITING_TO_PROGRESS_FOCUS, FINISHED, CANCELED, FINISH_TOO_EARLY
}

export class Session {
    name: string
    tag: Tag
    pomTime: number
    pomPeriods: number
    breakTime: number
    startTime: Date
    endTime: Date | null = null
    calculatedEndTime: Date
    totalElapsedTime: string
    timePeriodString: string
    currentIndex: number = 0
    currentPomPeriod: number = 1
    sessionResult: SessionResult | null = null
    todos: { title: string, isChecked: boolean }[] = []
    todosCheckedCount = 0
    pomMessage = "Focus Time"
    currentTime: { minutes: number, seconds: number } | null = {
        minutes: 0,
        seconds: 0
    }
    interval: NodeJS.Timer | null = null
    sessionState: SessionState = SessionState.EMPTY
    activeSessionState: Writable<ActiveSessionState | null>

    TODO_SCORE_WEIGHT = 0.70
    TIME_SCORE_WEIGHT = 0.30

    TIME_CUTT_OFF = 1860
    GOLD_CUT_OFF = 85
    SILVER_CUT_OFF = 60
    globalSessionObj: any


    constructor(sessionSettings: SessionInputs) { 
        this.name = sessionSettings.name
        this.tag = sessionSettings.tag
        this.pomTime = sessionSettings.focusTime
        this.pomPeriods = sessionSettings.poms
        this.breakTime = sessionSettings.breakTime
        this.startTime = new Date()
        this.calculatedEndTime = sessionSettings.calculatedEndTime!
        this.totalElapsedTime = sessionSettings.totalElapsedTime!
        this.timePeriodString = sessionSettings.timePeriodString!
        this.todos = sessionSettings.todos.map((todo) => ({ title: todo, isChecked: false }))
        this.currentPomPeriod = 1
        this.sessionState = SessionState.FOCUSING

        this.activeSessionState = globalSessionState
        this.activeSessionState.set({
            name: this.name,
            tag: this.tag,
            pomTime: this.pomTime,
            pomPeriods: this.pomPeriods,
            breakTime: this.breakTime,
            startTime: this.startTime,
            calculatedEndTime: this.calculatedEndTime,
            totalElapsedTime: this.totalElapsedTime,
            currentIndex: this.currentIndex,
            todos: this.todos,
            todosCheckedCount: this.todosCheckedCount,
            currentTime: this.currentTime,
            currentPomPeriod: this.currentPomPeriod,
            timePeriodString: this.timePeriodString,
            sessionState: this.sessionState,
            resultScore: null,
            pomMessage: this.pomMessage
        })

        this.playSession()
    }

    iCurrentlyFocusTime = () => this.currentIndex % 2 === 0
    editSessionTitle = (newTitle: string) => {
        this.name = newTitle
        this.activeSessionState.update((data: any) => ({ ...data, name: this.name }))
    }
    editSesionTag = (newTag: Tag) => {
        this.tag = newTag
        this.activeSessionState.update((data: any) => ({ ...data, tag: this.tag }))
    }

    playSession = () => {
        this.sessionState = this.iCurrentlyFocusTime() ? SessionState.FOCUSING : SessionState.ON_BREAK
        this.interval = setInterval(() => {
            const endMins = this.iCurrentlyFocusTime() ? this.pomTime : this.breakTime
            this.updateTime(endMins)
        }, 1000)

        this.activeSessionState.update((data: any) => ({ ...data, sessionState: this.sessionState }))
    }
    pauseSession = () => {
        this.sessionState = SessionState.PAUSED
        clearInterval(this.interval!)
        this.activeSessionState.update((data: any) => ({ ...data, sessionState: this.sessionState }))
    }

    updateTime = (endTime: number) => {
        const mins = this.currentTime!.minutes
        const secs = this.currentTime!.seconds
        if (mins === endTime) {
            this.endPeriod()
            return
        }
        if (secs === 59) {
            this.currentTime!.seconds = 0
            this.currentTime!.minutes++
        }
        else {
            this.currentTime!.seconds++
            document.title = `${this.currentTime!.minutes}:${(this.currentTime!.seconds + "").padStart(2, '0')}`
        }

        this.activeSessionState.update((data: any) => ({ ...data, currentTime: this.currentTime }))
    }
    endPeriod = () => {
        this.pauseSession()
        this.currentTime!.minutes = 0
        this.currentTime!.seconds = 0
        this.sessionState = this.iCurrentlyFocusTime() ? SessionState.WAITING_TO_PROGRESS_BREAK : SessionState.WAITING_TO_PROGRESS_FOCUS
        let randomMsgIdx = 0

        if (this.sessionState === SessionState.WAITING_TO_PROGRESS_BREAK) {
            randomMsgIdx = Math.floor(Math.random() * sessionCopy.breakTimeMessages.length)
            this.pomMessage = sessionCopy.breakTimeMessages[randomMsgIdx]
        }
        else if (this.sessionState === SessionState.WAITING_TO_PROGRESS_FOCUS) {
            randomMsgIdx = Math.floor(Math.random() * sessionCopy.focusMessages.length)
            this.pomMessage = sessionCopy.focusMessages[randomMsgIdx]
        }

        const periods = (this.pomPeriods * 2) - 2
        this.activeSessionState.update((data: any) => ({ 
            ...data, 
            currentTime: this.currentTime, 
            pomMessage: this.pomMessage,
        }))

        if (this.currentIndex === periods) {
            this.finishSession()
            return
        }
    }
    progressToNextPeriod = () => {
        this.pauseSession() // will be already pused since end period is always called before this
        this.currentTime!.minutes = 0
        this.currentTime!.seconds = 0

        this.currentIndex++
        this.sessionState = this.iCurrentlyFocusTime() ? SessionState.FOCUSING : SessionState.ON_BREAK

        if (this.sessionState === SessionState.FOCUSING) {
            this.pomMessage = "Focus Time"
        }
        else if (this.sessionState === SessionState.ON_BREAK) {
            this.pomMessage = "Break Time"
        }

        if (this.currentIndex % 2 != 0) { 
            this.currentPomPeriod++
            this.activeSessionState.update((data: any) => ({ 
                ...data, 
                currentPomPeriod: this.currentPomPeriod,
                currentIndex: this.currentIndex,
                sessionState: this.sessionState,
                pomMessage: this.pomMessage,
                currentTime: this.currentTime
            }))
        }

        this.playSession()
    }
    renameSesion = (newName: string) => {
        this.name = newName

        this.activeSessionState.update((data: any) => ({ ...data, name: this.name }))
    }
    restartPeriod = () => {
        this.currentTime!.minutes = 0
        this.currentTime!.seconds = 0

        this.activeSessionState.update((data: any) => ({ ...data, currentTime: this.currentTime }))
    }

    /* This should call end period to see the end period UI, user should click progress to fully skip to next period */
    skipToNextPeriod = () => this.progressToNextPeriod()
    cancelSession = () => {
        this.pauseSession()
        // this.sessionState = SessionState.CANCELED

        this.activeSessionState.set(null)
        globalSessionObj.set(null)
    }
    finishSession = (/* ⛳️ fakeEndTime: Date = new Date() */) => { 
        this.pauseSession()
        // this.endTime = fakeEndTime    // ⛳️ (used for testing)
        this.endTime = new Date()  // (used in production)

        const endTime = this.endTime
        this.sessionState = SessionState.FINISHED

        const isEndTimeEarlier = this.isDateEarlier(endTime, this.calculatedEndTime)
        const hasFinishedAllTodos = this.todosCheckedCount === this.todos.length
        const medalAndScore = this.getMedalAndScore(isEndTimeEarlier, hasFinishedAllTodos)
        const msgAndImg = this.getMsgAndImg(medalAndScore.medal)

        this.sessionResult = { ...medalAndScore, ...msgAndImg }
        console.log(this.sessionResult)

        this.activeSessionState.update((data: any) => ({ 
            ...data,
            sessionState: this.sessionState,
            resultScore: this.sessionResult,
        }))

        this.activeSessionState.set(null)
        globalSessionObj.set(null)

        return this.sessionResult
    }
    getMedalAndScore = (isEndTimeEarlier: boolean, hasFinishedAllTodos: boolean): { score: number, medal: Medal } => {
        let score = 0
        let medal: Medal = "🏅"

        /* All subtasks finished and finish early */
        if (isEndTimeEarlier && hasFinishedAllTodos) {
            score = 100
            return { score, medal }
        }

        let subtasksScore = 100

        /* Finished early, has not completed all todos */
        if (isEndTimeEarlier && !hasFinishedAllTodos) {
            subtasksScore = Math.round((this.todosCheckedCount / this.todos.length) * 100)

            score = subtasksScore
            medal = this.getMedal(score)

            return { score, medal }
        }

        /* Finished at least at the designated time */
        if (hasFinishedAllTodos) {
            subtasksScore = 100
        }
        else {
            subtasksScore = Math.round((this.todosCheckedCount / this.todos.length) * 100)
        }

        const diffSecs = this.getDifferenceInSecs(this.endTime!, this.calculatedEndTime)

        let timeScore = 100
        if (diffSecs < this.TIME_CUTT_OFF) {
            const percentageScore = 1 - (diffSecs / this.TIME_CUTT_OFF)
            const intScore = Math.round(percentageScore * 100)
            timeScore = intScore
        }
        else {
            timeScore = 0
        }

        score = Math.round((this.TODO_SCORE_WEIGHT * subtasksScore) + (this.TIME_SCORE_WEIGHT * timeScore))
        medal = this.getMedal(score)

        return { score, medal }
    }
    getMedal = (score: number): Medal => {
        if (score >= this.GOLD_CUT_OFF) {
            return "🏅"
        }
        else if (score >= this.SILVER_CUT_OFF) {
            return "🥈"
        }
        else {
            return "🥉"
        }
    }
    getMsgAndImg = (medal: Medal): { message: string, resultImgUrl: string } => {
        if (medal === "🥉") {
            const msgs = sessionCopy.bronzeResultMessages
            const imgs = sessionCopy.bronzeResultImages

            return {
                message: msgs[Math.floor(Math.random() * msgs.length)],
                resultImgUrl: imgs[Math.floor(Math.random() * imgs.length)]
            }
        }
        else { 
            const LAST_SILVER_MSG_IDX = 3
            const LAST_SILVER_IMG_IDX = 3
            const msgs = sessionCopy.goodResultMessages
            const imgs = sessionCopy.goodResultImages

            let lastIdxMsg = medal === "🥈" ? LAST_SILVER_MSG_IDX : msgs.length - 1  // if silver get from first 4 msgs, if gold get from rest
            let lastIdxImg = medal === "🥈" ? LAST_SILVER_IMG_IDX : imgs.length - 1  // if silver get from first 4 imgs, if gold get from rest

            // if any of the last 4 msgs is chosen when gold, must use the very last img
            let randomIdxMsg = Math.floor(Math.random() * lastIdxMsg + 1)
            let resultImgUrl = randomIdxMsg > LAST_SILVER_MSG_IDX ? imgs[imgs.length - 1] : imgs[Math.floor(Math.random() * lastIdxImg + 1)] 

            return {
                message: msgs[randomIdxMsg],
                resultImgUrl
            }
        }
    }

    addTodo = (todoTitle: string) => {
        this.todos.push({ title: todoTitle, isChecked: false })
        this.activeSessionState.update((data: any) => ({ ...data, todos: this.todos }))
    }
    editTodo = (todoIndex: number, newTitle: string) => {
        this.todos[todoIndex].title = newTitle
        this.activeSessionState.update((data: any) => ({ ...data, todos: this.todos }))
    }
    deleteTodo = (todoIndex: number) => {
        this.todosCheckedCount -= this.todos[todoIndex].isChecked ? 1 : 0
        this.todos.splice(todoIndex, 1)
        this.activeSessionState.update((data: any) => ({ ...data, todos: this.todos, todosCheckedCount: this.todosCheckedCount }))
    }
    toggleCheckTodo = (todoIndex: number) => {
        this.todos[todoIndex].isChecked = !this.todos[todoIndex].isChecked
        this.todosCheckedCount += this.todos[todoIndex].isChecked ? 1 : -1
        this.activeSessionState.update((data: any) => ({ ...data, todos: this.todos, todosCheckedCount: this.todosCheckedCount }))
    }

    isDateEarlier = (date1: Date, date2: Date) => {
        return date1.getTime() < date2.getTime()
    }
    getDifferenceInSecs = (date1: Date, date2: Date) =>  {
        const differenceMilliseconds = Math.abs(date1.getTime() - date2.getTime())
        return Math.floor(differenceMilliseconds / 1000)
    }
    static calculateEndTime = (startTime: Date, totalMins: number) => {
        const endTime = new Date(startTime)
        endTime.setMinutes(endTime.getMinutes() + totalMins)

        return endTime
    }
    static getTimePeriodString = (startTime: Date, endTime: Date) => {
        return  `${formatTimeToHHMM(startTime)} - ${formatTimeToHHMM(endTime)}`
    }
}