import NativeSupport from "$lib/emojis-native-support"
import FrequentlyUsed from "$lib/emojis-freq-used"
export let Data: any = null

const EMOJI_VERSION = 15
const EMOJI_SET = "native"

export const EMOJI_BUTTON_SIZE  = 32

const MAX_FREQ_ROWS  = 20
const FREQ_ROW_PER_LINE = 10

const SAFE_FLAGS = [
    'checkered_flag',
    'crossed_flags',
    'pirate_flag',
    'rainbow-flag',
    'transgender_flag',
    'triangular_flag_on_post',
    'waving_black_flag',
    'waving_white_flag'
]

export const CATEGORY_ID_TO_NAME = {
    "search": "Search Results",
    "frequent": "Frequently Used",
    "people": "Smileys & People",
    "nature": "Animals & Nature",
    "foods": "Food & Drink",
    "activity": "Activity",
    "places": "Travel & Places",
    "objects": "Objects",
    "symbols": "Symbols",
    "flags": "Flags"
}
export const SKIN_IDX_TO_NAME = {
    "1": "Default",
    "2": "Light",
    "3": "Medium-Light",
    "4": "Medium",
    "5": "Medium-Dark",
    "6": "Dark"
}

export const CATEGORY_TO_ICONS = {
    "frequent": "fa-regular fa-clock",
    "people": "fa-solid fa-face-smile",
    "nature": "fa-solid fa-leaf",
    "foods": "fa-solid fa-burger",
    "activity": "fa-solid fa-basketball",
    "places": "fa-solid fa-car",
    "objects": "fa-solid fa-lightbulb",
    "symbols": "fa-solid fa-question",
    "flags": "fa-solid fa-flag"
}

async function initData() {
    if (Data) return

    const res = await fetch(`https://cdn.jsdelivr.net/npm/@emoji-mart/data@latest/sets/${EMOJI_VERSION}/${EMOJI_SET}.json`)
    Data      = await res.json()

    Data.emoticons = {}
    Data.natives = {}

    Data.categories.unshift({
        id: 'frequent', emojis: [],
    })

    for (const alias in Data.aliases) {
      const emojiId = Data.aliases[alias]
      const emoji = Data.emojis[emojiId]

      if (emoji) {
          emoji.aliases || (emoji.aliases = [])
          emoji.aliases.push(alias)
      }
    }
    Data.originalCategories = Data.categories
}

export async function initEmojis() {
    await initData()

    let latestVersionSupport = null
    let noCountryFlags = null
    let resetSearchIndex = false

    const set = EMOJI_SET
    const { categories } = Data

    if (set == 'native') {
      // find the latest emojis version supported by the browser
      latestVersionSupport = NativeSupport.latestVersion()
      noCountryFlags       = NativeSupport.noCountryFlags()
    }

    for (let cIdx = categories.length - 1; cIdx >= 0; cIdx--) {
        const category = categories[cIdx]

        if (category.id == 'frequent') {
            category.emojis = FrequentlyUsed.get({ 
                maxFrequentRows: MAX_FREQ_ROWS, perLine: FREQ_ROW_PER_LINE 
            })
        }        
        if (!category.emojis || !category.emojis.length) {
            Data.categories.splice(cIdx, 1)
            continue
        }

        for (let eIdx = category.emojis.length - 1; eIdx >= 0; eIdx--) {
            const emojiId = category.emojis[eIdx]
            const emoji = emojiId.id ? emojiId : Data.emojis[emojiId]
      
            const ignore = () => category.emojis.splice(eIdx, 1)

            if (!emoji) {
                ignore()
                continue
            }
            if (latestVersionSupport && emoji.version > latestVersionSupport) {
                ignore()
                continue
            }
            if (noCountryFlags && category.id == 'flags' && !SAFE_FLAGS.includes(emoji.id)) {
                ignore()
                continue
            }

            if (emoji.search) continue
            resetSearchIndex = true

            /* create serch index if none exists */
            emoji.search =
                ',' +
                [
                    [emoji.id, false],
                    [emoji.name, true],
                    [emoji.keywords, false],
                    [emoji.emoticons, false],
                ]
                .map(([strings, split]) => {
                    if (strings) {
                        return (Array.isArray(strings) ? strings : [strings])
                                .map((string) => (split ? string.split(/[-|_|\s]+/) : [string]).map((s: string) => s.toLowerCase(),))
                                .flat()
                    }
                    })
                    .flat()
                    .filter((a) => a && a.trim())
                    .join(',')


            /* create skin idex */
            let skinIdx = 0
            for (const skin of emoji.skins) {
                if (!skin) continue
                skinIdx++

                const { native } = skin
                if (native) {
                    Data.natives[native] = emoji.id
                    emoji.search += `,${native}`
                }

                const skinShortcodes = skinIdx == 1 ? '' : `:skin-tone-${skinIdx}:`
                skin.shortcodes = `:${emoji.id}:${skinShortcodes}`
            }
        }

        if (resetSearchIndex) {
            // SearchIndex.reset()
        }
    }
}

export function getFrequentEmojis() {
    return FrequentlyUsed.get({ 
        maxFrequentRows: MAX_FREQ_ROWS, perLine: FREQ_ROW_PER_LINE 
    })
}

export function setCache(key: string, value: string) {
    try {
      window.localStorage[`emoji-mart.${key}`] = JSON.stringify(value)
    } 
    catch (error) {
        console.error(error)
    }
    finally {
        return null
    }
  }
  
export function getCache(key: string): string | number | null {
    try {
        const value = window.localStorage[`emoji-mart.${key}`]
        return value ? JSON.parse(value) : null
    } 
    catch (error) {
        console.error(error)
        return null
    }
}
  
export function getEmojiData(data: EmojiData, { skinIdx = 0 } = {}) {
    const skin = data.skins![skinIdx] || data.skins![0]
    
    const emoji: Emoji = {
      id: data.id,
      name: data.name,
      keywords: data.keywords,
      shortcodes: data.shortcodes,
      native: skin.native,
      unified: skin.unified,
      skin: skinIdx + 1
    }

    if (skin?.src) {
      emoji.src = skin.src
    }
    if (data.aliases && data.aliases.length) {
      emoji.aliases = data.aliases
    }
    if (data.emoticons && data.emoticons.length) {
      emoji.emoticons = data.emoticons
    }

    return emoji
}