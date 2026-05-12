<script>

    import Img1 from "$lib/assets/images/image-product-1.jpg";
    import Img2 from "$lib/assets/images/image-product-2.jpg";
    import Img3 from "$lib/assets/images/image-product-3.jpg";
    import Img4 from "$lib/assets/images/image-product-4.jpg";
    import Lightbox from "$lib/components/Lightbox.svelte";
	import Thumbnails from "./Thumbnails.svelte";
	import Control from "./Control.svelte";


    const productImgs = [
        {
            id: 1,
            image: Img1,
            alt: "First Product"
        },
        {
            id: 2,
            image: Img2,
            alt: "Second Product"
        },
        {
            id: 3,
            image: Img3,
            alt: "Third Product"
        },
        {
            id: 4,
            image: Img4,
            alt: "Fourth Product"
        }
    ];

    let currentIndex = $state(0);
    let lightboxOpen = $state(false);

    function setCurrentIndex(index) {
        return currentIndex = index;
    }

    function goPrevious() {
        if (currentIndex > 0) {
            currentIndex -= 1;
        } else {
            currentIndex = productImgs.length - 1;
        }
    }

    function goNext() {
        if (currentIndex < productImgs.length - 1) {
            currentIndex += 1;
        } else {
            currentIndex = 0;
        }
    }

    function closeLightbox() {
        lightboxOpen = false;
    }

    function openLightbox() {
        lightboxOpen = true;
    }


</script>

<div class="carousel">
    <button class="content disable-sm enable-lg" aria-label="Open Lightbox"
        onclick={() => openLightbox()}>
        <img 
            class="product-img product-img-{productImgs[currentIndex].id} {lightboxOpen ? 'static-img' : ''}" 
            src={lightboxOpen ? productImgs[0].image : productImgs[currentIndex].image} 
            alt={productImgs[currentIndex].alt} />
    </button>

    <Control goPrevious={goPrevious} goNext={goNext}/>

    <Thumbnails 
        productImgs={productImgs} 
        currentIndex={currentIndex} 
        lightboxOpen={lightboxOpen}
        setCurrentIndex={setCurrentIndex}
    />
</div>

{#if lightboxOpen}
    <Lightbox  
        productImgs={productImgs} 
        currentIndex={currentIndex} 
        goPrevious={goPrevious} 
        goNext={goNext} 
        lightboxOpen={lightboxOpen}
        closeLightbox={closeLightbox}
        setCurrentIndex={setCurrentIndex}
    />
{/if}

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
        /* background-color: var(--orange-500); */
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