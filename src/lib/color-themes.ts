const colorThemes: ColorTheme[] = [
    {
        isDark: true,
        primaryBgColor: "#101012",
        secondaryBgColor: "#FFFFFE",
        fgColor1: "#141418",
        fgColor2: "#141418",
        fgColor3: "#CCD5AD",
        fgColor4: "#E7C8AB",
        textColor1: "#444557",
        textColor2: "#9596A5",
        textColor3: "#FFFFFF",
        textColor4: "#FFFFFF",
        hoverColor: "#FFFDF7",
        pomBgColor: "C0BEA6",
        pomProgressBarFgColor: "linear-gradient(270.59deg, #FF8B9C -10.17%, #E39ECE 12.41%, #A3B6FF 71.86%)",
        pomProgressBgColor: "#42444F",
        muiscPlayerBgColor: "rgba(41, 41, 41, 0.6)",
        navIconColors: "white",
        borderVal: "none",
        shadowVal: "none"
    },
    {
        isDark: false,
        primaryBgColor: "#FEFAF2",
        secondaryBgColor: "#FFFDF7",
        fgColor1: "192, 190, 166",
        fgColor2: "207, 171, 150",
        fgColor3: "191, 204, 181",
        fgColor4: "208, 204, 194",
        textColor1: "72, 68, 63",
        textColor2: "138, 137, 136",
        textColor3: "157, 148, 148",
        textColor4: "255, 255, 255",
        hoverColor: "#FBF8F2",
        pomBgColor: "#C0BEA6",
        pomProgressBarFgColor: "linear-gradient(90deg, #D8D6BD 0%, #EAEBDB 100.92%), linear-gradient(270.59deg, #EBE7BF -10.17%, #E5E5E5 99.44%)",
        pomProgressBgColor: "#4B4A37",
        muiscPlayerBgColor: "#CFAB96",
        navIconColors: "FFFFFF",
        borderVal: "0.8px solid rgba(203, 203, 203, 0.36)",
        shadowVal: "0px 4px 16px 5px rgba(123, 123, 123, 0.04)"
    },
    {
        isDark: false,
        primaryBgColor: "#FCFCFE",
        secondaryBgColor: "#FFFFFF",
        fgColor1: "#CACED9",
        fgColor2: "#CACED9",
        fgColor3: "204, 213, 173",
        fgColor4: "#E7C8AB",
        textColor1: "#31323B",
        textColor2: "#9596A5",
        textColor3: "#FFFFFF",
        textColor4: "255, 255, 255",
        hoverColor: "#FFFDF7",
        pomBgColor: "C0BEA6",
        pomProgressBarFgColor: "linear-gradient(90deg, #FFFFFF 0%, #FFE6D9 97.71%), linear-gradient(270.59deg, #FAECCD -10.17%, #EFBB88 66.27%, #E4A96E 99.44%)",
        pomProgressBgColor: "#4E5167",
        muiscPlayerBgColor: "#CCD5AD",
        navIconColors: "FFFFFF",
        borderVal: "0.8px solid rgba(203, 203, 203, 0.26)",
        shadowVal: "0px 4px 16px 5px rgba(123, 123, 123, 0.04)"
    }
]

/**
 * Sets selected theme colors to the root element of the document
 * Allows for global access of colors throughout the app
 * 
 * @param theme theme object to be currently used
 */
export const setRootColors = (theme: ColorTheme) => {
    for (let [prop, color] of Object.entries(theme)) {
        if (typeof color === "boolean") continue
        document.documentElement.style.setProperty(`--${prop}`, color);
    }
};

export default colorThemes