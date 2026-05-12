<script>
    import next from "$lib/assets/images/icon-next.svg";
    import previous from "$lib/assets/images/icon-previous.svg";

    let { goPrevious, goNext, lightboxOpen = false } = $props();
</script>



<div class="control {lightboxOpen ? 'show-lg' : 'hide-lg'} ">
    <button class="previous" onclick={goPrevious}>
        <img src={previous} alt="Previous Button" />
    </button>
    <button class="next" onclick={goNext}>
        <img src={next} alt="Next Button" />
    </button>
</div>

<style>

    .control {
        width: 100%;
        max-width: 28rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .previous {
        margin-left: var(--space-100);
    }

    .next {
        margin-right: var(--space-100);
    }

    button.previous, button.next {
        background-color: var(--white);
        border: none;
        width: var(--space-500);
        height: var(--space-500);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }

    @media (min-width: 64rem) {
        .hide-lg {
            display: none;
        }

        .show-lg {
            display: flex;
        }
    }
</style>
