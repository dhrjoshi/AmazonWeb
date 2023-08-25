import { cart, addToCart } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

let productHtml = '';
products.forEach((product) => {
    productHtml += `
    <div class="product-container">
        <div class="product-image-container">
        <img class="product-image"
            src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
        ${product.name}
        </div>

        <div class="product-rating-container">
        <img class="product-rating-stars"
            src="images/ratings/rating-${product.rating.stars * 10}.png">
        <div class="product-rating-count link-primary">
            ${product.rating.count}
        </div>
        </div>

        <div class="product-price">
        $${formatCurrency(product.priceCents)}
        </div>

        <div class="product-quantity-container">
        <select class="js-quantity-selector-${product.id}">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
        </select>
        </div>

        <div class="product-spacer"></div>

        <div class="added-to-cart js-added-to-cart-${product.id}">
        <img src="images/icons/checkmark.png">
        Added
        </div>

        <button class="add-to-cart-button button-primary" 
        data-product-id="${product.id}">
        Add to Cart
        </button>
    </div>
    `
});

const productsGrid = document.querySelector('.products-grid');
productsGrid.innerHTML = productHtml;

const addToCartBtn = document.querySelectorAll('.add-to-cart-button');

function updateCartQuantity() {
    let cartQuantity = 0;
    cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
    });
    // console.log(cartQuantity);
    const cartQuantityElemnt = document.querySelector('.cart-quantity');
    cartQuantityElemnt.innerHTML = cartQuantity;
    return cartQuantity;
}

addToCartBtn.forEach((button) => {
    button.addEventListener('click', () => {
        // console.log(button.dataset.productName);  //dataset provides all the data-attributes of a html element
        const prodId = button.dataset.productId;
        
        addToCart(prodId);

        const addedMessage = document.querySelector(`.js-added-to-cart-${prodId}`);
        addedMessage.classList.add('added-to-cart-visible');

        const addedMessageTimeouts = {};

        const previousTimeoutId = addedMessageTimeouts[prodId];
        if(previousTimeoutId) {
            clearTimeout(previousTimeoutId);
        }

        const timeoutId = setTimeout(() => {
            addedMessage.classList.remove('added-to-cart-visible');
        },2000);

        addedMessageTimeouts[prodId] = timeoutId;

        updateCartQuantity();
    })
})

const cartQuantityHome = document.querySelector('.js-cart-quantity');
let quan = updateCartQuantity();
cartQuantityHome.innerHTML = `${quan}`;