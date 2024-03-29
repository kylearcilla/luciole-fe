import { LogoIcon } from "./enums"

/**
 * Custom click outside use directive.
 * 
 * @param node    Node that the deritive has been binded / attached to.
 * @returns       Object that contains a function that removes click outside event listener when attachee node is unmounted from DOM.
 */
export const clickOutside = (node: any) => {
  const handleClick = (event: any) => {
    const target = event.target as HTMLElement
    const nodeId = node.id as string
    const hasClickedInsideNode = node?.contains(target)

    const dropdownBtnClicked = findAncestor({
      child: target, queryStr: "dropdown-btn", queryBy: "id",
      max: 5, strict: false
    })
    const isSrcDropdownMenu = nodeId.includes("dropdown-menu")

    let isOwnDropdownBtn = false

    // if dropdown-menu and clicked on a dropdown btn, let the dropdown-btn close, instead of this event
    if (isSrcDropdownMenu && dropdownBtnClicked) {
        const srcOrigin   = nodeId.split("--")[0]
        const targetOrigin = dropdownBtnClicked.id.split("--")[0]

        isOwnDropdownBtn = srcOrigin === targetOrigin
    }

    const hasClickedOutside = !isOwnDropdownBtn && !hasClickedInsideNode && !event.defaultPrevented

    // has clicked outside
    if (hasClickedOutside) {
        node.dispatchEvent(new CustomEvent('click_outside', node))
    }
  }
  document.addEventListener('click', handleClick, true)

  return {
    destroy() {
      document.removeEventListener('click', handleClick, true)
    }
  }
}

/**
 * Find an element's ancestor by name
 * @param child 
 * @param queryStr 
 * @returns  Ancestor
 */
export const findAncestor = (options: AncestoryQueryOptions): HTMLElement | null => {
  let currentElement: HTMLElement | null = options.child
  let i = 0

  const max = options.max ?? 15
  const strict = options.strict ?? false
  const queryStr = options.queryStr
  const byId = options.queryBy === "id"

  while (currentElement && i++ < max) {
    if (strict && byId && currentElement!.id === queryStr) {
      return currentElement
    }
    else if (!strict && byId && currentElement!.id.includes(queryStr)) {
      return currentElement
    }
    else if (strict && currentElement!.classList.contains(queryStr)) {
      return currentElement
    }
    else if (!strict && currentElement!.classList.value.includes(queryStr)) {
      return currentElement
    }

    currentElement = currentElement.parentElement
  }
  return null
}

/**
 * Move an element given an idex to a new index within the same array.
 * @param array       
 * @param fromIndex   Original location of element to be moved.
 * @param toIndex     New location where element should be moved to.
 * @returns           Updated array.
 */
export const moveElementInArr = (array: any[], fromIndex: number, toIndex: number) => {
  const elementToMove = array.splice(fromIndex, 1)[0]
  array.splice(toIndex, 0, elementToMove)
  return array
}

/**
 * Remove an item from 1st array and move it to the 2nd array. 
 * Arrays must be different.
 * 
 * @param array1   Array where item should be removed from
 * @param oldIdx   Location of to-be-removed item
 * @param array2   Array whre item should be moved to
 * @param newIdx   Location where the item should be placed in
 * 
 * @returns        Updated two arrays.
 */
export function moveItemBetweenArrays<T>(array1: T[], oldIdx: number, array2: T[], newIdx: number): { newArray1: T[], newArray2: T[] } {
  const newArray1 = [...array1]
  const newArray2 = [...array2]

  const [removedItem] = newArray1.splice(oldIdx, 1)
  newArray2.splice(newIdx, 0, removedItem)

  return { newArray1, newArray2 }
}

/**
 * @returns  User's preferred language code. i.e. US is "en-US"
 */
export const getBrowserLanguagePreference = () => {
  return navigator.language
}

/**
 * Update the document title.
 * @param newTitle   New document title
 */
export const setDocumentTitle = (newTitle: string) => {
  document.title = newTitle
}

/**
 * Get HTML element by its id.
 * @param id  Id to identify elem
 */
export const getElemById = (id: string): HTMLElement | null => {
    return document.getElementById(id)
}

/**
 * Get HTML elements that share the same className
 * @param className  Elements' class name
 */
export const getElemsByClass = (className: string): Element[] | null => {
    return [...document.getElementsByClassName(className)]
}

/**
 * Get an elem css style that is a number value
 * @returns 
 */
export const getElemNumStyle = (elem: HTMLElement, style: string): number => {
  return parseFloat(getElemStyle(elem, style))
}

export function getElemStyle(elem: HTMLElement, style: string) {
  return getComputedStyle(elem).getPropertyValue(style)
}

/**
 * Checks if any strings in passed in array exists in string.
 * @param str   String in question.
 * @param arr   Contains substrings to be checked in stringg
 * @returns     If a substring in array exists in str.
 */
export const containsSubstring = (str: string, arr: string[]) => {
  return arr.some(s => str.includes(s))
}

/**
 * @param n   Decimal number
 * @returns   Rounded up number
 */
export const roundToNearestFive = (n: number) => Math.ceil(n / 5) * 5

/**
 * Add decimal numbers.
 * @param x   Decimal number to be added.
 * @param y   Decimal number to be added.
 * @returns   Result, will always be in 2 decimal places.
 */
export const decimalAdd = (x: number, y: number): number => {
  return parseFloat((x + y).toFixed(2))
}

/**
 *  Adds commas to numbers
 *  @return Fromatted number w/ commas
 */
export const addCommasToNum = (num: string): string => {
  const formattedNumber = Number(num).toLocaleString()
  return formattedNumber
}

/**
 *  Converts a number into a shortened representation with magnitude suffixes.
 *  @param num The number to be converted, provided as a string.
 *  @return string representing the shortened number with magnitude suffix.
 */
export const shorterNum = (num: string): string => {
  const val = Number(num)
  if (val < 1000) {
    return val.toString()
  } else if (val < 1000000) {
    return parseFloat((val / 1000).toFixed(2)).toString() + "K"
  } else if (val < 1000000000) {
    return parseFloat((val / 1000000).toFixed(2)).toString() + "M"
  } else {
    return parseFloat((val / 1000000000).toFixed(2)).toString() + "B"
  }
}

/**
 * Gets the first highlighter btn Element in a highlighter btn component
 * @param containerId   String id for the Highlighter Btn Component
 * @returns             First highlighter btn.
 */
export const getFirstHighlighterBtn = (containerId: string) => {
  return getElemById(containerId)!.firstChild as HTMLButtonElement
}

/**
 * Get the matching LogoIcon enum that is contained in another enum.
 * 
 * i.e. Spotify exists in LogoIcon and MusicPlatform enums, get the LogoIcon enum value (LogoIcon.Spotify) instead.
 * 
 * @param enumVal    Enum val querying for that exists in fromEnum and LogoIcon.
 * @param fromEnum   Enum where the value exists.
 * @returns          The matching enum value from LopoIcon
 */
export function getLogoIconFromEnum(enumVal: any, fromEnum: any): LogoIcon {
  return findEnumIdxFromDiffEnum(enumVal, fromEnum, LogoIcon) ?? LogoIcon.Luciole
}

/**
 * Given an enum value that exists both in enumA and enumB, find the index value in enumB using the enum from enum A.
 * 
 * @param enumMember   The desired enum in query enum whose index value is desired.
 * @param originEnum   Enum where enumMember is from.
 * @param queryEnum    Enum that contains the same enum member value. 
 * @returns            The idx in query enum where the same enum member name exists. Return enumMember does not exist in both enums.
 */
export function findEnumIdxFromDiffEnum(enumMember: any, enumA: any, enumB: any) {
  for (const value in enumB) {
      if (isNaN(Number(value))) continue

      const val = enumB[value]
      const idx = value

      if (enumA[enumMember] === val) return Number(idx)
  }

  return null
}

/**
 * Add spaces to camel case string.
 * AppleMusic -> Apple Music
 * 
 * @param camelCaseStr   Camel case string
 * @returns              Stringn with spaces
 */
export const addSpacesToCamelCaseStr = (camelCaseStr: string) => {
  const words = camelCaseStr.replace(/([a-z])([A-Z])/g, '$1 $2');
  return words.charAt(0).toUpperCase() + words.slice(1);
}


/**
 *  According to the PKCE standard, a code verifier is a high-entropy cryptographic random string with a length between 43 and 128 characters (the longer the better). 
 *  It can contain letters, digits, underscores, periods, hyphens, or tildes.
 * 
 *  @param length 
 *  @returns 
 */
export function generateCodeVerifier(length: number): string {
  if (length < 43 || length > 128) { 
    throw new Error("Must be between 43 and 128 inclusive.")
  }

  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const values = crypto.getRandomValues(new Uint8Array(length))

  return values.reduce((acc, x) => acc + possible[x % possible.length], "")
}

/**
 * Hashes a string using that SHA 256 Algorithm
 * @param plain  String to be hashed 
 * @returns      SHA 256-Hashed String
 */
export function hashSHA256(plain: string): Promise<ArrayBuffer> {
  const encoder = new TextEncoder()
  const data = encoder.encode(plain)
  return window.crypto.subtle.digest('SHA-256', data)
}

/**
 * Returns the base64 representation of a string
 * @param input   
 * @returns 
 */
export function base64encode(input: any): string {
  return window.btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

export function getAdditionTopPadding(element: HTMLElement) {
  const styles = getComputedStyle(element)

  // Extract margin, padding, and border widths
  const marginTop = parseInt(styles.marginTop)
  const paddingTop = parseInt(styles.paddingTop)
  const borderTopWidth = parseInt(styles.borderTopWidth)

  return marginTop + paddingTop + borderTopWidth
}

export function getAdditionBottomPadding(element: HTMLElement) {
  const styles = getComputedStyle(element)

  const marginBottom = parseInt(styles.marginBottom)
  const paddingBottom = parseInt(styles.paddingBottom)
  const borderBottomWidth = parseInt(styles.borderBottomWidth)

  return marginBottom + paddingBottom + borderBottomWidth
}

/**
 * Calculates the additional heights of an element, including margin, padding, and border widths.
 * 
 * @param element - The HTMLElement to calculate additional heights for.
 * @returns The sum of margin, padding, and border widths of the element.
 */
export function getAdditionalHeights(element: HTMLElement): number {
  return getAdditionTopPadding(element) + getAdditionBottomPadding(element)
}

/**
 * Calculates the total height of an element, including its client height and additional heights (margin, padding, border).
 * 
 * @param element - The HTMLElement to calculate the total height for.
 * @returns The total height of the element, including client height and additional heights.
 */
export function getElemTrueHeight(element: HTMLElement): number {
  const additionalHeights = getAdditionalHeights(element)
  return element.clientHeight + additionalHeights
}

/**
 * Calculates the additional widths of an element, including margin, padding, and border widths.
 * 
 * @param element - The HTMLElement to calculate additional widths for.
 * @returns The sum of margin, padding, and border widths of the element.
 */
export function getAdditionalWidths(element: HTMLElement): number {
  const styles = getComputedStyle(element)

  // Extract margin, padding, and border widths
  const marginLeft = parseInt(styles.marginLeft)
  const marginRight = parseInt(styles.marginRight)
  const paddingLeft = parseInt(styles.paddingLeft)
  const paddingRight = parseInt(styles.paddingRight)
  const borderLeftWidth = parseInt(styles.borderLeftWidth)
  const borderRightWidth = parseInt(styles.borderRightWidth)

  // Calculate the sum of additional widths
  return marginLeft + marginRight + paddingLeft + paddingRight + borderLeftWidth + borderRightWidth
}

/**
 * Calculates the total height of an element, including its client height and additional widths (margin, padding, border).
 * 
 * @param element - The HTMLElement to calculate the total height for.
 * @returns The total height of the element, including client height and additional widths.
 */
export function getElemTrueWidth(element: HTMLElement): number {
  const additionalWidths = getAdditionalWidths(element)
  return element.clientWidth + additionalWidths
}


type GradientStyleOptions = {
  isVertical: boolean
  head?: {
    start?: string
    end?: string
  }
  tail?: {
    start?: string
    end?: string
  }
}

/**
 * Helper for seeing if there's space to scroll up or down.
 * @param target    Scroll Element
 * @param options   Options for how early client wants to hit the top / bottom
 * @returns         Scroll status as array
 */
export function getVertScrollStatus(target: HTMLElement, options?: { topOffSet?: number, bottomOffSet?: number }): VertScrollStatus {
  const scrollTop = target.scrollTop
  const windowHeight = target.clientHeight
  const scrollHeight = target.scrollHeight

  const hasReachedBottom = scrollTop + (options?.bottomOffSet ?? 1) >= scrollHeight - windowHeight
  const hasReachedTop = scrollTop <= (options?.topOffSet ?? 0) 

  return { hasReachedBottom, hasReachedTop, details: { scrollTop, scrollHeight, windowHeight } }
}

/**
 * Helper for seeing if there's space to scroll left or right
 * @param target    Scroll Element
 * @param options   Options for how early client wants to hit the top / bottom
 * @returns         Scroll status as array
 */
export function getHozScrollStatus(target: HTMLElement, options?: { leftOffSet?: number, rightOffSet?: number }): HozScrollStatus {
  const scrollLeft = target.scrollLeft
  const windowWidth = target.clientWidth
  const scrollWidth = target.scrollWidth

  const hasReachedEnd = scrollLeft + (options?.rightOffSet ?? 1) >= scrollWidth - windowWidth
  const hasReachedStart = scrollLeft <= (options?.leftOffSet ?? 0) 

  return { hasReachedEnd, hasReachedStart, details: { scrollLeft, scrollWidth, windowWidth } }
}

/**
 * Generates a masked gradient style on a scrollable element based on scroll status and options.
 * Return scroll state details and styling.
 * 
 * @param  elementn The HTML element to apply the style to.
 * @param  options  gradient style options.
 * @returns         Object containing the styling and horizontal scroll status.
 */
export function getMaskedGradientStyle(element: HTMLElement, options?: GradientStyleOptions): HozScrollMaskedGradient | VertScrollMaskedGradient {
  const isVertical = options?.isVertical ?? true
  const scrollStatus = isVertical ? getVertScrollStatus(element) : getHozScrollStatus(element)
        
  const angle = isVertical ? "180deg" : "90deg"
  const head = {
      start: options?.head?.start ?? "0%",
      end: options?.head?.end ?? "10%"
  }
  const tail = {
      start: options?.tail?.start ?? "85%",
      end: options?.tail?.end ?? "100%"
  }

  const hasReachedEnd = 
      (scrollStatus as VertScrollStatus).hasReachedBottom ?? 
      (scrollStatus as HozScrollStatus).hasReachedEnd;

  const hasReachedStart = 
      (scrollStatus as VertScrollStatus).hasReachedTop ?? 
      (scrollStatus as HozScrollStatus).hasReachedStart

  let gradient = ""

  if (!hasReachedEnd && !hasReachedStart) {
      gradient = `linear-gradient(${angle}, transparent ${head.start}, #000 ${head.end}, #000 ${tail.start}, transparent ${tail.end})`
  } 
  else if (!hasReachedStart) {
      gradient = `linear-gradient(${angle}, transparent ${head.start}, #000 ${head.end})`
  } 
  else {
      gradient = `linear-gradient(${angle}, #000 ${tail.start}, transparent ${tail.end})`
  }

  const styling = `mask-image: ${gradient}; -webkit-mask-image: ${gradient}`


    return options?.isVertical ? { styling, scrollStatus } as VertScrollMaskedGradient : { styling, scrollStatus } as HozScrollMaskedGradient
}

/* Colors */
export const COLOR_SWATCHES = {
  d: [
    /* First Row */
    {
      id: "d0-0",
      primary: "255, 163, 174",
      light1: "108, 59, 65",
      light2: "247, 167, 181",
      light3: "149, 102, 108",
      dark1:  "252, 178, 190",
      dark2:  "25, 19, 21",
      dark3:  "146, 96, 102",
      isLight: false,
      isDark: false,
    },
    {
      id: "d1-0",
      primary: "254, 213, 191",
      light1: "123, 90, 71",
      light2: "250, 207, 183",
      light3: "191, 145, 121",
      dark1:  "254, 213, 191",
      dark2:  "20, 17, 15",
      dark3:  "138, 117, 105",
      isLight: false,
      isDark: false,
    },
    {
      id: "d2-0",
      primary: "254, 244, 191",
      light1: "132, 110, 65",
      light2: "254, 244, 191",
      light3: "191, 167, 121",
      dark1:  "254, 244, 191",
      dark2:  "32, 30, 26",
      dark3:  "125, 119, 95",
      isLight: true,
      isDark: false
    },
    {
      id: "d3-0",
      primary: "238, 254, 191",
      light1: "58, 100, 55",
      light2: "238, 254, 191",
      light3: "137, 180, 134",
      dark1:  "220, 251, 195",
      dark2:  "21, 23, 18",
      dark3:  "96, 115, 94",
      isLight: true,
      isDark: true,
    },
    {
      id: "d4-0",
      primary: "211, 233, 232",
      light1: "72, 101, 95",
      light2: "211, 233, 232",
      light3: "129, 169, 160",
      dark1:  "211, 233, 232",
      dark2:  "20, 24, 22",
      dark3:  "90, 108, 103",
      isLight: true,
      isDark: false,
    },
    {
      id: "d5-0",
      primary: "95, 99, 125",
      light1: "95, 99, 125",
      light2: "211, 214, 233",
      light3: "147, 152, 183",
      dark1:  "195, 215, 255",
      dark2:  "26, 28, 32",
      dark3:  "87, 95, 113",
      isLight: true,
      isDark: false,
    },
    {
      id: "d6-0",
      primary: "226, 211, 233",
      light1: "115, 95, 125",
      light2: "226, 211, 233",
      light3: "156, 140, 165",
      dark1:  "234, 213, 255",
      dark2:  "29, 26, 32",
      dark3:  "100, 87, 116",
      isLight: true,
      isDark: false,
    },
    /* Second Row */
    {
      id: "d1-0",
      primary: "255, 166, 84",
      light1: "111, 76, 44",
      light2: "255, 190, 131",
      light3: "161, 121, 84",
      dark1:  "255, 149, 149",
      dark2:  "38, 22, 21",
      dark3:  "146, 78, 78",
      isLight: false,
      isDark: true,
    },
    {
      id: "d1-1",
      primary: "255, 190, 130",
      light1: "161, 109, 61",
      light2: "255, 206, 160",
      light3: "175, 142, 111",
      dark1:  "255, 215, 167",
      dark2:  "25, 19, 14",
      dark3:  "155, 135, 111",
      isLight: false,
      isDark: false,
    },
    {
      id: "d1-2",
      primary: "255, 232, 113",
      light1: "139, 106, 41",
      light2: "255, 229, 137",
      light3: "156, 145, 87",
      dark1:  "251, 235, 154",
      dark2:  "26, 24, 18",
      dark3:  "129, 117, 74",
      isLight: true,
      isDark: true,
    },
    {
      id: "d1-3",
      primary: "192, 247, 101",
      light1: "79, 91, 58",
      light2: "208, 249, 139",
      light3: "129, 153, 87",
      dark1:  "222, 248, 149",
      dark2:  "26, 29, 21",
      dark3:  "129, 141, 94",
      isLight: false,
      isDark: false,
    },
    {
      id: "d1-4",
      primary: "189, 231, 255",
      light1: "74, 88, 97",
      light2: "189, 231, 255",
      light3: "120, 153, 175",
      dark1:  "189, 231, 255",
      dark2:  "24, 29, 32",
      dark3:  "82, 111, 113",
      isLight: false,
      isDark: false,
    },
    {
      id: "d1-5",
      primary: "164, 178, 222",
      light1: "94, 105, 144",
      light2: "185, 199, 249",
      light3: "137, 149, 189",
      dark1:  "163, 177, 221",
      dark2:  "24, 26, 32",
      dark3:  "100, 107, 129",
      isLight: false,
      isDark: false,
    },
    {
      id: "d1-6",
      primary: "157, 138, 211",
      light1: "93, 85, 147",
      light2: "206, 198, 255",
      light3: "139, 132, 182",
      dark1:  "190, 173, 237",
      dark2:  "30, 26, 33",
      dark3:  "102, 96, 120",
      isLight: false,
      isDark: false,
    },
    /* Third Row */
    {
      id: "d2-0",
      primary: "236, 100, 81",
      light1: "137, 80, 68",
      light2: "254, 162, 139",
      light3: "182, 110, 94",
      dark1:  "255, 146, 122",
      dark2:  "32, 22, 20",
      dark3:  "138, 93, 83",
      isLight: false,
      isDark: true,
    },
    {
      id: "d2-1",
      primary: "255, 166, 84",
      light1: "111, 76, 44",
      light2: "255, 190, 131",
      light3: "161, 121, 84",
      dark1:  "251, 195, 110",
      dark2:  "30, 20, 12",
      dark3:  "137, 116, 85",
      isLight: false,
      isDark: true,
    },
    {
      id: "d2-2",
      primary: "252, 255, 98",
      light1: "103, 105, 45",
      light2: "238, 255, 134",
      light3: "155, 158, 86",
      dark1:  "243, 248, 89",
      dark2:  "26, 32, 20",
      dark3:  "95, 100, 60",
      isLight: false,
      isDark: false,
    },
    {
      id: "d2-3",
      primary: "179, 253, 144",
      light1: "59, 94, 57",
      light2: "212, 251, 187",
      light3: "116, 171, 112",
      dark1:  "193, 240, 182",
      dark2:  "23, 28, 22",
      dark3:  "96, 115, 94",
      isLight: false,
      isDark: false,
    },
    {
      id: "d2-4",
      primary: "171, 206, 195",
      light1: "63, 81, 80",
      light2: "184, 225, 222",
      light3: "109, 137, 129",
      dark1:  "171, 206, 195",
      dark2:  "26, 34, 34",
      dark3:  "81, 99, 93",
      isLight: true,
      isDark: false,
    },
    {
      id: "d2-5",
      primary: "108, 158, 255",
      light1: "76, 98, 141",
      light2: "174, 202, 255",
      light3: "111, 134, 178",
      dark1:  "153, 167, 247",
      dark2:  "22, 27, 41",
      dark3:  "110, 120, 145",
      isLight: false,
      isDark: false,
    },
    {
      id: "d2-6",
      primary: "244, 192, 253",
      light1: "115, 72, 123",
      light2: "240, 199, 247",
      light3: "175, 125, 184",
      dark1:  "216, 163, 221",
      dark2:  "36, 29, 37",
      dark3:  "151, 125, 153",
      isLight: false,
      isDark: false,
    },
    /* Fourth Row */
    {
      id: "d3-0",
      primary: "178, 111, 111",
      light1: "83, 58, 58",
      light2: "191, 145, 145",
      light3: "133, 97, 97",
      dark1:  "183, 143, 143",
      dark2:  "24, 20, 20",
      dark3:  "113, 96, 96",
      isLight: false,
      isDark: false,
    },
    {
      id: "d3-1",
      primary: "255, 138, 73",
      light1: "111, 76, 44",
      light2: "255, 168, 119",
      light3: "160, 116, 75",
      dark1:  "243, 150, 99",
      dark2:  "26, 18, 14",
      dark3:  "113, 78, 59",
      isLight: false,
      isDark: false,
    },
    {
      id: "d3-2",
      primary: "217, 191, 100",
      light1: "113, 105, 66",
      light2: "239, 220, 155",
      light3: "164, 152, 88",
      dark1:  "245, 225, 121",
      dark2:  "38, 37, 26",
      dark3:  "98, 93, 64",
      isLight: false,
      isDark: false,
    },
    {
      id: "d3-3",
      primary: "127, 243, 152",
      light1: "61, 94, 61",
      light2: "186, 234, 191",
      light3: "119, 149, 119",
      dark1:  "193, 220, 166",
      dark2:  "19, 32, 19",
      dark3:  "92, 113, 85",
      isLight: false,
      isDark: false,
    },
    {
      id: "d3-4",
      primary: "156, 255, 225",
      light1: "63, 102, 90",
      light2: "198, 255, 238",
      light3: "112, 163, 147",
      dark1:  "182, 244, 226",
      dark2:  "21, 29, 25",
      dark3:  "125, 160, 150",
      isLight: false,
      isDark: false,
    },
    {
      id: "d3-5",
      primary: "93, 108, 254",
      light1: "65, 68, 126",
      light2: "154, 175, 251",
      light3: "112, 114, 180",
      dark1:  "158, 170, 214",
      dark2:  "23, 24, 31",
      dark3:  "98, 101, 131",
      isLight: false,
      isDark: false,
    },
    {
      id: "d3-6",
      primary: "240, 152, 236",
      light1: "109, 69, 107",
      light2: "232, 163, 229",
      light3:  "150, 102, 147",
      dark1:  "240, 152, 236",
      dark2:  "41, 25, 39",
      dark3:  "154, 112, 152",
      isLight: false,
      isDark: false,
    }
  ],
  p: [

  ]
}

/* Tags */
export const TEST_TAGS: Tag[] = [
  {
    id: "",
    orderIdx: 0,
    name: "Body",
    symbol: {
      color: COLOR_SWATCHES.d[0],
      emoji: "💪"
    }
  },
  {
    id: "",
    orderIdx: 1,
    name: "SWE",
    symbol: {
      color: COLOR_SWATCHES.d[1],
      emoji: "👨‍💻"
    }
  },
  {
    id: "",
    orderIdx: 2,
    name: "French",
    symbol: {
      color: COLOR_SWATCHES.d[4],
      emoji: "🇫🇷"
    }
  },
  {
    id: "",
    orderIdx: 3,
    name: "Cooking",
    symbol: {
      color: COLOR_SWATCHES.d[2],
      emoji: "🍖"
    }
  },
  {
    id: "",
    orderIdx: 4,
    name: "SWE",
    symbol: {
      color: COLOR_SWATCHES.d[4],
      emoji: "👨‍💻"
    }
  },
  {
    id: "",
    orderIdx: 5,
    name: "BBall",
    symbol: {
      color: COLOR_SWATCHES.d[2],
      emoji: "🏀"
    }
  },
  {
    id: "",
    orderIdx: 6,
    name: "Running",
    symbol: {
      color: COLOR_SWATCHES.d[2],
      emoji: "🏃‍♂️"
    }
  },
  {
    id: "",
    orderIdx: 7,
    name: "Meditation",
    symbol: {
      color: COLOR_SWATCHES.d[3],
      emoji: "🌿"
    }
  },
  {
    id: "",
    orderIdx: 8,
    name: "Art",
    symbol: {
      color: COLOR_SWATCHES.d[0],
      emoji: "🌁"
    }
  },
]

export function roundUpToNearestTen(num: number) {
  return Math.ceil(num / 10) * 10;
}
export function roundUpToNearestFive(num: number) {
  return Math.ceil(num / 5) * 5;
}

export function isBetween(number: number, min: number, max: number) {
  return number >= min && number <= max
}

export function randomArrayElem(arr: any[]) {
  if (arr.length === 0) return null
  return arr[Math.floor(Math.random() * arr.length)]
}

export function addItemToArray(idx: number, array: any[], item: any) {
  array.splice(idx, 0, item)

  return array
}

export function removeItemFromArray(idx: number, array: any[]) {
  array.splice(idx, 1)
  
  return array
}

export function capitalizeString(str: string) {
  return str.split('').map((ch) => ch.toUpperCase()).join('')
}

/**
 * Get the pair of color properties based on the theme.
 * @param    color - The color object containing light and dark properties.
 * @param    doGetLight - Boolean value indicating whether the theme is light or dark.
 * @returns  An tuple containing a color's light or dark color trio.
 */
export function getColorTrio(color: Color, doGetLight: boolean): [string, string, string] {
  const colorTrio = doGetLight ? [color.light1, color.light2, color.light3] : [color.dark1, color.dark2, color.dark3]
  return colorTrio as [string, string, string]
}

export function extractNum(str: string) {
  // Use a regular expression to find all numbers in the string
  const numbers = str.match(/\d+(\.\d+)?/g);
  
  // If numbers are found, convert them to numbers and return
  if (numbers) {
      return numbers.map(Number);
  } else {
      return []
  }
}

export function isCharNumber(ch: string) {
  return ch >= '0' && ch <= '9';
}

export function extractNumStr(str: string) {
  const nums: string[] = []
  for (let ch of str) {
    if (isCharNumber(ch)) {
      nums.push(ch)
    }
  }
  return nums
}

/**
 * @param    camelCaseString 
 * @returns   Kebab cases version of camelcase
 */
export function camelToKebab(camelCaseString: string) {
  return camelCaseString.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

export function inlineStyling(styling?: StylingOptions) {
    if (!styling) return ""
    let cssString = ''

    for (let [prop, value] of Object.entries(styling)) {
      if (!value) return
      prop = camelToKebab(prop)
      cssString += `${prop}: ${value}; `
    
    }
    return cssString.trim()
}

export function showElement(element: HTMLElement) {
    element.style.opacity = "1"
    element.style.visibility = "visible"
}


export function getDistanceBetweenTwoPoints(pointA: OffsetPoint, pointB: OffsetPoint) {
  const deltaX = pointB.left - pointA.left
  const deltaY = pointB.top - pointA.top
  
  return Math.sqrt(deltaX * deltaX + deltaY * deltaY)
}

export function isKeyAlphaNumeric(event: KeyboardEvent) {
  return isAlphaNumeric(event.key) && !event.ctrlKey && !event.metaKey
}

export function isAlphaNumeric(char: string) {
    const alphaNumericRegex = /^[0-9a-zA-Z]$/
    
    return alphaNumericRegex.test(char)
}

export function isEditTextElem(elem: HTMLElement) {
  return elem.tagName === "INPUT" || elem.tagName === "TEXTAREA" || elem.contentEditable === "true"
}

export function getContentEditableSelectionRange(element: HTMLElement) {
  const selection = window.getSelection()
  if (!selection || !selection.rangeCount) return { start: 0, end: 0 }

  const range = selection.getRangeAt(0)
  const preCaretRange = range.cloneRange()
  preCaretRange.selectNodeContents(element)
  preCaretRange.setEnd(range.startContainer, range.startOffset);

  const start = preCaretRange.toString().length
  const end = start + range.toString().length

  return { start, end }
}

export function isInRange(min: number, num: number, max: number) {
  return min <= num && num <= max
}

export function setCursorPos(element: HTMLElement, pos: number) {
  const selection = window.getSelection()
  const range = document.createRange()

  if (!selection || !element.firstChild) return

  if (pos > element.textContent!.length) {
      pos = element.textContent!.length
  }

  range.setStart(element.firstChild, pos)
  range.collapse(true)
  selection.removeAllRanges()
  selection.addRange(range)
}

export function clamp(min: number, value: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

export function getVertDistanceBetweenTwoElems(a: HTMLElement, b: HTMLElement) {
  const aRect = a.getBoundingClientRect()
  const bRect = b.getBoundingClientRect()
  
  return bRect.top - aRect.bottom
}

export function getHozDistanceBetweenTwoElems(a: HTMLElement, b: HTMLElement) {
  const aRect = a.getBoundingClientRect()
  const bRect = b.getBoundingClientRect()
  
  return bRect.left - aRect.right
}