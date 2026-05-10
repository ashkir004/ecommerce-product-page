<script>

    import Img1 from "$lib/assets/images/image-product-1.jpg";
    import Img2 from "$lib/assets/images/image-product-2.jpg";
    import Img3 from "$lib/assets/images/image-product-3.jpg";
    import Img4 from "$lib/assets/images/image-product-4.jpg";
    import next from "$lib/assets/images/icon-next.svg";
    import previous from "$lib/assets/images/icon-previous.svg";

    const products = [
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

    function goPrevious() {
        if (currentIndex > 0) {
            currentIndex -= 1;
        } else {
            currentIndex = products.length - 1;
        }
    }

    function goNext() {
        if (currentIndex < products.length - 1) {
            currentIndex += 1;
        } else {
            currentIndex = 0;
        }
    }
</script>

<div class="carousel">
    <button class="content disable-sm enable-lg"
        onclick={() => lightboxOpen = true}>
        <img 
            class="product-img product-img-{products[currentIndex].id}" 
            src={products[currentIndex].image} 
            alt={products[currentIndex].alt} />
    </button>
    <div class="control hide-lg">
        <button class="previous" onclick={goPrevious}>
            <img src={previous} alt="Previous Button" />
        </button>
        <button class="next" onclick={goNext}>
            <img src={next} alt="Next Button" />
        </button>
    </div>
    <div class="thumbnails hide-sm show-lg">
        {#each products as product, index (product.id)}
            <button class="thumbnail" onclick={() => currentIndex = index}>
                <img 
                    class="thumbnail thumbnail-{product.id} {index === currentIndex ? 'active' : ''}" 
                    src={product.image} 
                    alt={product.alt} />
            </button>
        {/each}
    </div>
</div>


<div class="lightbox {lightboxOpen ? 'show-lg' : 'hide-lg'} hide-sm">
    <button class="close" onclick={() => lightboxOpen = false} aria-label="Close Lightbox"></button>
        <button class="content">
            <img 
                class="product-img product-img-{products[currentIndex].id}" 
                src={products[currentIndex].image} 
                alt={products[currentIndex].alt} />
        </button>
        <div class="control">
            <button class="previous" onclick={goPrevious}>
                <img src={previous} alt="Previous Button" />
            </button>
            <button class="next" onclick={goNext}>
                <img src={next} alt="Next Button" />
            </button>
        </div>
        <div class="thumbnails hide-sm show-lg">
            {#each products as product, index (product.id)}
                <button class="thumbnail" onclick={() => currentIndex = index}>
                    <img 
                        class="thumbnail thumbnail-{product.id} {index === currentIndex ? 'active' : ''}" 
                        src={product.image} 
                        alt={product.alt} />
                </button>
            {/each}
        </div>
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
        /* background-color: var(--orange-500); */
        overflow: hidden;
        border: none;
        cursor: pointer;
    }

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

    .product-img {
        width: 100%;
        height: 100%;
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