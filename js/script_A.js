document.addEventListener("DOMContentLoaded", function () {
  const cartCount = document.getElementById("cart-count");
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Update cart count on page load
  updateCartCount();

  function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
  }
  
  const subscribeForm = document.getElementById("subscribe-form");
  const subscribeEmail = document.getElementById("subscribe-email");
  const subscribeMessage = document.getElementById("subscribe-message");

  subscribeForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = subscribeEmail.value.trim();

    if (email) {
      let subscribers = JSON.parse(localStorage.getItem("subscribers")) || [];
      if (!subscribers.includes(email)) {
        subscribers.push(email);
        localStorage.setItem("subscribers", JSON.stringify(subscribers));
      }
      subscribeEmail.value = "";
      subscribeMessage.style.display = "block";
      setTimeout(() => subscribeMessage.style.display = "none", 3000);
    }
  });
});