<script lang="ts">
    import Navbar from "$lib/components/Navbar.svelte";
    import Carousel from "$lib/components/Carousel.svelte";
    import QuantitySelector from "$lib/components/QuantitySelector.svelte";
    import Cart from "$lib/components/Cart.svelte";

    let isCartOpen = $state(false);
    let focusCheckoutTick = $state(0);
    let focusEntryTarget = $state<'delete' | 'checkout'>('delete');

    type Product = {
        name: string;
        company: string;
        description: string;
        price: number;
        discount: number;
        quantity: number;
    };

    let basket: { product: Product }[] = $state([]);
    let product = $state(
        {
            name: 'Fall Limited Edition Sneakers',
            company: 'Sneaker Company',
            description: 'These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they’ll withstand everything the weather can offer.',
            price: 125.00,
            discount: 50,
            quantity: 0
        }
    );

    function toggleCart(open?: boolean) {
        isCartOpen = open ?? !isCartOpen;
    }

    function openCartFromIcon() {
        if (isCartOpen) {
            toggleCart(false);
            return;
        }

        focusEntryTarget = 'delete';
        toggleCart(true);
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

        const existingItemIndex = basket.findIndex(item => item.product.name === product.name);
        if (existingItemIndex !== -1) {
            basket[existingItemIndex].product.quantity += product.quantity;
            basket = [...basket];
        } else {
            if (product.quantity === 0) product.quantity = 1;
            // shallow-copy the product so the basket owns its own snapshot
            basket = [...basket, { product: { ...product } }];
        }

        focusEntryTarget = 'checkout';
        toggleCart(true);
        focusCheckoutTick += 1;
    }

    function removeFromCart(index: number) {
        basket = basket.filter((_, i) => i !== index);
    }

</script>

<main class="main">
    <Navbar isCartOpen toggleCart={toggleCart} basket={basket} openCartFromIcon={openCartFromIcon} />
    <Carousel />
    <section class="product-details">
        <h1 class="company-name">{product.company}</h1>
        <h2 class="product-name">{product.name}</h2>
        <p class="description">
            {product.description}
        </p>
        <div class="price-wrapper">
            <span class="current-price">${product.price.toFixed(2)}</span>
            <span class="discount">{product.discount}%</span>
            <span class="original-price">${(product.price / (1 - product.discount / 100)).toFixed(2)}</span>
        </div>
        <div class="add-to-cart-wrapper">
            <QuantitySelector 
                increaseQuantity={increaseQuantity} 
                decreaseQuantity={decreaseQuantity} 
                quantity={product.quantity} 
            />

            <button class="add-to-cart-btn"
                onclick={addToCart}
                aria-label="Add Product to Cart">
                Add to Cart
            </button>
        </div>
    </section>
    <Cart
        isCartOpen={isCartOpen}
        basket={basket}
        removeFromCart={removeFromCart}
        toggleCart={toggleCart}
        focusCheckoutTick={focusCheckoutTick}
        focusEntryTarget={focusEntryTarget}
    />
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
        cursor: pointer;
    }

    .add-to-cart-btn:hover {
        background-color: var(--orange-300);
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