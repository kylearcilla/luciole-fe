import type { Writable } from "svelte/store"
import { DateBoundState } from "./enums"
import { formatDateLong, getNextMonth, getPrevMonth, isDateEarlier, isSameMonth, isYrValid } from "./utils-date"

/**
 * Abstract class for all calendars.
 * The object structure for each day depends on the client.
 * MonthData is the general type.
 */
export abstract class Calendar<T extends MonthData = MonthData> {
    pickedDate: Date | null = null
    pickedDateStr: string = ""

    currMonth: MonthData
    isPrevMonthAvailable: boolean
    isNextMonthAvailable: boolean
    isForwards: boolean | null = null

    minDate: Date | null 
    maxDate: Date | null 

    constructor(options: CalendarOptions | null = null) {
        this.minDate = options?.minDate ?? null
        this.maxDate = options?.maxDate ?? null
        this.isForwards = options?.forwards ?? null

        this.currMonth = this.genMonthCalendar(new Date())

        this.isPrevMonthAvailable = !this.isForwards
        this.isNextMonthAvailable = this.isForwards ?? true
    }

    /**
     * Set new selected date for the calendar.
     * @param newDate  New date that was picked by the user.
     */
    setNewPickedDate(newDate: Date | null) {
        this.pickedDate = newDate
        this.pickedDateStr = newDate != null ? formatDateLong(newDate) : ""
        
        if (!isSameMonth(newDate!, this.currMonth.firstDay)) {
            this.currMonth = this.genMonthCalendar(structuredClone(newDate!))
        }
        return this.pickedDate
    }

    /**
     * Get next month after current
     */
    getNextMonthCalendar() { 
        this.currMonth = this.genMonthCalendar(getNextMonth(this.currMonth.firstDay))

        if (!this.isForwards) {
            this.isNextMonthAvailable = true
        }
        else if (this.isForwards) {
            this.isPrevMonthAvailable = !isSameMonth(this.currMonth.firstDay, new Date())
        }

        return this.currMonth
    }

    /**
     * Get prev month after current
     */
    getPrevMonthCalendar() {
        this.currMonth = this.genMonthCalendar(getPrevMonth(this.currMonth.firstDay))

        if (this.isForwards) {
            this.isPrevMonthAvailable = true
        }
        else if (!this.isForwards) {
            this.isNextMonthAvailable = !isSameMonth(this.currMonth.firstDay, new Date())
        }

        return this.currMonth
    }

    /**
     * Get this month
     */
    getThisMonth() {
        this.currMonth = this.genMonthCalendar(new Date())
        this.isPrevMonthAvailable = !this.isForwards
        this.isNextMonthAvailable = this.isForwards ?? true
        this.pickedDate = new Date()

        return this.currMonth
    }

    /**
     * Check the bound state of the user date input according to the set max / min dates.
     * Checks the validity of the user input based on bounds.
     * 
     * @param date  Date picked by user.
     * @returns     Returns the bound state of user input.
     */
    getDateBoundState(date: Date): DateBoundState {
        if (!isYrValid(date.getFullYear())) {
            return DateBoundState.InvalidYr
        }
        else if (this.maxDate && isDateEarlier(this.maxDate, date)) {
            return DateBoundState.BeyondMax
        }
        else if (this.minDate && isDateEarlier(date, this.minDate)) {
            return DateBoundState.BeyondMin
        }
        return DateBoundState.InBounds
    }

    genMonthCalendar(inputDate: Date): MonthData {
        const firstDayOfMonth = new Date(inputDate.setDate(1))
        const monthFirstDayOfWeek = firstDayOfMonth.getDay()
        const currMonth: MonthData = { 
            monthIdx: inputDate.getMonth(), days: [],
            year: inputDate.getFullYear(), firstDay: firstDayOfMonth
        }

        // go to the first date in grid using negative offset from first day
        let day = (monthFirstDayOfWeek - 1) * -1  

        for (let w = 0; w < 6; w++) {
            for (let d = 0; d < 7; d++) {
                const currDate = new Date(new Date(inputDate).setDate(day++))
                const isInCurrMonth = isSameMonth(currDate, firstDayOfMonth)
                currMonth.days.push({ date: currDate, isInCurrMonth })
            }
        }
        return currMonth
    }
}