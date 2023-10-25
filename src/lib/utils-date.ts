import { HrsMinsFormatOption } from "./enums"
import { getBrowserLanguagePreference } from "./utils-general"

export const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]
  
export const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

export const getDayOfWeek = () => {
    const today = new Date()
    return `${daysOfWeek[today.getDay()]}`
}

export const getDate = () => {
    const today = new Date()
    return `${months[today.getMonth()].substring(0, 3)} ${today.getDate()} ${today.getFullYear()}`
}

export const minsSecondsToSecs = (mins: number, secs: number): number => (mins * 60) + secs

export const getUserHourCycle = (): "h11" | "h12" | "h23" | "h24" => {
    const lang = getBrowserLanguagePreference()
    const localObj = new Intl.Locale(lang)

    // @ts-ignore
    return localObj.hourCycle ?? localObj.hourCycles[0]
}

/**
 * @param date1 
 * @param date2 
 * @returns       If date1 is earlier than date2.
 */
export const isDateEarlier = (date1: Date, date2: Date): boolean => {
    return date1.getTime() < date2.getTime()
}

/**
 * @param date1 
 * @param date2 
 * @returns       Difference beyween two dayes in seconds.
 */
export const getDifferenceInSecs = (date1: Date, date2: Date): number => {
    const differenceMilliseconds = Math.abs(date1.getTime() - date2.getTime())
    return Math.ceil(differenceMilliseconds / 1000)
}

/**
 * 
 * @param startTime 
 * @param totalMins  Time to be added to start time.
 * @returns          Startime + total Minutes
 */
export const calculateEndTime = (startTime: Date, totalMins: number): Date => {
    const endTime = new Date(startTime)
    endTime.setMinutes(endTime.getMinutes() + totalMins)

    return endTime
}

/**
 * 
 * @param startTime 
 * @param endTime 
 * @returns          Start time to end time. i.e. 12: 00PM - 3:00 AM
 */
export const getTimePeriodString = (startTime: Date, endTime: Date): string => {
    return `${formatTimeToHHMM(startTime)} - ${formatTimeToHHMM(endTime)}`
}

/**
 * @param doUserHour12 
 * @returns Current time as a string in the desired format (i.e. 1:22 PM / 13:22)
 */
export function getCurrentTime(doUserHour12: boolean = true): string {
    const now = new Date()
    let res = now.toLocaleTimeString(undefined, { hour12: doUserHour12, hour: 'numeric', minute: 'numeric' })
    if (res.startsWith('0')) return res.slice(1)
  
    return res
}

/**
 * @returns Current date in the format "Ddd, Mmm, D" (i.e. Thu, Sep 14) 
 */
export function getCurrentDate(): string {
    const now = new Date()

    return now.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })
}

/**
 * See if 2 dates are the same day
 * @param d1 
 * @param d2 
 * @returns 
 */
export function isSameDay(d1: Date, d2: Date) {
    return d1.getDate() === d2.getDate() && d1.getMonth() === d2.getMonth() && d1.getFullYear() && d2.getFullYear()
}

/**
 * See if currently evening 6PM - 5AM (Evening)
 * @returns 
 */
export function isNightTime() {
    const now = new Date();
    const currentHour = now.getHours()

    return currentHour <= 5 || currentHour >= 18
}

/**
 * Formats date to Mmm DD, YYYY
 * @param dateString 
 * @returns Formatted Time (i.e. Apr 14, 2020)
 */
export function formatDateToMDY(dateString: string): string {
    const date = new Date(dateString)
    const options: any = { year: 'numeric', month: 'short', day: 'numeric' }
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date)

    return formattedDate
}

/**
 * Formats date to MM DD
 * @param date 
 * @returns  Formatted Time (i.e. 9/6)
 */
export function formatDateToMMDD(date: Date): string {
    return date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' });
}

/**
 * Formats time HH:MM AM/PM
 * @param date 
 * @returns Fromatted Time (i.e. 1:15 PM)
 */
export function formatTimeToHHMM(date: Date, hour12 = true): string {
    const options = { hour: 'numeric', minute: 'numeric', hour12 }    

    // @ts-ignore
    return date.toLocaleTimeString(undefined, options)
}

/**
 * Get the elapsed time for the finish pom period in HH:MM format.
 * The start / end times in HH:MM format will determine difference in minutes.
 * So 12:34:49 PM and 12:34:00 PM will be 1 min.
 * 
 * @param start   Session start.
 * @param end     Session end.
 */
export const getPomPeriodElapsedTime = (start: Date, end: Date) => {
    const timePeriodString = getTimePeriodString(start, end)
    const diffSecs = getDifferenceInSecs(start, end)
    const diffStr = secsToHHMM(diffSecs, HrsMinsFormatOption.MIN_LETTERS)

    if (!diffStr.includes("m")) return diffStr

    // do no include h portion if less than 1h
    const hrStr = diffStr.includes("h") ? diffStr.split(" ")[0] + " " : ""
    const strArr = timePeriodString.split(" - ")

    const startMins = Number(strArr[0].split(":")[1].slice(0, 2))
    const endMins = Number(strArr[1].split(":")[1].slice(0, 2))

    let diffMins = 0

    if (startMins <= endMins) {
        diffMins = endMins - startMins
    }
    else {
        diffMins = 60 - startMins + endMins
    }

    if (hrStr === "" && diffMins === 0) {
        return "<1m"
    }
    else {
        return `${hrStr}${diffMins}m`
    }
}

/**
 * Formats whole number hour (in 24-hour format) to HH AM/PM
 * @param time   hrs (i.e. 18)
 * @returns      Formatted Time (i.e. 6 PM)
 */
export function twentyFourToTwelveHrFormat(time: number): string {
    if (time < 0 || time > 24) throw new Error("Invalid time, out of range.")

    if (time >= 12 && time < 24) {
    return (time % 12 || 12) + " PM"
    }

    return (time === 0 || time == 24) ? "12 AM" : time + " AM"
}

/**
 * Formats secs to HH:MM
 * @param secs 
 * @param formatOption  Different formatting options: X hrs, X mins || Xh Xm || HH:MM 
 * @returns             Formatted # of secs to HH MM (i.e. 2 hrs 34 mins)
 */
export function secsToHHMM(secs: number, formatOption: HrsMinsFormatOption = HrsMinsFormatOption.LETTERS): string {
    return minsToHHMM(Math.floor(secs / 60), formatOption)
}

/**
 * Formats mins to HH:MM
 * @param mins 
 * @param formatOption  Different formatting options: Xhrs, Xmins || Xh Xm || HH:MM 
 * @returns Formatted # of minutes to HH MM (i.e. 2 hrs 34 mins)
 */
export function minsToHHMM(inputMins: number, formatOption: HrsMinsFormatOption = HrsMinsFormatOption.LETTERS): string {
    const mins = Math.ceil(inputMins)

    if (mins < 60 && formatOption === HrsMinsFormatOption.LETTERS) {
        return `${mins} mins`
    }
    else if (mins < 60 && formatOption === HrsMinsFormatOption.MIN_LETTERS) {
        return `${mins}m`
    }
    else if (mins < 60 && formatOption === HrsMinsFormatOption.NO_LETTERS) {
        return `00:${String(mins).padStart(2, '0')}`
    }

    const hours = Math.floor(mins / 60)
    const minutes = mins % 60

    let hrsStr, minsStr

    if (formatOption === HrsMinsFormatOption.LETTERS) {
        hrsStr = `${hours} ${hours > 1 ? "hrs" : "hr" }`
        minsStr = minutes === 0 ? "" : ` ${String(minutes).padStart(2, '0')} mins`

        return `${hrsStr}${minsStr}`
    }
    else if (formatOption === HrsMinsFormatOption.MIN_LETTERS) {
        hrsStr = `${hours}h`
        minsStr = minutes === 0 ? "" : ` ${String(minutes).padStart(2, '0')}m`

        return `${hrsStr}${minsStr}`
    }
    else {
        hrsStr = `${String(hours).padStart(2, '0')}`
        minsStr = `${String(minutes).padStart(2, '0')}`

        return `${hrsStr}"${minsStr}`
    }
}
  
/**
 * Formats deicmal hours to HH:MM
 * @param mins 
 * @returns Formatted # of minutes to HH MM (i.e. 2 hrs 34 mins)
 */
export function hoursToHhMm(decimalHours: number): string {
    const hours = Math.floor(decimalHours);
    const minutes = Math.ceil((decimalHours - hours) * 60);

    const formattedMinutes = String(minutes).padStart(2, '0');

    if (hours === 0) {
        return `${formattedMinutes}m`
    }
    else if (minutes == 0) {
        return `${hours}h`
    }
    else if (hours === 0 && minutes === 0) {
        return "0h 0m"
    } else {
        return `${hours}h ${formattedMinutes}m`;
    }
}

/**
 * @param mins 
 * @returns Formatted # of ms to HH MM (i.e. 2 hrs 34 mins)
 */
export const formatTime = (milliseconds: number) => {
    let seconds = Math.floor(milliseconds / 1000)
    let hours = Math.floor(seconds / 3600)
    seconds = seconds % 3600
    let minutes = Math.floor(seconds / 60)
    seconds = seconds % 60
  
    let result = ""
    if (hours > 0) {
      result += hours + "h "
    }
    if (minutes > 0 || hours > 0) {
      result += minutes + "m "
    }
    return result.trim()
  }

/**
 * 
 * @param currentDate 
 * @returns Get current week number (i.e. 52 for last week)
 */
const getWeekNumber = (currentDate: Date) => {
    const startDate = new Date(currentDate.getFullYear(), 0, 1) // starting point of counting weeks
    const days = Math.floor(((currentDate as any) - (startDate as any)) / (24 * 60 * 60 * 1000)) // count difference in days (ms to days)
    
    const weekNumber = Math.ceil(days / 7) // days / 7
    return weekNumber
}

/**
 * 
 * @returns String and ending dates of current week (Apr 1 - Apr 7)
 */
const getCurrentWeek = () => {
    const currentDate = new Date();
    const firstDayOfWeek = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 1));
    const lastDayOfWeek = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 7));
  
    return `${firstDayOfWeek.getMonth() + 1}/${firstDayOfWeek.getDate()} - ${lastDayOfWeek.getMonth() + 1}/${lastDayOfWeek.getDate()}`;
}