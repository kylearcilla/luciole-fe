<script lang="ts">
	import { addCommasToNum, clickOutside, shorterNum } from "../../lib/utils-general";
	import { formatDateToMDY } from "../../lib/utils-date";
    import { currentYtVidId, ytUserData, ytCurrentVid, ytCredentials, colorThemeState, homePanelData } from "$lib/store";
	import { onDestroy, onMount } from 'svelte';
	import { getChannelDetails, getPlayListDetails, getVidDetails, initOAuth2Client, resetYtUserData, saveYtUserData } from "$lib/api-youtube";

    // @ts-ignore
    let player: YT.Player;
    let currentVidIdx = 0;
    let hasError = false
    
    let ytData: YoutubeUserData = {
        username: '',
        channelImgSrc: '',
        email: '',
        selectedPlaylist: null,
        playlists: []
    }
    let ytVidDetails: YoutubeVideo = {
        id: "",
        title: "",
        likeCount: 0,
        viewCount: 0,
        publishedAt: "",
        channelName: "",
        channelImgSrc: "",
        channelSubs: 0
    }

    let isLightTheme = false
    let isColorPaletteTheme = false
    let isMultiColorTheme = false
    let isVidPlayerShown = false
    let isTaskMenuExpanded = true
    let isNavMenuExpanded = true
    let doMinimizeYtPanel = false
    let isDropDownOpen = false
    let doHideMyPlaylists = false

    const options = ["Log In", "Hide My Playlists"]

    let plPanelElement: HTMLDivElement

    homePanelData.subscribe((data) => {
        isNavMenuExpanded = data.isNavMenuOpen
        isTaskMenuExpanded = data.isTaskMenuOpen
        handleResize()
    })
    colorThemeState.subscribe((theme) => {
        isLightTheme = !theme.isDarkTheme
        isColorPaletteTheme = ["light", "dark"].includes(theme.sectionTitle)
    })
    currentYtVidId.subscribe((idx) => {
        currentVidIdx = idx
    })
    ytCurrentVid.subscribe((data: any) => {
        ytVidDetails = data
    })
    ytUserData.subscribe(async (data) => {
        if (data.username === "") {
            options[0] = "Log In"
        } else {
            options[0] = "Log Out"
        }
        if (!data.selectedPlaylist) {
            ytData = { ...ytData, ...data }
            player.stopVideo()
            hidePlaylist()
            return
        }

        const selectedPlaylistId = data.selectedPlaylist?.id ?? "No current selected playlist!"
        const hasUserToggledSettings = data.selectedPlaylist?.id === ytData.selectedPlaylist?.id
        const hasUserDeselectedPlaylist = !data.selectedPlaylist && ytData.selectedPlaylist
        const hasUserSelectedNewPlaylist = (data.selectedPlaylist?.id != ytData.selectedPlaylist?.id) && !hasUserDeselectedPlaylist
        
        ytData = { ...ytData, ...data }
        
        if (hasUserDeselectedPlaylist) {
            hidePlaylist()
        }
        if (hasUserSelectedNewPlaylist) {
            const res = await getPlayListDetails(selectedPlaylistId)
            const userHasSelectedPrivatePlaylist = res.error != null
            
            if (userHasSelectedPrivatePlaylist) {
                hasError = true;
                hidePlaylist();
                return;
            } else {
                currentVidIdx = -1
                hasError = false
                const vidId = res.items[0].snippet.resourceId.videoId;
                await updateVidDetails(vidId)
            }
        }
        if (selectedPlaylistId != "No current selected playlist!" && !hasUserToggledSettings) {
            if (player.stopVideo) player.stopVideo()
            showPlaylist()
            player.loadPlaylist({
                list: selectedPlaylistId,
                listType: "playlist",
                index: 0
            });
            isVidPlayerShown = true
        }
    })
    function showPlaylist() {
        const playerDiv = document.getElementById("player")!;
        playerDiv.style.display = "flex";
    }
    function hidePlaylist() {
        if (player && player.stopVideo) player.stopVideo()
        const playerDiv = document.getElementById("player")!;
        playerDiv.style.display = "none";

        isVidPlayerShown = false
    }
    
    // triggers when page reloads
    async function onReady() {
        if (!ytData.selectedPlaylist?.id) return 
        isVidPlayerShown = true

        // see if there was a saved vid index that user was watching before start off with that vid
        // otherwise default to first vid
        const startVidIdx = JSON.parse(localStorage.getItem("currentVidIdIndex") ?? "0");
        player.cuePlaylist({
            list: ytData.selectedPlaylist!.id,
            listType: "playlist",
            index: startVidIdx,
        });
        currentYtVidId.update(() => startVidIdx)
        
        // update vid details, show the saved vid, otherwise use the first vid as default
        const vidIdxWasSaved = localStorage.getItem("currentVidIdIndex");
        if (vidIdxWasSaved) {
            updateVidDetails(localStorage.getItem("currentVidId")!)
        } else {
            const res = await getPlayListDetails(ytData.selectedPlaylist!.id)
            const vidId = res.items[0].snippet.resourceId.videoId;
            updateVidDetails(vidId)
            localStorage.setItem("currentVidId", vidId)
        }
    }
    // triggers only when player plays a vid whose embed option has been disabled or is private
    function onError() {
    }
    // only triggers when user has clicked a new vid or new playlist
    async function onStateChange() {
        if (player.getPlaylistIndex() === currentVidIdx) return;
        currentYtVidId.update(() => player.getPlaylistIndex())
        
        localStorage.setItem("currentVidIdIndex", player.getPlaylistIndex())
        const vidId = player.getPlaylist()[player.getPlaylistIndex()]
        localStorage.setItem("currentVidId", vidId)
        updateVidDetails(vidId)
    }
    async function updateVidDetails(vidId: string) {
        const vidDetailsRes = await getVidDetails(vidId);
        const channelDetailsRes = await getChannelDetails(vidDetailsRes.items[0].snippet.channelId);

        const currentVidObject: any = {
            id: vidDetailsRes.items[0].id,
            title: vidDetailsRes.items[0].snippet.title,
            likeCount: shorterNum(vidDetailsRes.items[0].statistics.likeCount),
            viewCount: addCommasToNum(vidDetailsRes.items[0].statistics.viewCount),
            publishedAt: formatDateToMDY(vidDetailsRes.items[0].snippet.publishedAt),
            channelName: vidDetailsRes.items[0].snippet.channelTitle,
            channelImgSrc: channelDetailsRes.items[0].snippet.thumbnails.default.url,
            channelSubs: shorterNum(channelDetailsRes.items[0].statistics.subscriberCount)
        };

        ytCurrentVid.update(() => currentVidObject)
    }
    function initPlayer() {
        // @ts-ignore
        window.onYouTubeIframeAPIReady = () => {
            // @ts-ignore
            player = new YT.Player('player', {
                height: '100%',
                width: '100%',
                playerVars: {
                    autoplay: 0,
                    modestbranding: 1,
                    rel: 0,
                    volume: 50
                },
                events: {
                    onReady: onReady,
                    onStateChange: onStateChange,
                    onError: onError,
                },
            });
        };
    }

    const togglePlPanelMenuDropDown = () => isDropDownOpen = !isDropDownOpen
    const handleDropdownOptionClicked = (index: number) => {
        isDropDownOpen = false

        if (index === 0 && ytData.email === "") {
            initOAuth2Client()
        } 
        else if (index === 0 && ytData.email != "") {
            resetYtUserData()
        }
        else if (index === 1) {
            doHideMyPlaylists = !doHideMyPlaylists
            options[1] = options[1] === "Hide My Playlists" ? "Show My Playlists" : "Hide My Playlists"
        }
    }
    const handleChoosePlaylist = (index: number) => {
        const newPlaylist = ytData.playlists[index]
        ytUserData.set({ ...ytData, selectedPlaylist: newPlaylist })
        saveYtUserData({ ...ytData, selectedPlaylist: newPlaylist })
    }
    function handleResize() {
        let isBothExpanded = isTaskMenuExpanded && isNavMenuExpanded
        let isBothMin = !isTaskMenuExpanded && !isNavMenuExpanded
        let isJustTaskViewExpanded =  !isNavMenuExpanded && isTaskMenuExpanded

        /* Both Closed */
        if (document.body.clientWidth < 600) {
            doMinimizeYtPanel = true
        }
        if (document.body.clientWidth >= 600 && isBothMin) {
            doMinimizeYtPanel = false
        }
        /* Both Open */
        if (document.body.clientWidth < 1100 && isBothExpanded) {
            doMinimizeYtPanel = true
        }
        if (document.body.clientWidth >= 1100 && isBothExpanded) {
            doMinimizeYtPanel = false
        }
        /* Just Task View Open */
        if (document.body.clientWidth < 850 && isJustTaskViewExpanded) {
            doMinimizeYtPanel = true
        }
        if (document.body.clientWidth >= 850 && isJustTaskViewExpanded) {
            doMinimizeYtPanel = false
        }
    }
    onDestroy(() => {
        window.removeEventListener("resize", handleResize)
        
        const playerDiv = document.getElementById("player")!;
        if (playerDiv) playerDiv.remove();
    })
    onMount(() => {
        window.addEventListener("resize", handleResize)
        handleResize()

        if (localStorage.getItem('yt-user-data')) {
            const ytData = JSON.parse(localStorage.getItem('yt-user-data')!)
            ytUserData.set({ ...ytData });
            options[0] = "Log Out"
        }
        else {
            options[0] = "Log In"
        }
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';

        const ytScriptTag = document.getElementsByTagName('script')[0];
        ytScriptTag.id = "ytScriptTag"
        ytScriptTag!.parentNode!.insertBefore(tag, ytScriptTag);
        initPlayer();
    })
</script>

<div class="vid-view">
    <!-- Video Player -->
    <div class={`vid-view-container ${!isVidPlayerShown ? "vid-view-container--player-hidden" : ""}`}>
        <div id="player">
        </div>
        {#if !ytData.selectedPlaylist}
            <div class="vid-view-empty-vid-view">
                <p class="vid-view-empty-msg">No Playlist Selected</p>
            </div>
        {:else if hasError}
            <div class="vid-view-empty-vid-view">
                <div class="text-aln-center">
                    <p class="vid-view-empty-msg">Playlist / Video can't be played</p>
                        <a
                        class="vid-view-support-link"
                        target="_blank"
                        href="https://support.google.com/youtube/answer/97363?hl=en"
                        rel="noreferrer"
                        >
                        More info on unplayable embeded youtube content.
                    </a>
                </div>
            </div>
        {/if}
    </div>
    <!-- Video Details -->
    {#if ytData.selectedPlaylist?.id && !hasError}
        <div class={`vid-details-container ${isLightTheme ? "vid-details-container--light-mode" : ""}`}>
            <h3 class="vid-title">{ytVidDetails.title}</h3>
            <div class="vid-channel-details-container">
                <img alt="channel-profile-img" src={ytVidDetails.channelImgSrc} />
                <div class="vid-channel-details">
                    <span class="vid-channel-details__channel-name">{ytVidDetails.channelName}</span>
                    <span class="vid-channel-details__sub-count">
                        {ytVidDetails.channelSubs} Subscribers
                    </span>
                </div>
            </div>
        </div>
    {/if}
    <!-- Playlist Panel -->
    <div class={`playlist-panel 
                    ${(ytData?.username === "" || doHideMyPlaylists) ? "playlist-panel--my-pls-hidden" : ""}  
                    ${doMinimizeYtPanel ? "playlist-panel--small" : ""}
                    ${isLightTheme ? "playlist-panel--light" : "playlist-panel--dark"}
               `} 
        bind:this={plPanelElement}
    >
        <img class="img-bg" src={ytData?.selectedPlaylist?.thumbnailURL} alt="chosen-playlist">
        <div class={`blur-bg ${!ytData ? "blur-bg--solid-color" : "blur-bg--blurred-bg"}`}></div>
        <div class="content-bg">
            <div class="playlist-panel__content-container">
                <!-- User Top -->
                <div class="playlist-panel__top">
                    <!-- Left Side: Current Playlist -->
                    <div class="playlist-panel__left">
                        <!-- Current Playlist -->
                        <div class="playlist-panel__current-pl">
                            {#if ytData.selectedPlaylist}
                                <div class="playlist-panel__current-pl-img-container">
                                    <img src={ytData?.selectedPlaylist?.thumbnailURL} alt="current-playlist"/>
                                </div>
                                <div class="playlist-panel__current-pl-details">
                                    <!-- Title -->
                                    <h1>{ytData?.selectedPlaylist?.title}</h1>
                                    <!-- Header -->
                                    <div class="playlist-panel__header">
                                        <div class="playlist-panel__header-yt-logo">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="9" viewBox="0 0 14 9" fill="none">
                                                <path d="M4.56592 2.23535H12.2325V7.66267H4.56592V2.23535Z" fill="white"/>
                                                <path d="M13.3099 1.51744C13.16 0.99611 12.7184 0.585525 12.1577 0.446187C11.1413 0.192993 7.06567 0.192993 7.06567 0.192993C7.06567 0.192993 2.9901 0.192993 1.97369 0.446187C1.41294 0.585547 0.971306 0.99611 0.821414 1.51744C0.549072 2.46239 0.549072 4.43393 0.549072 4.43393C0.549072 4.43393 0.549072 6.40547 0.821414 7.35042C0.971306 7.87175 1.41294 8.26523 1.97369 8.40457C2.9901 8.65777 7.06567 8.65777 7.06567 8.65777C7.06567 8.65777 11.1412 8.65777 12.1577 8.40457C12.7184 8.26523 13.16 7.87175 13.3099 7.35042C13.5823 6.40547 13.5823 4.43393 13.5823 4.43393C13.5823 4.43393 13.5823 2.46239 13.3099 1.51744ZM5.73272 6.22395V2.64392L9.13911 4.43398L5.73272 6.22395Z" fill="#DF6B6B"/>
                                                </svg>                                          
                                        </div>
                                        <span class="playlist-panel__header-vid-count">
                                            {`${ytData?.selectedPlaylist?.vidCount} ${ytData?.selectedPlaylist?.vidCount === 1 ? "Video" : "Videos"}`}
                                        </span>
                                    </div>
                                </div>
                            {:else}
                                <div class="playlist-panel__current-pl-empty">
                                    <h4>No Playlist Chosen</h4>
                                </div>
                            {/if}
                        </div>
                    </div>
                    <!-- Right Side: Playlist Description -->
                    {#if ytData?.selectedPlaylist?.description}
                        <div class="playlist-panel__pl-descr-container">
                            <span>Description</span>
                            <p>{ytData?.selectedPlaylist?.description}</p>
                        </div>
                    {/if}
                </div>
                <!-- User Playlists -->
                {#if ytData?.username != ""}
                    <div class="playlist-panel__user-pls">
                        <div class="playlist-panel__user-pls-header">
                            <h1>My Playlists</h1>
                            <span>
                                {`${ytData.playlists.length} ${ytData.playlists.length > 1 ? "playlists" : "playlist"}`}
                            </span>
                        </div>
                        <ul class="playlist-panel__user-pls-list">
                            {#each ytData?.playlists as playlist, idx}
                                <li on:dblclick={() => handleChoosePlaylist(idx)}>
                                    <div class="divider"></div>
                                    <div class="playlist-panel__user-pls-vid">
                                        <div class="playlist-panel__user-pls-vid-thumbnail-container">
                                            <img src={playlist.thumbnailURL} alt="playlist-thumbnail">
                                        </div>
                                        <div class="playlist-panel__user-pls-vid-details">
                                            <h2>{playlist.title}</h2>
                                            <span>
                                                {`${playlist.vidCount} ${playlist.vidCount === 1 ? "Video" : "Videos"}`}
                                            </span>
                                            <p>{playlist.description}</p>
                                        </div>
                                    </div>
                                    {#if idx + 1 === ytData.playlists.length}
                                        <div class="divider"></div>
                                    {/if}
                                </li>
                            {/each}
                        </ul>
                    </div>
                {/if}
            </div>
            <!-- Settings Btn -->
            <div class="playlist-panel__settings-btn-container">
                <button on:click={() => isDropDownOpen = !isDropDownOpen} class="playlist-panel__header-settings-btn settings-btn dropdown">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20">
                        <g fill="none" stroke={`${!isLightTheme ? "rgba(255, 255, 255, 0.55)" : "rgba(0, 0, 0, 0.35)"}`} stroke-linecap="round" transform="translate(1 10)">
                            <circle cx="2.5" cy="0.8" r="1.2"></circle>
                            <circle cx="8.5" cy="0.8" r="1.2"></circle>
                            <circle cx="14.5" cy="0.8" r="1.2"></circle>
                        </g>
                    </svg>
                </button>
                <!-- Dropdown Menu -->
                {#if isDropDownOpen}
                    <ul use:clickOutside on:click_outside={() => isDropDownOpen = false} class="dropdown-menu">
                        {#each options as option, idx} 
                            <li class="dropdown-menu__option">
                                <button class="dropdown-element" on:click={() => handleDropdownOptionClicked(idx)}>
                                    <p>{option}</p>
                                </button>
                            </li>
                        {/each}
                    </ul>
                {/if}
            </div>
        </div>
    </div>
</div> 
<style lang="scss">
    $pl-panel-height--min: 77px;
    $pl-panel-border-radius: 18px;
    $pl-panel-user-pls-height: 200px;
    $pl-panel-height--max: $pl-panel-user-pls-height + 85;
    
    .vid-view {
        margin-top: 30px;
        position: relative;

        &__playlist-title {
            color: rgba(255, 255, 255, 0.9);
            float: right;
            @include pos-abs-top-right-corner(5px, 0px);
        }
        .vid-view-container {
            background-color: black;
            position: relative;
            aspect-ratio: 16 / 9;
            max-height: 500px;
            width: 100%;
            @include center;
        }
        #player {
            // width: 100%;
            // max-height: 500px;
            background-color: var(--primaryBgColor);
            // display: flex;
        }
        .vid-view-empty-vid-view {
            position: absolute;
            width: 100%;
            height: 100%;
            @include center;
            background-color: var(--hoverColor);
        }
        .vid-view-empty-msg {
            font-weight: 700;
            font-size: 1.4rem;
            color: rgb(var(--textColor2));
            margin-bottom: 15px;
            z-index: 1000;
        }
        .vid-view-support-link {
            padding-top: 20px;
            font-weight: 400;
            font-size: 1.2rem;
            color: #76B1FE;
        }
        .vid-view-refresh-button {
            font-weight: 700;
            font-size: 1rem;
            color: #999999;

            border-color: #999999;
            border-radius: 100px;

            &:hover {
                background-color: #999999;
                color: #181719;
            }

        }
        .vid-details-container {
            width: 100%;

            &--light-mode .vid-title {
                font-weight: 700;
            }
            &--light-mode .vid-channel-details__channel-name {
                font-weight: 600 !important;
            }
            &--light-mode .vid-channel-details__sub-count {
                font-weight: 400 !important;
            }

        }
        .vid-title {
            margin-top: 12px;
            color: rgba(var(--textColor1), 1);
            font-weight: 500;
        }
        .vid-channel-details-container {
            margin: 10px 0px 0px 0px;
            position: relative;
            width: 100%;
            @include flex-container(center, _);
            color: rgba(var(--textColor1), 0.7);
            
            img {
                border-radius: 100%;
                width: 25px;
                aspect-ratio: 1 / 1;
                margin-right: 10px;
            }
            .vid-channel-details {
                span {
                    display: block;
                }
                &__channel-name {
                    color: rgba(var(--textColor1), 0.9);
                    font-weight: 500;
                }
                &__sub-count {
                    color: rgba(var(--textColor1), 0.75);
                    margin-top: 2px;
                    opacity: 0.8;
                    font-weight: 300;
                }
            }
            .vid-like-count {
                position: absolute;
                top: 0px;
                right: 0px;
            }

        }
    }
    .playlist-panel {
        position: relative;
        margin: 25px 0px 160px 0px;
        border-radius: $pl-panel-border-radius;
        color: white;
        height: $pl-panel-height--max;
        overflow: hidden;

        .img-bg {
            border-radius: $pl-panel-border-radius;
        }
        .blur-bg {
            border-radius: $pl-panel-border-radius;
        }
        .content-bg {
            overflow: visible;
        }
        /* When Screen is Small */
        &--small &__left {
            width: 90%;
        }
        &--small &__pl-descr-container {
            display: none;
        }
        &--small &__user-pls {
            display: block;
        }
        &--small &__user-pls-vid-details {
            position: relative;
            width: 100%;
            span {
                @include pos-abs-top-right-corner(2px, 10px);
            }
            p {
                display: block;
            }
        }
        &--small &__user-pls-vid-thumbnail-container {
            width: 70px;
            position: relative;

        }
        /* When Pls is Hidden*/
        &--my-pls-hidden &__top {
            height: $pl-panel-height--min;
        }
        &--my-pls-hidden &__pl-descr-container {
            background-color: var(--midPanelAccentColor) !important;
            color: rgba(var(--midPanelAccentTextColor), 1) !important;
            padding: 18px 0px 0px 25px;
            overflow: hidden;
        }
        &--my-pls-hidden {
            height: 77px !important;
            overflow: visible;
        }
        &--my-pls-hidden &__user-pls {
            display: none;
        }
        &--my-pls-hidden {
            height: 185px;
        }
        &--my-pls-hidden &__header-settings-btn {
            right: 0px;
        }
        /* Dark Theme */
        &--dark .dropdown-menu {
            @include dropdown-menu-dark;
        }
        /* Light Theme */
        &--light {
            color: rgba(var(--textColor1), 0.9);
            border: var(--midPanelBorder);
            box-shadow: var(--midPanelShadow);

            .img-bg, .blur-bg {
                display: none;
            }
        }
        &--light &__top {
            background-color: var(--midPanelBaseColor);
        }
        &--light &__user-pls {
            background-color: var(--midPanelAccentColor);
            color: rgba(var(--midPanelAccentTextColor), 1);

            li {
                &:hover {
                    background-color: rgba(var(--midPanelAccentAltColor), 0.4);
                }
            }
        }

        &__content-container {
            width: 100%;
            display: block;
            border-radius: $pl-panel-border-radius;
            overflow: hidden;
        }
        &__top {
            display: flex;
            height: 85px;
            width: 100%;
        }
        &__left {
            width: 45%;
        }
        &__pl-descr-container {
            height: $pl-panel-height--min;
            width: 60%;
        }
        /* Current Playlist */
        &__current-pl {
            display: flex;
            position: relative;
            padding: 9px 0px 0px 9px;

            p {
                display: none;
            }
        }
        &__current-pl-empty {
            position: relative;
            width: 100%;
            h4 {
                margin-top: -20px;
                font-weight: 600;
                opacity: 0.7;
                @include abs-center;
            }
        }
        /* Playlist Details */
        &__current-pl-details {
            margin-top: 10px;
            position: relative;
            width: 100%;
            overflow: hidden;
            h1 {
                width: 90%;
                font-weight: 600;
                font-size: 1.2rem;
                margin-bottom: 4px;
                @include elipses-overflow;
            }
        }
        &__current-pl-img-container {
            margin-right: 15px;
            min-width: 105px;
            max-width: 105px;
            aspect-ratio: 16 / 9;
            img {
                width: 100%;
                border-radius: 10px;
                object-fit: cover;
            }
        }
        &__header {
            position: relative;
            width: 98%;
            margin-top: 5px;
            @include flex-container(center, _);
            h1 {
                font-size: 1.4rem;
            }
            span {
                margin: 0px 0px 3px 10px;
                opacity: 0.7;
                font-weight: 500;
                white-space: nowrap;
            }
        }
        &__settings-btn-container {
            @include pos-abs-top-right-corner(5px, 5px);
            
            .dropdown-menu {
                @include pos-abs-top-right-corner(32px, 0px);
                width: 120px;
            }
        }
        /* Current Playlist Description */
        &__pl-descr-container {
            background: none !important;
            padding: 18px 0px 0px 0px;

            span {
                opacity: 0.9;
                font-weight: 500;
                font-size: 1.05rem;
            }
            p {
                max-height: 28px;
                margin-top: 5px;
                width: 90%;
                opacity: 0.7;
                font-weight: 300;
                font-size: 1.05rem;
                @include elipses-overflow;
            }
        }

        /* User Playlists */
        &__user-pls {
            width: 100%;
            height: $pl-panel-user-pls-height;
            background-color: var(--midPanelAccentColor);
            color: rgba(var(--midPanelAccentTextColor), 1);

            ul {
                overflow-y: scroll;
                height: 85%;
            }
            li {
                .divider {
                    margin: 0px;
                    height: 0.5px;
                    background-color: rgba(var(--textColor1), 0.12);
                }
                &:hover {
                    background-color: rgba(50, 50, 50, 0.1);
                }
                &:last-child {
                    margin-bottom: 30px;
                }
            }
        }
        &__user-pls-header {
            @include flex-container(center, space-between);
            padding: 11px 15px 12px 20px;
            h1 {
                font-size: 1.3rem;
                white-space: nowrap;
                margin-right: 10px;
            }
            span {
                white-space: nowrap;
                font-weight: 600;
                opacity: 0.7;
                display: block;
            }
        }
        &__user-pls-vid {
            display: flex;
            padding: 8px 10px 8px 20px;
        }
        &__user-pls-vid-thumbnail-container {
            width: 60px;
            margin-right: 14px;
            max-width: 120px;
            img {
                width: 100%;
                margin-right: 10px;
                border-radius: 7px;
                aspect-ratio: 16 / 9;
            }
        }
        &__user-pls-vid-details {
            position: relative;
            overflow: hidden;
            h2 {
                font-size: 1.12rem;
                margin-bottom: 5px;
                @include elipses-overflow;
            }
            p {
                font-size: 0.95rem;
                @include elipses-overflow;
                max-width: 80%;
                display: none;
            }
            span {
                color: rgba(var(--textColor1), 0.6);
                font-size: 1rem;
            }
        }
    }
</style>