<script lang="ts">
    import { onMount } from 'svelte'
	import { themeState } from '$lib/store'

	import { Icon } from '$lib/enums'
	import Details from './Details.svelte'
	import { colorPicker } from '$lib/pop-ups'
	import { getColorTrio } from '$lib/utils-colors'
	import { DailyRoutinesManager } from '$lib/routines-daily-manager'
	import { getTimeFromIdx, minsFromStartToHHMM } from '$lib/utils-date'
	import { EDIT_BLOCK_OPTIONS, ROUTINE_BLOCKS_CONTAINER_ID } from '$lib/utils-routines'

	import SvgIcon from '$components/SVGIcon.svelte'
	import EditBlockModal from '../EditBlockModal.svelte'
	import DropdownList from '$components/DropdownList.svelte'

    export let data: { routines: DailyRoutine[] }

    const BLOCKS_CONTAINER_LEFT_OFFSET = 51
    let routines: DailyRoutine[] = data.routines

    /* DOM */
    let timeBoxElem: HTMLElement
    let blocksContainerRef: HTMLElement
    let blocksContainerWidth = 0
    let initIdx = -1
    
    let manager = new DailyRoutinesManager()

    let contextMenu = false
    let pointCaptureSet = false
    let colorsOpen = false

    let _editDayRoutine = manager.editDayRoutine
    let _editDayRoutineElems = manager.editDayRoutineElems
    let _editingBlock = manager.editingBlock
    let _editContext = manager.editContext
    let _contextMenuPos = manager.contextMenuPos

    $: editDayRoutine = $_editDayRoutine as DailyRoutine | null
    $: editDayRoutineElems = $_editDayRoutineElems ?? []
    $: editingBlock  = $_editingBlock
    $: editContext   = $_editContext
    $: isLight  = !$themeState.isDarkTheme
    $: lockInteraction = contextMenu || colorsOpen
    $: contextMenuPos = $_contextMenuPos

    function onBlockContextMenu(e: MouseEvent, id: string) {
        e.preventDefault()
        manager.onBlockContextMenu(id)
        contextMenu = true
    }

    function onOptnClicked(name: string) {
        if (name === "Edit Block") {
            manager.openEditBlockModal()
        }
        else if (name === "Change Color") {
            colorsOpen = true
            colorPicker.init({
                onSubmitColor: (color) => {
                    colorsOpen = false

                    manager.setEditBlockColor(color)
                    manager.resetEditState()
                },
                picked: editingBlock!.color
            })
        }
        else if (name === "Duplicate Block") {
            manager.onDuplicateBlock()
        }
        else if (name === "Delete Block") {
            manager.deleteEditBlock()
            manager.resetEditState()
        }
        contextMenu = false
    }
    
    function onMenuDismount() {
        const isEditModalOpen = editContext === "details"
        manager.closeContextMenu(isEditModalOpen || colorsOpen)
    }

    function onBlockPointerDown(e: PointerEvent) {
        if (pointCaptureSet) return
        
        pointCaptureSet = true
        const target = e.target as HTMLElement
        target.setPointerCapture(e.pointerId)
    }

    onMount(() => {
        requestAnimationFrame(() => {
            manager.initContainer(timeBoxElem, blocksContainerRef)
            initIdx = 0

            if (routines.length > 0) {
                manager.initEditRoutine(routines[initIdx])
            }
        })
    })
</script>

<div 
    class="routine"
    class:routine--light={isLight}
>
    <Details
        bind:routines={routines}
        {manager} 
        {initIdx} 
    />
    <div 
        class="routine-blocks-container" 
        class:routine-blocks-container--no-scroll={lockInteraction}
        class:routine-blocks-container--ns-resize={editContext?.includes("stretch")}
        bind:this={timeBoxElem}
        on:pointermove={(e) => {
            manager.onPointerMove(e)
        }}
    >
        <div 
            bind:this={blocksContainerRef}
            bind:clientWidth={blocksContainerWidth}
            class="routine__blocks-wrapper"
            class:no-pointer-events-all={lockInteraction || !editDayRoutine}
        >
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div 
                id={ROUTINE_BLOCKS_CONTAINER_ID}
                style:--left-offset={`${BLOCKS_CONTAINER_LEFT_OFFSET}px`}
                class="routine-blocks"
                class:routine-blocks--editing={editContext}
                on:pointerdown={(e) => {
                    manager.onScrollContainerPointerDown(e)
                }}
                on:contextmenu={(e) => {
                    if (editContext === "lift") {
                        e.preventDefault()
                    }
                }}
            >
                {#each editDayRoutineElems as block (block.id)}
                    {@const colorTrio    = getColorTrio(block.color, isLight)}
                    {@const editId       = editingBlock?.id}
                    {@const isEdit       = editContext === "lift" || editContext === "old-stretch"}
                    {@const isEditBlock  = editId === block.id && isEdit}
                    {@const startTimeStr = minsFromStartToHHMM(block.startTime)}
                    {@const endTimeStr   = minsFromStartToHHMM(block.endTime)}
                    {@const isFirstLast  = ["first", "last"].includes(block.order ?? "")}
                    {@const isFirst      = block.order === "first"}

                    <!-- svelte-ignore a11y-interactive-supports-focus -->
                    <div 
                        role="button"
                        tabIndex={0}
                        id={`rblock--${block.id}`}
                        class="routine-block"
                        class:routine-block--editing={editId === block.id && !editContext}
                        class:hidden={isEditBlock}
                        style:top={`calc(${block.yOffset}px`}
                        style:--block-height={`${block.height}px`}
                        style:--block-color-1={colorTrio[0]}
                        style:--block-color-2={colorTrio[1]}
                        style:--block-color-3={colorTrio[2]}
                        title={`${block.title} \n${startTimeStr} - ${endTimeStr}`}
                        on:pointerdown={(e) => {
                            manager.onBlockPointerDown(e, block.id)
                        }}
                        on:contextmenu={(e) => {
                            onBlockContextMenu(e, block.id)
                        }}
                        on:keydown={(e) => {
                            if (e.code === 'Enter' || e.code === 'Space') {
                                e.preventDefault()
                                manager.toggleEditModal(block.id)
                            }
                        }}
                    >
                        <div class="routine-block__content">
                            <div class="flx-algn-center">
                                {#if isFirstLast}
                                    {@const opacity = isLight ? 0.8 : 0.5}
                                    {@const title = isFirst ? "First routine of the day." : "Last routine of the day."}

                                    <div {title} class="routine-block__order-icon">
                                        <SvgIcon 
                                            icon={isFirst ? Icon.Sun : Icon.Moon} 
                                            options={{
                                                height: 16, width: 16, opacity: 0.4, scale: 0.58, color: `rgba(${colorTrio[0]}, ${opacity})`
                                            }}
                                        />
                                    </div>
                                {/if}
                                <span class="routine-block__title">
                                    {block.title}
                                </span>
                            </div>
                            <div class="routine-block__time-period">
                                <span>{startTimeStr}</span>
                                <span>-</span>
                                <span>{endTimeStr}</span>
                            </div>
                            <div class="routine-block__spine"></div>
                        </div>
                    </div>
                {/each}

                <!-- floating or new block -->
                {#if editingBlock && editContext}
                    {@const colorTrio = getColorTrio(editingBlock.color, isLight)}
                    {@const startTimeStr = minsFromStartToHHMM(editingBlock.startTime)}
                    {@const endTimeStr = minsFromStartToHHMM(editingBlock.endTime)}
                    {@const isLift = editContext === "lift"}
                    {@const isStretch = editContext === "old-stretch"}
                    {@const isDragging = editingBlock.isDragging}
                    {@const dropArea = editingBlock.dropArea}
                    {@const isFirstLast = ["first", "last"].includes(editingBlock.order ?? "")}
                    {@const isFirst = editingBlock.order === "first"}

                    <div 
                        class="routine-block"
                        class:routine-block--day-floating={isLift}
                        class:routine-block--dup-floating={editContext === "duplicate"}
                        class:routine-block--old-stretch={isStretch}
                        class:routine-block--use-x-offset={isLift || (editContext === "duplicate" && isDragging)}
                        style:top={`${editingBlock.yOffset}px`}
                        style:--left-x-offset={`${editingBlock.xOffset}px`}
                        style:--block-height={`${editingBlock.height}px`}
                        style:--block-color-1={colorTrio[0]}
                        style:--block-color-2={colorTrio[1]}
                        style:--block-color-3={colorTrio[2]}
                        style:z-index={2000}
                        id="edit-block"
                        on:pointerdown={onBlockPointerDown}
                    >
                        <div class="routine-block__content">
                            <div class="flx-algn-center">
                                {#if isFirstLast}
                                    {@const opacity = isLight ? 0.8 : 0.5}
                                    <div 
                                        class="routine-block__order-icon"
                                        title={`${isFirst ? "First routine of the day." : "Last routine of the day."}`}
                                    >
                                        <SvgIcon 
                                            icon={isFirst ? Icon.Sun : Icon.Moon} 
                                            options={{
                                                height: 16, width: 16, opacity: 0.4, scale: 0.58, color: `rgba(${colorTrio[0]}, ${opacity})`
                                            }}
                                        />
                                    </div>
                                {/if}
                                <span class="routine-block__title">
                                    {editingBlock.title || "Untitled"}
                                </span>
                            </div>
                            <div class="routine-block__time-period">
                                <span>{startTimeStr}</span>
                                <span>-</span>
                                <span>{endTimeStr}</span>
                            </div>
                            <div class="routine-block__spine"></div>
                        </div>

                        <!-- confirm buttons or duplicate edit -->
                        {#if editContext === "duplicate" && !isDragging}
                            {@const placement = manager.findDupBtnPlacement()}

                            <div 
                                class="routine-block__buttons"
                                class:routine-block__buttons--left={placement === "left"}
                                class:routine-block__buttons--right={placement === "right"}
                                class:routine-block__buttons--top={placement === "top"}
                                class:routine-block__buttons--bottom={placement === "bottom"}
                            >
                                {#if dropArea?.offsetIdx ?? -1 >= 0}
                                    <button 
                                        class="routine-blocks__dup-add"
                                        on:click={() => manager.confirmDuplicate()}    
                                    >
                                        <i class="fa-solid fa-check"></i>
                                    </button>
                                {/if}
                                <button 
                                    class="routine-blocks__dup-cancel"
                                    on:click={() => manager.closeDuplicateEdit()}
                                >
                                    <SvgIcon 
                                        icon={Icon.Close} 
                                        options={{ scale: 0.84, strokeWidth: 1.8, width: 10, height: 10 }}
                                    />
                                </button>
                            </div>
                        {/if}
                    </div>
                {/if}

                <!-- drop area -->
                {#if editingBlock?.dropArea?.doShow && (editContext === "lift" || editContext === "duplicate")}
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    {@const colorTrio = getColorTrio(editingBlock.color, isLight)}
                    {@const startTimeStr = minsFromStartToHHMM(editingBlock.startTime)}
                    {@const endTimeStr = minsFromStartToHHMM(editingBlock.endTime)}
                    {@const { top } = editingBlock.dropArea}

                    <div 
                        class="routine-block"
                        class:routine-block--drop-area={true}
                        id="drop-area-block"
                        style:top={`${top}px`}
                        style:--block-height={`${editingBlock.height}px`}
                        style:--block-color-1={colorTrio[0]}
                        style:--block-color-2={colorTrio[1]}
                        style:--block-color-3={colorTrio[2]}
                        title="Untitled Block"
                    >
                        <div class="routine-block__content">
                            <div class="flx-algn-center">
                                <span class="routine-block__title">
                                    {editingBlock.title}
                                </span>
                            </div>
                            <div class="routine-block__time-period">
                                <span>{startTimeStr}</span>
                                <span>-</span>
                                <span>{endTimeStr}</span>
                            </div>
                        </div>
                    </div> 
                {/if}
            </div>
            
            <div class="hour-blocks-container" class:scroll-bar-hidden={true}>
                <div 
                    class="hour-blocks"
                    class:hour-blocks--light={isLight}
                >
                    {#each Array.from({ length: 24 }, (_, i) => i) as timeIdx}
                        {@const headOffsetPerc = ((timeIdx * 60) / 1440) * 100}
                        {@const height         = (60 / 1440) * 100}
                        <div 
                            class="hour-blocks__block"
                            class:hidden={timeIdx === 0}
                            style:height={`${height}%`}
                            style:top={`calc(${headOffsetPerc}% - 1.5px)`}
                        >
                            <span>
                                {getTimeFromIdx(timeIdx).toLowerCase()}
                            </span>
                            <div class="hour-blocks__block-vert-divider">
                                <svg xmlns="http://www.w3.org/2000/svg" width="2" height="27" viewBox="0 0 0 0" fill="none">
                                    <path d="M1.25684 0.614746V 28" stroke-width="1" stroke-dasharray="2 2"/>
                                </svg>
                            </div>
                        </div>
                    {/each}
                </div>
            </div>

            <div class="wk-grid" class:wk-grid--light={isLight}>
                <div class="wk-grid__hoz-lines">
                    {#if timeBoxElem}
                        {@const width = blocksContainerWidth}
                        {#each Array.from({ length: 24 }, (_, i) => i) as timeIdx}
                            {@const headOffsetPerc = ((timeIdx * 60) / 1440) * 100}
                            {@const height = (60 / 1440) * 100}
                            <div 
                                class="wk-grid__hoz-line"
                                class:hidden={timeIdx === 0}
                                style:top={`calc(${headOffsetPerc}% - 2px)`}
                                style:height={`${height}%`}
                            >
                                <div class="wk-grid__hoz-line-content">
                                    <svg xmlns="http://www.w3.org/2000/svg" {width} height="2" viewBox={`0 0 ${width} 2`} fill="none">
                                        <path d={`M0 1H ${width}`} stroke-width="0.7" stroke-dasharray="3 3"/>
                                    </svg>
                                </div>
                            </div>
                        {/each}
                    {/if}
                </div>
                <div class="wk-grid__vert-lines">
                    {#if timeBoxElem}
                        {@const height = blocksContainerRef.clientHeight}
                        <div 
                            class="wk-grid__vert-line"
                            style:top="-1px"
                            style:left="0px"
                            style:height={`${height}px`}
                        >
                            <div class="wk-grid__vert-line-content">
                                <svg xmlns="http://www.w3.org/2000/svg" width="2" {height} viewBox={`0 0 2 ${height}`} fill="none">
                                    <path d={`M1 ${height}L1 1`} stroke-width="0.7" stroke-dasharray="3 3"/>
                                </svg>
                            </div>
                        </div>
                    {/if}
                </div>
            </div>
        </div>

        <DropdownList
            id={"daily-routines"}
            isHidden={!contextMenu}
            options={{
                listItems: EDIT_BLOCK_OPTIONS,
                styling: { 
                    width: "140px",
                    zIndex: 100
                },
                onListItemClicked: ({ name }) => {
                    onOptnClicked(name)
                },
                onDismount: onMenuDismount,
                onClickOutside:() => {
                    contextMenu = false
                },
                position: { 
                    top: contextMenuPos.top + "px", 
                    left: contextMenuPos.left + "px" 
                }
            }}
        />
    </div>
</div>

{#if editContext === "details" && editingBlock}
    <EditBlockModal 
        block={editingBlock} routineManager={manager} 
    />
{/if}


<style lang="scss">
    @import "../../../../scss/day-box.scss";
    @import "../../../../scss/dropdown.scss";
    @import "../../../../scss/inputs.scss";
    @import "../../../../scss/components/routines.scss";

    $hour-blocks-top-offset: 55px;
    $hour-block-height: 50px;
    $hour-blocks-width: 50px;

    .routine {
        display: flex;
        width: 100%;
        height: calc(100% - 58px);

        &__blocks-wrapper {
            width: 100%;
            display: flex;
            height: calc(($hour-block-height * 24));
        }
    }

    .wk-grid {
        height: calc(($hour-block-height * 24));
        width: calc(100% - $hour-blocks-width);
    }
    
    .routine-blocks-container {
        flex: 1;
        position: relative;
        height: calc(100% - 35px);
        overflow-y: scroll;
    }

    .routine-blocks {
        @include abs-top-left(-1px, var(--left-offset));
        width: calc(100% - var(--left-offset));
        height: calc(($hour-block-height * 24));
    }

    .routine-block {
        width: 80%;
        max-width: 180px;
    }
</style>