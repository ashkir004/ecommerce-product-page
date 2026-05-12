# Challenge

Your challenge is to build out this e-commerce product page and get it looking as close to the design as possible.

You can use any tools you like to help you complete the challenge. So if you've got something you'd like to practice, feel free to give it a go.

Your users should be able to:

1. Open a lightbox gallery by clicking on the large product image
2. Switch the large product image by clicking on the small thumbnail images
3. Add items to the cart
4. View the cart and remove items from it
5. View the optimal layout for the site depending on their device's screen size
6. See hover states for all interactive elements on the page

## What I've Learned / Practised

1. Masking Images to change the color of an Icon
```css
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

```

2. Attachments in Svelte (Needs more work)
3. State Management
4. Passing data via props
5. Passing event handlers via props 
6. Conditionally changing styles via utility classes in different breakpoints (Todo: make it global)
7. Grid Layout on the Page level
8. Flexbox Layout on the component level
9. Responsive web design and Images
```css
.avatar {
    width: 100%;
    max-width: var(--space-300);
    height: auto;
}

```
10. Centering an absolute element via `transform`

```css
.control {
    width: 100%;
    max-width: 28rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

```

11. Wrapping button on svelte-imported images to make it interactive

12. Accessibility: add `aria-label` to Icon buttons.

13. Trapped Focus on Menu and Lightbox (Todo: Learn more)

14. Component Composition (Requires better planning ahead)

## Built-with
1. Svelte
2. Sveltekit
3. CSS grid & flexbox
4. Javascript


### Live-Site

- [Ecommerce Product Page](https://ecommerce-product-page-ashkir004.netlify.app/)


### Author

- [ashkir004](https://www.frontendmentor.io/profile/ashkir004)
