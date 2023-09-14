export const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]
  
  export const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]


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
 * See if currently evening 6PM - 5AM (Evening)
 * @returns 
 */
export  function isNightTime() {
    const now = new Date();
    const currentHour = now.getHours();

    return currentHour >= 18 && currentHour <= 5;
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
export function formatTimeToHHMM(date: Date): string {
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const ampm = hours >= 12 ? 'PM' : 'AM'
    const formattedHours = hours % 12 || 12
    const formattedMinutes = String(minutes).padStart(2, '0')
    return `${formattedHours}:${formattedMinutes} ${ampm}`
}

/**
 * Formats time HH AM/PM
 * @param time hrs (i.e. 18)
 * @returns Formatted Time (i.e. 6 PM)
 */
export function twentyFourToTwelveHrFormat(time: number): string {
    if (time < 0 || time > 24) throw new Error("Invliad time, out of range.")

    if (time >= 12 && time < 24) {
    return (time % 12 || 12) + " PM"
    }

    return (time === 0 || time == 24) ? "12 AM" : time + " AM"
}

/**
 * Formats mins to HH:MM
 * @param mins 
 * @returns Formatted # of minutes to HH MM (i.e. 2 hrs 34 mins)
 */
export function minsToHHMM(mins: number): string {
    if (mins < 60) return `${mins} mins`

    const hours = Math.floor(mins / 60);
    const minutes = mins % 60;

    return `${hours} ${hours > 1 ? "hrs" : "hr" } ${String(minutes).padStart(2, '0')} mins`;
}
  
/**
 * Formats deicmal hours to HH:MM
 * @param mins 
 * @returns Formatted # of minutes to HH MM (i.e. 2 hrs 34 mins)
 */
export function hoursToHhMm(decimalHours: number): string {
    const hours = Math.floor(decimalHours);
    const minutes = Math.round((decimalHours - hours) * 60);

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