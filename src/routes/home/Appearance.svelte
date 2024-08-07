<script lang="ts">
	import { onMount } from "svelte"
	import { ModalType } from "$lib/enums"
	import { closeModal } from "$lib/utils-home"
	import { themeState } from "$lib/store"
	import { getThemeFromSection, setNewTheme } from "$lib/utils-appearance"
    import { lightColorThemes, darkColorThemes, defaultThemes } from "$lib/data-themes"

    import dfImage1 from '$lib/images/df-theme-1.png'
    import dfImage2 from '$lib/images/df-theme-2.png'
    import dfImage3 from '$lib/images/df-theme-3.png'

	import Modal from "../../components/Modal.svelte"

    let clickedTheme: Theme | null = null
    let selectedTheme: Theme | null = null

    const themeImgs = [dfImage1, dfImage2, dfImage3]

    /* Theme item Stuff */
    function handleThemeSelected() {
        const title = clickedTheme!.sectionDetails.title as keyof AppearanceSectionToThemeMap
        const idx = clickedTheme!.sectionDetails.index
        selectedTheme = getThemeFromSection(title, idx)
        clickedTheme = null

        setNewTheme(selectedTheme)
    }
    function onThemeItemFocus(theme: Theme) {
        const title = theme.sectionDetails.title
        const idx = theme.sectionDetails.index
        const isSelf = title === clickedTheme?.sectionDetails.title && idx === clickedTheme?.sectionDetails.index
        const isPickedTheme = title === selectedTheme?.sectionDetails.title && idx === selectedTheme?.sectionDetails.index

        if (isSelf) {
            clickedTheme = null
        }
        else if (!isPickedTheme) {
            clickedTheme = theme
        }
    }
    function onThemeItemBlur(event: FocusEvent) {
        const target = event.relatedTarget as HTMLElement
        if (target?.classList.value.includes("apply-btn")) return
        clickedTheme = null
    }

    /* General UI Handlers */
    function handleEnterPressed(event: KeyboardEvent) {
        if (event.key != "Enter" || clickedTheme === null) return
        handleThemeSelected()
    }

    onMount(() => { 
        selectedTheme = JSON.parse(localStorage.getItem("theme")!)
    })
</script>

<svelte:window on:keydown={handleEnterPressed} />

<Modal 
    options={{ borderRadius: "17px", overflow: "hidden" }}
    onClickOutSide={() => closeModal(ModalType.Appearance)}
>
    <div class="appearance" class:appearance--light={!$themeState.isDarkTheme}>
        <h1 class="appearance__title modal-bg__content-title">
            Appearance
        </h1>
        <!-- Default Themes -->
        <div class="default-themes bento-box">
            <h3 class="bento-box__title">
                Default Themes
            </h3>
            <div class="default-themes__selection">
                {#each defaultThemes as theme, idx}
                    {@const clicked  = "default" === clickedTheme?.sectionDetails.title && idx === clickedTheme?.sectionDetails.index}
                    {@const selected = "default" === selectedTheme?.sectionDetails.title && idx === selectedTheme?.sectionDetails.index}
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <div 
                        class="default-themes__item"
                        class:default-themes__item--selected={selected}
                        class:default-themes__item--clicked={clicked}
                        on:click={() => onThemeItemFocus(theme)}
                        role="button"
                        tabindex="0"
                    >
                        <div 
                            class="default-themes__item-img-container"
                        >
                            <img src={themeImgs[idx]} alt="theme-img">
                        </div>
                        <span
                            class:txt-selected={selected}
                            class:txt-clicked={clicked}
                        >
                            {theme.title}
                        </span>
                    </div>
                {/each}
            </div>
        </div>
        <!-- Color Themes -->
        <div class="color-themes bento-box">
            <h3 class="bento-box__title">
                Color Themes
            </h3>
            <!-- Light Themes -->
            <div class="color-themes__light-themes">
                <div class="bento-box__subheading">Light Themes</div>
                <ul class="color-themes__themes-list">
                    {#each lightColorThemes as theme, idx}
                        {@const clicked  = "light" === clickedTheme?.sectionDetails.title && idx === clickedTheme?.sectionDetails.index}
                        {@const selected = "light" === selectedTheme?.sectionDetails.title && idx === selectedTheme?.sectionDetails.index}
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <li   
                            on:click={() => onThemeItemFocus(theme)}
                            on:blur={onThemeItemBlur}
                            role="button" 
                            tabindex="0"
                            class="color-themes__item"
                        >
                            <ul 
                                class="color-themes__swatch-list"
                                class:color-themes__swatch-list--selected={selected}
                                class:color-themes__swatch-list--clicked={clicked}
                            >
                                {#each theme.colorPalette as color}
                                    <li 
                                        class="color-themes__swatch" 
                                        style={`background-color: ${color}`}
                                    >
                                    </li>
                                {/each}
                            </ul>
                            <div 
                                class="color-themes__item-text"
                                class:txt-selected={selected}
                                class:txt-clicked={clicked}
                            >
                                {theme.title}
                            </div>
                        </li>
                    {/each}
                </ul>
            </div>
            <!-- Dark Themes -->
            <div class="color-themes__dark-themes">
                <div class="bento-box__subheading">Dark Themes</div>
                <ul class="color-themes__themes-list">
                    {#each darkColorThemes as theme, idx}
                        {@const clicked  = "dark" === clickedTheme?.sectionDetails.title && idx === clickedTheme?.sectionDetails.index}
                        {@const selected = "dark" === selectedTheme?.sectionDetails.title && idx === selectedTheme?.sectionDetails.index}                    
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <li 
                            on:click={() => onThemeItemFocus(theme)}
                            on:blur={onThemeItemBlur}
                            role="button" 
                            tabindex="0"
                            class="color-themes__item"
                        >
                            <ul 
                                class="color-themes__swatch-list"
                                class:color-themes__swatch-list--selected={selected}
                                class:color-themes__swatch-list--clicked={clicked}
                            >
                                {#each theme.colorPalette as color}
                                    <li 
                                        class="color-themes__swatch" 
                                        style={`background-color: ${color}`}
                                    >
                                    </li>
                                {/each}
                            </ul>
                            <div class="theme-item__text theme-item__text--color-theme">
                                <div 
                                    class="color-themes__item-text"
                                    class:txt-selected={selected}
                                    class:txt-clicked={clicked}
                                >
                                    {theme.title}
                                </div>
                            </div>
                        </li>
                    {/each}
                </ul>
            </div>
        </div>
        <div 
            class="appearance-apply-btn-container"
            class:visible={clickedTheme}
        >
            <button 
                on:click={handleThemeSelected} 
                class="appearance__apply-btn"
            >
                {`Choose "${clickedTheme?.title}"`}
            </button>
        </div>
    </div>
</Modal>

<style lang="scss">
    @import "../../scss/highlighter-tabs.scss";

    $section-spacing: 8px;
    $desktop-aspect-ratio: calc(16 / 10);
    $video-aspect-ratio: calc(16 / 9);
    $selected-color: rgba(var(--fgColor1), 1);

    .appearance {
        width: 85vw;
        max-width: 700px;
        padding: $settings-modal-padding;
        padding: 16px 24px 20px 24px;

        &--light .default-themes {
            &__item-img-container {
                @include txt-color(0.08, "bg");
                border: 1.5px solid rgba(var(--textColor1), 0.05);
            }
            span {
                @include text-style(1);
            }
        }
        &--light .color-themes__item-text {
            @include text-style(1, 600);
        }
        &--light .bento-box {
            &__title { 
                @include text-style(1, 600);
            }
            &__subheading {
                @include text-style(1, 600);
            }
        }
        &__title {
            margin-bottom: 18px;
        }
        &__description {
            margin-top: 8px;
        }
        &-wrapper {
            position: relative;
        }
        &-apply-btn-container {
            @include abs-bottom-right(25px, 20px);
            @include flex(center, flex-end);
            height: 20px;
            position: absolute;
            min-width: 100px;
            visibility: hidden;
            opacity: 0;
        }
        &-apply-btn-container button {
            margin-right: 20px;
            padding: 8.5px 20px;
            font-size: 1.2rem;
            border-radius: 20px;
            background-color: rgb(var(--fgColor2));
            color: rgb(var(--textColor2));

            &:hover, &:focus {
                filter: brightness(1.05);
            }
        }
    }
    .theme-item {
        position: relative;
        transition: 0.11s ease-in-out;
        cursor: pointer;
        border-radius: 5px;
        margin-right: 20px;
        outline: none;

        img {
            border-radius: 3px;
            object-fit: cover;
            aspect-ratio: $desktop-aspect-ratio;
            width: 100%;
            -webkit-user-drag: none;                
        }
    }
    .bento-box {
        margin-bottom: $section-spacing;
        position: relative;
        border-radius: 16px;
        overflow: hidden;

        &__title { 
            @include text-style(0.7, 500, 1.2rem);
        }
        &__subheading {
            @include text-style(0.55, 500, 1.18rem);
            margin-bottom: 17px;
            display: none;
        }
    }
    /* Sections */
    .default-themes {
        padding-bottom: 20px;

        &__selection {
            margin-top: 20px;
            display: flex;
            padding-bottom: 10px;
        }
        &__item {
            position: relative;
            transition: 0.11s ease-in-out;
            cursor: pointer;
            border-radius: 5px;
            margin-right: 20px;
            outline: none;
            margin-right: 20px;
            transition: 0.1s ease-in-out;
            cursor: pointer;

            &:active {
                transform: scale(0.994);
            }
            &--clicked &-img-container {
                box-shadow: rgba(var(--textColor1), 0.4) 0px 0px 0px 2.5px;   
            }
            &--selected &-img-container {
                box-shadow: rgba(#0C8CE9, 0.85) 0px 0px 0px 2.5px;
            }
        } 
        &__item-img-container {
            @include txt-color(0.02, "bg");
            position: relative;
            margin: 0px 5px 10px 0px;
            width: 140px;
            aspect-ratio: calc(3 / 2);
            border-radius: 14px;
            border: 1.5px solid rgba(var(--textColor1), 0.035);
            overflow: hidden;
        }
        &__item img {
            width: 160px;
            @include abs-bottom-right(-30px, -45px);
        }
        span {
            @include text-style(0.8, 500, 1.2rem);
            margin: 4px 0px 0px 4px;
        }
    }
    .color-themes {
        padding-bottom: 30px;

        &__selection-item {
            height: 70px;
            margin: 0px;
        }
        &__themes-list {
            display: grid;
            grid-template-columns: repeat(auto-fill, 107px);
            width: 100%;
        }
        &__light-themes {
            margin: 14px 0px 20px 0px;
        }
        &__item {
            position: relative;
            transition: 0.11s ease-in-out;
            cursor: pointer;
            border-radius: 5px;
            margin-right: 20px;
            height: 55px;
            outline: none;
            
            &:active {
                transform: scale(0.99);
            }
        }
        &__item-text {
            margin-top: 5px;
            @include elipses-overflow;
            @include text-style(0.78, 500, 1.15rem);
        }
        &__swatch-list {
            transition: 0.15s ease-in-out;
            height: 20px;
            width: 90px;
            border-radius: 5px;
            display: flex;

            &--clicked {
                box-shadow: rgba(var(--textColor1), 0.4) 0px 0px 0px 3px;
            }
            &--selected {
                box-shadow: rgba(#0C8CE9, 0.85) 0px 0px 0px 3px;
            }
        }
        &__swatch {
            transition: 0.15s ease-in-out;
            width: 20px;
            aspect-ratio: 1 / 1;
            border-radius: 2px;
            margin-right: -2.6px;

            &:first-child {
                border-top-left-radius: 4px;
                border-bottom-left-radius: 4px;
                }
            &:last-child {
                border-top-right-radius: 4px;
                border-bottom-right-radius: 4px;
            }
        }
    }
    .txt-selected {
        color: rgba(#0C8CE9, 0.8) !important;
    }
    .txt-clicked {
        color: rgba(var(--textColor1), 0.4) !important;
    }
</style>