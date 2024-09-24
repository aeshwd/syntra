function showSidebar(){
    let sidebar = document.querySelector(".sidebar");
    sidebar.style.display = "block";
}

function hideSidebar(){
    let sidebar = document.querySelector(".sidebar");
    sidebar.style.display = "none";
}

/* Products list */

const products = [
    { id: 1, name: "Men's Black Coat", price: 210, realprice: 360, category: "men", imageUrl: 'assets/products/apparel1.jpg' },
    { id: 2, name: "Women SweatShirt", category: "women", price: 99, realprice: 160, imageUrl: 'assets/products/apparel2.jpg' },
    { id: 3, name: "Black Women Coat", category: "women", price: 185.99, realprice: 219.99, imageUrl: 'assets/products/apparel3.jpg' },
    { id: 4, name: "Silk Women Frock", category: "women", price: 129.99, realprice: 189.99, imageUrl: 'assets/products/apparel4.jpg' },
    { id: 5, name: "Acer AI Laptop i5 Gen 10", category: "electronics", category: "laptops",price: 720.99, realprice: 800.99, imageUrl: 'assets/products/electronic1.jpg' },
    { id: 6, name: "IPhone 14 | 6gb 128gb | Pink", category: "electronics",price: 840.99, realprice: 970.99, imageUrl: 'assets/products/electronic2.jpg' },
    { id: 7, name: "Lenovo Headset Noise Cancelling", category: "electronics",price: 110.99, realprice: 160.99, imageUrl: 'assets/products/electronic3.jpg' },
    { id: 8, name: "Fonken C Type Carging cable", category: "electronics",price: 40.99, realprice: 60.79, imageUrl: 'assets/products/electronic4.jpg' },
    { id: 9, name: "Samsung Curved Monitor 43inch", category: "electronics", category:"laptops", price: 1200.99, realprice: 1320.99, imageUrl: 'assets/products/electronic5.jpg' },
    { id: 10, name: "5 Seater Comfortable Sofa", category: "home", price: 300.99, realprice: 420.99, imageUrl: 'assets/products/home1.jpg' },
    { id: 11, name: "LED Dorative Lights | 5 Set", category: "home", price: 127.99, realprice: 210.99, imageUrl: 'assets/products/home2.jpg' },
    { id: 12, name: "Wodden Table | Rust free", category: "home", price: 310.99, realprice: 460.99, imageUrl: 'assets/products/home3.jpg' },
    { id: 13, name: "Office Chair Wodden", category: "home", price: 190.99, realprice: 370.99, imageUrl: 'assets/products/home4.jpg' },
    { id: 14, name: "Men's Nike Shoes", category: "mens-footwear", price: 290.99, realprice: 370.99, imageUrl: 'assets/products/shoe1-1.jpg' },
    { id: 15, name: "Men's AIR Shoes Brown", category: "mens-footwear", price: 140.99, realprice: 210.99, imageUrl: 'assets/products/shoe1-3.jpg' },
    { id: 16, name: "Men's Nike Shoes Red", category: "mens-footwear", price: 240.99, realprice: 270.99, imageUrl: 'assets/products/shoe1.jpg' },
    { id: 17, name: "Women's Shoes White", category: "womens-footwear", price: 310.99, realprice: 350.99, imageUrl: 'assets/products/shoe2.jpg' },
    { id: 18, name: "Women's Nike Stylish Shoes", category: "womens-footwear", price: 250.99, realprice: 330.99, imageUrl: 'assets/products/shoe3.jpg' },
    { id: 19, name: "Men's Formal Leather Shoes", category: "mens-footwear", price: 220.99, realprice: 310.99, imageUrl: 'assets/products/shoe4.jpg' },
    { id: 20, name: "Universal Nike AIR Shoes Black", category: "mens-footwear", category: "womens-footwear", price: 410.99, realprice: 540.99, imageUrl: 'assets/products/shoe5.jpg' },
  ];
  
  // Function to display products dynamically
  function displayProducts(productsToDisplay) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';  // Clear previous products
  
    productsToDisplay.forEach(product => {
      const productItem = document.createElement('div');
      productItem.classList.add("product-item");
      productItem.innerHTML = `
      <img src="${product.imageUrl}" alt="${product.name}">
      <h3>${product.name}</h3>
      <button class="kick"> Kick Deal </button>
      <div class= "pri">
        <p class="price">$ ${product.price}</p>
        <p class="price real">$ ${product.realprice}</p>
      </div>
      <button class="get" onclick="showProductDetails(${product.id})">Get Info</button>
    `
    
      productList.appendChild(productItem);
    });
  }

  function showProductDetails(productId) {
    const selectedProduct = products.find(product => product.id === productId);
    
    // Save product details to localStorage
    localStorage.setItem('selectedProduct', JSON.stringify(selectedProduct));
  
    // Redirect to product details page
    window.location.href = 'product-details.html';
  }
  
  // Initial display of all products
  displayProducts(products);
  
  // Function to filter products by category
  function filterProducts(category) {
    let filteredProducts = [];
  
    if (category === 'all') {
      filteredProducts = products;
    } else {
      filteredProducts = products.filter(product => product.category === category);
    }
  
    displayProducts(filteredProducts);
  }

  

  


