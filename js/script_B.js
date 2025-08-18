document.addEventListener("DOMContentLoaded", function () {
  const cartCount = document.getElementById("cart-count");
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Update cart count on page load
  updateCartCount();

  function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
  }
});