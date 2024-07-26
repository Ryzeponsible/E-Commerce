let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  slides[slideIndex - 1].style.display = "block";
  setTimeout(showSlides, 4000);
}

document.addEventListener("DOMContentLoaded", () => {
  const cartButton = document.getElementById("cart-button");
  const cartModal = document.getElementById("cart-modal");
  const closeButton = document.querySelector(".close");
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const cartCount = document.getElementById("cart-count");
  let cart = [];

  function updateCart() {
    cartItems.innerHTML = "";
    let total = 0;
    cart.forEach((item) => {
      const li = document.createElement("li");
      li.innerHTML = `
                ${item.name} - ₱${item.price} x ${item.quantity}
                <div class="quantity-controls">
                    <button class="decrease" data-id="${item.id}">-</button>
                    <p>${item.quantity}</p>
                    <button class="increase" data-id="${item.id}">+</button>
                    <button class="remove" data-id="${item.id}">X</button> 
                </div>
            `;
      // change the class remove to an icon

      cartItems.appendChild(li);
      total += item.price * item.quantity;
    });
    cartTotal.innerText = total.toFixed(2);
    cartCount.innerText = cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  function addToCart(productId, productName, productPrice) {
    const existingItem = cart.find((item) => item.id === productId);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        id: productId,
        name: productName,
        price: productPrice,
        quantity: 1,
      });
    }
    updateCart();
  }

  function changeQuantity(productId, action) {
    const item = cart.find((item) => item.id === productId);
    if (item) {
      if (action === "increase") {
        item.quantity += 1;
      } else if (action === "decrease" && item.quantity > 1) {
        item.quantity -= 1;
      }
      updateCart();
    }
  }

  function removeFromCart(productId) {
    cart = cart.filter((item) => item.id !== productId);
    updateCart();
  }

  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.getAttribute("data-product-id");
      const productName = button.getAttribute("data-product-name");
      const productPrice = parseFloat(
        button.getAttribute("data-product-price")
      );
      addToCart(productId, productName, productPrice);
    });
  });

  cartItems.addEventListener("click", (event) => {
    if (event.target.classList.contains("increase")) {
      const productId = event.target.getAttribute("data-id");
      changeQuantity(productId, "increase");
    } else if (event.target.classList.contains("decrease")) {
      const productId = event.target.getAttribute("data-id");
      changeQuantity(productId, "decrease");
    } else if (event.target.classList.contains("remove")) {
      const productId = event.target.getAttribute("data-id");
      removeFromCart(productId);
    }
  });

  cartButton.addEventListener("click", () => {
    cartModal.style.display = "flex";
  });

  closeButton.addEventListener("click", () => {
    cartModal.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target === cartModal) {
      cartModal.style.display = "none";
    }
  });
});
