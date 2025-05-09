import { get } from "svelte/store"
import { globalContext, habitTracker } from "./store"

import { toast } from "./utils-toast"
import { YEAR_HABITS_DATA } from "./mock-data"
import { getHabitBitsSlice, getBitFromDate, } from "./utils-habits-data"
import { countRequired, getHabitData, getWeekDays } from "./utils-habits-data"
import { initMonthHeatMap, getWeekBounds, MAX_WEEKS_BACK_IDX } from "./utils-habits-data"
import { toggleHabitYearBit, countBitsStr, getBoundsIdx, getWeekRequiredDays } from "./utils-habits-data"
import { afterToday, betweenDates, genMonthCalendar, getMonthDays, getWeekPeriod, isSameDay, isSameMonth, sameMonth, uptoToday } from "./utils-date"

let habits: Habit[] = []

const HABITS_PAGE_KEY = "habits-page-options"
const HABITS_TABLE_KEY = "habits-page-table-options"
const HABITS_CARD_KEY = "habits-page-card-options"

export const YEAR_DATA_CACHE: Record<number, {
    yearHeatMap: HabitHeatMapData[]
    yearMetrics: HabitYearMetrics
}> = {}

export const TIMES_OF_DAY_MAP: { [key: string]: number } = {
    "morning": 0,
    "afternoon": 1,
    "evening": 2,
    "all-day": 3
}

export const HABIT_MONTH_STATS_CACHE: Record<string, HabitMonthMetrics> = {}      // y-mo-habit: habit stats
export const HABITS_MONTH_STATS_CACHE: Record<string, HabitMonthMetrics> = {}     // y-mo:      habits stats

export const HABIT_MONTH_DATA_CACHE: Record<string, HabitHeatMapDay[]> = {}       // y-mo-habit: habit data
export const HABITS_MONTH_HEATMAP_CACHE: Record<string, HabitHeatMapData[]> = {}  // y-mo:       habits data

/* inits + caches */

/**
 * Initialize all habit data for the year.
 * Set the given year and month stats for the store.
 * 
 * @param year - The year to initialize data for.
 * @param monthIdx - The month index to initialize data for.
 */
export async function initData(year: number, monthIdx: number) {
    let yearData = YEAR_DATA_CACHE[year]
    habits = get(habitTracker).habits

    if (!yearData) {
        yearData = await initYearData(year)
    }

    habitTracker.update(data => ({
        ...data,
        ...yearData,
        activeStreak: getActiveStreak(),
        monthMetrics: HABITS_MONTH_STATS_CACHE[`${year}-${monthIdx}`]
    }))
}

export async function getHabitsYearData(year: number) {
    const yearData = YEAR_DATA_CACHE[year]
    if (!yearData) {
        await initYearData(year)
    }
    return YEAR_DATA_CACHE[year]
}

/**
 * Process habit data for a given year and cache it.
 */
async function initYearData(year: number) {
    const process = () => {
        return new Promise((resolve) => {
            processYearData(year)
            resolve(null)
        })
    }

    await process()

    YEAR_DATA_CACHE[year] = {
        yearHeatMap: getHabitsYearHeatMap(year),
        yearMetrics: getHabitsYearMetrics(year)
    }

    return YEAR_DATA_CACHE[year]
}

/**
 * Process each habit data for a given year.
 * Increment year heat map data.
 * 
 * 1. Habit's month data & metrics.
 * 2. Habit's year heat map data.
 * 3. Total habits year heat map data.
 * 4. Total habits month metrics.
 */
function processYearData(year: number) {
    const now = new Date() 
    const toMonth = year === now.getFullYear() ? now.getMonth() : 11
    const future = year > now.getFullYear()

    for (let i = 0; i <= toMonth; i++) {
        HABITS_MONTH_STATS_CACHE[`${year}-${i}`] = getHabitsMonthMetrics({ habits, monthIdx: i, year })
        const habitsMap = initHeatMapMonthCache(year, i)

        if (future) {
            const days = getMonthDays(new Date(year, i))
            
            for (const day of days) {
                const idx = day.date.getDate() - 1

                habitsMap[idx].date = day.date
                habitsMap[idx].done = 0
                habitsMap[idx].due = 0
                habitsMap[idx].trueDone = 0
                habitsMap[idx].noData = false
            }
            continue
        }

        for (const habit of habits) {
            const key = `${year}-${i}--${habit.id}`

            const dataCache = HABIT_MONTH_DATA_CACHE
            const statsCache = HABIT_MONTH_STATS_CACHE

            dataCache[key] = getHabitMonthData({ habit, monthIdx: i, year })
            statsCache[key] = getHabitMonthMetrics({ habit, monthIdx: i, year })

            const data = dataCache[key]

            for (const day of data) {
                const { date, done, due, trueDone, noData } = day
                const toToday = uptoToday(date)
            
                if (toToday) {
                    const idx = date.getDate() - 1

                    habitsMap[idx].date = date
                    habitsMap[idx].done += done
                    habitsMap[idx].due += due
                    habitsMap[idx].trueDone += trueDone
                    habitsMap[idx].noData = noData === undefined ? false : noData
                }
            }
        }
    }
}

/* heat maps */

/**
 * Get all habit data for a year.
 */
export function getHabitsYearHeatMap(year: number) {
    const now = new Date()
    const toMonth = year === now.getFullYear() ? now.getMonth() : 11
    const map = []
    let idx = 0


    for (let i = 0; i <= toMonth; i++) {
        const data = HABITS_MONTH_HEATMAP_CACHE[`${year}-${i}`]

        for (let day = 0; day < data.length; day++) {
            map[idx++] = data[day]
        }
    }
    return map
}

/**
 * Get a habit's heat map for a year.
 */
export function getHabitYearHeatMap(year: number, habit: Habit) {
    const now = new Date()
    const toMonth = year === now.getFullYear() ? now.getMonth() : 11
    const map = []
    let idx = 0

    const cache = HABIT_MONTH_DATA_CACHE

    for (let i = 0; i <= toMonth && cache; i++) {
        const key = `${year}-${i}--${habit.id}`
        cache[key] ||= getHabitMonthData({ habit, monthIdx: i, year })

        const data = cache[key]
        const nowMonth = now.getMonth() === i

        for (let day = 0; day < data.length; day++) {
            const { date, done, due, trueDone, noData } = data[day]
            map[idx++] = { date, done, due, trueDone, noData } 
        }
    }
    return map
}

/**
 * Get all habit data for a month.
 */
export async function getMonthOverviewData(year: number, monthIdx: number) {
    const now = new Date()
    const map = []
    const cache = HABITS_MONTH_HEATMAP_CACHE
    const key = `${year}-${monthIdx}`
    const data = cache[key]
    const future = monthIdx > now.getMonth() || year > now.getFullYear()

    let idx = 0

    if (future) {
        return null
    }
    if (!data) {
        await initYearData(year)
    }
    if (!data) {
        return null
    }

    for (let day = 0; day < data.length; day++) {
        map[idx++] = data[day]
    }
    return map
}

function initHeatMapMonthCache(year: number, month: number) {
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const key = `${year}-${month}`
    
    const getArray = () => {
        return Array.from({ length: daysInMonth }, () => ({ 
            date: new Date(), 
            done: 0,
            due: 0,
            trueDone: 0,
            noData: false
        }))
    }
    const data = getArray()
    HABITS_MONTH_HEATMAP_CACHE[key] = data
    
    return data
}

/* year metrics  */

function getHabitsYearMetrics(year: number) {
    const now = new Date()
    const toMonth = year === now.getFullYear() ? now.getMonth() : 11

    return calculateYearMetrics({ type: "all", toMonth, year })
}

export function getHabitYearMetrics({ habit, year }: { habit: Habit, year: number }) {
    const now = new Date()
    const toMonth = year === now.getFullYear() ? now.getMonth() : 11

    return calculateYearMetrics({
        type: "single", toMonth, habit, year
    })
}

/**
 * Calculates the year metrics for either a given habit or the entire habits.
 * Aggregates the metrics for each month and calculates the longest streak.
 * 
 */
function calculateYearMetrics({ type, toMonth, habit, year }: { 
    type: "all" | "single" 
    toMonth: number 
    year: number
    habit?: Habit
}) {
    const metrics = {
        year,
        habitsDone: 0,
        habitsDue: 0,
        perfectDays: 0, 
        missedDays: 0,
        missed: 0
    }
    const statsCache = type === "all" ? HABITS_MONTH_STATS_CACHE : HABIT_MONTH_STATS_CACHE
    const mapCache = type === "all" ? HABITS_MONTH_HEATMAP_CACHE : `HABIT_MONTH_DATA_CACHE`
    const days: HabitHeatMapData[] = []
    
    let longestStreak = { count: 0, start: new Date(), end: new Date() }
    
    const getKey = (i: number) => {
        if (type === "all") {
            return `${year}-${i}`
        }
        else {
            return `${year}-${i}--${habit!.id}`
        }
    }

    const startDate = habit ? getWeekPeriod(habit!.createdAt).start : new Date()
    const startMonth = type === "single" ? startDate.getMonth() : 0
    const startYear = type === "single" ? startDate.getFullYear() : year

    for (let i = 0; i <= toMonth; i++) {
        if (year === startYear && i < startMonth) continue

        const key = getKey(i)

        statsCache[key] 

        const monthData = statsCache[key]
        const mapData = mapCache[key]

        if (!monthData || !mapData) {
            continue
        }
        days.push(...mapData)

        metrics.habitsDone += monthData.habitsDone
        metrics.habitsDue += monthData.habitsDue
        metrics.perfectDays += monthData.perfectDays
        metrics.missedDays += monthData.missedDays
        metrics.missed += monthData.missed
    }

    let currentStreak = 0
    let currentStart = new Date()
    let prevDate = null
    
    for (let i = 0; i < days.length; i++) {
        const { due, trueDone, date, noData } = days[i]
        
        if (date.getFullYear() !== year || !uptoToday(date) || isSameDay(prevDate, date) || noData) {
            continue
        }
        if (trueDone >= due || due === 0) {
            if (currentStreak === 0) {
                currentStart = new Date(date)
            }
            currentStreak++
            
            if (currentStreak > longestStreak.count) {
                longestStreak = {
                    count: currentStreak,
                    start: new Date(currentStart),
                    end: new Date(date)
                }
            }
        } 
        else {
            currentStreak = 0
        }
        prevDate = date
    }

    return { ...metrics, longestStreak }
}

/* month metrics  */

/**
 * Get a single habit's month data (checked, required, etc...)
 */
export function getHabitMonthData({ habit, monthIdx, year }: { habit: Habit, monthIdx: number, year: number }) {
    const { data, firstDate, endDate, length } = initMonthHeatMap({ monthIdx, year })

    getHabitData({ 
        habit, 
        firstDate, 
        endDate, 
        length, 
        data 
    })

    return data.filter(d => d.date.getMonth() === monthIdx)
}

function getMonthMetrics({ days, habits, date }: {
    days: any[],
    habits: Habit[],
    date: Date
}): HabitMonthMetrics {
    const today = new Date()
    const idxStart = 35
    const year = date.getFullYear()
    const monthIdx = date.getMonth()

    const metrics: HabitMonthMetrics = {
        year,
        monthIdx,
        habitsDone: 0, habitsDue: 0,
        perfectDays: 0, missedDays: 0, missed: 0,
        longestStreak: {
            count: 0,
            start: null,
            end: null
        }
    }

    let longestStreak = null
    let currentStreak = null

    for (let idx = idxStart; idx >= 0; idx -= 7) {
        const start = days[idx].date
        const end = days[idx + 6].date
        const weekDays = days.slice(idx, idx + 7)
        const isToday = (i: number) => isSameDay(days[idx + i].date, today)

        let requiredCounts = new Array(7).fill(-1)  // -1 (out of bounds), x (x to be checked)
        let missedTracker = new Array(7).fill(-1)   // 0 (non-missed), 1 (at least one missed)

        if (afterToday(start)) {
            continue
        }

        // track: required days, missed days, done and due counts
        for (const habit of habits) {
            const weekBits = getHabitBitsSlice(habit, start, end)
            const weekData = getBoundWeekReqs({
                habit,
                weekBits,
                weekDays,
                monthDate: date
            })

            if (weekData) {
                const { dueCount, checkedCount, reqArr } = weekData
                const checked = Math.min(checkedCount, dueCount)

                requiredCounts = requiredCounts.map((c, i) => {
                    if (reqArr[i] === 1) {
                        return c === -1 ? 1 : c + 1
                    }
                    else if (reqArr[i] === 0) {
                        return c === -1 ? 0 : c
                    }
                    return c
                })
                missedTracker = missedTracker.map((m, i) => {
                    if (reqArr[i] === 1) {
                        return m === -1 ? 1 : m
                    }
                    else if (reqArr[i] === 0) {
                        return m === -1 ? 0 : m
                    }
                    return m
                })

                metrics.habitsDone += checked
                metrics.habitsDue += dueCount
            }
        }

        // count longest streak
        for (let i = 6; i >= 0; i--) {
            const today = isToday(i)
            const day = days[idx + i]
            const upToToday = uptoToday(day.date)

            if (!sameMonth(day.date, date) || !upToToday) continue

            if (requiredCounts[i] === 0) {
                if (!currentStreak) {
                    currentStreak = {
                        count: 1,
                        start: new Date(day.date),
                        end: new Date(day.date)
                    }
                } 
                else {
                    currentStreak.start = new Date(day.date)
                    currentStreak.count++
                }

                if (!longestStreak || currentStreak.count > longestStreak.count) {
                    longestStreak = structuredClone(currentStreak)
                }
            }
            else if (!today && requiredCounts[i] > 0) {
                currentStreak = null
            }
        }

        for (let i = 0; i <= 6; i++) {
            const day = days[idx + i]
            const required = requiredCounts[i]
            const missed = missedTracker[i] === 1
            const upToToday = uptoToday(day.date)

            if (!sameMonth(day.date, date) || !upToToday) continue

            if (required === 0) {
                metrics.perfectDays++
            }
            if (isToday(i)) {
                continue
            }
            if (required > 0) {
                metrics.missed += required
            }
            if (missed) {
                metrics.missedDays++
            }
        }
    }

    if (longestStreak) {
        metrics.longestStreak = longestStreak!
    }
    if (metrics.habitsDue === 0) {
        metrics.longestStreak!.count = 0
        metrics.longestStreak!.start = new Date()
        metrics.longestStreak!.end = new Date()

        metrics.habitsDone = 0
        metrics.habitsDue = 0
        metrics.perfectDays = 0
        metrics.missedDays = 0
        metrics.missed = 0
    }

    return metrics
}

export function getHabitsMonthMetrics({ habits, monthIdx, year }: {
    habits: Habit[]
    monthIdx: number
    year: number
}) {
    const date = new Date(year, monthIdx)
    const days = genMonthCalendar(date).days
    const metrics = getMonthMetrics({ days, habits, date })

    return metrics
}

export function getHabitMonthMetrics({ habit, monthIdx, year }: {
    habit: Habit
    monthIdx: number
    year: number
}) {
    const date = new Date(year, monthIdx)
    const days = genMonthCalendar(date).days
    const metrics = getMonthMetrics({ days, habits: [habit], date })

    return metrics
}

/* weekly */

/**
 * Get the habit's weekly data for a given week (checked, required, etc...).
 * Using the # of weeks from current week.
 */
export function getHabitWeekDayData({ habit, weeksAgoIdx }: { 
    habit: Habit, weeksAgoIdx: number
}) {
    const { start, end } = getWeekBounds(weeksAgoIdx)

    const s_month = start.getMonth()
    const s_year = start.getFullYear()
    const e_month = end.getMonth()
    const e_year = end.getFullYear()

    let s_data =  HABIT_MONTH_DATA_CACHE[`${s_year}-${s_month}--${habit.id}`]
    let e_data =  HABIT_MONTH_DATA_CACHE[`${e_year}-${e_month}--${habit.id}`]
    const data: HabitHeatMapDay[] = []

    s_data ||= getHabitMonthData({ habit, monthIdx: s_month, year: s_year })
    e_data ||= getHabitMonthData({ habit, monthIdx: e_month, year: e_year })

    for (let i = 0; i < s_data.length; i++) {
        if (betweenDates(s_data[i].date, start, end)) {
            data.push(s_data[i])
        }
    }
    for (let i = 0; i < e_data.length; i++) {
        if (betweenDates(e_data[i].date, start, end)) {
            data.push(e_data[i])
        }
    }

    return data.slice(0, 7)
}

/**
 * Given a week's check bits, get the required array.
 * Only include days of the same month, up to today, and existing data.
 * 
 * Req Arr:
 *  0: not required (cuz checked or not required)
 *  1: required     (must be checked)
 * -1: not in month (excluded days)
 * 
 * @returns The required days that still need to be checked.
 */
function getBoundWeekReqs({ habit, weekBits, monthDate, weekDays }: {
    habit: Habit
    weekBits: string
    monthDate: Date
    weekDays: { date: Date, isInCurrMonth: boolean }[]
}) {
    const { firstIdx, lastIdx } = getBoundsIdx({ habit, days: weekDays, month: monthDate })

    if (firstIdx === -1 || afterToday(weekDays[0].date)) {
        return {
            reqArr: new Array(7).fill(-1),
            checkedCount: 0,
            dueCount: 0
        }
    }

    let checkedCount = 0, dueCount = 0
    
    const dueArray   = getWeekRequiredDays({ habit, weekBits, firstIdx, lastIdx })
    const reqArr     = new Array(7).fill(-1)
    const checkedArr = []

    for (let i = 0; i <= 6; i++) {
        const checked = weekBits[i] === "1"
        checkedArr[i] = checked ? 1 : 0
    }

    dueCount = dueArray.filter(x =>  x === 1).length

    for (let i = firstIdx; i <= lastIdx; i++) {
        const checked = checkedArr[i] === 1
        const required = dueArray[i] === 1

        if (checked && required) {
            checkedCount++
        }
        if (required && !checked) {
            reqArr[i] = 1
        }
        else {
            reqArr[i] = 0
        }
    }


    return {
        reqArr,
        checkedCount,
        dueCount
    }
}

/**
 * Given a week's bits, get the required array that needs to be checked.
 * 
 * Check Arr:
 *  0: not required   (cuz checked or not required)
 *  1: needs checked  (not checked yet and must be checked)
 * -1: not in month   (future day)
 * 
 * @returns The required days that still need to be checked.
 */
function getWeekCheckArr({ habit, weekBits, lastIdx }: {
    habit: Habit
    weekBits: string
    lastIdx: number
}) {
    const dueArray   = getWeekRequiredDays({ habit, weekBits, lastIdx })
    const checkArr     = new Array(7).fill(-1)
    const checkedArr = []

    for (let i = 0; i <= 6; i++) {
        const checked = weekBits[i] === "1"
        checkedArr[i] = checked ? 1 : 0
    }
    for (let i = 0; i <= lastIdx; i++) {
        const checked = checkedArr[i] === 1
        const required = dueArray[i] === 1

        if (required && !checked) {
            checkArr[i] = 1
        }
        else {
            checkArr[i] = 0
        }
    }

    return checkArr
}

/* streaks */

/**
 * Get the active habit streak for a habit.
 * Uses a weekly time frame to determine streak.
 * 
 * @param habit - The habit to get the streak for
 * @returns     - The current streak for the habit
 */
export function getHabitStreak(habit: Habit) {
    const { freqType, streak: activeStreak } = habit
    let streak = 0
    let broken = false
    let weeksAgo = 0
    
    // go week by week, from the current week
    for (let idx = 35; idx >= 0 && !broken; idx -= 7) {
        const currWeek = idx === 35
        const lastIdx = currWeek ? new Date().getDay() : 6
        const { start, end } = getWeekBounds(weeksAgo)
        const weekBits = getHabitBitsSlice(habit, start, end)
        const checkedDays = countBitsStr(weekBits)

        /* daily: ++ streak only if its unbroken from before today */
        if (freqType === "daily") {
            for (let i = lastIdx; i >= 0; i--) {
                const completed = weekBits[i] === '1'
                const today = i === lastIdx && currWeek
                
                // add today's if its complete
                if (completed) {
                    streak++ 
                }
                else if (!completed && !today) {
                    broken = true
                    break
                }
            }
        }
        /* per week & dow: ++ all checks are counted */
        else {
            const required = countRequired(habit)
            const todayChecked = currWeek && weekBits[lastIdx] === '1'
            const daysLeft = currWeek ? 7 - lastIdx - (todayChecked ? 1 : 0) : 0
    
            if (checkedDays + daysLeft >= required) {
                streak += checkedDays
            }
            else {
                broken = true
                break
            }
        }

        weeksAgo++
    }
  
    return broken ? streak : streak + activeStreak
}

export function getActiveStreak() {
    const today = new Date()
    let base = 120
    let count = 0
    let streakStart = new Date()
    let currentStreak = 0
    let streakBroken = false

    const { start } = getWeekBounds()
    
    for (let idx = MAX_WEEKS_BACK_IDX; idx >= 0 && !streakBroken; idx--) {
        const startDate = new Date(start)
        startDate.setDate(startDate.getDate() + idx * 7)

        const weekDays = []
        for (let i = 0; i < 7; i++) {
            const date = new Date(startDate)
            date.setDate(date.getDate() + i)
            weekDays.push({ date, isInCurrMonth: true })
        }

        const endDate = weekDays[6].date
        let requiredCounts = new Array(7).fill(-1)
        
        for (const habit of habits) {
            if (streakBroken) continue
            
            const { firstIdx, lastIdx } = getBoundsIdx({ habit, days: weekDays })
            const weekBits = getHabitBitsSlice(habit, startDate, endDate)
            const checkArr = getWeekCheckArr({ habit, weekBits, lastIdx })

            for (let i = firstIdx; i <= lastIdx && i >= 0; i++) {
                const req = checkArr[i]

                if (requiredCounts[i] === -1) {
                    requiredCounts[i] = 0
                }
                
                requiredCounts[i] += req
            }
        }

        // count active streak from today
        for (let i = 6; i >= 0 && !streakBroken; i--) {
            const day = weekDays[i].date
            const isToday = isSameDay(day, today)
            const upToToday = uptoToday(day)

            if (!upToToday) {
                continue
            }
            if (requiredCounts[i] === 0) {
                currentStreak++
                streakStart = weekDays[i].date
            }
            else if (!isToday) {
                streakBroken = true
            }
        } 
    }

    count = streakBroken ? currentStreak : currentStreak + base

    return { count, start: streakStart, base }
}

/* display clients */

export function getHabitTableData({ habit, timeFrame, weekIdx, currMonth, dayProgress, rowProgress }: {
    habit: Habit
    timeFrame: "weekly" | "monthly"
    weekIdx: number
    currMonth: Date
    dayProgress: number[][]
    rowProgress: Map<string, { complete: number, total: number }>

}): HabitDayData[] {
    const data = []
    const weeksAgoIdx = weekIdx
    const monthIdx = currMonth.getMonth()
    const year = currMonth.getFullYear()
    const id = habit.id

    if (timeFrame === "weekly") {
        const weekData = getHabitWeekDayData({ habit, weeksAgoIdx })
        for (let dayIdx = 0; dayIdx < 7; dayIdx++) {
            const { due, done, ...rest} = weekData[dayIdx]
            const required = due === 1
            const complete = done === 1

            data.push({ ...rest, required, complete })

            tallyHabitProgress({ 
                id, 
                dayIdx, 
                date: new Date(),
                required: required ? 1 : 0, 
                complete: complete ? 1 : 0,
                timeFrame,
                rowProgress,
                dayProgress,
            })
        }
    }
    else {
        const cacheData = HABIT_MONTH_DATA_CACHE[`${year}-${monthIdx}--${habit.id}`]
        const monthData = cacheData || getHabitMonthData({ habit, monthIdx, year })

        for (let i = 0; i < monthData.length; i++) {
            const { date, due } = monthData[i]
            const { done, ...rest } = monthData[i]
            const toToday = date <= new Date()
            const required = due === 1
            const dayIdx = date.getDate() - 1

            if (toToday) {
                const complete = done === 1

                data.push({ ...rest, required, complete })

                tallyHabitProgress({ 
                    id, 
                    date,
                    dayIdx,
                    required: due, 
                    complete: complete ? 1 : 0,
                    timeFrame,
                    rowProgress,
                    dayProgress
                })
            }
            else {
                data.push({ ...rest, required, complete: false })
            } 
        }
    }
    return data
}

export function getDayHabitsData(date: Date) {
    const key = `${date.getFullYear()}-${date.getMonth()}`
    const month = HABITS_MONTH_HEATMAP_CACHE[key]

    return month ? month[date.getDate() - 1] : null
}

export function getDayHabitData(habit: Habit, date = new Date()) {
    const monthIdx = date.getMonth()
    const year = date.getFullYear()

    const data = HABIT_MONTH_DATA_CACHE[`${year}-${monthIdx}--${habit.id}`]

    return data ? data.find(day => day.date.getDate() === date.getDate())! : null
}

export function tallyHabitProgress({ id, dayIdx, date, required, complete, timeFrame, rowProgress, dayProgress }: {
    id: string
    dayIdx: number
    date: Date
    required: number
    complete: number
    timeFrame: "weekly" | "monthly"
    rowProgress: Map<string, { complete: number, total: number }>
    dayProgress: number[][]
}) {
    const due = required === 1

    // day column progress
    if (!dayProgress[dayIdx]) {
        dayProgress[dayIdx] = [0, 0]
    }
    if (timeFrame === "monthly" && due) {
        const satIdx = getSatIdx(dayIdx + 1, date)

        dayProgress[satIdx] = [
            dayProgress[satIdx][0] + required,
            dayProgress[satIdx][1] + complete
        ]
    }
    else if (due) {
        dayProgress[dayIdx] = [
            dayProgress[dayIdx][0] + required,
            dayProgress[dayIdx][1] + complete
        ]
    }

    // habit progress
    if (rowProgress.has(id)) {
        const { complete: c, total } = rowProgress.get(id)!

        rowProgress.set(id, {
            complete: c + complete, total: total + (due ? 1 : 0)
        })
    } 
    else {
        rowProgress.set(id, { complete, total: due ? 1 : 0 })
    }
}

export async function getHabiViewtData(habit: Habit, year: number) {
    if (!YEAR_DATA_CACHE[year]) {
        await initYearData(year)
    }

    const yearHeatMap = getHabitYearHeatMap(year, habit)
    const stats = getHabitYearMetrics({ habit, year })

    return { yearHeatMap, stats }
}

function getSatIdx(day: number, date: Date): number {
    const adjustedDate = new Date(date) 
    adjustedDate.setDate(day) 
    const dayIdx = adjustedDate.getDay() 
    const daysUntilSaturday = (6 - dayIdx + 7) % 7 
    adjustedDate.setDate(adjustedDate.getDate() + daysUntilSaturday) 
    
    return adjustedDate.getDate() - 1
}

/* updates  */

/**
 * Recalculates the data caches that need to be updated after a toggle complete for a day.
 * 
 * @param habit - The habit to reset the data for
 * @param date  - The date to reset the data for
 * @param resetYear - Whether to reset the year data
 * @param days - The days to update the habits monthheat map cache for
 */
async function resetDataOnToggleComplete({ habit, date, resetYear, days }: { habit: Habit, date: Date, resetYear: boolean, days?: Date[] }) {
    const year = date.getFullYear()
    const monthIdx = date.getMonth()
    const mKey = `${year}-${monthIdx}`
    const hKey = `${mKey}--${habit.id}`
    const yKey = `${year}-${monthIdx}`

    HABIT_MONTH_STATS_CACHE[hKey] = getHabitMonthMetrics({ habit, monthIdx, year })
    HABITS_MONTH_STATS_CACHE[yKey] = getHabitsMonthMetrics({ habits, monthIdx, year })

    HABIT_MONTH_DATA_CACHE[hKey] = getHabitMonthData({ habit, monthIdx, year })

    // update HABITS_MONTH_HEATMAP_CACHE
    if (days) {
        updateHeatMapCache({ date, days })
    }

    if (resetYear) {
        YEAR_DATA_CACHE[year] = {
            yearHeatMap: getHabitsYearHeatMap(year),
            yearMetrics: getHabitsYearMetrics(year)
        }
    }
}

export function toggleCompleteHabit({ habit, date, currMonth }: { 
    habit: Habit, date: Date, currMonth: Date 
}) {
    const year = currMonth.getFullYear()
    const monthIdx = currMonth.getMonth()

    const sameMonth = isSameMonth(date, currMonth)
    const sameYear = year === date.getFullYear()
    toggleHabitYearBit({ habit, date })

    if (!sameMonth) {
        resetDataOnToggleComplete({ habit, date, resetYear: !sameYear })
    }

    habitTracker.update((state) => {
        const { habits } = state
        const idx = habits.findIndex((_habit: any) => habit.id === _habit.id)!
        const days = getWeekDays(date)
        
        const targetHabit = habits[idx]
        habits[idx] = targetHabit

        state.habits = habits
        state.activeStreak = getActiveStreak()

        resetDataOnToggleComplete({ habit, date: currMonth, resetYear: true, days })
        
        state.monthMetrics = HABITS_MONTH_STATS_CACHE[`${year}-${monthIdx}`]
        state.yearHeatMap = YEAR_DATA_CACHE[year].yearHeatMap
        state.yearMetrics = YEAR_DATA_CACHE[year].yearMetrics

        return state
    })
}


export async function addHabit(habit: Habit) {
    const newDefaultOrder = Math.max(...habits.map(habit => habit.order.default)) + 1
    const newTodOrder = Math.max(...habits.map(habit => habit.order.tod)) + 1

    habit.order.default = newDefaultOrder
    habit.timeOfDay = habit.timeOfDay || "default" 
    habit.order.tod = newTodOrder

    habits.push(habit)

    createChunksOnAdd(habit)
    await recalculateHabits(habits)

    toast("info", {
        message: `"${habit.name}" added to your habits.`,
    })
}

/**
 * Creates a chunk for the current and previous month for a newly add habbit.
 * @param habit 
 */
export function createChunksOnAdd(habit: Habit) {
    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth()
    
    const currKey = `${year}-${month}`
    
    const prevMonth = month === 0 ? 11 : month - 1
    const prevYear = month === 0 ? year - 1 : year
    const prevKey = `${prevYear}-${prevMonth}`

    let data = 0

    YEAR_HABITS_DATA.push({
        name: habit.name,
        data: {
            [currKey]: data,
            [prevKey]: data
        }
    })
}

export async function deleteHabit(habit: Habit) {
    const store = get(habitTracker)
    const defaultIdx = habit.order.default
    const todIdx = habit.order.tod
    let habits = store.habits
    
    shiftHabits({
        habits,
        type: "default",
        fromIdx: defaultIdx + 1,
        toIdx: habits.length,
        shift: -1
    })
    shiftHabits({
        habits: habits.filter(h => h.timeOfDay === habit.timeOfDay),
        type: "tod",
        fromIdx: todIdx + 1,
        toIdx: habits.length,
        shift: -1
    })

    habits = habits.filter(h => h.id !== habit.id)
    await recalculateHabits(habits)

    toast("info", {
        message: `"${habit.name}" deleted from your habits.`,
    })
}

export async function onUpdateHabit(updatedHabit: Habit) {
    const { freqType, frequency, timeOfDay } = updatedHabit
    const store = get(habitTracker)
    let habits = store.habits
    const idx = habits.findIndex((habit: Habit) => habit.id === updatedHabit.id)!
    const habit = habits[idx]

    const newFreqType = habit.freqType != freqType
    const newFreq = habit.frequency != frequency
    const newTod = habit.timeOfDay != timeOfDay
    
    if (newTod) {
        reorderInTimeOfDayView({
            srcHabit: habit,
            targetHabit: updatedHabit.timeOfDay,
            habits
        })
    }

    const newHabit = { ...habit, ...updatedHabit }
    habits[idx] = newHabit

    if (newFreqType || newFreq) {
        await recalculateHabits(habits)
    }
    else {
        habitTracker.update((state) => {
            state.habits = habits
            return state
        })
    }
}

export async function recalculateHabits(_habits: Habit[]) {
    const store = get(habitTracker)
    const currYear = store.yearMetrics!.year
    const monthIdx = store.monthMetrics!.monthIdx

    habits = _habits

    for (const year in YEAR_DATA_CACHE) {
        delete YEAR_DATA_CACHE[year]
    }
    for (const key in HABIT_MONTH_STATS_CACHE) {
        delete HABIT_MONTH_STATS_CACHE[key]
    }
    for (const key in HABITS_MONTH_STATS_CACHE) {
        delete HABITS_MONTH_STATS_CACHE[key]
    }
    for (const key in HABIT_MONTH_DATA_CACHE) {
        delete HABIT_MONTH_DATA_CACHE[key]
    }
    for (const key in HABITS_MONTH_HEATMAP_CACHE) {
        delete HABITS_MONTH_HEATMAP_CACHE[key]
    }
    
    const yearData = await initYearData(currYear)

    habitTracker.update(data => ({ 
        ...data,
        habits,
        ...yearData,
        monthMetrics: HABITS_MONTH_STATS_CACHE[`${currYear}-${monthIdx}`]
    }))
}

/**
 * Updates the heat map cache after a toggle complete.
 * Updates it on a weekly basis. 
 * Requirements for a week changes upon a day toggle (for per-week).
 * 
 * @param date - The date of the toggle complete
 * @param days - The days of the week of toggle
 */
export function updateHeatMapCache({ date, days }: { date: Date, days: Date[] }) {
    const year = date.getFullYear()
    const monthIdx = date.getMonth()
    const keys: string[] = []

    for (let i = 0; i < days.length; i++) {
        const key = `${year}-${monthIdx}`

        if (keys.includes(key)) continue
        keys.push(key)

        delete HABITS_MONTH_HEATMAP_CACHE[key]
        const habitsMap = initHeatMapMonthCache(year, monthIdx)

        for (const habit of habits) {
            const key = `${year}-${monthIdx}--${habit.id}`
            const data = HABIT_MONTH_DATA_CACHE[key]

            for (const day of data) {
                const { date, done, due, trueDone, noData } = day
                const sameYear = date.getFullYear() === year
                const sameMonth = date.getMonth() === monthIdx
                const toToday = uptoToday(date)
            
                if (sameYear && sameMonth && toToday) {
                    const idx = date.getDate() - 1

                    habitsMap[idx].date = date
                    habitsMap[idx].done += done
                    habitsMap[idx].due += due
                    habitsMap[idx].trueDone += trueDone
                    habitsMap[idx].noData = noData === undefined ? false : noData
                }
            }
        }
    }
}

/* ui utils */

export function isDayRequired({ habit, dayIdx }: { habit: Habit, dayIdx: number }) {
    const { freqType, frequency } = habit

    if (freqType === "day-of-week") {
        return Boolean((frequency >> (6 - dayIdx)) & 1)
    }
    else {
        return true
    }
}

export function isDayComplete({ habit, date }: { habit: Habit, date: Date }) {
    const yearData = YEAR_HABITS_DATA.find((_habit) => _habit.name === habit.name)!
    const bit = getBitFromDate(yearData.data, date)
    return bit === '1'
}

export function getFreqDaysStr(habit: Habit, literal = false) {
    const { freqType, frequency } = habit
    const days = "SMTWTFS"

    if (freqType === "daily") {
        return "1111111"
    }
    else if (freqType === "day-of-week") {
        return days.split("").map((_, i) => ((frequency >> (6 - i)) & 1).toString()).join("")
    }
    else {
        return "0".repeat(7-frequency) + "1".repeat(frequency)
    }
}

export function viewHabit(habit: Habit) {
    habitTracker.update((state) => ({ ...state, viewHabit: habit }))
}

export function loadViewOptions() {
    const page = localStorage.getItem(HABITS_PAGE_KEY)
    const table = localStorage.getItem(HABITS_TABLE_KEY)
    const card = localStorage.getItem(HABITS_CARD_KEY)

    return {
        page: page ? JSON.parse(page) : null,
        table: table ? JSON.parse(table) : null,
        card: card ? JSON.parse(card) : null
    }
}

export function saveViewOptions({ pageView, tableView, cardView }: {
    pageView: HabitPageOptions
    tableView: HabitTableOptions
    cardView: HabitCardOptions
}) {
    localStorage.setItem(HABITS_PAGE_KEY, JSON.stringify(pageView))
    localStorage.setItem(HABITS_TABLE_KEY, JSON.stringify(tableView))
    localStorage.setItem(HABITS_CARD_KEY, JSON.stringify(cardView))
}

export function getMinYear() {
    const user = get(globalContext).user
    const createdYear = new Date(user.created).getFullYear()
    return createdYear - 1
}

/* reorder */

export function reorderInDefaultView({
    srcHabit, targetHabit, habits
}: {
    srcHabit: any
    targetHabit: any
    habits: any[]
}) {
    const srcOrder = srcHabit.order.default
    const lastOrder = Math.max(...habits.map((habit: any) => habit.order.default)) + 1
    const toIdx = targetHabit === "all-day" ? lastOrder : targetHabit.order.default
    const direction = srcOrder < toIdx ? "up" : "down"
    const targetOrder = toIdx + (direction === "up" ? -1 : 0)

    if (direction === "up") {
        shiftHabits({
            habits,
            type: "default",
            fromIdx: srcOrder + 1,
            toIdx: targetOrder + 1,
            shift: -1
        })
    } 
    else {
        shiftHabits({
            habits,
            type: "default",
            fromIdx: targetOrder,
            toIdx: srcOrder,
            shift: 1
        })
    }

    srcHabit.order.default = targetOrder
}

export function reorderInTimeOfDayView({ srcHabit, targetHabit, habits }: {
    srcHabit: any
    targetHabit: any
    habits: Habit[]
}) {
    const toLast = typeof targetHabit === "string"
    const src = {
        order: srcHabit.order.tod,
        timeOfDay: srcHabit.timeOfDay,
        sectionIdx: TIMES_OF_DAY_MAP[srcHabit.timeOfDay]
    }
    const tgt = {
        order: toLast ? -1 : targetHabit.order.tod,
        timeOfDay: toLast ? targetHabit : targetHabit.timeOfDay,
        sectionIdx: TIMES_OF_DAY_MAP[toLast ? targetHabit : targetHabit.timeOfDay]
    }

    const sameSec = src.timeOfDay === tgt.timeOfDay
    const srcSection = habits.filter(habit => habit.timeOfDay === src.timeOfDay)
    const tgtSection = habits.filter(habit => habit.timeOfDay === tgt.timeOfDay)
    const fromIdx = src.order

    tgt.order = toLast ? tgtSection.length : tgt.order

    let toIdx = 0
    let direction: "up" | "down" = "up"

    if (sameSec) {
        direction = src.order > tgt.order ? "up" : "down"
        toIdx = direction === "up" ? tgt.order : tgt.order - 1

        shiftHabits({
            habits: srcSection,
            type: "tod",
            fromIdx: direction === "up" ? toIdx : fromIdx + 1,
            toIdx: direction === "up" ? fromIdx : toIdx + 1,
            shift: direction === "up" ? 1 : -1
        })
    } 
    else {
        direction = src.sectionIdx > tgt.sectionIdx ? "up" : "down"
        toIdx = tgt.order

        shiftHabits({
            habits: srcSection,
            type: "tod",
            fromIdx,
            toIdx: srcSection.length,
            shift: -1
        })

        shiftHabits({
            habits: tgtSection,
            type: "tod",
            fromIdx: toIdx,
            toIdx: tgtSection.length,
            shift: 1
        })
    }

    srcHabit.order.tod = toIdx
    srcHabit.timeOfDay = tgt.timeOfDay

    return srcHabit
}

export function shiftHabits({ habits, fromIdx, toIdx, shift, type }: {
    habits: Habit[],
    type: "default" | "tod"
    fromIdx: number
    toIdx: number
    shift: 1 | -1
}) {
    habits.forEach(habit => {
        const order = habit.order[type]
        if (order >= fromIdx && order < toIdx) {
            habit.order[type] += shift
        }
    })
    
    return habits
}