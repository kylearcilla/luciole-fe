import { defaultThemes } from "./data-themes"
import { colorThemeState } from "./store"

export const roundToNearestFive = (n: number) => Math.ceil(n / 5) * 5

export function clickOutside(node: any) {
    // if user clicks on any element that has has 'dropdown', do not dispatch event to close it, let the local btn close
    // if dispatched, local bool will be toggled to true from dispatch, after toggled to false from btn
    const handleClick = (event: any)  => {
        // check for black-list elements, assumes they are placed first in the class list
        const srcElement = event.srcElement
        const flag = srcElement.classList.value.includes("dropdown")|| srcElement.parentElement.classList.value.includes("dropdown")

        if (!flag && node && !node.contains(event.target) && !event.defaultPrevented) {
            node.dispatchEvent(
                new CustomEvent('click_outside', node)
            )
        }
    }
    document.addEventListener('click', handleClick, true)

    return {
      destroy() {
        document.removeEventListener('click', handleClick, true)
      }
    }
}

export const loadTheme = () => {
  let storedThemeData = localStorage.getItem("theme")
  
  if (!storedThemeData) {
    localStorage.setItem("theme", JSON.stringify(defaultThemes[0]))
    storedThemeData = localStorage.getItem("theme")
  } 

  const themeItem = JSON.parse(storedThemeData!)
  colorThemeState.set({
    title: themeItem!.title,
    isDarkTheme: themeItem!.properties.isDark,
    themeToggleBtnIconColor: themeItem!.properties.iconToggleBtnBgColor,
    sectionTitle: themeItem!.sectionDetails.title,
    twinTheme: themeItem!.twinTheme,
    headerTimeColor: themeItem!.headerTimeColor
  })
  setRootColors(themeItem!.properties)
}

/**
 * Sets selected theme colors to the root element of the document
 * Allows for global access of colors throughout the app
 * 
 * @param theme theme object to be currently used
 */
export const setRootColors = (theme: ThemeData) => {
  const headTag = document.getElementsByTagName('head')[0];
  const styleTag = document.createElement("style");

  styleTag.innerHTML = `
    :root {
        --primaryBgColor: ${theme.primaryBgColor};
        --secondaryBgColor: ${theme.secondaryBgColor};
        --tertiaryBgColor: ${theme.tertiaryBgColor};
        --fgColor1: ${theme.fgColor1};
        --fgColor2: ${theme.fgColor2};
        --sessionBgColor: ${theme.sessionBgColor};
        --sessionBorderVal: ${theme.sessionBorderVal};
        --sessionShadowVal: ${theme.sessionShadowVal};
        --textColor1: ${theme.textColor1};
        --textColor2: ${theme.textColor2};
        --hoverColor: ${theme.hoverColor};
        --hoverColor2: ${theme.hoverColor2};
        --hoverColor3: ${theme.hoverColor3};
        --tabColor: ${theme.tabColor};
        --tabHighlightColor: ${theme.tabHighlightColor};
        --tabHighlightBoxShadow: ${theme.tabHighlightBoxShadow};
        --headerElementBgColor: ${theme.headerElementBgColor};
        --headerElementBorderVal: ${theme.headerElementBorderVal};
        --headerElementTextColor: ${theme.headerElementTextColor};
        --headerElementShadow: ${theme.headerElementShadow};
        --headerTimeColor: ${theme.headerTimeColor};
        --modalBgColor: ${theme.modalBgColor};
        --modalBgAccentColor: ${theme.modalBgAccentColor};
        --bentoBoxBgColor: ${theme.bentoBoxBgColor};
        --bentoBoxBorder: ${theme.bentoBoxBorder};
        --bentoBoxShadow: ${theme.bentoBoxShadow};
        --muiscPlayerBgColor: ${theme.muiscPlayerBgColor};
        --musicProgressFgColor: ${theme.musicProgressFgColor};
        --navMenuBgColor: ${theme.navMenuBgColor};
        --navIconColor: ${theme.navIconColor};
        --navIconBgColor: ${theme.navIconBgColor};
        --themeToggleBtnBgColor: ${theme.themeToggleBtnBgColor};
        --iconToggleBtnBgColor: ${theme.iconToggleBtnBgColor};
        --highlighterToggleBtnBgColor: ${theme.highlighterToggleBtnBgColor};
        --midPanelBorder: ${theme.midPanelBorder};
        --midPanelShadow: ${theme.midPanelShadow};
        --midPanelBaseColor: ${theme.midPanelBaseColor};
        --midPanelAccentColor: ${theme.midPanelAccentColor};
        --midPanelAccentAltColor: ${theme.midPanelAccentAltColor};
        --midPanelAccentTextColor: ${theme.midPanelAccentTextColor};
        --sidePanelBorder: ${theme.sidePanelBorder};
        --sidePanelShadow: ${theme.sidePanelShadow};
        --dropdownMenuBgColor: ${theme.dropdownMenuBgColor};
        --prodMenuViewShadow: ${theme.prodMenuViewShadow};
    }
  `

  headTag.appendChild(styleTag)
  // for (let [prop, color] of Object.entries(theme)) {
  //     if (typeof color === "boolean") continue

  //     // @ts-ignore
  //     const root = document.querySelector(': ${theme.primaryBgColor};
  //     // @ts-ignore
  //     root.style.setProperty(`--${prop}`, color);
  // }
};

export function decimalAdd(x: number, y: number): number {
  return parseFloat((x + y).toFixed(2))
}

/**
 *  Adds commas to numbers
 *  
 *  @return Fromatted number w/ commas
 * 
 */
export function addCommasToNum(num: string): string {
  const formattedNumber = Number(num).toLocaleString()
  return formattedNumber
}
/**
 *  Converts a number into a shortened representation with magnitude suffixes.
 *  
 *  @param num The number to be converted, provided as a string.
 *  @return string representing the shortened number with magnitude suffix.
 * 
 */
export function shorterNum(num: string): string {
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