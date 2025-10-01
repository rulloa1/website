// Product catalog
const products = [
    {
        id: 1,
        name: "Premium Laptop",
        description: "High-performance laptop for professionals",
        price: 1299.99,
        icon: "💻"
    },
    {
        id: 2,
        name: "Wireless Headphones",
        description: "Noise-cancelling Bluetooth headphones",
        price: 249.99,
        icon: "🎧"
    },
    {
        id: 3,
        name: "Smartphone Pro",
        description: "Latest flagship smartphone with 5G",
        price: 899.99,
        icon: "📱"
    },
    {
        id: 4,
        name: "Smart Watch",
        description: "Fitness tracker with heart rate monitor",
        price: 349.99,
        icon: "⌚"
    },
    {
        id: 5,
        name: "Tablet Pro",
        description: "12-inch tablet with stylus support",
        price: 699.99,
        icon: "📲"
    },
    {
        id: 6,
        name: "Gaming Console",
        description: "Next-gen gaming console with 4K support",
        price: 499.99,
        icon: "🎮"
    },
    {
        id: 7,
        name: "4K Monitor",
        description: "27-inch 4K UHD monitor for professionals",
        price: 449.99,
        icon: "🖥️"
    },
    {
        id: 8,
        name: "Mechanical Keyboard",
        description: "RGB backlit mechanical gaming keyboard",
        price: 149.99,
        icon: "⌨️"
    },
    {
        id: 9,
        name: "Wireless Mouse",
        description: "Ergonomic wireless mouse with precision tracking",
        price: 79.99,
        icon: "🖱️"
    },
    {
        id: 10,
        name: "External SSD",
        description: "1TB portable SSD with USB-C",
        price: 179.99,
        icon: "💾"
    },
    {
        id: 11,
        name: "Webcam HD",
        description: "1080p HD webcam for video calls",
        price: 89.99,
        icon: "📷"
    },
    {
        id: 12,
        name: "Power Bank",
        description: "20000mAh portable charger with fast charging",
        price: 59.99,
        icon: "🔋"
    }
];

// Shopping cart
let cart = [];

// Bitcoin exchange rate (mock - in real app, fetch from API)
const BTC_USD_RATE = 45000;

// Initialize the store
function initStore() {
    renderProducts();
    updateCartDisplay();
}

// Render products to the grid
function renderProducts() {
    const productsGrid = document.getElementById('products-grid');
    productsGrid.innerHTML = '';

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">${product.icon}</div>
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-description">${product.description}</div>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCartDisplay();
    showNotification('Added to cart!');
}

// Remove product from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
}

// Update quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartDisplay();
        }
    }
}

// Update cart display
function updateCartDisplay() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    // Update count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    // Update items
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">${item.icon}</div>
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                        <button class="remove-item" onclick="removeFromCart(${item.id})">Remove</button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `$${total.toFixed(2)}`;

    // Enable/disable checkout button
    const checkoutBtn = document.querySelector('.checkout-btn');
    checkoutBtn.disabled = cart.length === 0;
}

// Toggle cart sidebar
function toggleCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    cartSidebar.classList.toggle('active');
}

// Proceed to checkout
function proceedToCheckout() {
    if (cart.length === 0) return;

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const btcAmount = total / BTC_USD_RATE;

    // Update checkout modal
    document.getElementById('checkout-total').textContent = `$${total.toFixed(2)}`;
    document.getElementById('btc-amount').textContent = btcAmount.toFixed(8);
    document.getElementById('btc-rate').textContent = `$${BTC_USD_RATE.toFixed(2)}`;
    
    // Update BTC amount in instructions
    const btcAmountTexts = document.querySelectorAll('.btc-amount-text');
    btcAmountTexts.forEach(el => {
        el.textContent = btcAmount.toFixed(8);
    });

    // Render order summary
    const checkoutItems = document.getElementById('checkout-items');
    checkoutItems.innerHTML = cart.map(item => `
        <div class="checkout-item">
            <span>${item.icon} ${item.name} x${item.quantity}</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
        </div>
    `).join('');

    // Show modal
    document.getElementById('checkout-modal').classList.add('active');
    toggleCart();
}

// Close checkout modal
function closeCheckout() {
    document.getElementById('checkout-modal').classList.remove('active');
}

// Copy Bitcoin address
function copyAddress() {
    const address = document.getElementById('btc-address').textContent;
    navigator.clipboard.writeText(address).then(() => {
        showNotification('Bitcoin address copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy:', err);
        showNotification('Failed to copy address');
    });
}

// Confirm payment
function confirmPayment() {
    showNotification('Thank you! Your order has been received. You will receive a confirmation email once the payment is verified.', 5000);
    
    // Clear cart
    cart = [];
    updateCartDisplay();
    closeCheckout();
    
    // In a real application, this would:
    // 1. Send order details to backend
    // 2. Monitor blockchain for transaction
    // 3. Verify payment amount
    // 4. Process order when confirmed
}

// Show notification
function showNotification(message, duration = 3000) {
    // Create notification element if it doesn't exist
    let notification = document.getElementById('notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'notification';
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.3);
            z-index: 3000;
            opacity: 0;
            transform: translateX(400px);
            transition: all 0.3s ease;
        `;
        document.body.appendChild(notification);
    }

    notification.textContent = message;
    
    // Show notification
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 10);

    // Hide notification after duration
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(400px)';
    }, duration);
}

// Close cart when clicking outside
document.addEventListener('click', (e) => {
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartIcon = document.querySelector('.cart-icon');
    
    if (cartSidebar && cartSidebar.classList.contains('active')) {
        if (!cartSidebar.contains(e.target) && !cartIcon.contains(e.target)) {
            toggleCart();
        }
    }
});

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    const modal = document.getElementById('checkout-modal');
    if (modal && modal.classList.contains('active') && e.target === modal) {
        closeCheckout();
    }
});

// Initialize store when page loads
document.addEventListener('DOMContentLoaded', initStore);
