export const COLOR_SWATCHES = [
  {
    primary: "#F09999",
    light1: "157, 100, 100",
    light2: "255, 214, 214",
    light3: "221, 168, 168",
    dark1: "255, 180, 180",
    dark2: "54, 34, 34",
    dark3: "156, 115, 115",
    name: "red"
  },
  {
    primary: "#FBA490",
    light1: "149, 106, 100",
    light2: "247, 215, 202",
    light3: "217, 173, 167",
    dark1: "254, 176, 161",
    dark2: "49, 36, 33",
    dark3: "172, 122, 112",
    name: "terracotta"
  },
  {
    primary: "#FFC898",
    light1: "154, 112, 75",
    light2: "248, 227, 191", 
    light3: "217, 184, 155",
    dark1: "255, 209, 180",
    dark2: "53, 43, 37",
    dark3: "180, 144, 121",
    name: "orange"
  },
  {
    primary: "#FCDE93",
    light1: "139, 114, 66",
    light2: "255, 246, 200",
    light3: "228, 203, 155",
    dark1: "252, 231, 180",
    dark2: "52, 51, 39",
    dark3: "151, 131, 85",
    name: "yellow"
  },
  {
    primary: "#E6FD8A",
    light1: "86, 110, 66",
    light2: "220, 235, 177",
    light3: "175, 198, 156",
    dark1: "245, 255, 205",
    dark2: "39, 39, 28",
    dark3: "81, 85, 66",
    name: "pear"
  },
  {
    primary: "#DCFFBB",
    light1: "72, 111, 70",
    light2: "201, 236, 185",
    light3: "160, 204, 157",
    dark1: "220, 255, 187",
    dark2: "28, 36, 25",
    dark3: "69, 88, 52",
    name: "green"
  },
  {
    primary: "#D4FFFA",
    light1: "72, 99, 93",
    light2: "208, 232, 230",
    light3: "156, 183, 177",
    dark1: "200, 249, 243",
    dark2: "24, 35, 30",
    dark3: "58, 109, 102",
    name: "teal"
  },
  {
    primary: "#B2E4FF",
    light1: "74, 87, 101",
    light2: "218, 229, 241",
    light3: "142, 163, 185",
    dark1: "192, 219, 252",
    dark2: "36, 42, 54",
    dark3: "91, 119, 141",
    name: "azure"
  },
  {
    primary: "#A5BDFE",
    light1: "86, 95, 109",
    light2: "209, 221, 248",
    light3: "141, 158, 189",
    dark1: "191, 215, 255",
    dark2: "27, 31, 42",
    dark3: "54, 70, 99",
      name: "blue"
  },
  {
    primary: "#CEC1FF",
    light1: "78, 79, 102",
    light2: "224, 218, 253",
    light3: "151, 154, 204",
    dark1: "177, 180, 255",
    dark2: "33, 33, 33",
    dark3: "61, 63, 118",
    name: "purple"
  },
  {
    primary: "#DDBAFF",
    light1: "99, 91, 108",
    light2: "239, 212, 249",
    light3: "187, 168, 209",
    dark1: "232, 208, 255",
    dark2: "45, 35, 42",
    dark3: "93, 79, 107",
    name: "magenta"
  },
  {
    primary: "#FD8AB9",
    light1: "154, 97, 124",
    light2: "249, 218, 224",
    light3: "220, 179, 198",
    dark1: "245, 172, 217",
    dark2: "49, 39, 45",
    dark3: "148, 114, 139",
    name: "pink"
  },
]

export const DARK_COLOR_PROGRESS = {
  max: 243, min: 125,
  gVal: 245, bVal: 125
}

export const LIGHT_COLOR_PROGRESS = {
  max: 212, min: 145,
  gVal: 212, bVal: 145
}
  
export function getColorByName(name: string) {
  return COLOR_SWATCHES.find(color => color.name === name)
}

/**
 * Get the trio of color properties based on the theme
 * @param    color      - The color object containing light and dark properties.
 * @param    doGetLight - Boolean value indicating whether the theme is light or dark.
 * 
 * @returns  An tuple containing a color's light or dark color trio.
 */
export function getColorTrio(color: Color, doGetLight: boolean): [string, string, string] {
  const colorTrio = doGetLight ? [color.light1, color.light2, color.light3] : [color.dark1, color.dark2, color.dark3]

  return colorTrio as [string, string, string]
}

/**
 * Given a hexadecimal color find the closest color from app pre-drefined app colors.
 * 
 * @param    hexColor - The hexadecimal color string to match (e.g., "9FC6E7").
 * @returns  The color swatch object that is closest to the given color, or null if no swatch is found.
 */
export function findClosestColorSwatch(hexColor: string): Color {
  const rgbColor = hexToRgb({ hex: hexColor })
  const labColor = rgbToLab(rgbColor as number[])
  
  let closestColor = null
  let minDistance = Infinity

  for (const color of COLOR_SWATCHES) {
    const primaryRgb = hexToRgb({ hex: color.primary, format: "arr" })
    const primaryLab = rgbToLab(primaryRgb as number[])
    const distance = getDeltaE(labColor, primaryLab)

    if (distance < minDistance) {
      minDistance = distance
      closestColor = color
    }
  }
  return closestColor!
}

export function hexToRgb({ hex, format = "arr" }: { 
  hex: string, format?: "str" | "arr" 
}) {
  hex = hex.replace(/^#/, '')
  const bigint = parseInt(hex, 16)
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255

  return format === "str" ? `${r}, ${g}, ${b}` : [r, g, b]
}

/**
 * Convert RGB to LAB color space
 */
function rgbToLab(rgb: number[]): number[] {
  // Convert RGB to XYZ
  let r = rgb[0] / 255
  let g = rgb[1] / 255
  let b = rgb[2] / 255

  r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92
  g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92
  b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92

  r *= 100
  g *= 100
  b *= 100

  const x = r * 0.4124 + g * 0.3576 + b * 0.1805
  const y = r * 0.2126 + g * 0.7152 + b * 0.0722
  const z = r * 0.0193 + g * 0.1192 + b * 0.9505

  // Convert XYZ to LAB
  const xn = 95.047
  const yn = 100.0
  const zn = 108.883

  const xx = x / xn
  const yy = y / yn
  const zz = z / zn

  const fx = xx > 0.008856 ? Math.pow(xx, 1/3) : (7.787 * xx) + 16/116
  const fy = yy > 0.008856 ? Math.pow(yy, 1/3) : (7.787 * yy) + 16/116
  const fz = zz > 0.008856 ? Math.pow(zz, 1/3) : (7.787 * zz) + 16/116

  const l = (116 * fy) - 16
  const a = 500 * (fx - fy)
  const bb = 200 * (fy - fz)

  return [l, a, bb]
}

/**
 * Calculate color difference in LAB space
 */
function getDeltaE(labA: number[], labB: number[]): number {
  const [l1, a1, b1] = labA
  const [l2, a2, b2] = labB
  
  const deltaL = l2 - l1
  const deltaA = a2 - a1
  const deltaB = b2 - b1

  return Math.sqrt(deltaL * deltaL + deltaA * deltaA + deltaB * deltaB)
}