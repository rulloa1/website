function buyProduct(productTitle, productPrice, productBalance, productDescription) {
    // Store product details in sessionStorage for the payment page
    sessionStorage.setItem('selectedProduct', JSON.stringify({
        title: productTitle,
        price: productPrice,
        balance: productBalance,
        description: productDescription
    }));
    
    // Redirect to payment/topup page
    window.location.href = '../../show_order.html';
}
