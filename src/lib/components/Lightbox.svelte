
<script>
    import { trapFocus } from '$lib/attachment.svelte';
	import Control from "./Control.svelte";
    import Thumbnails from "./Thumbnails.svelte";

    let { productImgs, currentIndex, goPrevious, goNext, lightboxOpen, closeLightbox, setCurrentIndex } = $props();
        

</script>


<div class="lightbox {lightboxOpen ? 'show-lg' : 'hide-lg'} hide-sm" role="presentation" {@attach (element) => trapFocus(element, '.close', '.lightbox')}>
        <button class="close" onclick={() => closeLightbox()} aria-label="Close Lightbox"></button>
        <button class="content" aria-label="View Product Image in Lightbox">
            <img 
                class="product-img product-img-{productImgs[currentIndex].id}" 
                src={productImgs[currentIndex].image} 
                alt={productImgs[currentIndex].alt} />
        </button>
        
        <Control goPrevious={goPrevious} goNext={goNext} lightboxOpen={lightboxOpen} />

        <Thumbnails 
            productImgs={productImgs} 
            currentIndex={currentIndex} 
            lightboxOpen={lightboxOpen}
            setCurrentIndex={setCurrentIndex}
        />
</div>
<style>
    .carousel {
        max-width: 100%;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--space-400);
    }

    .content {
        max-width: 100%;
        width: 100%;
        height: 100%;
        overflow: hidden;
        border: none;
        cursor: pointer;
    }

    .product-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .control {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        position: absolute;
        top: 0;
        left: 0;
        transform: translateY(400%);
    }

    .previous {
        margin-left: var(--space-100);
    }

    .next {
        margin-right: var(--space-100);
    }

    
    .lightbox {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgb(0, 0, 0, 0.85);
        z-index: 999;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: var(--space-400);
    }
    
    .lightbox .content {
        width: 100%;
        max-width: 28rem;
        height: auto;
    }
    
    .lightbox .control {
        max-width: 28rem;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    button.close {
        content: '';
        width: var(--space-200);
        height: var(--space-200);
        background-color: var(--orange-500);
        mask-image: url('$lib/assets/images/icon-close.svg');
        mask-size: contain;
        mask-repeat: no-repeat;
        mask-position: right;
        width: 28rem;
        cursor: pointer;
    }

    .close:focus {
       background-color: var(--white);
    }

    .disable-sm {
        pointer-events: none;
    }
    
    .hide-sm {
        display: none;
    }

    .object-contain {
        display: block;
        object-fit: contain;
    }

    @media (min-width: 48rem) {

        .carousel {
            width: calc(600 / 16 * 1rem);
            margin: auto;
            max-width: 100%;
        }

        .content {
            background-color: var(--orange-500);
            max-width: 100%;
            height: 20rem;
            border-radius: var(--space-200);
        }

        .product-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .product-img-1 {
            object-position: 0% 60%;
        }

        .product-img-2 {
            object-position: 0% 0%;
        }

        .product-img-3 {
            object-position: 0% 10%;
        }

        .product-img-4 {
            object-position: 0% 20%;
        }
    }

    @media (min-width: 64rem) {
        .carousel {
            width: auto;
        }

        .static-img {
            object-fit: contain;
        }

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