<script>
    import menu from '$lib/assets/images/icon-menu.svg';
    import logo from '$lib/assets/images/logo.svg';
    import cart from '$lib/assets/images/icon-cart.svg';
    import avatar from '$lib/assets/images/image-avatar.png';

    let activeTab = $state('Women');
    let tabs = ['Collections', 'Men', 'Women', 'About', 'Contact'];

</script>


<header>
    <div class="menu_log-wrapper">
        <img src={menu} alt="Menu Icon" class="menu show-sm hide-lg" />
        <img src={logo} alt="Ecommerce Product Page Logo" class="logo" />
    </div>
    <nav class="hide-sm show-lg">
        <ul>
            {#each tabs as tab, index (index)}
                <li class={tab === activeTab ? 'active' : ''}>
                    <a href={`#${tab}`} onclick={() => activeTab = tab}>{tab}</a>
                </li>
            {/each}
        </ul>
    </nav>

    <div class="cart_avatar-wrapper">
        <img src={cart} alt="Cart Icon" class="cart" />
        <img src={avatar} alt="User Avatar" class="avatar" />
    </div>

</header>

<style global>
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

    .active {
        border-bottom: 2px solid var(--orange-500);
    }

    .hide-sm {
        display: none;
    }

    .show-sm {
        display: block;
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

    @media (min-width: 48rem) {

        header {
            align-items: center;
            border-bottom: 1px solid var(--grey-100);
            padding-bottom: var(--space-400);
            padding-inline: 0;
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

        nav ul {
            margin-bottom: 4rem;
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