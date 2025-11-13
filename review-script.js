function showReview(itemId) {
    // Fetch review data via AJAX or use existing data
    var reviews = [];
    var itemReviews = reviews.filter(review => review.product_id === itemId);

    // Construct review content
    var reviewContent = '<h2 class="text-center">Reviews:</h2><ul class="review-list">';
    if (itemReviews.length > 0) {
        itemReviews.forEach((review, index) => {
            reviewContent += `<li style="text-align: center">
                ${index + 1}. User: ${review.username}<br>
                Comment: ${review.comment}<br>
                Rating: ${'<i style="color:yellow" class="fas fa-star"></i>'.repeat(review.rating)}
            </li>`;
        });
    } else {
        reviewContent += '<li class="text-center">No reviews available for this product.</li>';
    }
    reviewContent += '</ul>';

    // Show PNotify alert
    PNotify.alert({
        title: 'Reviews',
        text: reviewContent,
        type: 'info',
        icon: 'fas fa-comments',
        modules: {
            Buttons: {
                closer: true,
                sticker: false
            }
        },
        addClass: 'pnotify-custom',
        width: 'auto',
        buttons: {
            closer: true,
            sticker: false
        }
    });
}
