// Load products and cart from localStorage
let products = JSON.parse(localStorage.getItem('products')) || [];
let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

// Show home page with products
function showHome() {
    const content = document.getElementById('content');
    content.innerHTML = '<h2>Нүүр</h2>';  // Title for Home page

    displayProducts();  // Call to display products
}

// Show Add Product page
function showAddProduct() {
    const content = document.getElementById('content');
    content.innerHTML = `
        <h2>Бүтээгдэхүүн нэмэх</h2>
        <form id="product-form">
            <input type="text" id="product-name" placeholder="Нэр" required>
            <input type="number" id="product-price" placeholder="Үнэ" required>
            <input type="text" id="product-image" placeholder="Зурагны URL оруулна уу" required>
            <button type="submit">Нэмэх</button>
        </form>
    `;
    document.getElementById('product-form').addEventListener('submit', addProduct);
}

// Show Cart page
function showCart() {
    const content = document.getElementById('content');
    content.innerHTML = '<h2>Сагс</h2>';

    if (cartItems.length === 0) {
        content.innerHTML += '<p>Сагс хоосон байна.</p>';
    } else {
        cartItems.forEach(item => {
            content.innerHTML += `
                <div class="product-item">
                    <img src="${item.image}" alt="${item.name}">
                    <p>${item.name}</p>
                    <p>${item.price}₮</p>
                    <button onclick="removeFromCart(${item.id})">Хасах</button>
                </div>
            `;
        });
    }
}

// Display products on the homepage
function displayProducts() {
    const content = document.getElementById('content');
    const productList = document.createElement('div');
    productList.classList.add('product-list');  // Create a container for products

    if (products.length === 0) {
        content.innerHTML += '<p>Бүтээгдэхүүнүүд харагдахгүй байна.</p>';
    } else {
        products.forEach(product => {
            productList.innerHTML += `
                <div class="product-item">
                    <img src="${product.image}" alt="${product.name}">
                    <p>${product.name}</p>
                    <p>${product.price}₮</p>
                    <button onclick="addToCart(${product.id})">Сагсанд нэмэх</button>
                </div>
            `;
        });
    }

    content.appendChild(productList);
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cartItems.push(product);
        localStorage.setItem('cart', JSON.stringify(cartItems)); // Store updated cart in localStorage
        showCart(); // Update the cart page
    }
}

// Remove product from cart
function removeFromCart(productId) {
    cartItems = cartItems.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cartItems)); // Store updated cart in localStorage
    showCart(); // Update the cart page
}

// Add product to the product list
function addProduct(event) {
    event.preventDefault();

    const name = document.getElementById('product-name').value;
    const price = document.getElementById('product-price').value;
    const image = document.getElementById('product-image').value;

    if (name && price && image) {
        const newProduct = {
            id: products.length + 1,
            name,
            price,
            image
        };

        products.push(newProduct);
        localStorage.setItem('products', JSON.stringify(products)); // Store updated products in localStorage
        showHome(); // Go back to home page and show the new product
    }
}

// On page load, initialize by showing home page
window.onload = function() {
    showHome();
};
