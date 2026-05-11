<script>
    import minus from '$lib/assets/images/icon-minus.svg';
    import plus from '$lib/assets/images/icon-plus.svg';

    let { increaseQuantity, decreaseQuantity, quantity } = $props();

</script>



<div class="quantity-selector">
    <button class="decrease" onclick={decreaseQuantity}>
        <img src={minus} alt="Decrease Quantity Button" />
    </button>
    <span class="quantity">{quantity}</span>
    <button class="increase" onclick={increaseQuantity}>
        <img src={plus} alt="Increase Quantity Button" />
    </button>
</div>


<style>
    .quantity-selector {
        background-color: bisque;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        gap: var(--space-300);
        width: 100%;
        padding: var(--space-200);
        border-radius: var(--space-50);
    }

    button {
        border: none;
        color: var(--orange-500);
        background-color: transparent;
    }

    .quantity {
        color: var(--grey-950);
        font-size: var(--font-md);
        font-weight: var(--w-bold);
        line-height: var(--line-height-xl);
    }

    @media (min-width: 64rem) {
        .quantity-selector {
            flex-basis: 60%;
            gap: var(--space-400);
        }
    }


</style>