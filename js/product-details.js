function showSidebar() {
  let sidebar = document.querySelector(".sidebar");
  sidebar.style.display = "block";
}

function hideSidebar() {
  let sidebar = document.querySelector(".sidebar");
  sidebar.style.display = "none";
}

document.addEventListener('DOMContentLoaded', () => {
  // Get product from localStorage
  const product = JSON.parse(localStorage.getItem('selectedProduct'));

  // Set default quantity
  let quantity = 1;

  // Populate product details on the page
  document.getElementById('product-name').textContent = product.name;
  document.getElementById('product-image').src = product.imageUrl;
  document.getElementById('product-price').textContent = product.price.toFixed(2);
  document.getElementById('product-realprice').textContent = product.realprice.toFixed(2);

  // Calculate and show discount percentage
  const discountPercentage = calculateDiscount(product.realprice, product.price);
  document.getElementById('product-discount').textContent = `${discountPercentage}% OFF`;

  // Update subtotal
  updateSubtotal(quantity, product.price);

  // Show size options only for "men" or "women" category
  if (product.category === 'men' || product.category === 'women') {
    document.getElementById('size-options').style.display = 'block';
  } else {
    document.getElementById('size-options').style.display = 'none';
  }

  // Add event listeners for quantity buttons
  document.getElementById('quantity-increase').addEventListener('click', () => {
    quantity++;
    updateQuantityAndSubtotal(quantity, product.price);
  });

  document.getElementById('quantity-decrease').addEventListener('click', () => {
    if (quantity > 1) {
      quantity--;
      updateQuantityAndSubtotal(quantity, product.price);
    }
  });

  // Check if the product is already in the cart and update the button if true
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const productInCart = cart.find(item => item.id === product.id);
  if (productInCart) {
    updateAddToCartButton();
  }
});

// Function to calculate the discount percentage
function calculateDiscount(realPrice, discountedPrice) {
  const discount = ((realPrice - discountedPrice) / realPrice) * 100;
  return Math.round(discount);
}

// Function to update subtotal based on quantity and product price
function updateSubtotal(quantity, price) {
  const subtotal = (quantity * price).toFixed(2);
  document.getElementById('product-subtotal').textContent = `$${subtotal}`;
}

// Function to handle size selection and update button style
function selectSize(size) {
  const sizeButtons = document.querySelectorAll('.size-button');
  sizeButtons.forEach(button => button.classList.remove('active'));
  const selectedButton = document.querySelector(`button[data-size="${size}"]`);
  selectedButton.classList.add('active');
  localStorage.setItem('selectedSize', size);
}

// Function to handle color selection and update button style
function selectColor(color) {
  const colorButtons = document.querySelectorAll('.color-button');
  colorButtons.forEach(button => button.classList.remove('active'));
  const selectedButton = document.querySelector(`button[data-color="${color}"]`);
  selectedButton.classList.add('active');
  localStorage.setItem('selectedColor', color);
}

// Function to update quantity and subtotal when buttons are clicked
function updateQuantityAndSubtotal(quantity, price) {
  document.getElementById('quantity-number').textContent = quantity;
  updateSubtotal(quantity, price);
}

// Function to add product to the cart (with size and color compulsory)
function addToCart() {
  const product = JSON.parse(localStorage.getItem('selectedProduct'));
  const selectedSize = localStorage.getItem('selectedSize');
  const selectedColor = localStorage.getItem('selectedColor');
  const quantity = parseInt(document.getElementById('quantity-number').textContent);

  // Validate size selection for men and women categories
  if (!selectedSize && (product.category === 'men' || product.category === 'women')) {
    alert('Please select a size!');
    return;
  }

  // Validate color selection for relevant categories
  if (!selectedColor && (['men', 'women', 'electronics', 'mens-footwear', 'womens-footwear', 'home', 'laptops', 'all'].includes(product.category))) {
    alert('Please select a color!');
    return;
  }

  // Create the cart item object
  const cartItem = {
    ...product,
    size: selectedSize,
    color: selectedColor,
    quantity: quantity,
    subtotal: (quantity * product.price).toFixed(2)
  };

  // Update cart in localStorage
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existingProduct = cart.find(item => item.id === product.id);

  if (existingProduct) {
    // Update quantity and subtotal for an existing product in the cart
    existingProduct.quantity += quantity;
    existingProduct.subtotal = (existingProduct.quantity * product.price).toFixed(2);
  } else {
    cart.push(cartItem);
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  
  // Update the cart number in local storage and display
  updateCartNumber();
  updateAddToCartButton();
}

// Function to update "Add to Cart" button to "Go to Cart"
function updateAddToCartButton() {
  const addToCartButton = document.getElementById('add-to-cart-button');
  addToCartButton.textContent = 'Go to Cart';
  addToCartButton.onclick = function () {
    window.location.href = 'cart.html';
  };
}

// Function to update the cart number in local storage
function updateCartNumber() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartNumber = cart.reduce((total, product) => total + product.quantity, 0);
  localStorage.setItem('cartNumber', cartNumber);
  updateCartDisplay();
}

// Function to update cart display on the homepage
function updateCartDisplay() {
  const cartNumber = localStorage.getItem('cartNumber') || 0;
  const cartDisplayElement = document.getElementById('cart-number');
  if (cartDisplayElement) {
    cartDisplayElement.textContent = cartNumber;
  }
}
