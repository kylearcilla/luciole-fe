<script lang="ts">
	import { themeState } from "../lib/store";
	import { DARK_COLOR_PROGRESS, LIGHT_COLOR_PROGRESS } from "../lib/utils-colors"

    export let progress = 0
    export let options = {
        monotone: false
    }

    const { monotone } = options
    
    $: isLight = !$themeState.isDarkTheme
    $: updateColor(isLight, progress)

    let fgColor = "rgba(255, 255, 255, 0.9)"

    function updateColor(light: boolean, progress: number) {
        const settings = light ? LIGHT_COLOR_PROGRESS : DARK_COLOR_PROGRESS
        const { max, min, gVal, bVal } = settings
        const isTerracotta = $themeState.lightTheme === "terracotta" && isLight
        const rval = Math.max(max - ((max - min) * (progress)), min)

        // colored progress for terracotta creates too low contrast
        if (monotone) {
            fgColor = "rgba(var(--textColor1), 0.45)"
        }
        else if (isTerracotta) {
            fgColor = "var(--elemColor1)"
        }
        else {
            fgColor = `rgb(${rval}, ${gVal}, ${bVal})`
        }
    }
</script>

<div class="progress" class:progress--light={isLight}>
    <div 
        class="slider"
        style:--fg-width={`${progress * 100}%`}
        style:--fg-color={fgColor}
    >
    </div>
</div>

<style lang="scss">
    .progress {
        @include flex(center);
        --slider-bg-opacity: 0.1;

        &--light {
            --slider-bg-opacity: 0.075;
        }
    }
    .slider {
        width: 30px;
        height: 3px;
        border-radius: 2px;
        background-color: rgba(var(--textColor1), var(--slider-bg-opacity));
        position: relative;

        &::before {
            content: " ";
            @include abs-top-left;
            width: var(--fg-width);
            background: var(--fg-color);
            transition: 0.1s cubic-bezier(.4,0,.2,1);
            border-radius: 10px;
            height: 100%;
        }
    }
</style>
