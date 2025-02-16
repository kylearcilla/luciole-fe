import { COLOR_SWATCHES } from "$lib/utils-colors"

export const TEST_TAGS: Tag[] = [
    {
      id: "",
      orderIdx: 0,
      name: "Body",
      symbol: {
        color: COLOR_SWATCHES[0],
        emoji: "💪"
      }
    },
    {
      id: "",
      orderIdx: 1,
      name: "SWE",
      symbol: {

        color: COLOR_SWATCHES[8],
        emoji: "👨‍💻"
      }
    },
    {
      id: "",
      orderIdx: 2,
      name: "French",
      symbol: {
        color: COLOR_SWATCHES[7],
        emoji: "🇫🇷"
      }
    },
    {
      id: "",
      orderIdx: 3,
      name: "Cooking",
      symbol: {
        color: COLOR_SWATCHES[1],
        emoji: "🍖"
      }
    },
    {
      id: "",
      orderIdx: 4,
      name: "SWE",
      symbol: {
        color: COLOR_SWATCHES[8],
        emoji: "👨‍💻"
      }
    },
    {
      id: "",
      orderIdx: 5,
      name: "BBall",
      symbol: {
        color: COLOR_SWATCHES[2],
        emoji: "🏀"
      }
    },
    {
      id: "",
      orderIdx: 6,
      name: "Running",
      symbol: {
        color: COLOR_SWATCHES[2],
        emoji: "🏃‍♂️"
      }
    },
    {
      id: "",
      orderIdx: 7,
      name: "Meditation",
      symbol: {
        color: COLOR_SWATCHES[5],
        emoji: "🌿"
      }
    },
    {
      id: "",
      orderIdx: 8,
      name: "Art",
      symbol: {
        color: COLOR_SWATCHES[1],
        emoji: "🌁"
      }
    },
    {
      id: "",
      orderIdx: 9,
      name: "Travel",
      symbol: {
        color: COLOR_SWATCHES[4],
        emoji: "🏔️"
      }
    },
    {
      id: "",
      orderIdx: 10,
      name: "Reading",
      symbol: {
        color: COLOR_SWATCHES[7],
        emoji: "📖"
      }
    }
]

type PresetRoutines = {
    hs: RoutineBlock[][],
    uni: RoutineBlock[][],
}

export const TAGS: Tag[] = [
  {
    id: "0",
    orderIdx: 0,
    name: "Body",
    symbol: {
      color: COLOR_SWATCHES[9],
      emoji: "💪"
    }
  },
  {
    id: "1",
    orderIdx: 1,
    name: "JS",
    symbol: {
      color: COLOR_SWATCHES[1],
      emoji: "👨‍💻"
    }
  },
  {
    id: "2",
    orderIdx: 2,
    name: "French",
    symbol: {
      color: COLOR_SWATCHES[4],
      emoji: "🇫🇷"
    }
  },
  {
    id: "3",
    orderIdx: 3,
    name: "Cooking",
    symbol: {
      color: COLOR_SWATCHES[2],
      emoji: "🍖"
    }
  },
  {
    id: "4",
    orderIdx: 4,
    name: "SWE",
    symbol: {
      color: COLOR_SWATCHES[4],
      emoji: "👨‍💻"
    }
  },
  {
    id: "5",
    orderIdx: 5,
    name: "BBall",
    symbol: {
      color: COLOR_SWATCHES[2],
      emoji: "🏀"
    }
  },
  {
    id: "6",
    orderIdx: 6,
    name: "Running",
    symbol: {
      color: COLOR_SWATCHES[2],
      emoji: "🏃‍♂️"
    }
  },
  {
    id: "7",
    orderIdx: 7,
    name: "Meditation",
    symbol: {
      color: COLOR_SWATCHES[3],
      emoji: "🌿"
    }
  },
  {
    id: "8",
    orderIdx: 8,
    name: "Art",
    symbol: {
      color: COLOR_SWATCHES[11],
      emoji: "🌁"
    }
  },
  {
    id: "9",
    orderIdx: 9,
    name: "Sport",
    symbol: {
      color: COLOR_SWATCHES[1],
      emoji: "⚾️"
    }
  },
  {
    id: "10",
    orderIdx: 10,
    name: "Learning",
    symbol: {
      color: COLOR_SWATCHES[7],
      emoji: "📖"
    }
  },
  {
    id: "11",
    orderIdx: 11,
    name: "Hustle",
    symbol: {
      color: COLOR_SWATCHES[3],
      emoji: "💵"
    }
  },
  {
    id: "12",
    orderIdx: 12,
    name: "School",
    symbol: {
      color: COLOR_SWATCHES[1],
      emoji: "🎒"
    }
  },
  {
    id: "13",
    orderIdx: 13,
    name: "Extracurriculars",
    symbol: {
      color: COLOR_SWATCHES[2],
      emoji: "🎯"
    }
  },
]

export const ROUTINE_BLOCKS: RoutineBlock[] = [
    {
        title: "",
        color: COLOR_SWATCHES[2],
        startTime: 0,
        endTime: 0,
        activity: null,
        tag: null,
        description: "",
        tasks: [],
        order: "first"
    },
]

/* themed daily routine */
export const PRESET_ROUTINES: PresetRoutines = {
    hs: [
        [
            {
                title: "🌤️ Morning Routine",
                color: COLOR_SWATCHES[2],
                startTime: 360,  // 6:00 AM
                endTime: 405,    // 6:45 AM
                activity: null,
                tag: null,
                description: "Wake up, stretches, brush teeth, shower, get dressed.",
                tasks: [],
                order: "first",
            },
            {
                title: "🎒 School",
                color: COLOR_SWATCHES[1],
                startTime: 420,  // 7:00 AM
                endTime: 900,    // 3:00 PM
                activity: "working",
                tag: TAGS[12],
                description: "",
                tasks: [],
                order: "middle",
            },
            {
                title: "🎾 Tennis Practice",
                color: COLOR_SWATCHES[3],
                startTime: 915,  // 3:15 PM
                endTime: 990,   // 4:30 PM
                activity: "body",
                tag: TAGS[9],
                description: "Tennis grind shit.",
                tasks: [],
                order: "middle",
            },
            {
                title: "👨‍💻 HW and Study",
                color: COLOR_SWATCHES[0],
                startTime: 1000,  // 4:40 PM
                endTime: 1065,    // 5:45 PM
                activity: "working",
                tag: TAGS[12],
                description: "",
                tasks: [
                    {
                        id: "f82be9cd-8f42-477e-b833-e74feed75a78",
                        idx: 0,
                        title: "AP Exam Review",
                        description: "Prep for AP Chem and Bio Exams.",
                        isChecked: false,
                        parentId: null
                    },
                    {
                        id: "9e2d813a-b7c2-48a5-9e47-87654aebbe7a",
                        idx: 1,
                        title: "History Homework",
                        description: "Finish everyday history homework.",
                        isChecked: false,
                        parentId: null
                    },
                ],
                order: "middle",
            },
            {
                title: "🌿 Relaxation Time",
                color: COLOR_SWATCHES[3],
                startTime: 1080,  // 6:00 PM
                endTime: 1140,    // 7:00 PM
                activity: "selfCare",
                tag: null,
                description: "After-school relax. Nap time. Snack. Walk outisde.",
                tasks: [
                    {
                        id: "bf3e3c33-7d8e-4293-937e-67b78d4516b1",
                        idx: 0,
                        title: "Watch Movie / TV",
                        description: "Something fun to watch.",
                        isChecked: false,
                        parentId: null
                    },
                    {
                        id: "ca9f636b-2457-47a5-b48a-13c9ed7e4686",
                        idx: 1,
                        title: "Playh videogames",
                        description: "Switch games.",
                        isChecked: false,
                        parentId: null
                    },
                ],
                order: "middle",
            },
            {
                title: "Dinner",
                color: COLOR_SWATCHES[4],
                startTime: 1170,  // 7:30 AM
                endTime: 1200,    // 8:00 AM
                activity: null,
                tag: null,
                description: "Enjoy dinner with family, discuss day's events",
                tasks: [],
                order: "middle",
            },
            {
                title: "👨‍💻 HW and Study",
                color: COLOR_SWATCHES[0],
                startTime: 1220,   // 8:20 PM
                endTime: 1320,     // 9:00 PM
                activity: "working",
                tag: TAGS[12],
                description: "More studying if needed. Project. 🏫 College research",
                tasks: [],
                order: "middle",
            },
            {
                title: "🌿 Chill",
                color: COLOR_SWATCHES[3],
                startTime: 1325,   // 9:05 PM
                endTime: 1360,     // 10:40 PM
                activity: "selfCare",
                tag: null,
                description: "Relax, watch TV, play video games, read",
                tasks: [],
                order: "middle",
            },
            {
                title: "🌙 Evening Routine",
                color: COLOR_SWATCHES[11],
                startTime: 1365,   // 10:45 PM
                endTime: 1395,     // 11:30 PM
                activity: "selfCare",
                tag: null,
                description: "Skincare. Music. Light Reading. Shower. Sleep. White Noise. Plan for the next day.",
                tasks: [],
                order: "last",
            },
        ],
        [
            {
                title: "🌤️ Morning Routine",
                color: COLOR_SWATCHES[2],
                startTime: 480, // 8:00 AM
                endTime: 540,    // 9:00 AM
                activity: null,
                tag: null,
                description: "Wake up, stretches, brush teeth, shower, get dressed.",
                tasks: [],
                order: "middle",
            },
            {
                title: "🏃‍♂️ Morning Run",
                color: COLOR_SWATCHES[9],
                startTime: 555,  // 9:15 AM
                endTime: 630,    // 10:30 PM
                activity: "body",
                tag: TAGS[6],
                description: "Morning run.",
                tasks: [],
                order: "middle",
            },
            {
                title: "Lunch",
                color: COLOR_SWATCHES[6],
                startTime: 720, // 12:00 AM
                endTime: 750,   // 12:30 PM
                activity: null,
                tag: null,
                description: "Tennis grind shit.",
                tasks: [],
                order: "middle",
            },
            {
                title: "💵 Work",
                color: COLOR_SWATCHES[7],
                startTime: 810,  // 1:30 PM
                endTime: 1110,    // 6:30 PM
                activity: "working",
                tag: TAGS[11],
                description: "Get the fucking bread bitch.",
                tasks: [],
                order: "middle",
            },
            {
                title: "Dinner",
                color: COLOR_SWATCHES[4],
                startTime: 1170,  // 7:30 AM
                endTime: 1200,    // 8:00 AM
                activity: null,
                tag: null,
                description: "Enjoy dinner with family, discuss day's events",
                tasks: [],
                order: "middle",
            },
            {
                title: "🌿 Chill",
                color: COLOR_SWATCHES[8],
                startTime: 1215,   // 8:15 PM
                endTime: 1360,     // 10:40 PM
                activity: "selfCare",
                tag: null,
                description: "Relax, watch TV, play video games, read",
                tasks: [],
                order: "middle",
            },
            {
                title: "🌙 Evening Routine",
                color: COLOR_SWATCHES[9],
                startTime: 1365,   // 10:45 PM
                endTime: 1395,     // 11:30 PM
                activity: "selfCare",
                tag: null,
                description: "Skincare. Music. Light Reading. Shower. Sleep. White Noise. Plan for the next day.",
                tasks: [],
                order: "middle",
            },
        ]
    ],
    uni: [
            [
                {
                    title: "🌤️ Morning Routine",
                    color: COLOR_SWATCHES[2],
                    startTime: 420, // 7:00 AM
                    endTime: 450,   // 7:30 AM
                    activity: null,
                    tag: null,
                    description: "Wake up, stretches, brush teeth, shower, get dressed.",
                    tasks: [],
                    order: "first",
                },
                {
                    title: "📝 Day Planning",
                    color: COLOR_SWATCHES[1],
                    startTime: 450,  // 7:30 AM
                    endTime: 470,    // 7:50 AM
                    activity: null,
                    tag: null,
                    description: "Plan the day. Study Plan. Free time plan.",
                    tasks: [],
                    order: "middle",
                },
                {
                    title: "💪 Gym (Push)",
                    color: COLOR_SWATCHES[8],
                    startTime: 480, // 8:00 AM
                    endTime: 540,   // 9:00 PM
                    activity: "body",
                    tag: TAGS[0],
                    description: "Tennis grind shit.",
                    tasks: [],
                    order: "middle",
                },
                {
                    title: "📖 Morning Lecture",
                    color: COLOR_SWATCHES[5],
                    startTime: 570,  // 9:30 PM
                    endTime: 690,    // 11:30 PM
                    activity: "working",
                    tag: TAGS[12],
                    description: "Attend morning lecture.",
                    tasks: [],
                    order: "middle",
                },
                {
                    title: "Lunch",
                    color: COLOR_SWATCHES[0],
                    startTime: 705, // 11:45 AM
                    endTime: 765,   // 12:45 PM
                    activity: null,
                    tag: null,
                    description: "Lunch",
                    tasks: [],
                    order: "middle",
                },
                {
                    title: "👨‍💻 Deep Work Session",
                    color: COLOR_SWATCHES[0],
                    startTime: 840, // 2:00 PM
                    endTime: 960,   // 4:00 PM
                    activity: "working",
                    tag: TAGS[12],
                    description: "Relax, watch TV, play video games, read",
                    tasks: [],
                    order: "middle",
                },
                {
                    title: "🌿 Relaxation",
                    color: COLOR_SWATCHES[1],
                    startTime: 960, // 4:00 PM
                    endTime: 990,   // 4:30 PM
                    activity: "selfCare",
                    tag: null,
                    description: "Relax, watch TV, play video games, read",
                    tasks: [],
                    order: "middle",
                },
                {
                    title: "👨‍💻 Deep Work Session",
                    color: COLOR_SWATCHES[1],
                    startTime: 990,  // 4:30 PM
                    endTime: 1110,   // 6:30 PM
                    activity: "working",
                    tag: TAGS[12],
                    description: "Skincare. Music. Light Reading. Shower. Sleep. White Noise. Plan for the next day.",
                    tasks: [],
                    order: "middle",
                },
                {
                    title: "🌿 Relaxation",
                    color: COLOR_SWATCHES[2],
                    startTime: 1110,   // 6:30 PM
                    endTime: 1140,     // 7:30 PM
                    activity: "selfCare",
                    tag: null,
                    description: "Relax, watch TV, play video games, read",
                    tasks: [],
                    order: "middle",
                },
                {
                    title: "Dinner",
                    color: COLOR_SWATCHES[11],
                    startTime: 1200,   // 8:00 PM
                    endTime: 1245,     // 8:45 PM
                    activity: null,
                    tag: null,
                    description: "Cook or order or go out with a friend/friends.",
                    tasks: [],
                    order: "middle",
                },
                {
                    title: "Internship / Research Grind",
                    color: COLOR_SWATCHES[1],
                    startTime: 1260,   // 9:00 PM
                    endTime: 1335,     // 10:15 PM
                    activity: "working",
                    tag: TAGS[12],
                    description: "Work on resume, look for opportunities, interview practice.",
                    tasks: [],
                    order: "middle",
                },
                {
                    title: "🌿 Relaxation",
                    color: COLOR_SWATCHES[2],
                    startTime: 1335,   // 10:15 PM
                    endTime: 1380,     // 11:00 PM
                    activity: "selfCare",
                    tag: null,
                    description: "Gaming / Books / Movies / Shows",
                    tasks: [],
                    order: "middle",
                },
                {
                    title: "🌙 Evening Routine",
                    color: COLOR_SWATCHES[3],
                    startTime: 1380,   // 11:05 PM
                    endTime: 1410,     // 11:30 PM
                    activity: "selfCare",
                    tag: null,
                    description: "Skincare. Music. Light Reading. Shower. Sleep. White Noise. Plan for the next day.",
                    tasks: [],
                    order: "last",
                },
            ],
            [
                {
                    title: "🌤️ Morning Routine",
                    color: COLOR_SWATCHES[2],
                    startTime: 480, // 8:00 AM
                    endTime: 510,   // 8:30 AM
                    activity: null,
                    tag: null,
                    description: "Wake up, stretches, brush teeth, shower, get dressed.",
                    tasks: [],
                    order: "first",
                },
                {
                    title: "📝 Day Planning",
                    color: COLOR_SWATCHES[1],
                    startTime: 510,  // 8:30 AM
                    endTime: 530,    // 8:50 AM
                    activity: null,
                    tag: null,
                    description: "Plan the day. Study Plan. Free time plan.",
                    tasks: [],
                    order: "middle",
                },
                {
                    title: "🏃‍♂️ Morning Run",
                    color: COLOR_SWATCHES[8],
                    startTime: 540, // 9:30 AM
                    endTime: 630,   // 11:00 AM
                    activity: "body",
                    tag: TAGS[6],
                    description: "Morning Cardio",
                    tasks: [],
                    order: "middle",
                },
                {
                    title: "👨‍💻 Deep Work Session",
                    color: COLOR_SWATCHES[3],
                    startTime: 645, // 10:45 PM
                    endTime: 750,   // 12:30 PM
                    activity: "working",
                    tag: TAGS[12],
                    description: "Relax, watch TV, play video games, read",
                    tasks: [],
                    order: "middle",
                },
                {
                    title: "Lunch",
                    color: COLOR_SWATCHES[0],
                    startTime: 760, endTime: 790,
                    activity: null,
                    tag: null,
                    description: "Lunch",
                    tasks: [],
                    order: "middle",
                },
                {
                    title: "Tutoring",
                    color: COLOR_SWATCHES[3],
                    startTime: 900,  // 3 PM
                    endTime: 1140,   // 7 PM
                    activity: "working",
                    tag: TAGS[11],
                    description: "Get that bread.",
                    tasks: [],
                    order: "middle",
                },
                {
                    title: "Dinner",
                    color: COLOR_SWATCHES[11],
                    startTime: 1200,   // 8:00 PM
                    endTime: 1245,     // 8:45 PM
                    activity: null,
                    tag: null,
                    description: "Cook or order or go out with a friend/friends.",
                    tasks: [],
                    order: "middle",
                },
                {
                    title: "🍊 Life Stuff",
                    color: COLOR_SWATCHES[8],
                    startTime: 1260,   // 9:00 PM
                    endTime: 1320,     // 10:00 PM
                    activity: null,
                    tag: null,
                    description: "Finance. Health. Productivity. Career. Travel. Relationships. Side Hustle. GOal Settings. Etc.",
                    tasks: [],
                    order: "middle",
                },
                {
                    title: "🌿 Relaxation",
                    color: COLOR_SWATCHES[3],
                    startTime: 1320,   // 10:00 PM
                    endTime: 1380,     // 11:00 PM
                    activity: "selfCare",
                    tag: null,
                    description: "Gaming / Books / Movies / Shows",
                    tasks: [],
                    order: "middle",
                },
                {
                    title: "🌙 Evening Routine",
                    color: COLOR_SWATCHES[4],
                    startTime: 1380,   // 11:05 PM
                    endTime: 1410,     // 11:30 PM
                    activity: "selfCare",
                    tag: null,
                    description: "Skincare. Music. Light Reading. Shower. Sleep. White Noise. Plan for the next day.",
                    tasks: [],
                    order: "last",
                },
            ],
            [
                {
                    title: "🌤️ Morning Routine",
                    color: COLOR_SWATCHES[2],
                    startTime: 420, // 7:00 AM
                    endTime: 450,   // 7:30 AM
                    activity: null,
                    tag: null,
                    description: "Wake up, stretches, brush teeth, shower, get dressed.",
                    tasks: [],
                    order: "first",
                },
                {
                    title: "📝 Day Planning",
                    color: COLOR_SWATCHES[5],
                    startTime: 450,  // 7:30 AM
                    endTime: 470,    // 7:50 AM
                    activity: null,
                    tag: null,
                    description: "Plan the day. Study Plan. Free time plan.",
                    tasks: [],
                    order: "middle",
                },
                {
                    title: "👨‍💻 Deep Work Session",
                    color: COLOR_SWATCHES[6], tag: TAGS[12],
                    startTime: 480, endTime: 600,
                    activity: "working", description: "", tasks: [],
                    order: "middle",
                },
                {
                    title: "🌿 Relaxation",
                    startTime: 600, endTime: 630,
                    activity: "selfCare", description: "", tasks: [],
                    order: "middle",
                    color: COLOR_SWATCHES[3], tag: null,
                },
                {
                    title: "👨‍💻 Deep Work Session",
                    startTime: 630, endTime: 750,
                    activity: "working", description: "", tasks: [],
                    order: "middle",
                    color: COLOR_SWATCHES[5], tag: TAGS[12],
                },
                {
                    title: "Lunch",
                    startTime: 760, endTime: 790,
                    activity: null, description: "", tasks: [],
                    order: "middle",
                    color: COLOR_SWATCHES[0], tag: null,
                },
                {
                    title: "Afternoon Lecture",
                    color: COLOR_SWATCHES[5],
                    startTime: 800, // 1:20 PM
                    endTime: 950,   // 3:50 PM
                    activity: "working",
                    tag: TAGS[12],
                    description: "Relax, watch TV, play video games, read",
                    tasks: [],
                    order: "middle",
                },
                {
                    title: "🌿 Relaxation",
                    color: COLOR_SWATCHES[3],
                    startTime: 950, // 3:50 PM
                    endTime: 1000,   // 4:50 PM
                    activity: "selfCare",
                    tag: null,
                    description: "Relax, watch TV, play video games, read",
                    tasks: [],
                    order: "middle",
                },
                {
                    title: "Afternoon Lecture",
                    color: COLOR_SWATCHES[5],
                    startTime: 1000,  // 4:50 PM
                    endTime: 1150,    // 7:20 PM
                    activity: "working",
                    tag: TAGS[12],
                    description: "Skincare. Music. Light Reading. Shower. Sleep. White Noise. Plan for the next day.",
                    tasks: [],
                    order: "middle",
                },
                {
                    title: "Dinner",
                    color: COLOR_SWATCHES[11],
                    startTime: 1200,   // 8:00 PM
                    endTime: 1245,     // 8:45 PM
                    activity: null,
                    tag: null,
                    description: "Cook or order or go out with a friend/friends.",
                    tasks: [],
                    order: "middle",
                },
                {
                    title: "👨‍💻 Late Night Grind",
                    startTime: 1260, endTime: 1380,
                    activity: "working", description: "", tasks: [],
                    order: "middle",
                    color: COLOR_SWATCHES[5], tag: TAGS[3],
                },
                {
                    title: "🌙 Evening Routine",
                    color: COLOR_SWATCHES[3],
                    startTime: 1380,   // 11:05 PM
                    endTime: 1410,     // 11:30 PM
                    activity: "selfCare",
                    tag: null,
                    description: "Skincare. Music. Light Reading. Shower. Sleep. White Noise. Plan for the next day.",
                    tasks: [],
                    order: "last",
                },
            ],
    ]
}

let currentTime = 0

/* daily routines */
export const DAILY_ROUTINES: (DailyRoutine | RoutineBlock[])[] = [
    { 
        id: "0",
        name: "Routine 1.0",
        description: "Regular work day",
        blocks: [
            {
                title: "Fruit 🍑",
                color: COLOR_SWATCHES[1],
                startTime: 360,  // 6:00 AM
                endTime: 420,    // 7:00 AM
                activity: "mind",
                tag: TAGS[1],
                tasks: [],
                order: "middle",
                description: ""
            },
            {
                title: "👨‍💻 SWE Deep Work",
                color: COLOR_SWATCHES[1],
                startTime: 525,  // 8:45 AM
                endTime: 720,    // 12:00 PM
                activity: "working",
                tag: TAGS[12],
                tasks: [],
                order: "middle",
                description: ""
            },
            {
                title: "🍖 Lunch",
                color: COLOR_SWATCHES[2],
                startTime: 730,  // 12:10 PM
                endTime: 800,    // 1:20 PM
                activity: null,
                tag: null,
                tasks: [],
                order: "middle",
                description: ""
            },
            {
                title: "👨‍💻 SWE Deep Work",
                color: COLOR_SWATCHES[1],
                startTime: 885,  // 2:45 PM
                endTime: 1080,   // 6:00  PM
                activity: "working",
                tag: TAGS[12],
                tasks: [],
                order: "middle",
                description: ""
            },
            {
                title: "💪 Gym (Pull)",
                color: COLOR_SWATCHES[3],
                startTime: 1080,  // 6:00 PM
                endTime: 1140,    // 7:00 PM
                activity: "body",
                tag: TAGS[0],
                tasks: [],
                order: "middle",
                description: ""
            },
            {
                title: "🍖 Dinner",
                color: COLOR_SWATCHES[4],
                startTime: 1140,  // 7:00 PM
                endTime: 1170,    // 7:30 PM
                activity: null,
                tag: TEST_TAGS[3],
                tasks: [],
                order: "middle",
                description: ""
            },
            {
                title: "🌙 Evening Routine",
                color: COLOR_SWATCHES[4],
                startTime: 1380,   // 11:00 PM
                endTime: 1415,     // 11:45 PM
                activity: "selfCare",
                tag: null,
                tasks: [],
                order: "middle",
                description: ""
            },
            {
                title: "Last",
                color: COLOR_SWATCHES[1],
                startTime: 1425,   // 11:45 PM
                endTime: 1439,     // 11:59 PM
                activity: "selfCare",
                tag: null,
                tasks: [],
                order: "middle",
                description: ""
            },
        ]
    },
    /* HS Student */
    { 
        id: "1",
        name: "Schoolday 1.0",
        description: "Regular schoolday routine",
        blocks: PRESET_ROUTINES.hs[0]
    },
    [
        {
            title: "🍒 STEM Club Meeting",
            color: COLOR_SWATCHES[5],
            startTime: 915,  // 3:15 PM
            endTime: 990,   // 4:30 PM
            activity: "working",
            tag: TAGS[13],
            description: "Tennis grind shit.",
            tasks: [],
            order: "middle",
        },
        {
            title: "💵 Work",
            color: COLOR_SWATCHES[6],
            startTime: 1000,  // 4:40 PM
            endTime: 1155,    // 7:15 PM
            activity: "working",
            tag: TAGS[11],
            description: "Get the fucking bread bitch.",
            tasks: [],
            order: "middle",
        },
        ...PRESET_ROUTINES.hs[0].filter((block, idx) => ![2, 3, 4].includes(idx))
    ],
    [
        {
            title: "🍕 Italian Culture Club",
            color: COLOR_SWATCHES[9],
            startTime: 915,  // 3:15 PM
            endTime: 975,    // 4:15 PM
            activity: null,
            tag: TAGS[13],
            description: "Tennis grind shit.",
            tasks: [],
            order: "middle",
        },
        {
            title: "💵 Work",
            color: COLOR_SWATCHES[7],
            startTime: 1000,  // 4:40 PM
            endTime: 1155,    // 7:15 PM
            activity: "working",
            tag: TAGS[11],
            description: "Get the fucking bread bitch.",
            tasks: [],
            order: "middle",
        },
        ...PRESET_ROUTINES.hs[0].filter((block, idx) => ![2, 3, 4].includes(idx))
    ],
    [
        {
            title: "💵 Work",
            color: COLOR_SWATCHES[8],
            startTime: 1000,  // 4:40 PM
            endTime: 1155,    // 7:15 PM
            activity: "working",
            tag: TAGS[11],
            description: "Get the fucking bread bitch.",
            tasks: [],
            order: "middle",
        },
        {
            title: "🌿 Chill",
            color: COLOR_SWATCHES[2],
            startTime: 1215,   // 8:15 PM
            endTime: 1360,     // 10:40 PM
            activity: "selfCare",
            tag: null,
            description: "Relax, watch TV, play video games, read",
            tasks: [],
            order: "middle",
        },
        ...PRESET_ROUTINES.hs[0].filter((block, idx) => ![3, 4, 6, 7].includes(idx))
    ],
    PRESET_ROUTINES.hs[1],
    [
        {
            title: "💪 Gym",
            color: COLOR_SWATCHES[4],
            startTime: 810,  // 1:30 PM
            endTime: 900,    // 3:00 PM
            activity: "body",
            tag: TAGS[0],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "📌 College Prep",
            color: COLOR_SWATCHES[1],
            startTime: 910,  // 3:10 PM
            endTime: 1080,   // 6:00 PM
            activity: null,
            tag: null,
            description: "",
            tasks: [],
            order: "middle",
        },
        ...PRESET_ROUTINES.hs[1].filter((block, idx) => ![1, 3].includes(idx))
    ],
    /* College Student */
    PRESET_ROUTINES.uni[0],
    [
        {
            ...PRESET_ROUTINES.uni[0][2],
            title: "💪 Gym (Pull)",
            tag: TAGS[0],
            activity: "body",
        },
        ...PRESET_ROUTINES.uni[0].filter((block, idx) => idx != 2)
    ],
    [
        {
            ...PRESET_ROUTINES.uni[0][2],
            title: "💪 Gym (Legs)",
            tag: TAGS[0],
            activity: "body",
        },
        ...PRESET_ROUTINES.uni[0].filter((block, idx) => idx != 2)
    ],
    PRESET_ROUTINES.uni[2],
    PRESET_ROUTINES.uni[1],
    [
        {
            ...PRESET_ROUTINES.uni[0][5],
            startTime: 540, endTime: 620,
        },
        {
            ...PRESET_ROUTINES.uni[0][6],
            startTime: 620, endTime: 650,
        },
        {
            ...PRESET_ROUTINES.uni[0][5],
            startTime: 650, endTime: 750,
        },
        {
            title: "💵 Side Hustle",
            color: COLOR_SWATCHES[2],
            startTime: 800, endTime: 900,
            activity: "working",
            tag: TAGS[11],
            tasks: [],
            order: "middle",
            description: ""
        },
        {
            ...PRESET_ROUTINES.uni[1][8],
            startTime: 1260, endTime: 1380,
        },
        ...PRESET_ROUTINES.uni[1].filter((block, idx) => ![2, 3, 5, 7, 8].includes(idx))
    ],
    /* Test */
    [
        {
            title: "0-0",
            color: COLOR_SWATCHES[3],
            startTime: 0,
            endTime: 1439,
            activity: "working",
            tag: TAGS[13],
            description: "Tennis grind shit.",
            tasks: [],
            order: "middle",
        },
    ],
    [
        ...Array.from({ length: 24 }, (_, i) => ({
            ...ROUTINE_BLOCKS[0],
            title: `1-${i}`,
            id: `1-${i}`,
            color: COLOR_SWATCHES[i % COLOR_SWATCHES.length],
            startTime: i * 60,
            endTime: Math.min((i + 1) * 60, 1439),
        }))
    ],
    [
        {
            title: "2-0",
            color: COLOR_SWATCHES[0],
            startTime: 0,
            endTime: 15,
            activity: "mind",
            tag: TAGS[13],
            description: "Tennis grind shit.",
            tasks: [],
            order: "middle",
        },
        {
            title: "2-1",
            color: COLOR_SWATCHES[1],
            startTime: 15,
            endTime: 1424,
            activity: "working",
            tag: TAGS[13],
            description: "Tennis grind shit.",
            tasks: [],
            order: "middle",
        },
        {
            title: "2-2",
            color: COLOR_SWATCHES[2],
            startTime: 1424,
            endTime: 1439,
            activity: "body",
            tag: TAGS[13],
            description: "Tennis grind shit.",
            tasks: [],
            order: "middle",
        },
    ],
    [
        ...Array.from({ length: 96 }, (_, i) => ({
            ...ROUTINE_BLOCKS[0],
            title: `3-${i}`,
            id: `3-${i}`,
            color: COLOR_SWATCHES[i % COLOR_SWATCHES.length],
            startTime: i * 15,
            endTime: Math.min((i + 1) * 15, 1439),
        }))
    ],
    [
        ...Array.from({ length: 39 }, (_, i) => {
            const isFifteenMinuteBlock = i % 2 === 0;
            const duration = isFifteenMinuteBlock ? 15 : 60;
            const prevEndTime = i === 0 ? 0 : currentTime;
            const startTime = prevEndTime;
            const endTime = startTime + duration;
            currentTime = endTime
            
            return {
                ...ROUTINE_BLOCKS[0],
                id: `4-${i}`,
                title: `4-${i}`,
                color: COLOR_SWATCHES[i % COLOR_SWATCHES.length],
                startTime,
                endTime: Math.min(endTime, 1439),
            }
        })
    ],
    [],
    [
        {
            title: "5-0",
            color: COLOR_SWATCHES[0],
            startTime: 0,
            endTime: 720,
            activity: "mind",
            tag: TAGS[13],
            description: "Tennis grind shit.",
            tasks: [],
            order: "middle"
        },
        {
            title: "5-1",
            color: COLOR_SWATCHES[1],
            startTime: 719,
            endTime: 1439,
            activity: "working",
            tag: TAGS[13],
            description: "Tennis grind shit.",
            tasks: [],
            order: "middle"
        },
    ]
]

/* set daily routines */
export const SET_DAILY_ROUTINES: DailyRoutine[] = [
    DAILY_ROUTINES[0] as DailyRoutine,
    DAILY_ROUTINES[1] as DailyRoutine,
    { 
        id: "3",
        name: "HS Regular Weekday",
        description: "Light weekday",
        blocks: DAILY_ROUTINES[1] as RoutineBlock[],
    },
    { 
        id: "4",
        name: "HS EC Weekday",
        description: "Weekday with extracurriculars.",
        blocks: DAILY_ROUTINES[2] as RoutineBlock[],
    },
    { 
        id: "5",
        name: "HS Saturday Routine",
        description: "Chill & productive sunday routine.",
        blocks: DAILY_ROUTINES[5] as RoutineBlock[],
    },
    { 
        id: "20",
        name: "HS Sunday Routine",
        description: "Chill & productive sunday routine.",
        blocks: DAILY_ROUTINES[6] as RoutineBlock[],
    },
    { 
        id: "6",
        name: "Uni Light Weekday",
        description: "Light weekday",
        blocks: DAILY_ROUTINES[7] as RoutineBlock[],
    },
    { 
        id: "7",
        name: "Uni Grind Weekday",
        description: "Busy weekday",
        blocks: DAILY_ROUTINES[10] as RoutineBlock[],
    },
    { 
        id: "8",
        name: "Uni Sunday",
        description: "Deep works + Side Hustle",
        blocks: DAILY_ROUTINES[12] as RoutineBlock[],
    },
    { 
        id: "9",
        name: "Empty",
        description: "",
        blocks: [] as RoutineBlock[],
    },
    { 
        id: "10",
        name: "Test 1",
        description: "",
        blocks: DAILY_ROUTINES[13] as RoutineBlock[],
    },
    { 
        id: "11",
        name: "Test 2",
        description: "",
        blocks: DAILY_ROUTINES[14] as RoutineBlock[],
    },
    { 
        id: "12",
        name: "Test 3",
        description: "",
        blocks: DAILY_ROUTINES[15] as RoutineBlock[],
    },
    { 
        id: "13",
        name: "Test 4",
        description: "",
        blocks: DAILY_ROUTINES[16] as RoutineBlock[],
    }
]

/* weekly routines */
export const WEEKLY_FULL_COLORS: WeeklyRoutineBlocks = {
    Monday: [
        {
            title: "Red",
            color: COLOR_SWATCHES[0],
            startTime: 360,
            endTime: 420,
            activity: null,
            tag: null,
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Orange",
            color: COLOR_SWATCHES[1],
            startTime: 525,
            endTime: 720,
            activity: "working",
            tag: TEST_TAGS[1],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Yellow",
            color: COLOR_SWATCHES[2],
            startTime: 730,
            endTime: 800,
            activity: null,
            tag: null,
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Green",
            color: COLOR_SWATCHES[3],
            startTime: 885,
            endTime: 1080,
            activity: "working",
            tag: TEST_TAGS[1],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Teal",
            color: COLOR_SWATCHES[4],
            startTime: 1080,
            endTime: 1140,
            activity: "body",
            tag: TEST_TAGS[0],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Blue",
            color: COLOR_SWATCHES[5],
            startTime: 1140,
            endTime: 1200,
            activity: null,
            tag: TEST_TAGS[3],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Purple",
            color: COLOR_SWATCHES[6],
            startTime: 1310,
            endTime: 1395,
            activity: "selfCare",
            tag: null,
            description: "",
            tasks: [],
            order: "middle",
        },
    ],
    // Monday: DAILY_ROUTINES[0],
    // Tuesday: DAILY_ROUTINES[1],
    Tuesday: [
        {
            title: "Red",
            color: COLOR_SWATCHES[7],
            startTime: 360,
            endTime: 420,
            activity: null,
            tag: null,
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Orange",
            color: COLOR_SWATCHES[8],
            startTime: 525,
            endTime: 720,
            activity: "working",
            tag: TEST_TAGS[1],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Yellow",
            color: COLOR_SWATCHES[9],
            startTime: 730,
            endTime: 800,
            activity: null,
            tag: null,
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Green",
            color: COLOR_SWATCHES[4],
            startTime: 885,
            endTime: 1080,
            activity: "working",
            tag: TEST_TAGS[1],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Teal",
            color: COLOR_SWATCHES[3],
            startTime: 1080,
            endTime: 1140,
            activity: "body",
            tag: TEST_TAGS[0],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Blue",
            color: COLOR_SWATCHES[2],
            startTime: 1140,
            endTime: 1200,
            activity: null,
            tag: TEST_TAGS[3],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Purple",
            color: COLOR_SWATCHES[3],
            startTime: 1310,
            endTime: 1395,
            activity: "selfCare",
            tag: null,
            description: "",
            tasks: [],
            order: "middle",
        },
    ],
    Wednesday: [
        {
            title: "Red",
            color: COLOR_SWATCHES[1],
            startTime: 370,
            endTime: 420,
            activity: null,
            tag: null,
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Orange",
            color: COLOR_SWATCHES[3],
            startTime: 525,
            endTime: 720,
            activity: "working",
            tag: TEST_TAGS[1],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Yellow",
            color: COLOR_SWATCHES[5],
            startTime: 730,
            endTime: 800,
            activity: null,
            tag: null,
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Green",
            color: COLOR_SWATCHES[2],
            startTime: 885,
            endTime: 1080,
            activity: "working",
            tag: TEST_TAGS[1],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Teal",
            color: COLOR_SWATCHES[4],
            startTime: 1080,
            endTime: 1140,
            activity: "body",
            tag: TEST_TAGS[0],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Blue",
            color: COLOR_SWATCHES[2],
            startTime: 1140,
            endTime: 1200,
            activity: null,
            tag: TEST_TAGS[3],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Purple",
            color: COLOR_SWATCHES[4],
            startTime: 1310,
            endTime: 1395,
            activity: "selfCare",
            tag: null,
            description: "",
            tasks: [],
            order: "middle",
        },
    ],
    Thursday: [
        {
            title: "Red",
            color: COLOR_SWATCHES[3],
            startTime: 370,
            endTime: 420,
            activity: null,
            tag: null,
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Orange",
            color: COLOR_SWATCHES[4],
            startTime: 525,
            endTime: 720,
            activity: "working",
            tag: TEST_TAGS[1],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Yellow",
            color: COLOR_SWATCHES[3],
            startTime: 730,
            endTime: 800,
            activity: null,
            tag: null,
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Green",
            color: COLOR_SWATCHES[4],
            startTime: 885,
            endTime: 1080,
            activity: "working",
            tag: TEST_TAGS[1],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Teal",
            color: COLOR_SWATCHES[2],
            startTime: 1080,
            endTime: 1140,
            activity: "body",
            tag: TEST_TAGS[0],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Blue",
            color: COLOR_SWATCHES[3],
            startTime: 1140,
            endTime: 1200,
            activity: null,
            tag: TEST_TAGS[3],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Purple",
            color: COLOR_SWATCHES[4],
            startTime: 1310,
            endTime: 1395,
            activity: "selfCare",
            tag: null,
            description: "",
            tasks: [],
            order: "middle",
        },
    ],
    // Friday: DAILY_ROUTINES[1],
    Friday: [
        {
            title: "Red",
            color: COLOR_SWATCHES[1],
            startTime: 370,
            endTime: 420,
            activity: null,
            tag: null,
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Green",
            color: COLOR_SWATCHES[5],
            startTime: 525,
            endTime: 720,
            activity: "working",
            tag: TEST_TAGS[1],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Yellow",
            color: COLOR_SWATCHES[2],
            startTime: 730,
            endTime: 800,
            activity: null,
            tag: null,
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Green",
            color: COLOR_SWATCHES[5],
            startTime: 885,
            endTime: 1080,
            activity: "working",
            tag: TEST_TAGS[1],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Teal",
            color: COLOR_SWATCHES[3],
            startTime: 1080,
            endTime: 1140,
            activity: "body",
            tag: TEST_TAGS[0],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Blue",
            color: COLOR_SWATCHES[4],
            startTime: 1140,
            endTime: 1200,
            activity: null,
            tag: TEST_TAGS[3],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Purple",
            color: COLOR_SWATCHES[1],
            startTime: 1310,
            endTime: 1395,
            activity: "selfCare",
            tag: null,
            description: "",
            tasks: [],
            order: "middle",
        },
    ],
    Saturday: [
        {
            title: "Red",
            color: COLOR_SWATCHES[0],
            startTime: 480,
            endTime: 520,
            activity: null,
            tag: null,
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "🏃‍♂️ Running",
            color: COLOR_SWATCHES[1],
            startTime: 600,
            endTime: 690,
            activity: "working",
            tag: TEST_TAGS[6],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Yellow",
            color: COLOR_SWATCHES[2],
            startTime: 730,
            endTime: 800,
            activity: null,
            tag: null,
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "🌁 Art",
            color: COLOR_SWATCHES[3],
            startTime: 885,
            endTime: 920,
            activity: "selfCare",
            tag: TEST_TAGS[8],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "💪 Gym (Push)",
            color: COLOR_SWATCHES[4],
            startTime: 1000,
            endTime: 1100,
            activity: "body",
            tag: TAGS[0],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Blue",
            color: COLOR_SWATCHES[5],
            startTime: 1130,
            endTime: 1200,
            activity: null,
            tag: TEST_TAGS[3],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Purple",
            color: COLOR_SWATCHES[6],
            startTime: 1310,
            endTime: 1395,
            activity: "selfCare",
            tag: null,
            description: "",
            tasks: [],
            order: "middle",
        },
    ],
    Sunday: [
        {
            title: "Red",
            color: COLOR_SWATCHES[7],
            startTime: 480,
            endTime: 520,
            activity: null,
            tag: null,
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "🏃‍♂️ Running",
            color: COLOR_SWATCHES[8],
            startTime: 600,
            endTime: 690,
            activity: "working",
            tag: TEST_TAGS[6],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Yellow",
            color: COLOR_SWATCHES[9],
            startTime: 730,
            endTime: 800,
            activity: null,
            tag: null,
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "🌁 Art",
            color: COLOR_SWATCHES[10],
            startTime: 885,
            endTime: 920,
            activity: "selfCare",
            tag: TEST_TAGS[8],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "💪 Gym (Push)",
            color: COLOR_SWATCHES[4],
            startTime: 1000,
            endTime: 1100,
            activity: "body",
            tag: TAGS[0],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Blue",
            color: COLOR_SWATCHES[3],
            startTime: 1130,
            endTime: 1200,
            activity: null,
            tag: TEST_TAGS[3],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Purple",
            color: COLOR_SWATCHES[2],
            startTime: 1310,
            endTime: 1395,
            activity: "selfCare",
            tag: null,
            description: "",
            tasks: [],
            order: "middle",
        },
    ]
}
export const WEEKLY_HS_STUDENT: WeeklyRoutineBlocks = {
    Monday: structuredClone(DAILY_ROUTINES[1]),
    Tuesday: DAILY_ROUTINES[2],
    Wednesday: structuredClone(DAILY_ROUTINES[1]),
    Thursday: DAILY_ROUTINES[3],
    Friday: DAILY_ROUTINES[4],
    Saturday: DAILY_ROUTINES[5],
    Sunday: DAILY_ROUTINES[6]
}
export const WEEKLY_UNI_STUDENT: WeeklyRoutineBlocks = {
    Monday: structuredClone(DAILY_ROUTINES[7]),
    Tuesday: structuredClone(DAILY_ROUTINES[8]),
    Wednesday: structuredClone(DAILY_ROUTINES[9]),
    Thursday: DAILY_ROUTINES[10],
    Friday: DAILY_ROUTINES[10],
    Saturday: structuredClone(DAILY_ROUTINES[11]),
    Sunday: structuredClone(DAILY_ROUTINES[12])
}
export const WEEKLY_FULL_TIME: WeeklyRoutineBlocks = {
    Monday: [
        {
            title: "Red",
            color: COLOR_SWATCHES[0],
            startTime: 360,
            endTime: 420,
            activity: null,
            tag: null,
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Orange",
            color: COLOR_SWATCHES[1],
            startTime: 525,
            endTime: 720,
            activity: "working",
            tag: TEST_TAGS[1],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Yellow",
            color: COLOR_SWATCHES[2],
            startTime: 730,
            endTime: 800,
            activity: null,
            tag: null,
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Green",
            color: COLOR_SWATCHES[3],
            startTime: 885,
            endTime: 1080,
            activity: "working",
            tag: TEST_TAGS[1],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Teal",
            color: COLOR_SWATCHES[4],
            startTime: 1080,
            endTime: 1140,
            activity: "body",
            tag: TEST_TAGS[0],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Blue",
            color: COLOR_SWATCHES[5],
            startTime: 1140,
            endTime: 1200,
            activity: null,
            tag: TEST_TAGS[3],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Purple",
            color: COLOR_SWATCHES[6],
            startTime: 1310,
            endTime: 1395,
            activity: "selfCare",
            tag: null,
            description: "",
            tasks: [],
            order: "middle",
        },
    ],
    // Monday: DAILY_ROUTINES[0],
    // Tuesday: DAILY_ROUTINES[1],
    Tuesday: [
        {
            title: "Red",
            color: COLOR_SWATCHES[7],
            startTime: 360,
            endTime: 420,
            activity: null,
            tag: null,
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Orange",
            color: COLOR_SWATCHES[8],
            startTime: 525,
            endTime: 720,
            activity: "working",
            tag: TEST_TAGS[1],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Yellow",
            color: COLOR_SWATCHES[9],
            startTime: 730,
            endTime: 800,
            activity: null,
            tag: null,
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Green",
            color: COLOR_SWATCHES[3],
            startTime: 885,
            endTime: 1080,
            activity: "working",
            tag: TEST_TAGS[1],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Teal",
            color: COLOR_SWATCHES[6],
            startTime: 1080,
            endTime: 1140,
            activity: "body",
            tag: TEST_TAGS[0],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Blue",
            color: COLOR_SWATCHES[7],
            startTime: 1140,
            endTime: 1200,
            activity: null,
            tag: TEST_TAGS[3],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Purple",
            color: COLOR_SWATCHES[5],
            startTime: 1310,
            endTime: 1395,
            activity: "selfCare",
            tag: null,
            description: "",
            tasks: [],
            order: "middle",
        },
    ],
    Wednesday: [
        {
            title: "Red",
            color: COLOR_SWATCHES[5],
            startTime: 370,
            endTime: 420,
            activity: null,
            tag: null,
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Orange",
            color: COLOR_SWATCHES[6],
            startTime: 525,
            endTime: 720,
            activity: "working",
            tag: TEST_TAGS[1],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Yellow",
            color: COLOR_SWATCHES[4],
            startTime: 730,
            endTime: 800,
            activity: null,
            tag: null,
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Green",
            color: COLOR_SWATCHES[3],
            startTime: 885,
            endTime: 1080,
            activity: "working",
            tag: TEST_TAGS[1],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Teal",
            color: COLOR_SWATCHES[4],
            startTime: 1080,
            endTime: 1140,
            activity: "body",
            tag: TEST_TAGS[0],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Blue",
            color: COLOR_SWATCHES[3],
            startTime: 1140,
            endTime: 1200,
            activity: null,
            tag: TEST_TAGS[3],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Purple",
            color: COLOR_SWATCHES[6],
            startTime: 1310,
            endTime: 1395,
            activity: "selfCare",
            tag: null,
            description: "",
            tasks: [],
            order: "middle",
        },
    ],
    Thursday: [
        {
            title: "Red",
            color: COLOR_SWATCHES[7],
            startTime: 370,
            endTime: 420,
            activity: null,
            tag: null,
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Orange",
            color: COLOR_SWATCHES[4],
            startTime: 525,
            endTime: 720,
            activity: "working",
            tag: TEST_TAGS[1],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Yellow",
            color: COLOR_SWATCHES[5],
            startTime: 730,
            endTime: 800,
            activity: null,
            tag: null,
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Green",
            color: COLOR_SWATCHES[6],
            startTime: 885,
            endTime: 1080,
            activity: "working",
            tag: TEST_TAGS[1],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Teal",
            color: COLOR_SWATCHES[5],
            startTime: 1080,
            endTime: 1140,
            activity: "body",
            tag: TEST_TAGS[0],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Blue",
            color: COLOR_SWATCHES[3],
            startTime: 1140,
            endTime: 1200,
            activity: null,
            tag: TEST_TAGS[3],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Purple",
            color: COLOR_SWATCHES[4],
            startTime: 1310,
            endTime: 1395,
            activity: "selfCare",
            tag: null,
            description: "",
            tasks: [],
            order: "middle",
        },
    ],
    // Friday: DAILY_ROUTINES[1],
    Friday: [
        {
            title: "Red",
            color: COLOR_SWATCHES[1],
            startTime: 370,
            endTime: 420,
            activity: null,
            tag: null,
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Green",
            color: COLOR_SWATCHES[5],
            startTime: 525,
            endTime: 720,
            activity: "working",
            tag: TEST_TAGS[1],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Yellow",
            color: COLOR_SWATCHES[2],
            startTime: 730,
            endTime: 800,
            activity: null,
            tag: null,
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Green",
            color: COLOR_SWATCHES[5],
            startTime: 885,
            endTime: 1080,
            activity: "working",
            tag: TEST_TAGS[1],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Teal",
            color: COLOR_SWATCHES[3],
            startTime: 1080,
            endTime: 1140,
            activity: "body",
            tag: TEST_TAGS[0],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Blue",
            color: COLOR_SWATCHES[4],
            startTime: 1140,
            endTime: 1200,
            activity: null,
            tag: TEST_TAGS[3],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Purple",
            color: COLOR_SWATCHES[1],
            startTime: 1310,
            endTime: 1395,
            activity: "selfCare",
            tag: null,
            description: "",
            tasks: [],
            order: "middle",
        },
    ],
    Saturday: [
        {
            title: "Red",
            color: COLOR_SWATCHES[0],
            startTime: 480,
            endTime: 520,
            activity: null,
            tag: null,
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "🏃‍♂️ Running",
            color: COLOR_SWATCHES[1],
            startTime: 600,
            endTime: 690,
            activity: "working",
            tag: TEST_TAGS[6],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Yellow",
            color: COLOR_SWATCHES[2],
            startTime: 730,
            endTime: 800,
            activity: null,
            tag: null,
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "🌁 Art",
            color: COLOR_SWATCHES[3],
            startTime: 885,
            endTime: 920,
            activity: "selfCare",
            tag: TEST_TAGS[8],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "💪 Gym (Push)",
            color: COLOR_SWATCHES[4],
            startTime: 1000,
            endTime: 1100,
            activity: "body",
            tag: TAGS[0],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Blue",
            color: COLOR_SWATCHES[5],
            startTime: 1130,
            endTime: 1200,
            activity: null,
            tag: TEST_TAGS[3],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Purple",
            color: COLOR_SWATCHES[6],
            startTime: 1310,
            endTime: 1395,
            activity: "selfCare",
            tag: null,
            description: "",
            tasks: [],
            order: "middle",
        },
    ],
    Sunday: [
        {
            title: "Red",
            color: COLOR_SWATCHES[7],
            startTime: 480,
            endTime: 520,
            activity: null,
            tag: null,
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "🏃‍♂️ Running",
            color: COLOR_SWATCHES[8],
            startTime: 600,
            endTime: 690,
            activity: "working",
            tag: TEST_TAGS[6],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Yellow",
            color: COLOR_SWATCHES[9],
            startTime: 730,
            endTime: 800,
            activity: null,
            tag: null,
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "🌁 Art",
            color: COLOR_SWATCHES[10],
            startTime: 885,
            endTime: 920,
            activity: "selfCare",
            tag: TEST_TAGS[8],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "💪 Gym (Push)",
            color: COLOR_SWATCHES[11],
            startTime: 1000,
            endTime: 1100,
            activity: "body",
            tag: TAGS[0],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Blue",
            color: COLOR_SWATCHES[3],
            startTime: 1130,
            endTime: 1200,
            activity: null,
            tag: TEST_TAGS[3],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Purple",
            color: COLOR_SWATCHES[3],
            startTime: 1310,
            endTime: 1395,
            activity: "selfCare",
            tag: null,
            description: "",
            tasks: [],
            order: "middle",
        },
    ]
}
export const WEEKLY_ALL_AROUND: WeeklyRoutineBlocks = {
    Monday: [
        {
            title: "Red",
            color: COLOR_SWATCHES[0],
            startTime: 360,
            endTime: 420,
            activity: null,
            tag: null,
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Orange",
            color: COLOR_SWATCHES[1],
            startTime: 525,
            endTime: 720,
            activity: "working",
            tag: TEST_TAGS[1],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Yellow",
            color: COLOR_SWATCHES[2],
            startTime: 730,
            endTime: 800,
            activity: null,
            tag: null,
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Green",
            color: COLOR_SWATCHES[3],
            startTime: 885,
            endTime: 1080,
            activity: "working",
            tag: TEST_TAGS[1],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Teal",
            color: COLOR_SWATCHES[4],
            startTime: 1080,
            endTime: 1140,
            activity: "body",
            tag: TEST_TAGS[0],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Blue",
            color: COLOR_SWATCHES[5],
            startTime: 1140,
            endTime: 1200,
            activity: null,
            tag: TEST_TAGS[3],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Purple",
            color: COLOR_SWATCHES[6],
            startTime: 1310,
            endTime: 1395,
            activity: "selfCare",
            tag: null,
            description: "",
            tasks: [],
            order: "middle",
        },
    ],
    // Monday: DAILY_ROUTINES[0],
    // Tuesday: DAILY_ROUTINES[1],
    Tuesday: [
        {
            title: "Red",
            color: COLOR_SWATCHES[7],
            startTime: 360,
            endTime: 420,
            activity: null,
            tag: null,
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Orange",
            color: COLOR_SWATCHES[8],
            startTime: 525,
            endTime: 720,
            activity: "working",
            tag: TEST_TAGS[1],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Yellow",
            color: COLOR_SWATCHES[9],
            startTime: 730,
            endTime: 800,
            activity: null,
            tag: null,
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Green",
            color: COLOR_SWATCHES[6],
            startTime: 885,
            endTime: 1080,
            activity: "working",
            tag: TEST_TAGS[1],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Teal",
            color: COLOR_SWATCHES[4],
            startTime: 1080,
            endTime: 1140,
            activity: "body",
            tag: TEST_TAGS[0],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Blue",
            color: COLOR_SWATCHES[3],
            startTime: 1140,
            endTime: 1200,
            activity: null,
            tag: TEST_TAGS[3],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Purple",
            color: COLOR_SWATCHES[3],
            startTime: 1310,
            endTime: 1395,
            activity: "selfCare",
            tag: null,
            description: "",
            tasks: [],
            order: "middle",
        },
    ],
    Wednesday: [
        {
            title: "Red",
            color: COLOR_SWATCHES[4],
            startTime: 370,
            endTime: 420,
            activity: null,
            tag: null,
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Orange",
            color: COLOR_SWATCHES[2],
            startTime: 525,
            endTime: 720,
            activity: "working",
            tag: TEST_TAGS[1],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Yellow",
            color: COLOR_SWATCHES[8],
            startTime: 730,
            endTime: 800,
            activity: null,
            tag: null,
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Green",
            color: COLOR_SWATCHES[7],
            startTime: 885,
            endTime: 1080,
            activity: "working",
            tag: TEST_TAGS[1],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Teal",
            color: COLOR_SWATCHES[5],
            startTime: 1080,
            endTime: 1140,
            activity: "body",
            tag: TEST_TAGS[0],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Blue",
            color: COLOR_SWATCHES[6],
            startTime: 1140,
            endTime: 1200,
            activity: null,
            tag: TEST_TAGS[3],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Purple",
            color: COLOR_SWATCHES[3],
            startTime: 1310,
            endTime: 1395,
            activity: "selfCare",
            tag: null,
            description: "",
            tasks: [],
            order: "middle",
        },
    ],
    Thursday: [
        {
            title: "Red",
            color: COLOR_SWATCHES[4],
            startTime: 370,
            endTime: 420,
            activity: null,
            tag: null,
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Orange",
            color: COLOR_SWATCHES[7],
            startTime: 525,
            endTime: 720,
            activity: "working",
            tag: TEST_TAGS[1],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Yellow",
            color: COLOR_SWATCHES[8],
            startTime: 730,
            endTime: 800,
            activity: null,
            tag: null,
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Green",
            color: COLOR_SWATCHES[6],
            startTime: 885,
            endTime: 1080,
            activity: "working",
            tag: TEST_TAGS[1],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Teal",
            color: COLOR_SWATCHES[5],
            startTime: 1080,
            endTime: 1140,
            activity: "body",
            tag: TEST_TAGS[0],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Blue",
            color: COLOR_SWATCHES[4],
            startTime: 1140,
            endTime: 1200,
            activity: null,
            tag: TEST_TAGS[3],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Purple",
            color: COLOR_SWATCHES[5],
            startTime: 1310,
            endTime: 1395,
            activity: "selfCare",
            tag: null,
            description: "",
            tasks: [],
            order: "middle",
        },
    ],
    // Friday: DAILY_ROUTINES[1],
    Friday: [
        {
            title: "Red",
            color: COLOR_SWATCHES[1],
            startTime: 370,
            endTime: 420,
            activity: null,
            tag: null,
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Green",
            color: COLOR_SWATCHES[5],
            startTime: 525,
            endTime: 720,
            activity: "working",
            tag: TEST_TAGS[1],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Yellow",
            color: COLOR_SWATCHES[2],
            startTime: 730,
            endTime: 800,
            activity: null,
            tag: null,
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Green",
            color: COLOR_SWATCHES[5],
            startTime: 885,
            endTime: 1080,
            activity: "working",
            tag: TEST_TAGS[1],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Teal",
            color: COLOR_SWATCHES[3],
            startTime: 1080,
            endTime: 1140,
            activity: "body",
            tag: TEST_TAGS[0],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Blue",
            color: COLOR_SWATCHES[4],
            startTime: 1140,
            endTime: 1200,
            activity: null,
            tag: TEST_TAGS[3],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Purple",
            color: COLOR_SWATCHES[1],
            startTime: 1310,
            endTime: 1395,
            activity: "selfCare",
            tag: null,
            description: "",
            tasks: [],
            order: "middle",
        },
    ],
    Saturday: [
        {
            title: "Red",
            color: COLOR_SWATCHES[0],
            startTime: 480,
            endTime: 520,
            activity: null,
            tag: null,
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "🏃‍♂️ Running",
            color: COLOR_SWATCHES[1],
            startTime: 600,
            endTime: 690,
            activity: "working",
            tag: TEST_TAGS[6],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Yellow",
            color: COLOR_SWATCHES[2],
            startTime: 730,
            endTime: 800,
            activity: null,
            tag: null,
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "🌁 Art",
            color: COLOR_SWATCHES[3],
            startTime: 885,
            endTime: 920,
            activity: "selfCare",
            tag: TEST_TAGS[8],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "💪 Gym (Push)",
            color: COLOR_SWATCHES[4],
            startTime: 1000,
            endTime: 1100,
            activity: "body",
            tag: TAGS[0],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Blue",
            color: COLOR_SWATCHES[5],
            startTime: 1130,
            endTime: 1200,
            activity: null,
            tag: TEST_TAGS[3],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Purple",
            color: COLOR_SWATCHES[6],
            startTime: 1310,
            endTime: 1395,
            activity: "selfCare",
            tag: null,
            description: "",
            tasks: [],
            order: "middle",
        },
    ],
    Sunday: [
        {
            title: "Red",
            color: COLOR_SWATCHES[7],
            startTime: 480,
            endTime: 520,
            activity: null,
            tag: null,
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "🏃‍♂️ Running",
            color: COLOR_SWATCHES[8],
            startTime: 600,
            endTime: 690,
            activity: "working",
            tag: TEST_TAGS[6],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Yellow",
            color: COLOR_SWATCHES[9],
            startTime: 730,
            endTime: 800,
            activity: null,
            tag: null,
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "🌁 Art",
            color: COLOR_SWATCHES[10],
            startTime: 885,
            endTime: 920,
            activity: "selfCare",
            tag: TEST_TAGS[8],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "💪 Gym (Push)",
            color: COLOR_SWATCHES[11],
            startTime: 1000,
            endTime: 1100,
            activity: "body",
            tag: TAGS[0],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Blue",
            color: COLOR_SWATCHES[6],
            startTime: 1130,
            endTime: 1200,
            activity: null,
            tag: TEST_TAGS[3],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Purple",
            color: COLOR_SWATCHES[5],
            startTime: 1310,
            endTime: 1395,
            activity: "selfCare",
            tag: null,
            description: "",
            tasks: [],
            order: "middle",
        },
    ]
}
export const WEEKLY_ROUTINES_BLOCKS: WeeklyRoutineBlocks = {
    // Monday: [
    //     {
    //         title: "Red",
    //         color: COLOR_SWATCHES[0],
    //         startTime: 360,
    //         endTime: 420,
    //         activity: null,
    //         tag: null,
    //         description: "",
    //         tasks: [],
    // order: "middle",
    //     },
    //     {
    //         title: "Orange",
    //         color: COLOR_SWATCHES[1],
    //         startTime: 525,
    //         endTime: 720,
    //         activity: "working",
    //         tag: TEST_TAGS[1],
    //         description: "",
    //         tasks: [],
    // order: "middle",
    //     },
    //     {
    //         title: "Yellow",
    //         color: COLOR_SWATCHES[2],
    //         startTime: 730,
    //         endTime: 800,
    //         activity: null,
    //         tag: null,
    //         description: "",
    //         tasks: [],
    // order: "middle",
    //     },
    //     {
    //         title: "Green",
    //         color: COLOR_SWATCHES[3],
    //         startTime: 885,
    //         endTime: 1080,
    //         activity: "working",
    //         tag: TEST_TAGS[1],
    //         description: "",
    //         tasks: [],
    // order: "middle",
    //     },
    //     {
    //         title: "Teal",
    //         color: COLOR_SWATCHES[4],
    //         startTime: 1080,
    //         endTime: 1140,
    //         activity: "body",
    //         tag: TEST_TAGS[0],
    //         description: "",
    //         tasks: [],
    // order: "middle",
    //     },
    //     {
    //         title: "Blue",
    //         color: COLOR_SWATCHES[5],
    //         startTime: 1140,
    //         endTime: 1200,
    //         activity: null,
    //         tag: TEST_TAGS[3],
    //         description: "",
    //         tasks: [],
    // order: "middle",
    //     },
    //     {
    //         title: "Purple",
    //         color: COLOR_SWATCHES[6],
    //         startTime: 1310,
    //         endTime: 1395,
    //         activity: "selfCare",
    //         tag: null,
    //         description: "",
    //         tasks: [],
    // order: "middle",
    //     },
    // ],
    Monday: DAILY_ROUTINES[1],
    // Tuesday: DAILY_ROUTINES[1],
    Tuesday: [
        {
            title: "Red",
            color: COLOR_SWATCHES[7],
            startTime: 360,
            endTime: 420,
            activity: null,
            tag: null,
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Orange",
            color: COLOR_SWATCHES[8],
            startTime: 525,
            endTime: 720,
            activity: "working",
            tag: TEST_TAGS[1],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Yellow",
            color: COLOR_SWATCHES[9],
            startTime: 730,
            endTime: 800,
            activity: null,
            tag: null,
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Green",
            color: COLOR_SWATCHES[10],
            startTime: 885,
            endTime: 1080,
            activity: "working",
            tag: TEST_TAGS[1],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Teal",
            color: COLOR_SWATCHES[4],
            startTime: 1080,
            endTime: 1140,
            activity: "body",
            tag: TEST_TAGS[0],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Blue",
            color: COLOR_SWATCHES[5],
            startTime: 1140,
            endTime: 1200,
            activity: null,
            tag: TEST_TAGS[3],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Purple",
            color: COLOR_SWATCHES[8],
            startTime: 1310,
            endTime: 1395,
            activity: "selfCare",
            tag: null,
            description: "",
            tasks: [],
            order: "middle",
        },
    ],
    Wednesday: [
        {
            title: "Red",
            color: COLOR_SWATCHES[6],
            startTime: 370,
            endTime: 420,
            activity: null,
            tag: null,
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Orange",
            color: COLOR_SWATCHES[5],
            startTime: 525,
            endTime: 720,
            activity: "working",
            tag: TEST_TAGS[1],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Yellow",
            color: COLOR_SWATCHES[7],
            startTime: 730,
            endTime: 800,
            activity: null,
            tag: null,
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Green",
            color: COLOR_SWATCHES[3],
            startTime: 885,
            endTime: 1080,
            activity: "working",
            tag: TEST_TAGS[1],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Teal",
            color: COLOR_SWATCHES[6],
            startTime: 1080,
            endTime: 1140,
            activity: "body",
            tag: TEST_TAGS[0],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Blue",
            color: COLOR_SWATCHES[5],
            startTime: 1140,
            endTime: 1200,
            activity: null,
            tag: TEST_TAGS[3],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Purple",
            color: COLOR_SWATCHES[4],
            startTime: 1310,
            endTime: 1395,
            activity: "selfCare",
            tag: null,
            description: "",
            tasks: [],
            order: "middle",
        },
    ],
    Thursday: [
        {
            title: "Red",
            color: COLOR_SWATCHES[1],
            startTime: 370,
            endTime: 420,
            activity: null,
            tag: null,
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Orange",
            color: COLOR_SWATCHES[3],
            startTime: 525,
            endTime: 720,
            activity: "working",
            tag: TEST_TAGS[1],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Yellow",
            color: COLOR_SWATCHES[4],
            startTime: 730,
            endTime: 800,
            activity: null,
            tag: null,
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Green",
            color: COLOR_SWATCHES[5],
            startTime: 885,
            endTime: 1080,
            activity: "working",
            tag: TEST_TAGS[1],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Teal",
            color: COLOR_SWATCHES[4],
            startTime: 1080,
            endTime: 1140,
            activity: "body",
            tag: TEST_TAGS[0],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Blue",
            color: COLOR_SWATCHES[3],
            startTime: 1140,
            endTime: 1200,
            activity: null,
            tag: TEST_TAGS[3],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Purple",
            color: COLOR_SWATCHES[4],
            startTime: 1310,
            endTime: 1395,
            activity: "selfCare",
            tag: null,
            description: "",
            tasks: [],
            order: "middle",
        },
    ],
    // Friday: DAILY_ROUTINES[1],
    Friday: [
        {
            title: "Red",
            color: COLOR_SWATCHES[1],
            startTime: 370,
            endTime: 420,
            activity: null,
            tag: null,
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Green",
            color: COLOR_SWATCHES[5],
            startTime: 525,
            endTime: 720,
            activity: "working",
            tag: TEST_TAGS[1],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Yellow",
            color: COLOR_SWATCHES[2],
            startTime: 730,
            endTime: 800,
            activity: null,
            tag: null,
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Green",
            color: COLOR_SWATCHES[5],
            startTime: 885,
            endTime: 1080,
            activity: "working",
            tag: TEST_TAGS[1],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Teal",
            color: COLOR_SWATCHES[3],
            startTime: 1080,
            endTime: 1140,
            activity: "body",
            tag: TEST_TAGS[0],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Blue",
            color: COLOR_SWATCHES[4],
            startTime: 1140,
            endTime: 1200,
            activity: null,
            tag: TEST_TAGS[3],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Purple",
            color: COLOR_SWATCHES[1],
            startTime: 1310,
            endTime: 1395,
            activity: "selfCare",
            tag: null,
            description: "",
            tasks: [],
            order: "middle",
        },
    ],
    Saturday: [
        {
            title: "Red",
            color: COLOR_SWATCHES[0],
            startTime: 480,
            endTime: 520,
            activity: null,
            tag: null,
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "🏃‍♂️ Running",
            color: COLOR_SWATCHES[1],
            startTime: 600,
            endTime: 690,
            activity: "working",
            tag: TEST_TAGS[6],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Yellow",
            color: COLOR_SWATCHES[2],
            startTime: 730,
            endTime: 800,
            activity: null,
            tag: null,
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "🌁 Art",
            color: COLOR_SWATCHES[3],
            startTime: 885,
            endTime: 920,
            activity: "selfCare",
            tag: TEST_TAGS[8],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "💪 Gym (Push)",
            color: COLOR_SWATCHES[4],
            startTime: 1000,
            endTime: 1100,
            activity: "body",
            tag: TAGS[0],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Blue",
            color: COLOR_SWATCHES[5],
            startTime: 1130,
            endTime: 1200,
            activity: null,
            tag: TEST_TAGS[3],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Purple",
            color: COLOR_SWATCHES[6],
            startTime: 1310,
            endTime: 1395,
            activity: "selfCare",
            tag: null,
            description: "",
            tasks: [],
            order: "middle",
        },
    ],
    Sunday: [
        {
            title: "Red",
            color: COLOR_SWATCHES[7],
            startTime: 480,
            endTime: 520,
            activity: null,
            tag: null,
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "🏃‍♂️ Running",
            color: COLOR_SWATCHES[8],
            startTime: 600,
            endTime: 690,
            activity: "working",
            tag: TEST_TAGS[6],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Yellow",
            color: COLOR_SWATCHES[9],
            startTime: 730,
            endTime: 800,
            activity: null,
            tag: null,
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "🌁 Art",
            color: COLOR_SWATCHES[10],
            startTime: 885,
            endTime: 920,
            activity: "selfCare",
            tag: TEST_TAGS[8],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "💪 Gym (Push)",
            color: COLOR_SWATCHES[11],
            startTime: 1000,
            endTime: 1100,
            activity: "body",
            tag: TAGS[0],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Blue",
            color: COLOR_SWATCHES[4],
            startTime: 1130,
            endTime: 1200,
            activity: null,
            tag: TEST_TAGS[3],
            description: "",
            tasks: [],
            order: "middle",
        },
        {
            title: "Purple",
            color: COLOR_SWATCHES[2],
            startTime: 1310,
            endTime: 1395,
            activity: "selfCare",
            tag: null,
            description: "",
            tasks: [],
            order: "middle",
        },
    ]
}
export const WEEKLY_TEST: WeeklyRoutineBlocks = {
    Monday: DAILY_ROUTINES[13],
    Tuesday: DAILY_ROUTINES[14],
    Wednesday: DAILY_ROUTINES[15],
    Thursday: DAILY_ROUTINES[16],
    Friday: DAILY_ROUTINES[17],
    Saturday: DAILY_ROUTINES[18],
    Sunday: DAILY_ROUTINES[19]
}

/* weekly routines list */
export const WEEKLY_ROUTINES: WeeklyRoutine[] = [
    {
        id: "0",
        name: "High School Student",
        description: "Rounte for a high school student.",
        blocks: WEEKLY_HS_STUDENT
    },
    {
        id: "1",
        name: "College Student",
        description: "Normal routine 2",
        blocks: WEEKLY_UNI_STUDENT
    },
    {
        id: "2",
        name: "Full Time",
        description: "Grind shit",
        blocks: {
            ...WEEKLY_ROUTINES_BLOCKS,
            Saturday: WEEKLY_ROUTINES_BLOCKS.Monday,
            Sunday: WEEKLY_ROUTINES_BLOCKS.Monday
        }
    },
    {
        id: "3",
        name: "All Around",
        description: "Grind shit",
        blocks: {
            ...WEEKLY_ROUTINES_BLOCKS,
            Saturday: WEEKLY_ROUTINES_BLOCKS.Monday,
            Sunday: WEEKLY_ROUTINES_BLOCKS.Monday
        }
    },
    {
        id: "4",
        name: "Full Colors",
        description: "All colors for testing.",
        blocks: WEEKLY_FULL_COLORS
    },
    {
        id: "5",
        name: "Test",
        description: "Relax & Unwind",
        blocks: WEEKLY_TEST
    },
    {
        id: "6",
        name: "Empty",
        description: "Relax & Unwind",
        blocks: {
            Monday: [],
            Tuesday: [],
            Wednesday: [],
            Thursday: [],
            Friday: [],
            Saturday: [],
            Sunday:[]
        }
    },
]

/* daily breakdowns breakdown  */
export const BREAKDOWN_TEST_DAILY_BLOCKS = [
    [
        { title: "A", startTime: 0, endTime: 20, tagIdx: 0, activity: "working" },
        { title: "I", startTime: 301, endTime: 340, tagIdx: 0, activity: "working", order: "first" },
        { title: "Y", startTime: 941, endTime: 980, tagIdx: 0, activity: "working" },

        { title: "K", startTime: 381, endTime: 420, tagIdx: 1, activity: "working" },
        { title: "V", startTime: 821, endTime: 860, tagIdx: 1, activity: "working" },

        { title: "D", startTime: 101, endTime: 140, tagIdx: 2, activity: "working" },
        { title: "T", startTime: 741, endTime: 780, tagIdx: 2, activity: "working" },
        { title: "AF", startTime: 1221, endTime: 1260, tagIdx: 2, activity: "working" },

        { title: "P", startTime: 581, endTime: 620, tagIdx: 3, activity: "body" },
        { title: "AC", startTime: 1100, endTime: 1140, tagIdx: 3, activity: "body" },

        { title: "G", startTime: 221, endTime: 260, tagIdx: 4, activity: "body" },
        { title: "X", startTime: 901, endTime: 940, tagIdx: 4, activity: "body" },

        { title: "C", startTime: 61, endTime: 100, tagIdx: 5, activity: "body" },
        { title: "R", startTime: 661, endTime: 700, tagIdx: 5, activity: "body" },
        { title: "AE", startTime: 1181, endTime: 1220, tagIdx: 5, activity: "body" },

        { title: "J", startTime: 341, endTime: 380, tagIdx: 6, activity: "body" },
        { title: "Z", startTime: 981, endTime: 1020, tagIdx: 6, activity: "body" },

        { title: "F", startTime: 181, endTime: 220, tagIdx: 7, activity: "selfCare" },
        { title: "Q", startTime: 621, endTime: 660, tagIdx: 7, activity: "selfCare" },
        { title: "AH", startTime: 1301, endTime: 1339, tagIdx: 7, activity: "selfCare", order: "last" },

        { title: "H", startTime: 261, endTime: 300, tagIdx: 8, activity: "selfCare" },
        { title: "S", startTime: 701, endTime: 740, tagIdx: 8, activity: "selfCare" },

        { title: "O", startTime: 540, endTime: 580, tagIdx: 9, activity: "selfCare" },
        { title: "B", startTime: 21, endTime: 60, tagIdx: 9, activity: "selfCare" },
        { title: "AD", startTime: 1141, endTime: 1180, tagIdx: 9, activity: "selfCare" },

        { title: "L", startTime: 421, endTime: 460, tagIdx: 10, activity: "mind" },
        { title: "U", startTime: 781, endTime: 820, tagIdx: 10, activity: "mind" },

        { title: "E", startTime: 141, endTime: 180, tagIdx: 11, activity: "mind" },
        { title: "W", startTime: 861, endTime: 900, tagIdx: 11, activity: "mind" },
        { title: "AG", startTime: 1261, endTime: 1300, tagIdx: 11, activity: "mind" },

        { title: "M", startTime: 461, endTime: 500, tagIdx: 12, activity: "mind" },
        { title: "AA", startTime: 1021, endTime: 1060, tagIdx: 12, activity: "mind" },

        { title: "N", startTime: 501, endTime: 540, tagIdx: 13, activity: "body" },
        { title: "AB", startTime: 1400, endTime: 1439, tagIdx: 13, activity: "body" },
    ],
    [
        { title: "A", startTime: 0, endTime: 20, tagIdx: 0, activity: "working" },
        { title: "B", startTime: 941, endTime: 980, tagIdx: 1, activity: "working" },
        
        { title: "D", startTime: 381, endTime: 420, tagIdx: 2, activity: "body" },
        { title: "E", startTime: 821, endTime: 860, tagIdx: 3, activity: "body" },
        
        { title: "F", startTime: 101, endTime: 140, tagIdx: 5, activity: "body" },
        { title: "G", startTime: 741, endTime: 780, tagIdx: 6, activity: "selfCare" },
        { title: "C", startTime: 301, endTime: 340, tagIdx: 7, activity: "body", order: "first" },
        { title: "H", startTime: 1221, endTime: 1260, tagIdx: 7, activity: "body" },
    ],
    [
        { title: "A", startTime: 0, endTime: 20, tagIdx: 11, activity: "selfCare" },
        { title: "B", startTime: 941, endTime: 980, tagIdx: 12, activity: "selfCare" },
        { title: "C", startTime: 301, endTime: 340, tagIdx: 13, activity: "mind", order: "last" }
    ],
    [
        { title: "A", startTime: 0, endTime: 20, tagIdx: 11, activity: "mind", order: "last" },
        { title: "B", startTime: 941, endTime: 980, tagIdx: 12, activity: "selfCare" },
        { title: "C", startTime: 301, endTime: 340, tagIdx: 13, activity: "body", order: "first" }
    ],
    [
        { title: "A", startTime: 50, endTime: 101, tagIdx: 11, activity: "body", order: "first" },
        { title: "B", startTime: 101, endTime: 200, tagIdx: 12, activity: "mind", order: "last" },
        { title: "C", startTime: 301, endTime: 340, tagIdx: 13, activity: "body" }
    ],
]

export const TEST_DAILY_BREAKDOWN = [
    {
        blocks: WEEKLY_HS_STUDENT.Monday,
        tagBreakdown: [
            { tag: TAGS[12], data: { avgTime: 215, totalTime: 645, total: 3 } },
            { tag: TAGS[9],data: { avgTime: 75, totalTime: 75, total: 1 } }
        ],
        coreBreakdown: {
            sleeping: { status: 0, totalTime: 404, avgTime: 404, total: 0 },
            working:  { status: 0, totalTime: 645, avgTime: 215, total: 3 },
            mind:     { status: 0, totalTime: 0, avgTime: 0, total: 0 },
            body:     { status: 0, totalTime: 75, avgTime: 75, total: 1 },
            selfCare: { status: 0, totalTime: 125, avgTime: 41, total: 3 },
            awake:    { status: 0, totalTime: 1036, avgTime: 1036, total: 0 },
        }
    },
    {
        blocks: WEEKLY_HS_STUDENT.Tuesday,
        tagBreakdown: [
            { tag: TAGS[12], data: { avgTime: 290, totalTime: 580, total: 2 } },
            { tag: TAGS[11], data: { avgTime: 155, totalTime: 155, total: 1 } },
            { tag: TAGS[13], data: { avgTime: 75, totalTime: 75, total: 1 } }
        ],
        coreBreakdown: {
            sleeping: { status: 0, totalTime: 404, avgTime: 404, total: 0 },
            working:  { status: 0, totalTime: 810, avgTime: 202, total: 4 },
            mind:     { status: 0, totalTime: 0, avgTime: 0, total: 0 },
            body:     { status: 0, totalTime: 0, avgTime: 0, total: 0 } ,
            selfCare: { status: 0, totalTime: 65, avgTime: 32, total: 2 },
            awake:    { status: 0, totalTime: 1036, avgTime: 1036, total: 0 },
        }
    },
    {
        blocks: WEEKLY_HS_STUDENT.Saturday,
        tagBreakdown: [
            { tag: TAGS[11], data: { avgTime: 300, totalTime: 300, total: 1 } },
            { tag: TAGS[6], data: { avgTime: 75, totalTime: 75, total: 1 } }
        ],
        coreBreakdown: {
            sleeping: { status: 0, totalTime: -1, avgTime: -1, total: -1 },
            working:  { status: 0, totalTime: 300, avgTime: 300, total: 1 },
            mind:     { status: 0, totalTime: 0, avgTime: 0, total: 0 },
            body:     { status: 0, totalTime: 75, avgTime: 75, total: 1 },
            selfCare: { status: 0, totalTime: 175, avgTime: 87, total: 2 },
            awake:    { status: 0, totalTime: -1, avgTime: -1, total: -1 },
        }
    },
    {
        blocks: WEEKLY_UNI_STUDENT.Monday,
        tagBreakdown: [
            { tag: TAGS[12], data: { avgTime: 108, totalTime: 435, total: 4 } },
            { tag: TAGS[0], data: { avgTime: 60, totalTime: 60, total: 1 } } 
        ],
        coreBreakdown: {
            sleeping: { status: 0, totalTime: 449, avgTime: 449, total: 0 },
            working:  { status: 0, totalTime: 435, avgTime: 108, total: 4 },
            mind:     { status: 0, totalTime: 0, avgTime: 0, total: 0 },
            body:     { status: 0, totalTime: 60, avgTime: 60, total: 1 },
            selfCare: { status: 0, totalTime: 135, avgTime: 33, total: 4 },
            awake:    { status: 0, totalTime: 991, avgTime: 991, total: 0 },
        }
    },
    {
        blocks: BREAKDOWN_TEST_DAILY_BLOCKS[0].map((data) => ({ 
            ...data, 
            color: COLOR_SWATCHES[0], 
            description: "", tasks: [],
            tag: TAGS[data.tagIdx],
            activity: data.activity as keyof RoutineCores
        })),
        tagBreakdown: [
            { tag: TAGS[9], data: { avgTime: 39, totalTime: 118, total: 3 } },
            { tag: TAGS[2], data: { avgTime: 39, totalTime: 117, total: 3 } },
            { tag: TAGS[5], data: { avgTime: 39, totalTime: 117, total: 3 } },
            { tag: TAGS[11], data: { avgTime: 39, totalTime: 117, total: 3 } },
            { tag: TAGS[7], data: { avgTime: 38, totalTime: 116, total: 3 } },
            { tag: TAGS[0], data: { avgTime: 32, totalTime: 98, total: 3 } },
            { tag: TAGS[3], data: { avgTime: 39, totalTime: 79, total: 2 } },
            { tag: TAGS[1], data: { avgTime: 39, totalTime: 78, total: 2 } },
            { tag: TAGS[4], data: { avgTime: 39, totalTime: 78, total: 2 } },
            { tag: TAGS[6], data: { avgTime: 39, totalTime: 78, total: 2 } },
            { tag: TAGS[8], data: { avgTime: 39, totalTime: 78, total: 2 } },
            { tag: TAGS[10], data: { avgTime: 39, totalTime: 78, total: 2 } },
            { tag: TAGS[12], data: { avgTime: 39, totalTime: 78, total: 2 } },
            { tag: TAGS[13], data: { avgTime: 39, totalTime: 78, total: 2 } },
        ],
        coreBreakdown: {
            sleeping: { status: 0, totalTime: 401, avgTime: 401, total: 0 },
            working:  { status: 0, totalTime: 293, avgTime: 36, total: 8 },
            mind:     { status: 0, avgTime: 39, totalTime: 273, total: 7 },
            body:     { status: 0, avgTime: 39, totalTime: 430, total: 11 },
            selfCare: { status: 0, avgTime: 39, totalTime: 312, total: 8  },
            awake:    { status: 0, totalTime: 1039 , avgTime: 1039, total: 0 },
        }
    }
]

/* weekly breakdowns */
const BREAKDOWN_TEST_WEEKLY_DAYS = {
    Monday: BREAKDOWN_TEST_DAILY_BLOCKS[0].map((data) => ({ 
        ...data, 
        color: COLOR_SWATCHES[0], 
        description: "", tasks: [],
        tag: TAGS[data.tagIdx],
        activity: data.activity as keyof RoutineCores
    })),
    Tuesday: BREAKDOWN_TEST_DAILY_BLOCKS[1].map((data) => ({ 
        ...data, 
        color: COLOR_SWATCHES[0], 
        description: "", tasks: [],
        tag: TAGS[data.tagIdx],
        activity: data.activity as keyof RoutineCores
    })),
    Wednesday: BREAKDOWN_TEST_DAILY_BLOCKS[0].map((data) => ({ 
        ...data, 
        color: COLOR_SWATCHES[0], 
        description: "", tasks: [],
        tag: TAGS[data.tagIdx],
        activity: data.activity as keyof RoutineCores
    })),
    Thursday: BREAKDOWN_TEST_DAILY_BLOCKS[1].map((data) => ({ 
        ...data, 
        color: COLOR_SWATCHES[0], 
        description: "", tasks: [],
        tag: TAGS[data.tagIdx],
        activity: data.activity as keyof RoutineCores
    })),
    Friday: BREAKDOWN_TEST_DAILY_BLOCKS[1].map((data) => ({ 
        ...data, 
        color: COLOR_SWATCHES[0], 
        description: "", tasks: [],
        tag: TAGS[data.tagIdx],
        activity: data.activity as keyof RoutineCores
    })),
    Saturday: BREAKDOWN_TEST_DAILY_BLOCKS[2].map((data) => ({ 
        ...data, 
        color: COLOR_SWATCHES[0], 
        description: "", tasks: [],
        tag: TAGS[data.tagIdx],
        activity: data.activity as keyof RoutineCores
    })),
    Sunday: BREAKDOWN_TEST_DAILY_BLOCKS[2].map((data) => ({ 
        ...data, 
        color: COLOR_SWATCHES[0], 
        description: "", tasks: [],
        tag: TAGS[data.tagIdx],
        activity: data.activity as keyof RoutineCores
    }))
}

export const TEST_WEEKLY_BREAKDOWN = [
    {
        weekRoutine: WEEKLY_ROUTINES[0],
        tagBreakdown: [
            { tag: TAGS[12], data: { avgTime: 418, totalTime: 2930, total: 11 } },
            { tag: TAGS[11], data: { avgTime: 109, totalTime: 765, total: 4 } },
            { tag: TAGS[9], data: { avgTime: 32, totalTime: 225, total: 3 } },
            { tag: TAGS[13], data: { avgTime: 19, totalTime: 135, total: 2 } },
            { tag: TAGS[0], data: { avgTime: 12, totalTime: 90, total: 1 } },
            { tag: TAGS[6], data: { avgTime: 10, totalTime: 75, total: 1 } }
        ],
        coreBreakdown: {
            sleeping: { status: 0, totalTime: -1, avgTime: -1, total: -1 },
            awake:    { status: 0, totalTime: -1, avgTime: -1, total: -1 },
            working:  { status: 0, totalTime: 3770, avgTime: 538, total: 16 },
            body:     { status: 0, totalTime: 390, avgTime: 55, total: 5 },
            selfCare: { status: 0, totalTime: 905, avgTime: 129, total: 16 },
            mind:     { status: 0, totalTime: 0, avgTime: 0, total: 0 },
        }
    },
    {
        weekRoutine: WEEKLY_ROUTINES[1],
        tagBreakdown: [
            { tag: TAGS[12], data: { avgTime: 415, totalTime: 2910, total: 25 } },
            { tag: TAGS[11], data: { avgTime: 48, totalTime: 340, total: 2 } },
            { tag: TAGS[0], data: { avgTime: 25, totalTime: 180, total: 3 } },
            { tag: TAGS[6], data: { avgTime: 12, totalTime: 90, total: 1 } }
        ],
        coreBreakdown: {
            sleeping: { status: 0, totalTime: 3263, avgTime: 466, total: 0 },
            awake:    { status: 0, totalTime: 6817, avgTime: 973, total: 0 },
            working:  { status: 0, totalTime: 3250, avgTime: 464, total: 27 },
            body:     { status: 0, totalTime: 270,  avgTime: 38, total: 4 },
            selfCare: { status: 0, totalTime: 895,  avgTime: 127, total: 23 },
            mind:     { status: 0, totalTime: 0, avgTime: 0, total: 0 },
        }
    },
    {
        weekRoutine: {
            id: "",
            name: "",
            description: "",
            blocks: BREAKDOWN_TEST_WEEKLY_DAYS
        },
        tagBreakdown: [
            { tag: TAGS[7], data: { avgTime: 66, totalTime: 466, total: 12 } },
            { tag: TAGS[2], data: { avgTime: 50, totalTime: 351, total: 9 } },
            { tag: TAGS[5], data: { avgTime: 50, totalTime: 351, total: 9 } },
            { tag: TAGS[3], data: { avgTime: 39, totalTime: 275, total: 7 } },
            { tag: TAGS[11], data: { avgTime: 39, totalTime: 274, total: 8 } },
            { tag: TAGS[1], data: { avgTime: 39, totalTime: 273, total: 7 } },
            { tag: TAGS[6], data: { avgTime: 39, totalTime: 273, total: 7 } },
            { tag: TAGS[0], data: { avgTime: 36, totalTime: 256, total: 9 } },
            { tag: TAGS[9], data: { avgTime: 33, totalTime: 236, total: 6 } },
            { tag: TAGS[12], data: { avgTime: 33, totalTime: 234, total: 6 } },
            { tag: TAGS[13], data: { avgTime: 33, totalTime: 234, total: 6 } },
            { tag: TAGS[4], data: { avgTime: 22, totalTime: 156, total: 4 } },
            { tag: TAGS[8], data: { avgTime: 22, totalTime: 156, total: 4 } },
            { tag: TAGS[10], data: { avgTime: 22, totalTime: 156, total: 4 } },
        ],
        coreBreakdown: {
            sleeping: { status: 0, totalTime: 0, avgTime: 0, total: 0 },
            awake:    { status: 0, totalTime: 0, avgTime: 0, total: 0 },
            working:  { status: 0, totalTime: 0, avgTime: 0, total: 0 },
            body:     { status: 0, totalTime: 0,  avgTime: 0, total: 0 },
            selfCare: { status: 0, totalTime: 0,  avgTime: 0, total: 0 },
            mind:     { status: 0, totalTime: 0, avgTime: 0, total: 0 },
        }
    },
]

/* lift edit testing */
export const TEST_BLOCK_MOVE_TO_NEW_COL = [
    {
        blocks: WEEKLY_HS_STUDENT.Sunday,
        editBlock: {
            title: "",
            color: COLOR_SWATCHES[2],
            startTime: 0,  endTime: 0,   
            activity: null,
            tag: null,
            description: "",
            tasks: [],
            order: "middle",
        },
        newStartTime: 600,
        newEndTime: 630,
        resultStartTime: 600
    },
    {   // short move down
        blocks: WEEKLY_HS_STUDENT.Sunday,
        editBlock: {
            title: "",
            color: COLOR_SWATCHES[2],
            startTime: 0,  endTime: 0,   
            activity: null,
            tag: null,
            description: "",
            tasks: [],
            order: "middle",
        },
        newStartTime: 539,
        newEndTime: 600,
        resultStartTime: 540
    },
    {   // short move up
        blocks: WEEKLY_HS_STUDENT.Sunday,
        editBlock: {
            title: "",
            color: COLOR_SWATCHES[2],
            startTime: 0,  endTime: 0,   
            activity: null,
            tag: null,
            description: "",
            tasks: [],
            order: "middle",
        },
        newStartTime: 406,
        newEndTime: 481,
        resultStartTime: 405
    },
    {   // long move up
        blocks: WEEKLY_HS_STUDENT.Friday,
        editBlock: {
            title: "",
            color: COLOR_SWATCHES[2],
            startTime: 0,  endTime: 0,   
            activity: null,
            tag: null,
            description: "",
            tasks: [],
            order: "middle",
        },
        newStartTime: 495,
        newEndTime: 640,
        resultStartTime: 215
    },
    {   // long move down
        blocks: [
            {
                title: "A",
                color: COLOR_SWATCHES[0],
                startTime: 0,
                endTime: 600,
                activity: null,
                tag: null,
                description: "",
                tasks: [],
                order: "middle",
            },
            {
                title: "B",
                color: COLOR_SWATCHES[0],
                startTime: 700,
                endTime: 800,
                activity: null,
                tag: null,
                description: "",
                tasks: [],
                order: "middle",
            },
            {
                title: "C",
                color: COLOR_SWATCHES[0],
                startTime: 901,
                endTime: 980,
                activity: null,
                tag: null,
                description: "",
                tasks: [],
                order: "middle",
            },
        ],
        editBlock: {
            title: "",
            color: COLOR_SWATCHES[2],
            startTime: 0,  endTime: 0,   
            activity: null,
            tag: null,
            description: "",
            tasks: [],
            order: "middle",
        },
        newStartTime: 0,
        newEndTime: 101,
        resultStartTime: 800
    },
    {   // close up
        blocks: WEEKLY_HS_STUDENT.Friday,
        editBlock: {
            title: "",
            color: COLOR_SWATCHES[2],
            startTime: 0,  endTime: 0,   
            activity: null,
            tag: null,
            description: "",
            tasks: [],
            order: "middle",
        },
        newStartTime: 860,
        newEndTime: 890,
        resultStartTime: 330
    },
    {   // close down
        blocks: WEEKLY_HS_STUDENT.Friday,
        editBlock: {
            title: "",
            color: COLOR_SWATCHES[2],
            startTime: 0,  endTime: 0,   
            activity: null,
            tag: null,
            description: "",
            tasks: [],
            order: "middle",
        },
        newStartTime: 865,
        newEndTime: 895,
        resultStartTime: 1395
    },
    {  // no space, blocked by bottom
        blocks: WEEKLY_HS_STUDENT.Friday,
        editBlock: {
            title: "",
            color: COLOR_SWATCHES[2],
            startTime: 0,  endTime: 0,   
            activity: null,
            tag: null,
            description: "",
            tasks: [],
            order: "middle",
        },
        newStartTime: 1395,
        newEndTime: 1425,
        resultStartTime: 1395
    },
    {   // no space, blocked by top
        blocks: WEEKLY_HS_STUDENT.Friday,
        editBlock: {
            title: "",
            color: COLOR_SWATCHES[2],
            startTime: 0,  endTime: 0,   
            activity: null,
            tag: null,
            description: "",
            tasks: [],
            order: "middle",
        },
        newStartTime: 0,
        newEndTime: 361,
        resultStartTime: 1440
    },
]
