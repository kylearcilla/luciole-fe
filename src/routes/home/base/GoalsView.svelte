<script lang="ts">
	import { onMount } from "svelte"
	import { themeState } from "$lib/store"

    import { Icon } from "$lib/enums"
    import { GoalsViewManager } from "$lib/goals-view-manager"
	import { capitalize, kebabToNormal, normalToKebab } from "$lib/utils-general"
	import { getNextTimeFrame, isGoalPinned, setViewGoal } from "$lib/utils-goals"
    
    import GoalsList from "./GoalsList.svelte"
	import GoalsBoard from "./GoalsBoard.svelte"
	import DropdownList from "$components/DropdownList.svelte"

    export let manager: GoalsViewManager
    export let goals: Goal[]
    export let options: GoalsView
    export let timeFrame: { year: number, period: string }

    $: state = manager.state
    $: pinnedGoal = $state.pinnedGoal
    $: light = !$themeState.isDarkTheme
    $: nextTimeFrame = getPushTime(timeFrame)

    let store: GoalsViewState | null = null

    let statusOpen = false
    let statusMenuPos = { top: 0, left: 0 }
    let snippetRef: HTMLElement
    let width = 0
    let snippetHeight = 0
    let rightContainerRef: HTMLElement
    let closing = false

    manager.state.subscribe((data) => {
        store = data
    })

    $: if (pinnedGoal && snippetRef) {
        requestAnimationFrame(() => {
            snippetHeight = snippetRef.clientHeight
        })
    }

    function getPushTime(time: { year: number, period: string }) {
        const nextTimeFrame = getNextTimeFrame(time)
        const period = time.period
        const diffYear = nextTimeFrame.year != time.year
        
        return period === "all" ? nextTimeFrame.year : diffYear ? nextTimeFrame.year : capitalize(nextTimeFrame.period)
    }
    function onListItemClicked(goal: Goal, newStatus: string) {
        const status = normalToKebab(newStatus) as "accomplished" | "in-progress" | "not-started"

        manager.setGoalStatus(goal, status)
        manager.closeContextMenu()
        statusOpen = false
        closing = true
    }

    onMount(() => manager.initContainerRef(rightContainerRef))
</script>

<div 
    class="goals-view"
    class:goals-view--sm={width < 600}
    class:goals-view--light={light}
    style:--truncate-lines={pinnedGoal?.img ? 2 : 5}
    bind:clientWidth={width}
>
    {#if pinnedGoal}
        {@const { status, img, description, name } = pinnedGoal}
        {@const done = status === "accomplished"}
        <div class="goals-view__left">
            <div class="goals-view__pinned">
                {#if img}
                    <div 
                        role="button"
                        tabindex="0"
                        class="goals-view__pinned-img"
                        on:click={() => {
                            setViewGoal(pinnedGoal)
                        }}
                    >
                        <img src={img.src} alt={name} />
                    </div>
                {/if}
                <div class="goals-view__pinned-text">
                    <span>
                        {done ? "Done!" : "Pinned"}
                    </span>
                    <!-- svelte-ignore a11y-missing-attribute -->
                    <button 
                        class="goals-view__pinned-title hov-underline"
                        class:strike={done}
                        title={name}
                        on:click={() => {
                            setViewGoal(pinnedGoal)
                        }}
                    >
                        {name}
                    </button>

                    <div 
                        class="goals-view__pinned-text-snippet"
                        class:goals-view__pinned-text-snippet--fade={snippetHeight > 100}
                        bind:this={snippetRef}
                    >
                        {description}
                    </div>
                </div>
            </div>
        </div>
    {/if}
    <div 
        bind:this={rightContainerRef}
        class="goals-view__right"
        style:overflow={options.view === "board" ? "scroll" : "unset"}
    >
        {#if options.view === "list"}
            <GoalsList 
                {timeFrame}
                {manager}
                {pinnedGoal}
                options={options.list}
            />
        {:else if options.view === "board"}
            <div style:padding-left="4px">
                <GoalsBoard 
                    {manager}
                    {pinnedGoal}
                    options={options.board}
                />
            </div>
        {/if}

        {#if store}
            {@const { contextMenuPos, editGoal, contextMenuOpen } = store }
            {@const periodPinned = pinnedGoal?.id === editGoal?.id}
            {@const carouselPinned = isGoalPinned(editGoal)}
            {@const currPeriod = capitalize(timeFrame.period)}

            <DropdownList
                id={"goals-menu"}
                isHidden={!contextMenuOpen}
                options={{
                    listItems: [
                        { 
                            name: "View Details",
                            divider: true
                        },
                        { 
                            name: periodPinned ? `Unpin from ${currPeriod}` : `Pin to ${currPeriod}`,
                            rightIcon: { 
                                type: "svg",
                                icon: Icon.Pin
                            },
                        },
                        { 
                            divider: true,
                            name: carouselPinned ? "Unpin from Top" : "Pin up Top"
                        },
                        {
                            name: "Change Status",
                            rightIcon: { 
                                type: "svg",
                                icon: Icon.ChevronRight
                            },
                            onPointerOver: ({ childLeft }) => {
                                statusMenuPos.top = contextMenuPos.top
                                statusMenuPos.left = childLeft

                                if (!closing) {
                                    statusOpen = true
                                }
                            },
                            onPointerLeave: () => {
                                statusOpen = false
                            }
                        },
                        { 
                            name: `Push to ${nextTimeFrame}`, 
                            rightIcon: { 
                                type: "fa", 
                                icon: "fa-solid fa-arrow-right",
                                transform: "scale(1.2) translate(-1px, 0px)"
                            },
                            divider: true
                        },
                        { 
                            name: "Remove" 
                        },
                    ],
                    parentContext: {
                        container: rightContainerRef,
                        childId: "statuses"
                    },
                    onListItemClicked: ({ name }) => {
                        manager.onOptionClicked(name)
                    },
                    onClickOutside: () => {
                        manager.closeContextMenu(!statusOpen)
                        statusOpen = false
                    },
                    styling: { 
                        width: "140px",
                        zIndex: 500,
                    },
                    position: { 
                        top: `${contextMenuPos.top}px`, 
                        left: `${contextMenuPos.left}px`,
                    }
            }}
        />
    
        <DropdownList 
            id={"statuses"}
            isHidden={!statusOpen || !contextMenuOpen}
            options={{
                pickedItem: kebabToNormal(editGoal?.status ?? ""),
                listItems: [
                    { name: "Not Started" },
                    { name: "In Progress" },
                    { name: "Accomplished" },
                ],
                styling:  { 
                    width: "125px",
                    zIndex: 501,
                },
                position: { 
                    top: `${statusMenuPos.top + 50}px`, 
                    left: `${statusMenuPos.left}px`,
                },
                parent: {
                    id: "goals-menu",
                    optnIdx: 0,
                    optnName: "Change Status"
                },
                onDismount: () => {
                    closing = false
                },
                onPointerLeave: () => {
                    statusOpen = false
                },
                onListItemClicked: ({ name }) => {
                    onListItemClicked(editGoal, name)
                }
            }}
        />
    {/if}

    </div>
</div>


<style lang="scss">
    .goals-view {
        @include flex(flex-start, space-between);
        gap: 25px;
        border-top: var(--divider-border);
        padding-top: 12px;

        &--light &__pinned span {
            @include text-style(0.3);
        }
        &--sm {
            display: block;
        }
        &--sm &__left {
            width: 100%;
            margin-bottom: 12px;
            padding-bottom: 10px;
            border-bottom: 0.5px solid rgba(var(--textColor1), 0.045);
        }
        &--sm &__pinned-container {
            width: calc(100% - 15px);
            margin: 10px 0px 12px 15px;
            padding-bottom: 9px;
            border-bottom: 0.5px solid rgba(var(--textColor1), 0.045);
        }
        &--sm &__pinned {
            display: flex;
        }
        &--sm &__pinned-progress {
            @include abs-top-right(-12px, 0px);
        }
        &--sm &__pinned-img {
            min-width: 110px;
            width: 110px;
            height: 110px;
            margin-right: 20px;
        }
        &--sm &__pinned-text-snippet {
            @include truncate-lines(2);
            mask-image: unset;
            -webkit-mask-image: unset;  
        }

        &__left {
            width: 160px;
            min-width: 160px;
        }
        &__right {
            flex: 1;
            position: relative;
        }

        /* pinned */
        &__pinned-progress {
            margin: 13px 0px 11px 0px;
        }
        &__pinned span {
            display: block;
            @include text-style(0.2, var(--fw-400-500), 1.4rem);
        }
        &__pinned-img {
            width: 100%;
            object-fit: cover;
            margin: 2px 0px 7px 0px;

            img {
                transition: 0.18s transform cubic-bezier(.4, 0, .2, 1);
                @include square(100%, 6px);
                aspect-ratio: 1/1;
                object-fit: cover;
                cursor: pointer;
            }
            img:hover {
                transform: scale(1.01) rotate(2deg);
            }
            img:active {
                transform: scale(0.99) rotate(2deg) !important;
            }
        }
        &__pinned-title {
            @include text-style(1, var(--fw-400-500), 1.75rem);
            @include truncate-lines(var(--truncate-lines));
            cursor: pointer;
            margin: 6px 0px 9px 0px;
        }
        &__pinned-title.strike {
            opacity: 0.4 !important;
        }
        &__pinned-text-snippet {
            @include text-style(0.55, var(--fw-400-500), 1.5rem);
            word-break: break-word;
        }
        &__pinned-text-snippet--fade {
            mask-image: linear-gradient(to bottom, #000 0%, transparent 70%);
            -webkit-mask-image: linear-gradient(to bottom, #000 0%, transparent 70%);
        }
    }
</style>