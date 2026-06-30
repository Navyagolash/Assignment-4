const cart = {};

const menuButton = document.getElementById("menuButton");
const navList = document.getElementById("navList");
const heroButton = document.getElementById("heroButton");
const bookingForm = document.getElementById("bookingForm");
const newsletterForm = document.getElementById("newsletterForm");
const cartBody = document.getElementById("cartBody");
const totalAmount = document.getElementById("totalAmount");
const bookingMessage = document.getElementById("bookingMessage");
const newsletterMessage = document.getElementById("newsletterMessage");
const addButtons = document.querySelectorAll(".add-button");
const removeButtons = document.querySelectorAll(".remove-button");

menuButton.addEventListener("click", function () {
  navList.classList.toggle("show");
});

heroButton.addEventListener("click", function () {
  document.getElementById("services").scrollIntoView({ behavior: "smooth" });
});

addButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const serviceName = button.dataset.name;
    const servicePrice = Number(button.dataset.price);
    addItem(serviceName, servicePrice);
  });
});

removeButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const serviceName = button.dataset.name;
    removeItem(serviceName);
  });
});

bookingForm.addEventListener("submit", function (event) {
  event.preventDefault();
  bookNow();
});

newsletterForm.addEventListener("submit", function (event) {
  event.preventDefault();
  subscribeNow();
});

function addItem(serviceName, servicePrice) {
  // I am storing each service by name so I can increase and decrease quantity.
  if (cart[serviceName]) {
    cart[serviceName].qty = cart[serviceName].qty + 1;
  } else {
    cart[serviceName] = {
      price: servicePrice,
      qty: 1
    };
  }

  renderCart();
}

function removeItem(serviceName) {
  if (!cart[serviceName]) {
    return;
  }

  cart[serviceName].qty = cart[serviceName].qty - 1;

  if (cart[serviceName].qty <= 0) {
    delete cart[serviceName];
  }

  renderCart();
}

function renderCart() {
  const itemNames = Object.keys(cart);

  if (itemNames.length === 0) {
    cartBody.innerHTML = `
      <tr>
        <td colspan="3">No items added yet.</td>
      </tr>
    `;
    totalAmount.textContent = "Rs 0";
    return;
  }

  let rows = "";
  let total = 0;

  itemNames.forEach(function (name, index) {
    const item = cart[name];
    const subTotal = item.price * item.qty;
    total = total + subTotal;

    rows += `
      <tr>
        <td>${index + 1}</td>
        <td>${name} x ${item.qty}</td>
        <td>Rs ${subTotal}</td>
      </tr>
    `;
  });

  cartBody.innerHTML = rows;
  totalAmount.textContent = "Rs " + total;
}

function showMessage(box, text, type) {
  box.textContent = text;
  box.className = "message-box " + type;
}

function clearMessage(box) {
  box.textContent = "";
  box.className = "message-box";
}

function getOrderSummary() {
  const itemNames = Object.keys(cart);
  let summary = "";

  itemNames.forEach(function (name, index) {
    summary += name + " x " + cart[name].qty;

    if (index !== itemNames.length - 1) {
      summary += ", ";
    }
  });

  return summary;
}

function bookNow() {
  clearMessage(bookingMessage);

  // I am using HTML5 validation first so the browser handles the basic checks.
  if (!bookingForm.checkValidity()) {
    bookingForm.reportValidity();
    return;
  }

  // I still need one custom check because the form should not submit an empty cart.
  if (Object.keys(cart).length === 0) {
    showMessage(bookingMessage, "Please add at least one service to the cart.", "error");
    return;
  }

  const name = document.getElementById("bookName").value.trim();
  const email = document.getElementById("bookEmail").value.trim();
  const phone = document.getElementById("bookPhone").value.trim();

  let total = 0;
  Object.keys(cart).forEach(function (itemName) {
    total = total + cart[itemName].price * cart[itemName].qty;
  });

  const bookingData = {
    customer_name: name,
    customer_email: email,
    customer_phone: phone,
    to_email: email,
    order_summary: getOrderSummary(),
    total_amount: "Rs " + total
  };

  // This fetch sends the booking details to my Vercel API file.
  fetch("/api/send-booking", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(bookingData)
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (data.message === "Email sent") {
        showMessage(
          bookingMessage,
          "Thank you For Booking the Service We will get back to you soon!",
          "success"
        );

        bookingForm.reset();

        Object.keys(cart).forEach(function (itemName) {
          delete cart[itemName];
        });

        renderCart();
      } else {
        showMessage(bookingMessage, data.message || "Email could not be sent.", "error");
      }
    })
    .catch(function () {
      showMessage(bookingMessage, "Email could not be sent.", "error");
    });
}

function subscribeNow() {
  clearMessage(newsletterMessage);

  // The newsletter form also uses the browser's built-in required and email checks.
  if (!newsletterForm.checkValidity()) {
    newsletterForm.reportValidity();
    return;
  }

  showMessage(newsletterMessage, "Subscribed successfully.", "success");
  newsletterForm.reset();
}

renderCart();
