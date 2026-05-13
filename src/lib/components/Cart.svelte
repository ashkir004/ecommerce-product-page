
<script lang="ts">
    import productImg from '$lib/assets/images/image-product-1-thumbnail.jpg';
    import deleteImg from '$lib/assets/images/icon-delete.svg';

    let { isCartOpen, basket, removeFromCart, toggleCart, focusCheckoutTick = 0, focusEntryTarget = 'delete' } = $props();

    let cartNode: HTMLElement | undefined = $state();
    let checkoutButton: HTMLButtonElement | undefined = $state();
    let previousIsCartOpen = $state(false);
    let previousFocusCheckoutTick = $state(0);

    function getFocusableElements(node: HTMLElement): HTMLElement[] {
        return Array.from(
            node.querySelectorAll('button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')
        );
    }

    function focusCheckout() {
        checkoutButton?.focus();
    }

    function focusFirstDeleteOrFallback() {
        const firstDeleteButton = cartNode?.querySelector<HTMLButtonElement>('.delete-icon');
        if (firstDeleteButton) {
            firstDeleteButton.focus();
            return;
        }

        focusCheckout();
    }

    function trapFocusInCart(node: HTMLElement) {
        const handleKeydown = (event: KeyboardEvent) => {
            if (!isCartOpen) return;

            if (event.key === 'Escape') {
                toggleCart(false);
                const cartToggleButton = document.querySelector('.cart-btn');
                if (cartToggleButton instanceof HTMLElement) {
                    cartToggleButton.focus();
                }
                event.preventDefault();
                return;
            }

            if (event.key !== 'Tab') return;

            const focusable = getFocusableElements(node);
            if (focusable.length === 0) {
                event.preventDefault();
                return;
            }

            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            const current = document.activeElement;

            if (event.shiftKey && current === first) {
                last.focus();
                event.preventDefault();
            }

            if (!event.shiftKey && current === last) {
                first.focus();
                event.preventDefault();
            }
        };

        node.addEventListener('keydown', handleKeydown);

        return () => {
            node.removeEventListener('keydown', handleKeydown);
        };
    }

    $effect(() => {
        if (isCartOpen && !previousIsCartOpen) {
            queueMicrotask(() => {
                if (focusEntryTarget === 'delete') {
                    focusFirstDeleteOrFallback();
                    return;
                }

                focusCheckout();
            });
        }

        if (isCartOpen && focusCheckoutTick !== previousFocusCheckoutTick) {
            queueMicrotask(focusCheckout);
        }

        previousIsCartOpen = isCartOpen;
        previousFocusCheckoutTick = focusCheckoutTick;
    });

</script>

<section class="cart {isCartOpen ? 'show' : 'hide'}" tabindex="-1" bind:this={cartNode} {@attach (element) => trapFocusInCart(element)}>
    <div class="cart-header">
        <h1>Cart</h1>
    </div>
{#key basket.length }
    <div class="cart-items">
        <ul>
        {#if basket.length === 0}
            <li class="empty-cart">Your cart is empty.</li>
        {:else}
            {#each basket as item, index (index)}
                <li class="cart-item" > 
                    <img src={productImg} alt="Product" class="product-image" />
                    <div class="checkout-lines">
                        <p>
                            {item.product && item.product.name}
                            <span class="calculation">${item.product && item.product.price.toFixed(2)} x {item.product && item.product.quantity}</span>
                            <span class="total">${item.product && (item.product.price * item.product.quantity).toFixed(2)}</span>
                        </p>
                    </div>
                    <button class="delete-icon" onclick={() => removeFromCart(index)} aria-label="Remove Item from Cart">
                        <img src={deleteImg} alt="Delete Icon"  />
                    </button>
                </li>
            {/each}
        {/if}
        </ul>
        <button class="btn-checkout" bind:this={checkoutButton}>Checkout</button>
    </div>
{/key}
</section>

<style>
    .cart {
        background-color: var(--white);
        position: absolute;
        top: 0;
        width: 100%;
        max-width: calc(360 / 16 * 1rem);
        padding: var(--space-300) 0;
        margin: var(--space-1400) 0;
        border-radius: var(--space-150);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        z-index: 999;
    }

    .cart-header {
        border-bottom: 1px solid var(--grey-100);
        padding: 0 var(--space-300) var(--space-300);
    }

    .cart-header h1 {
        color: var(--black);
        font-size: var(--font-md);
        font-weight: var(--w-bold);
        line-height: var(--line-height-lg);
    }

    .cart-items {
        display: flex;
        flex-direction: column;
        gap: var(--space-300);
        padding: var(--space-300) var(--space-300) 0;
    }

    ul {
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: var(--space-300);
    }

    .cart-item {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
        gap: var(--space-200);
    }

    .product-image {
        width: 100%;
        max-width: calc(50 / 16 * 1rem);
        border-radius: var(--space-50);
    }

    .checkout-lines {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: var(--space-100);
        align-items: flex-end;
    }

    .checkout-lines .total {
        color: var(--grey-950);
        font-size: var(--font-md);
        font-weight: var(--w-bold);
        line-height: var(--line-height-lg);
    }

    .cart-item p {
        color: var(--grey-500);
        /* text-decoration: none; */
        font-size: var(--font-md);
        font-weight: var(--w-regular);
        line-height: var(--line-height-lg);
    }

    .delete-icon {
        background: none;
        border: none;
        padding: 0;
        cursor: pointer;
        align-self: center;
        margin-left: auto;
    }

    .btn-checkout {
        background-color: var(--orange-500);
        color: var(--black);
        border: none;
        padding: var(--space-200);
        border-radius: var(--space-150);
        cursor: pointer;
        font-size: var(--font-md);
        font-weight: var(--w-bold);
        width: 100%;
    }

    .btn-checkout:hover {
        background-color: var(--orange-300);
    }

    .show {
        display: block;
    }
    .hide {
        display: none;
    }

    @media (min-width: 48rem) {
        .cart {
            position: absolute;
            top: 0;
            right: 0;
            margin: var(--space-1400) var(--space-100) 0 0;
        }
    }

    @media (min-width: 80rem) {
        .cart {
            position: absolute;
            top: 0;
            right: 0;
            margin: var(--space-1400) var(--space-1600) 0 0;
        }
    }

</style>