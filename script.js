// Script for navigation bar
const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('nav-bar');

if (bar){
    bar.addEventListener('click',() =>{
        nav.classList.add('active')
    })
}

if (close){
    close.addEventListener('click',() =>{
        nav.classList.remove('active')
    })
}



// script.js

// Add product to cart
document.addEventListener("DOMContentLoaded", () => {
    const cartButtons = document.querySelectorAll(".cart");
    
    cartButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        
        const product = btn.closest(".pro");
        const name = product.querySelector("h5").innerText;
        const price = product.querySelector("h4").innerText;
  
        const image = product.querySelector("img").src;
  
        const item = { name, price, image, quantity: 1 };
        
        // Get existing cart items
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
        // Check if product already exists
        const existing = cart.find(i => i.name === name);
        if (existing) {
          existing.quantity += 1;
        } else {
          cart.push(item);
        }
  
        // Save updated cart
  
        localStorage.setItem("cart", JSON.stringify(cart));
  
        alert(`${name} added to cart!`);
      });
    });
  });

/*document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.getElementById("cart-items");
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    tbody.innerHTML = "<tr><td colspan='6'>Your cart is empty</td></tr>";
    return;
  }

  tbody.innerHTML = "";
  cart.forEach((item, index) => {
    const subtotal = parseFloat(item.price.replace('$', '')) * item.quantity;
    const row = `

      <tr>
        <td><a href="#" class="remove" data-index="${index}"><i class="far fa-times-circle"></i></a></td>
        <td><img src="${item.image}" alt=""></td>
        <td>${item.name}</td>
        <td>${item.price}</td>
        <td><input type="number" value="${item.quantity}" min="1" data-index="${index}" class="quantity"></td>
        <td>$${subtotal.toFixed(2)}</td>
      </tr>`;
    tbody.innerHTML += row;
  });

  // Remove item
  document.querySelectorAll(".remove").forEach(btn => {
    btn.addEventListener("click", (e) => {

      e.preventDefault();
      const index = btn.dataset.index;
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      location.reload();
    });
  });

  // Update quantity
  document.querySelectorAll(".quantity").forEach(input => {
    input.addEventListener("change", (e) => {
      const index = input.dataset.index;
      cart[index].quantity = parseInt(input.value);
      localStorage.setItem("cart", JSON.stringify(cart));
      location.reload();
    });

  });
});*/

document.addEventListener("DOMContentLoaded", () => {
    const tbody = document.getElementById("cart-items");
    const subtotalElement = document.querySelector("#subtotal table");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
    function renderCart() {
      tbody.innerHTML = "";
      if (cart.length === 0) {
        tbody.innerHTML = "<tr><td colspan='6'>Your cart is empty</td></tr>";
        updateTotals();
        return;
      }
  
      cart.forEach((item, index) => {
        const subtotal = parseFloat(item.price.replace('$', '')) * item.quantity;
        const row = document.createElement("tr");
        row.innerHTML = `
          <td><a href="#" class="remove" data-index="${index}"><i class="far fa-times-circle"></i></a></td>
          <td><img src="${item.image}" alt=""></td>
          <td>${item.name}</td>
          <td>${item.price}</td>
          <td><input type="number" min="1" value="${item.quantity}" data-index="${index}" class="quantity"></td>
          <td class="subtotal">$${subtotal.toFixed(2)}</td>
        `;
        tbody.appendChild(row);
  
      });
  
      attachEventListeners();
      updateTotals();
    }
  
    function attachEventListeners() {
      // Remove product
      document.querySelectorAll(".remove").forEach(btn => {
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          const index = e.currentTarget.dataset.index;
          cart.splice(index, 1);
          saveCart();
          renderCart();
        });
      });
  
      // Update quantity
      document.querySelectorAll(".quantity").forEach(input => {
        input.addEventListener("input", (e) => {
          const index = e.currentTarget.dataset.index;
          const newQty = parseInt(e.currentTarget.value);
          if (newQty > 0) {
            cart[index].quantity = newQty;
            saveCart();
            renderCart();
          }
        });
      });
    }
  
    function saveCart() {
      localStorage.setItem("cart", JSON.stringify(cart));
  
    }
  
    function updateTotals() {
      const total = cart.reduce((sum, item) => {
        return sum + parseFloat(item.price.replace('$', '')) * item.quantity;
      }, 0);
  
      subtotalElement.innerHTML = `
        <tr><td>Cart subtotal</td><td>$${total.toFixed(2)}</td></tr>
        <tr><td>Shipping</td><td>Free</td></tr>
        <tr><td><strong>Total</strong></td><td><strong>$${total.toFixed(2)}</strong></td></tr>
      `;
    }
  
    renderCart();
  });
  
  document.addEventListener("DOMContentLoaded", () => {
    const tbody = document.getElementById("cart-items");
    const subtotalElement = document.querySelector("#subtotal table");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
    function renderCart() {
      tbody.innerHTML = "";
      if (cart.length === 0) {
        tbody.innerHTML = "<tr><td colspan='6'>Your cart is empty</td></tr>";
        updateTotals();
        return;
      }
  
  
      cart.forEach((item, index) => {
        const subtotal = parseFloat(item.price.replace('$', '')) * item.quantity;
  
        const row = document.createElement("tr");
        row.innerHTML = `
          <td><a href="#" class="remove" data-index="${index}"><i class="far fa-times-circle"></i></a></td>
          <td><img src="${item.image}" alt="${item.name}" width="80" height="80"></td>
          <td>${item.name}</td>
          <td>${item.price}</td>
          <td><input type="number" min="1" value="${item.quantity}" data-index="${index}" class="quantity"></td>
          <td class="subtotal">$${subtotal.toFixed(2)}</td>
  
        `;
        tbody.appendChild(row);
      });
  
      attachEventListeners();
      updateTotals();
    }
  
    function attachEventListeners() {
      // Remove product
      document.querySelectorAll(".remove").forEach(btn => {
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          const index = e.currentTarget.dataset.index;
          cart.splice(index, 1);
          saveCart();
          renderCart();
        });
  
      });
  
      // Update quantity
      document.querySelectorAll(".quantity").forEach(input => {
        input.addEventListener("input", (e) => {
          const index = e.currentTarget.dataset.index;
          const newQty = parseInt(e.currentTarget.value);
          if (newQty > 0) {
            cart[index].quantity = newQty;
            saveCart();
            renderCart();
          }
        });
      });
    }
  
    function saveCart() {
  
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  
    function updateTotals() {
      const total = cart.reduce((sum, item) => {
        return sum + parseFloat(item.price.replace('$', '')) * item.quantity;
      }, 0);
  
      subtotalElement.innerHTML = `
        <tr><td>Cart subtotal</td><td>$${total.toFixed(2)}</td></tr>
        <tr><td>Shipping</td><td>Free</td></tr>
        <tr><td><strong>Total</strong></td><td><strong>$${total.toFixed(2)}</strong></td></tr>
      `;
    }
  
    renderCart();
  });
  