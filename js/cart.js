function showSidebar(){
    let sidebar = document.querySelector(".sidebar");
    sidebar.style.display = "block";
  }
  
  function hideSidebar(){
    let sidebar = document.querySelector(".sidebar");
    sidebar.style.display = "none";
  }

// Retrieve cart from localStorage or set an empty array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Select DOM elements
const cartContainer = document.getElementById('cart-container');
const subtotalElement = document.getElementById('subtotal');
const taxElement = document.getElementById('tax');
const totalElement = document.getElementById('total');
const emptyCartMessage = document.getElementById('empty-cart-message');
const buyNowButton = document.getElementById('buy-now-btn');
const cartSummary = document.getElementById('cart-summary');
const startShoppingButton = document.getElementById('start-shopping-btn');

// Render Cart Items
function renderCart() {
    cartContainer.innerHTML = '';

    if (cart.length === 0) {
        emptyCartMessage.classList.remove('hidden');
        cartSummary.style.display = 'none';
        buyNowButton.disabled = true;
        return;
    }

    emptyCartMessage.classList.add('hidden');
    cartSummary.style.display = 'block';
    buyNowButton.disabled = false;

    cart.forEach((product, index) => {
        const cartProduct = document.createElement('div');
        cartProduct.classList.add('cart-product');

        cartProduct.innerHTML = `
            <img src="${product.imageUrl}" alt="${product.name}">
            <div class="cart-item-info">
                <h3>${product.name}</h3>
                <p>Color: ${product.color}</p>
                <p>Size: ${product.size}</p>
                <p>Price: $${product.price}</p>
            </div>
            <div class="cart-item-controls">
                <button class="decrease-btn">-</button>
                <span class="quantity">${product.quantity}</span>
                <button class="increase-btn">+</button>
                <button class="remove-btn">Remove</button>
            </div>
        `;

        // Add event listeners for buttons
        cartProduct.querySelector('.increase-btn').addEventListener('click', () => updateQuantity(index, 1));
        cartProduct.querySelector('.decrease-btn').addEventListener('click', () => updateQuantity(index, -1));
        cartProduct.querySelector('.remove-btn').addEventListener('click', () => removeItem(index));

        cartContainer.appendChild(cartProduct);
    });

    updateTotals();
}

// Update quantity of an item
function updateQuantity(index, delta) {
    if (cart[index].quantity + delta > 0) {
        cart[index].quantity += delta;
        updateLocalStorage();
        renderCart();
    }
}

// Remove item from cart
function removeItem(index) {
    cart.splice(index, 1);
    updateLocalStorage();
    renderCart();
}

// Update localStorage
function updateLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Update subtotal, tax, and total
function updateTotals() {
    let subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    let tax = subtotal * 0.18;
    let total = subtotal + tax;

    subtotalElement.textContent = `Subtotal: $${subtotal.toFixed(2)}`;
    taxElement.textContent = `Tax (18%): $${tax.toFixed(2)}`;
    totalElement.textContent = `Total: $${total.toFixed(2)}`;
}

// Initialize Cart
renderCart();

// Buy Now button click handler
buyNowButton.addEventListener('click', () => {
    alert('Purchase successful!');
    cart = [];
    updateLocalStorage();
    renderCart();
});

// Start Shopping button click handler
startShoppingButton.addEventListener('click', () => {
    window.location.href = 'index.html';  // Redirect to the homepage or product page
});
