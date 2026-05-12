
<script>
    let { productImgs, currentIndex, lightboxOpen, updateCurrentIndex } = $props();
</script>


<div class="thumbnails hide-sm show-lg">
    {#each productImgs as img, index (img.id)}
        <button class="thumbnail" onclick={() => updateCurrentIndex(index)}>
            <img 
                class="thumbnail thumbnail-{img.id} {index === currentIndex && !lightboxOpen ? 'active' : ''}" 
                src={img.image} 
                alt={img.alt} />
        </button>
    {/each}
</div>

<style>
    .thumbnails {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: var(--space-400);
    }

    .thumbnail {
        border: none;
        background-color: transparent;
        width: var(--space-1100);
        height: var(--space-1100);
        padding: 0;
        border-radius: calc(10 / 16 * 1rem);
        cursor: pointer;
    }

    .thumbnail img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .thumbnail.active {
        border: .125rem solid var(--orange-500);
        opacity: 0.6;
    }

    .hide-sm {
        display: none;
    }

    @media (min-width: 64rem) {

        .hide-lg {
            display: none;
        }

        .show-lg {
            display: flex;
        }

        .enable-lg {
            pointer-events: auto;
        }
    }

</style>