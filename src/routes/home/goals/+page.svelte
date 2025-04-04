<script lang="ts">
    import { Icon } from "$lib/enums"
	import { months } from "$lib/utils-date"
	import { goalTracker } from "$lib/store"
    import { imageUpload } from "$lib/pop-ups"
    import { GoalsViewManager } from "$lib/goals-view-manager"
	import { clamp, kebabToNormal, normalToKebab } from "$lib/utils-general"
	import { getGoalHeatMap, getYearData, PERIODS } from "$lib/utils-goals"
    
	import LeftMargin from "./LeftMargin.svelte"
	import PinnedGoals from "./PinnedGoals.svelte"
	import SvgIcon from "$components/SVGIcon.svelte"
	import HeatMap from "$components/HeatMap.svelte"
	import GoalsView from "../base/GoalsView.svelte"
	import TextEntry from "../base/TextEntry.svelte"
	import ProgressBar from "$components/ProgressBar.svelte"
	import SettingsBtn from "$components/SettingsBtn.svelte"
	import DropdownList from "$components/DropdownList.svelte"
    
    const SIDE_PADDING = 20
    const LEFT_COL_WIDTH = 170
    const QUARTERS = ["q1", "q2", "q3", "q4"]

    let yearEntryData: {
        entry: TextEntryOptions
        smallImg: string
        bannerImg: {
            src: string
            center: number
        } | null
    } | null = null

    let view = {
        showIcon: true,
        pinned: false,
        leftCol: true,
        showYearEntry: true,
        showMonthEntry: true,
        progressBars: true,
        heatmap: true,
        heatmapEmojis: true,
        carousel: false
    }

    let goalsView: GoalsViewOptions = {
        view: "list",
        progress: 0.5,
        list: {
            grouping: "default",
            showProgress: true,
            due: false,
            dueType: "date"
        },
        board: {
            grouping: "status",
            showProgress: true,
            due: false,
            dueType: "date"
        }
    }

    let goals: Goal[] = []
    let pinnedGoals: Goal[] = []
    let heatMapData: YearHeatMapData[] = []
    let init = false
    
    let moEntry: TextEntryOptions | null = null
    let monthOptions = false
    let optionsOpen = false
    let renderFlag = false
    
    let now = new Date()
    let currYear = now.getFullYear()
    let moIdx = now.getMonth()
    let viewPeriod: string = "mar"
    let periodIdx = now.getMonth()
    let hoverMonth: string | null = null

    let manager: GoalsViewManager | null = null
    let viewState: Writable<GoalsViewState> | null = null

    $: store = goalTracker
    
    $: if ($store.init && !init) initData()
    
    $: hasImgIcon = yearEntryData?.smallImg && view.showIcon
    $: hasBannerImg = yearEntryData?.bannerImg
    $: viewProgress = $viewState?.viewProgress
    $: yrProgress = $viewState?.yrProgress
    $: pinnedGoals = $viewState?.pinnedGoals

    let initDragY = -1
    let ogDragVal = 0
    let srcGoal: Goal | null = null
    
    function initData() {
        manager = new GoalsViewManager({ 
            goals: [], 
            grouping: goalsView.list.grouping,
            timeFrame: { year: currYear, period: viewPeriod }
        })
        viewState = manager.state

        updateYear(currYear)
        setPeriodIdx(periodIdx)
        heatMapData = getGoalHeatMap(currYear)

        init = true

        manager.state.subscribe((s: GoalsViewState) => {
            srcGoal = manager!.dragSrc

            if (!s.dragTarget) {
                hoverMonth = null
            }
        })
    } 
    function setPeriodIdx(idx: number) {
        idx = idx < 0 ? 16 : idx > 16 ? 0 : idx

        const period = PERIODS[idx]
        viewPeriod = period
        periodIdx = idx
        
        const data = manager!.setViewPeriod({ year: currYear, period })
        moEntry = data.entry
        goals = data.goals
    }

    /* time periods */
    function updateYear(yr: number) {
        moIdx = yr === now.getFullYear() ? now.getMonth() : 0
        currYear = yr

        const data = manager!.setViewPeriod({ 
            year: currYear, period: getMoStr(moIdx)
        })

        goals = data.goals
        yearEntryData = getYearData({ year: currYear })
        heatMapData = getGoalHeatMap(currYear)
    }
    function getMoStr(idx: number) {
        return months[idx].slice(0, 3).toLowerCase()
    }

    /* options */
    function onOptionClciked(name: string) {
        if (name === "Remove Banner") {
            yearEntryData!.bannerImg = null
        }
        else {
            imageUpload.init({
                onSubmitImg: (src) => {
                    if (yearEntryData?.entry) {
                        yearEntryData.bannerImg = { src, center: 50 }
                    }
                }
            })
        }
        optionsOpen = false
    }
    function viewOption(optn: string, val?: string) {
        const type = goalsView.view

        if (optn === "View Type") {
            goalsView.view = val as "list" | "board"
            renderFlag = !renderFlag
        }
        else if (optn === "Grouping") {
            goalsView[type].grouping = val as "default" | "status" | "tag"
        }
        else if (optn === "Month Entry") {
            view.showMonthEntry = !view.showMonthEntry
        }
        else if (optn === "Show Progress") {
            goalsView[type].showProgress = !goalsView[type].showProgress
        }
        else if (optn === "Show Due Date") {
            goalsView[type].due = !goalsView[type].due
        }
        else if (optn === "Due Distance") {
            goalsView[type].dueType = goalsView[type].dueType === "distance" ? "date" : "distance"
        }
    }

    /* drag */
    function dragDown(pe: PointerEvent) {
        if (pe.button != 0) {
            return
        }
        const target = pe.target as HTMLElement
        initDragY = pe.clientY

        target.setPointerCapture(pe.pointerId)
        ogDragVal = yearEntryData!.bannerImg!.center
    }
    function onDrag(pe: PointerEvent) {
        if (initDragY < 0) {
            return
        }
        const offset = initDragY - pe.clientY
        const target = pe.target as HTMLImageElement
        const naturalHeight = target.naturalHeight 
        const percOffset = ((offset / naturalHeight) * 100) * 2.5

        yearEntryData!.bannerImg!.center = clamp(0, ogDragVal + percOffset, 100)
    }
    function onDragEnd() {
        ogDragVal = 0
        initDragY = -1
    }
</script>

{#if init}
    <div 
        class="goals" 
        class:goals--light={false}
        class:goals--icon={view.showIcon}

        style:cursor={initDragY >= 0 ? "ns-resize" : "default"}
        style:--left-col-width={view.leftCol ? `${LEFT_COL_WIDTH}px` : "0px"}
        style:--side-padding={`${SIDE_PADDING}px`}
        style:--icon-offset={hasImgIcon ? (hasBannerImg ? "35px" : "120px") : "0px"}
    >
        <div class="flx" style:height="100%">
            <div class="goals__left" class:hidden={!view.leftCol}>
                <LeftMargin />
            </div>
            <div class="goals__right">
                {#if yearEntryData?.bannerImg}
                    {@const { src, center } = yearEntryData.bannerImg}
                    <div 
                        class="goals__banner"
                        on:pointerdown={dragDown}
                        on:pointermove={onDrag}
                        on:pointerup={onDragEnd}
                    >
                    <img 
                        style:object-position={`center ${center}%`}
                        src={src} 
                        alt="goals banner"
                        />
                    </div>
                {/if}
                {#if view.showIcon && yearEntryData?.smallImg}
                    {@const smallImg = yearEntryData.smallImg}
                    <!-- svelte-ignore missing-declaration -->
                    <button
                        id="goals-icon"
                        class="goals__icon"
                        style:top={hasBannerImg ? "125px" : "0px"}
                        on:click={() => {
                            imageUpload.init({
                                onSubmitImg: (src) => {
                                    if (yearEntryData?.entry) {
                                        yearEntryData.smallImg = src
                                    }
                                }
                            })
                        }}
                    >
                        <img src={smallImg}>
                    </button>
                {/if}
                <div>
                    <div class="goals__header">
                        <h1>{currYear}</h1>
                        {#key yearEntryData}
                            {#if view.showYearEntry && yearEntryData?.entry}
                                <div style:margin-top="-8px">
                                    <TextEntry 
                                        id="yr"
                                        zIndex={50}
                                        entry={yearEntryData.entry}
                                    />
                                </div>
                            {/if}
                        {/key}
                        <div class="goals__header-settings">
                            <div class="flx" style:margin="0px 0px -4px 0px">
                                <div style:margin="10px 0px 10px 14px" class:hidden={!view.progressBars}>
                                    <ProgressBar progress={yrProgress} />
                                </div>
                                <button 
                                    on:click={() => updateYear(currYear - 1)}
                                    class="goals__arrow"
                                    style:margin-left="10px"
                                >
                                    <div style:margin-left={"-2px"}>
                                        <SvgIcon 
                                            icon={Icon.ChevronLeft} options={{ scale: 1.4 }}
                                        />
                                    </div>
                                </button>
                                <button 
                                    on:click={() => updateYear(currYear + 1)}
                                    class="goals__arrow"
                                    style:margin-left="10px"
                                >
                                    <div style:margin-right={"-2px"}>
                                        <SvgIcon icon={Icon.ChevronRight} options={{ scale: 1.4 }}/>
                                    </div>
                                </button>
                            </div>
                            <div class="goals__settings-btn">
                                <SettingsBtn 
                                    id={"ygoals"}
                                    onClick={() => optionsOpen = !optionsOpen}
                                />
                                <DropdownList 
                                    id={"ygoals"}
                                    isHidden={!optionsOpen}
                                    options={{
                                        listItems: [
                                            { 
                                                name: "Left Margin",
                                                active: view.leftCol,
                                                divider: true,
                                                onToggle: () => view.leftCol = !view.leftCol
                                            },
                                            {
                                                sectionName: "Banner",
                                            },
                                            {
                                                name: hasBannerImg ? "Change Banner" : "Add Banner",
                                                divider: !hasBannerImg
                                            },
                                            {
                                                name: hasBannerImg ? "Remove Banner" : "",
                                                divider: !!hasBannerImg,
                                            },
                                            {
                                                sectionName: "Header",
                                            },
                                            { 
                                                name: "Icon Image",
                                                active: view.showIcon,
                                                onToggle: () => view.showIcon = !view.showIcon
                                            },
                                            { 
                                                name: "Year Entry",
                                                active: view.showYearEntry,
                                                divider: true,
                                                onToggle: () => view.showYearEntry = !view.showYearEntry
                                            },
                                            {
                                                sectionName: "Details",
                                            },
                                            { 
                                                name: "Pinned Goals",
                                                active: view.carousel,
                                                onToggle: () => view.carousel = !view.carousel
                                            },
                                            { 
                                                name: "Progress Bars",
                                                divider: true,
                                                active: view.progressBars,
                                                onToggle: () => view.progressBars = !view.progressBars
                                            },
                                            {
                                                sectionName: "Heatmap",
                                            },
                                            { 
                                                name: "Show",
                                                active: view.heatmap,
                                                onToggle: () => view.heatmap = !view.heatmap
                                            },
                                            { 
                                                name: view.heatmap ? "Use Emojis" : "",
                                                active: view.heatmapEmojis,
                                                onToggle: () => {
                                                    view.heatmapEmojis = !view.heatmapEmojis
                                                }
                                            }
                                        ],
                                        onClickOutside: () => {
                                            optionsOpen = false
                                        },
                                        onListItemClicked: ({ name }) => {
                                            onOptionClciked(name)
                                        },
                                        styling: { 
                                            zIndex: 1000,
                                            width: "160px",
                                        },
                                        position: { 
                                            top: "25px",
                                            right: "0px",
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    </div>
            
                    <div class="goals__content">
                        <div class="goals__heatmap" class:hidden={!view.heatmap}>
                            <HeatMap 
                                type="goals" 
                                year={currYear} 
                                data={heatMapData} 
                                options={{ emojis: view.heatmapEmojis }}
                            />
                        </div>

                        {#if view.carousel && manager}
                            <div class="goals__pinned">
                                <PinnedGoals {manager} goals={pinnedGoals} />
                            </div>
                        {/if}
                
                        <div class="goals__month">
                            <div class="goals__month-header">
                                <div class="goals__months no-scroll-bar">
                                    {#each months as month, midx}
                                        {@const mo = month.slice(0, 3).toLowerCase()}
                                        {@const quarter = QUARTERS[Math.floor(midx / 3)]}
                                        <button 
                                            data-drag-context={"month"}
                                            class="goals__month-item"
                                            class:goals__month-item--active={midx === periodIdx}
                                            class:goals__month-item--min-active={quarter === viewPeriod}
                                            class:goals__month-item--now={mo === "mar"}
                                            class:goals__month-item--drag-over={hoverMonth === mo}
                                            on:click={() => {
                                                setPeriodIdx(midx)
                                            }}
                                            on:dragover={(e) => {
                                                if (!srcGoal) return

                                                e.preventDefault()
                                                manager?.onDragEnter(e, midx)
                                                hoverMonth = mo
                                            }}
                                            on:dragleave={() => {
                                                hoverMonth = null
                                                manager?.resetGoalsDragTarget()
                                            }}
                                        >
                                            {month.slice(0, 3)}
                                        </button>
                                    {/each}
                                    <div class="flx" style:opacity="0.5">
                                        <div class="goals__quarters">
                                            {#each ["Q1", "Q2", "Q3", "Q4"] as quarter, qidx}
                                                {@const q = quarter.toLowerCase()}
                                                {@const moInQ = periodIdx <= 11 && QUARTERS[Math.floor(periodIdx / 3)] === q}
                                                <button 
                                                    class="goals__month-item"
                                                    class:goals__month-item--active={periodIdx === qidx + 12}
                                                    class:goals__month-item--min-active={moInQ}
                                                    on:click={() => { 
                                                        setPeriodIdx(qidx + 12)
                                                    }}
                                                >
                                                    {quarter}
                                                </button>
                                            {/each}
                                        </div>
                                        <button 
                                            class="goals__month-item"
                                            class:goals__month-item--active={periodIdx === 16}
                                            style:padding-left="0px"
                                            on:click={() => {
                                                setPeriodIdx(16)
                                            }}
                                        >
                                            All
                                        </button>
                                    </div>
                                </div>
                                <div class="goals__month-settings">
                                    <div class="flx" style:margin="0px 0px -4px 0px">
                                        <div 
                                            style:margin="10px 0px 10px 14px" 
                                            class:hidden={!view.progressBars}
                                        >
                                            <ProgressBar progress={viewProgress} />
                                        </div>
                                        <button 
                                            on:click={() => setPeriodIdx(periodIdx - 1)}
                                            class="goals__arrow"
                                            style:margin-left="10px"
                                        >
                                            <div style:margin-left={"-2px"}>
                                                <SvgIcon 
                                                    icon={Icon.ChevronLeft} options={{ scale: 1.4 }}
                                                />
                                            </div>
                                        </button>
                                        <button 
                                            on:click={() => setPeriodIdx(periodIdx + 1)}
                                            class="goals__arrow"
                                            style:margin-left="10px"
                                        >
                                            <div style:margin-right={"-2px"}>
                                                <SvgIcon icon={Icon.ChevronRight} options={{ scale: 1.4 }}/>
                                            </div>
                                        </button>
                                    </div>
                                    <div class="goals__settings-btn">
                                        <SettingsBtn 
                                            id={"goals"}
                                            onClick={() => monthOptions = !monthOptions}
                                        />
                                        
                                        <DropdownList 
                                            id={"goals"}
                                            isHidden={!monthOptions}
                                            renderFlag={renderFlag}
                                            options={{
                                                listItems: [
                                                    { 
                                                        name: "View Type",
                                                        pickedItem: kebabToNormal(goalsView.view),
                                                        items: [
                                                            { name: "List" },
                                                            { name: "Board" }
                                                        ],
                                                        onListItemClicked: ({ name }) => {
                                                            viewOption("View Type", normalToKebab(name))
                                                        }
                                                    },
                                                    { 
                                                        name: "Grouping",
                                                        pickedItem: kebabToNormal(goalsView[goalsView.view].grouping),
                                                        items: [
                                                            { name: goalsView.view === "list" ? "Default" : "" },
                                                            { name: "Status" },
                                                            { name: "Tag" }
                                                        ],
                                                        onListItemClicked: ({ name }) => {
                                                            viewOption("Grouping", normalToKebab(name))
                                                        }
                                                    },
                                                    { 
                                                        name: "Month Entry",
                                                        active: view.showMonthEntry,
                                                        divider: true,
                                                        onToggle: () => viewOption("Month Entry")
                                                    },
                                                    {
                                                        sectionName: "Details",
                                                    },
                                                    { 
                                                        name: "Show Progress",
                                                        active: goalsView[goalsView.view].showProgress,
                                                        onToggle: () => viewOption("Show Progress")
                                                    },
                                                    { 
                                                        name: "Show Due Date",
                                                        active: goalsView[goalsView.view].due,
                                                        onToggle: () => viewOption("Show Due Date")
                                                    },
                                                    { 
                                                        name: goalsView[goalsView.view].due ? "Distance" : "",
                                                        active: goalsView[goalsView.view].dueType === "distance",
                                                        onToggle: () => viewOption("Due Distance")
                                                    },
                                                ],
                                                onClickOutside: () => {
                                                    monthOptions = false
                                                },
                                                styling: { 
                                                    zIndex: 100,
                                                    width: "170px",
                                                },
                                                position: { 
                                                    top: "25px",
                                                    right: "0px",
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
            
                            <h1>March</h1>
            
                            <div style:margin="0px 0px 0px 0px" class:hidden={!view.showMonthEntry}>
                                {#key moEntry}
                                    {#if moEntry}
                                        <div style:margin-top="-8px">
                                            <TextEntry 
                                                id="mo" zIndex={1} entry={moEntry}
                                            />
                                        </div>
                                    {/if}
                                {/key}
                            </div>
                            {#if manager}
                                <div class="goals__list">
                                    <GoalsView 
                                        {manager}
                                        {goals}
                                        options={goalsView} 
                                        timeFrame={{
                                            year: 2025, period: viewPeriod
                                        }}
                                    />
                                </div>
                            {/if}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
{/if}

<style lang="scss">
    .goals {
        height: 100%;
        width: 100%;
        padding: 5px 0px 40px 6px;
        position: relative;

        &--icon &__header {
            margin-top: var(--icon-offset);
        }
        &--icon &__header-settings {
            top: calc(-1 *var(--icon-offset) + 15px);
        }

        h1 {
            @include text-style(1, var(--fw-400-500), 1.8rem);
            margin: 0px 0px 0px 15px;
        }

        &__left {
            width: var(--left-col-width);
            height: calc(100vh - 50px);
            padding: 10px 0px 0px 14px;
        }
        &__right {
            width: calc(100% - var(--left-col-width));
            height: 100%;
            padding: 2px 15px 0px 9px;
            position: relative;
            overflow-y: scroll;
            overflow-x: hidden;
        }
        &__banner {
            width: 100%;
            height: 210px;
            position: relative;
            overflow: hidden;
            margin-bottom: 10px;
            z-index: 0;
            
            img {
                border-radius: 3.5px;
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }   
        &__icon {
            @include square(110px, 4px);
            overflow: hidden;
            margin: 0px 0px 11px 0px;
            @include abs-top-left(0, var(--side-padding));

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
        &__header {
            width: 100%;
            margin: 0px 0px 0px 0px;
            position: relative;
            padding: 0px var(--side-padding);
            z-index: 1;
            
            h1 {
                @include text-style(1, var(--fw-400-500), 2.8rem, "Geist Mono");
                margin: 0px 0px 8px 0px;
                order: none;
            }
        }
        &__header-settings {
            @include abs-top-right(0px, 0px);
            @include flex(center);
        }
        &__heatmap {
            padding: 0px var(--side-padding);
            margin-bottom: 14px;
        }
        &__pinned {
            @include flex(center);
            overflow: auto;
            height: 100%;
            padding: 10px 0px 0px 0px;
            margin: 0px 0px 0px var(--side-padding);
            border-top: var(--divider-border);  
        }
        &__month {
            border-top: var(--divider-border);
            margin: 3px 0px 0px var(--side-padding);
            position: relative;
            z-index: 0;

            h1 {
                @include text-style(1, var(--fw-400-500), 3.5rem, "Gambarino-Regular");
                display: none;
            }
        }
        &__month-header {
            @include flex(center, space-between);
            margin: 2px 0px 8px 0px;
            position: relative;
            height: 35px;
        }
        &__months {
            @include flex(center);
            min-width: 0px;
            overflow: scroll;
            height: 100%;
            padding-top: 2px;
        }
        &__month-settings {
            @include flex(center);
            float: right;
        }
        &__quarters {
            @include flex(center);
            border-left: var(--divider-border);
            border-right: var(--divider-border);
            border-width: 1.5px;
            border-color: rgba(var(--textColor1), 0.1);
            height: 12px;
            padding: 0px 0px 0px 10px;
            margin-right: 14px;
        }
        &__month-item {
            @include text-style(1, var(--fw-400-500), 1.4rem);
            opacity: 0.1;
            padding: 0px 8px;
            position: relative;
            
            &:first-child {
                padding-left: 0px;
            }
            &:hover {
                opacity: 0.2;
            }
            &--active {
                opacity: 1 !important;
            }
            &--min-active {
                opacity: 0.2;
            }
            &--drag-over {
                opacity: 1;
                @include border-focus;
            }
            &--now::after {
                content: "";
                @include circle(3px);
                @include abs-center;
                top: 21px;
                background-color: rgba(var(--textColor1), 0.6);
            }
        }
        &__list {
            min-height: 500px;
        }
        &__arrow {
            opacity: 0.45;
            @include center;
            @include circle(25px);
            
            &--opaque {
                opacity: 0.15;
            }
            &:hover {
                opacity: 1;
                background-color: rgba(var(--textColor1), 0.06);
            }
        }
        &__settings-btn {
            margin: 0px 0px 0px 9px;
        }
    }
    
    .hidden {
        display: none;
    }
    
    .flx {
        display: flex;
        align-items: center;
    }
</style>