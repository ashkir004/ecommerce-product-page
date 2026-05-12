<script>
    import menu from '$lib/assets/images/icon-menu.svg';
    import closeMenu from '$lib/assets/images/icon-close.svg';
    import logo from '$lib/assets/images/logo.svg';
    import cart from '$lib/assets/images/icon-cart.svg';
    import avatar from '$lib/assets/images/image-avatar.png';

    import { trapFocus } from '$lib/attachment.svelte';

    let activeTab = $state('Women');
    let tabs = ['Collections', 'Men', 'Women', 'About', 'Contact'];

    let isMenuOpen = $state(false);
    let { toggleCart, basket } = $props();

</script>

<header >
    <div class="menu_log-wrapper">
        <button class="menu {isMenuOpen ? 'hide-sm' : 'show-sm'} hide-lg"
                 onclick={() => { isMenuOpen = true; toggleCart(false) }} aria-label="Open Menu">
            <img src={menu} alt="Menu Icon"/>  
        </button>
        <img src={logo} alt="Ecommerce Product Page Logo" class="logo" />
    </div>
    <nav role="presentation"  class="{isMenuOpen ? 'show-sm' : 'hide-sm'} show-lg" 
        onkeydown={(e) => {
            if (e.key === 'Escape' && isMenuOpen) {
                isMenuOpen = false;
            }
        }}
    >
        <button
            onclick={() => isMenuOpen = false}
            class="close-menu {isMenuOpen ? 'show-sm' : 'hide-sm'} hide-lg" aria-label="Close Menu">
            <img src={closeMenu} alt="Close Menu Icon" />
        </button>
        <ul {@attach (element) => trapFocus(element, '.cart-btn')}>
            {#each tabs as tab, index (index)}
                <li class={tab === activeTab ? 'active' : ''}>
                    <a href={`#${tab}`} onclick={() => activeTab = tab}>{tab}</a>
                </li>
            {/each}
        </ul>
    </nav>

    <div class="cart_avatar-wrapper">
        <button onclick={() => toggleCart()} aria-label="Toggle Cart" class="cart-btn">
            <img src={cart} alt="Cart Icon" class="cart" /><span class="basket-length">{basket.length}</span>
        </button>
        <img src={avatar} alt="User Avatar" class="avatar" />
    </div>

</header>

<style>
    header {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        width: 100%;
        padding: 0 var(--space-300);
    }

    .menu {
        align-self: flex-end; 
    }

    nav {
        background-color: var(--white);
        position: absolute;
        top: 0;
        left: 0;
        width: 70%;
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: var(--space-700);
        padding: var(--space-400) var(--space-300) var(--space-300);
        z-index: 999;
        box-shadow: 0 2px 10px -2px var(--grey-500);
    }

    button {
        background: none;
        border: none;
        padding: 0;
        cursor: pointer;
    }

    nav ul {
        display: flex;
        flex-direction: column;
        gap: var(--space-300);
    }

    nav ul li {
        list-style: none;
        color: var(--grey-950);
    }

    nav ul li a {
        color: var(--grey-950);
        text-decoration: none;
        font-size: var(--font-md);
        font-weight: var(--w-bold);
        line-height: var(--line-height-xl);
    }

    .hide-sm {
        display: none;
    }

    .show-sm {
        display: flex;
    }

    .menu_log-wrapper {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: var(--space-200);
    }

    .cart_avatar-wrapper {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: var(--space-300);
        margin-left: auto;
    }

    .avatar {
        width: 100%;
        max-width: var(--space-300);
        height: auto;
    }

    .cart_avatar-wrapper button {
        position: relative;
        background-color: aliceblue;
    }

    .basket-length {
        color: var(--white);
        background-color: var(--orange-500);
        font-size: var(--font-xxs);
        font-weight: var(--w-bold);
        line-height: var(--line-height-sm);
        padding: 0 var(--space-100);
        border-radius: var(--space-200);
        position: absolute;
        top: -6px;
        right: -10px;
        min-width: var(--space-100);
    }

    @media (min-width: 48rem) {

        header {
            align-items: center;
            border-bottom: 1px solid var(--grey-100);
            padding-bottom: var(--space-400);
            padding-inline: 0;
        }

        nav {
            padding-left: var(--space-1100);
            padding-top: var(--space-600);
        }

        .cart_avatar-wrapper {
            gap: var(--space-600);
            
        }

        .avatar {
            max-width: var(--space-650);
        }

    }

    @media (min-width: 64rem) {

        header {
            padding-bottom: 0;
            gap: var(--space-700);
            grid-column: 1 / 3;
        }

        nav {
            position: static;
            width: auto;
            height: auto;
            background-color: transparent;
            box-shadow: none;
            padding: 0;
            align-self: stretch;
            display: flex;
            flex-direction: row;
            align-items: flex-end;
        }
        
        nav ul {
            display: flex;
            flex-direction: row;
            gap: var(--space-400);
            height: 100%;
            margin-bottom: 4rem;
        }
        
        nav ul li {
            list-style: none;
            display: flex;
            align-items: center;
            height: 100%;
        }
        
        nav ul li a {
            color: var(--grey-500);
            text-decoration: none;
            font-size: var(--font-sm);
            font-weight: var(--w-regular);
            line-height: var(--line-height-lg);
        }

        nav ul li a {
            outline: none;
        }

        li:has(a:focus), li.active {
            border-bottom: 2px solid var(--orange-500);
        } 

        .cart_avatar-wrapper {
            align-self: stretch;
        }

        .show-lg {
            display: block;
        }

        .hide-lg {
            display: none;
        }
    }

</style>