 document.addEventListener("DOMContentLoaded", function () {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      const cartItems = document.getElementById("cart-items");
      const cartTotal = document.getElementById("cart-total");
      const clearCartBtn = document.getElementById("clear-cart");
      const cartCount = document.getElementById("cart-count");

      function renderCart() {
        cartItems.innerHTML = "";
        let total = 0;

        cart.forEach((item, index) => {
          const itemTotal = item.price * item.quantity;
          total += itemTotal;

          cartItems.innerHTML += `
            <tr>
              <td>${item.name}</td>
              <td>$${item.price.toFixed(2)}</td>
              <td>
                <input type="number" min="1" value="${item.quantity}" data-index="${index}" class="form-control quantity-input">
              </td>
              <td>$${itemTotal.toFixed(2)}</td>
              <td><button class="btn btn-sm btn-danger remove-item" data-index="${index}">X</button></td>
            </tr>
          `;
        });

        cartTotal.textContent = `Total: $${total.toFixed(2)}`;
        updateCartCount();
      }

      cartItems.addEventListener("change", function (e) {
        if (e.target.classList.contains("quantity-input")) {
          const index = e.target.getAttribute("data-index");
          cart[index].quantity = parseInt(e.target.value);
          localStorage.setItem("cart", JSON.stringify(cart));
          renderCart();
        }
      });

      cartItems.addEventListener("click", function (e) {
        if (e.target.classList.contains("remove-item")) {
          const index = e.target.getAttribute("data-index");
          cart.splice(index, 1);
          localStorage.setItem("cart", JSON.stringify(cart));
          renderCart();
        }
      });

      clearCartBtn.addEventListener("click", function () {
        cart = [];
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
      });

      function updateCartCount() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
      }

      renderCart();
    });