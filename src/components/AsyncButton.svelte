<script lang="ts">
	import { inlineStyling } from "$lib/utils-general";

    export let title = "Save"
    export let isLoading: boolean
    export let actionFunc: AsyncFunc
    export let styling: StylingOptions | undefined = undefined

    async function _actionFunc() {
        if (isLoading) return
        await actionFunc()
    }
</script>

<button 
    class="async-btn" 
    class:async-btn--loading={isLoading}
    style={inlineStyling(styling)}
    disabled={isLoading}
    on:click={_actionFunc}
>
    {#if isLoading}
        <div 
            class="async-btn__dots loading-dots"
            style:--dots-color={"white"}
        >
            <span></span>
            <span></span>
            <span></span>
        </div>
    {:else}
        {title}
    {/if}
</button>

<style lang="scss">
    .async-btn {
        height: 39px;
        width: 94px;
        position: relative;
        border-radius: 15px;
        background-color: rgba(var(--fgColor1));
        @include center;
        @include text-style(1, 500, 1.28rem);

        &--loading {
            opacity: 0.8 !important;
        }
        &--loading:hover {
            filter: brightness(1) !important;
        }
        &:hover {
            filter: brightness(1.1);
        }

        &__dots {
            @include pos-abs-top-left-corner(50%, 50%);
        }
    }
</style>