<script lang="ts">
	export let visible: boolean;
	const bars = Array(12).fill(0);
</script>

<div class="loading-wrapper" data-visible={visible}>
	<div class="loading-spinner">
		{#each bars as _, i (i)}
			<div class="loading-bar" />
		{/each}
	</div>
</div>

<style lang="scss">
    .loading-wrapper {
        --size: 18px;
        height: var(--size);
        width: var(--size);
        position: absolute;
        inset: 0;
        z-index: 10;
    }
    .loading-wrapper[data-visible='false'] {
        transform-origin: center;
        animation: spinner-fade-out 0.2s ease forwards;
    }

    .loading-spinner {
        position: relative;
        top: 50%;
        left: 50%;
        height: var(--size);
        width: var(--size);
    }

    .loading-bar {
        animation: spinner-spin 1.2s linear infinite;
        background: hsl(0, 0%, 43.5%);
        border-radius: 6px;
        height: 8%;
        left: -10%;
        position: absolute;
        top: -3.9%;
        width: 24%;
    }

    .loading-bar:nth-child(1) {
        animation-delay: -1.2s;
        transform: rotate(0.0001deg) translate(146%);
    }

    .loading-bar:nth-child(2) {
        animation-delay: -1.1s;
        transform: rotate(30deg) translate(146%);
    }

    .loading-bar:nth-child(3) {
        animation-delay: -1s;
        transform: rotate(60deg) translate(146%);
    }

    .loading-bar:nth-child(4) {
        animation-delay: -0.9s;
        transform: rotate(90deg) translate(146%);
    }

    .loading-bar:nth-child(5) {
        animation-delay: -0.8s;
        transform: rotate(120deg) translate(146%);
    }

    .loading-bar:nth-child(6) {
        animation-delay: -0.7s;
        transform: rotate(150deg) translate(146%);
    }

    .loading-bar:nth-child(7) {
        animation-delay: -0.6s;
        transform: rotate(180deg) translate(146%);
    }

    .loading-bar:nth-child(8) {
        animation-delay: -0.5s;
        transform: rotate(210deg) translate(146%);
    }

    .loading-bar:nth-child(9) {
        animation-delay: -0.4s;
        transform: rotate(240deg) translate(146%);
    }

    .loading-bar:nth-child(10) {
        animation-delay: -0.3s;
        transform: rotate(270deg) translate(146%);
    }

    .loading-bar:nth-child(11) {
        animation-delay: -0.2s;
        transform: rotate(300deg) translate(146%);
    }

    .loading-bar:nth-child(12) {
        animation-delay: -0.1s;
        transform: rotate(330deg) translate(146%);
    }

    @keyframes spinner-fade-in {
        0% {
            opacity: 0;
            transform: scale(0.8);
        }
        100% {
            opacity: 1;
            transform: scale(1);
        }
    }

    @keyframes spinner-fade-out {
        0% {
            opacity: 1;
            transform: scale(1);
        }
        100% {
            opacity: 0;
            transform: scale(0.8);
        }
    }

    @keyframes spinner-spin {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0.15;
        }
    }
</style>