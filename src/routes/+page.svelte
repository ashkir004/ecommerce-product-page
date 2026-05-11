<script lang="ts">
    import Navbar from "$lib/components/Navbar.svelte";
    import Carousel from "$lib/components/Carousel.svelte";
    import QuantitySelector from "$lib/components/Quantity-Selector.svelte";
    import Cart from "$lib/components/Cart.svelte";

    let isCartOpen = $state(false);

    type Product = {
        name: string;
        price: number;
        quantity: number;
    };

    let basket: { product: Product }[] = $state([]);
    let product = $state({
        name: 'Fall Limited Edition Sneakers',
        price: 125.00,
        quantity: 0
    });

    function toggleCart() {
        isCartOpen = !isCartOpen;
    }

    function increaseQuantity() {
        product.quantity += 1;
    }

    function decreaseQuantity() {
        if (product.quantity > 0) {
            product.quantity -= 1;
        }
    }

    function addToCart() {
        if (product.quantity > 0) {
            basket = [...basket, { product }];         
        }
    }

    function removeFromCart(index: number) {
        basket = basket.filter((_, i) => i !== index);
    }



</script>

<main>
    <Navbar toggleCart={toggleCart} basket={basket} />
    <Cart isCartOpen={isCartOpen} basket={basket} removeFromCart={removeFromCart} />
    <Carousel />
    <section class="product-details">
        <h2 class="company-name">Sneaker Company</h2>
        <h1 class="product-name">Fall Limited Edition Sneakers</h1>
        <p class="description">
            These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they’ll withstand everything the weather can offer.
        </p>
        <div class="price-wrapper">
            <span class="current-price">$125.00</span>
            <span class="discount">50%</span>
            <span class="original-price">$250.00</span>
        </div>
        <div class="add-to-cart-wrapper">
            <QuantitySelector 
                increaseQuantity={increaseQuantity} 
                decreaseQuantity={decreaseQuantity} 
                quantity={product.quantity} 
            />

            <button class="add-to-cart-btn"
                onclick={addToCart}>
                Add to Cart
            </button>
        </div>
    </section>
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: var(--space-600);
        max-width: calc(600 / 16 * 1rem);
        margin: var(--space-400) auto var(--space-800);
        font-family: 'Kumbh Sans', sans-serif;
    }

    .product-details {
        display: flex;
        flex-direction: column;
        gap: var(--space-300);
        padding: 0 var(--space-300);
        text-wrap-style: pretty;
    }

    .company-name {
        color: var(--grey-500);
        font-size: var(--font-xxs);
        font-weight: var(--w-bold);
        letter-spacing: var(--letter-spacing-md);
        text-transform: uppercase;
    }

    .product-name {
        color: var(--grey-950);
        font-size: var(--font-lg);
        font-weight: var(--w-bold);
        line-height: var(--line-height-xl);
    }

    .price-wrapper {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: var(--space-300);
    }

    .description {
        color: var(--grey-500);
        font-size: var(--font-sm);
        font-weight: var(--w-regular);
        line-height: var(--line-height-lg);
    }

    .current-price {
        color: var(--grey-950);
        font-size: var(--font-lg);
        font-weight: var(--w-bold);
        line-height: var(--line-height-xl);
    }

    .discount {
        color: var(--white);
        background-color: var(--grey-950);
        padding: var(--space-25) var(--space-100);
        font-size: var(--font-md);
        font-weight: var(--w-bold);
        line-height: var(--line-height-lg);
        border-radius: var(--space-50);
    }

    .original-price {
        color: var(--grey-500);
        font-size: var(--font-md);
        font-weight: var(--w-bold);
        line-height: var(--line-height-lg);
        text-decoration: line-through;
        margin-left: auto;
    }

    .add-to-cart-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--space-200);
    }

    .add-to-cart-btn {
        width: 100%;
        background-color: var(--orange-500);
        color: var(--grey-950);
        border: none;
        padding: var(--space-200);
        font-size: var(--font-md);
        font-weight: var(--w-bold);
        line-height: var(--line-height-lg);
        border-radius: var(--space-50);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .add-to-cart-btn::before {
        content: '';
        width: var(--space-250);
        height: var(--space-250);
        display: inline-block;
        margin-right: var(--space-200);
        background-color: var(--grey-950);
        mask-image: url('$lib/assets/images/icon-cart.svg');
        mask-size: contain;
        mask-repeat: no-repeat;
    }

    

    @media (min-width: 48rem) {

        .product-details {
            padding: 0;
        }

        .price-wrapper {
            max-width: 12rem;
            flex-wrap: wrap;
            column-gap: var(--space-200);
            row-gap: var(--space-100);
        }

        .original-price {
            margin-left: 0;
        }

        .add-to-cart-wrapper {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: var(--space-100);
        }

    }

    @media (min-width: 64rem) {
        main {
            width: 100%;
            max-width: calc(900 / 16 * 1rem);
            display: grid;
            grid-template-columns: 1fr 1fr;
            column-gap: var(--space-1600);
            row-gap: var(--space-1200);
        }


        .add-to-cart-btn {
            flex-grow: 2;
        }

    }

    @media (min-width: 80rem) {
        main {
            max-width: calc(1024 / 16 * 1rem);
        }
    }
    
</style>