let isLoggedIn = false;

// auto login restore
if (localStorage.getItem("login") === "true") {
  isLoggedIn = true;
}


// Smooth Scroll
function scrollToPlans() {
  document.getElementById("plans").scrollIntoView({
    behavior: "smooth"
  });
}

// Button Click Animation + Booking
function bookNow(plan) {
  showToast("Booking " + plan + " plan...");
  
  setTimeout(() => {
    showToast("✅ Booking Confirmed!");
  }, 1500);
}

// Payment Animation
function payNow(amount, productName) {

  if (!requireLogin()) return;

  var options = {
    key: "rzp_test_xxxxxxxx",
    amount: amount * 100,
    currency: "INR",
    name: "PowerFit",
    description: productName,

    handler: function (response) {
      showToast("Payment Successful ✅");

      // 🔥 Save order
      saveOrder(productName, amount, response.razorpay_payment_id);
    },

    theme: {
      color: "#ff0000"
    }
  };

  new Razorpay(options).open();
}

// Toast Notification (🔥 premium feel)
function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerText = message;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("show");
  }, 100);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// Navbar scroll effect
window.addEventListener("scroll", function () {
  let navbar = document.querySelector(".navbar");
  navbar.classList.toggle("scrolled", window.scrollY > 50);
});

// Mobile menu toggle
function toggleMenu() {
  document.querySelector(".nav-links").classList.toggle("active");
}

let token = "";


// Scroll Animation
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

const sections = document.querySelectorAll("section");

if (sections.length > 0) {
  sections.forEach(section => {
    section.classList.add("hidden");
    observer.observe(section);
  });
}

// register
function register() {
  let email = document.getElementById("regEmail").value;
  let phone = document.getElementById("regPhone").value;
  let password = document.getElementById("regPassword").value;
  let confirm = document.getElementById("regConfirm").value;

  if (!email || !phone || !password || !confirm) {
    showToast("Fill all fields ❌");
    return;
  }

  if (phone.length !== 10) {
    showToast("Enter valid phone number 📱");
    return;
  }

  if (password !== confirm) {
    showToast("Passwords do not match ❌");
    return;
  }

  let user = { email, phone, password };

  localStorage.setItem("user", JSON.stringify(user));

  showToast("Registration Successful ✅");
}




// Login
function login() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  let savedUser = JSON.parse(localStorage.getItem("user"));

  if (!savedUser) {
    showToast("Please register first ❌");
    return;
  }

  if (email === savedUser.email && password === savedUser.password) {
    isLoggedIn = true;
    localStorage.setItem("login", "true");

    showToast("Login Success ✅");
    closeModal();

    // 🔥 NEW
    document.querySelector(".nav-links button").innerText = "Logout";
  } else {
    showToast("Invalid credentials ❌");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  let btn = document.querySelector(".nav-links button");

  // auto set text
  if (isLoggedIn) {
    btn.innerText = "Logout";
  }

  btn.onclick = function () {
    if (isLoggedIn) {
      isLoggedIn = false;
      localStorage.removeItem("login");

      showToast("Logged out 👋");
      this.innerText = "Login";
    } else {
      openModal();
    }
  };
});


// Toggle Login/Register
function showLogin() {
  document.getElementById("loginForm").style.display = "block";
  document.getElementById("registerForm").style.display = "none";

  document.getElementById("loginTab").classList.add("active");
  document.getElementById("registerTab").classList.remove("active");
}

function showRegister() {
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("registerForm").style.display = "block";

  document.getElementById("registerTab").classList.add("active");
  document.getElementById("loginTab").classList.remove("active");
} 




// Booking + Payment Flow
function startBooking(plan) {
  payNow(plan);
}


function saveBooking(plan) {
  fetch("http://localhost:5000/api/book", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    },
    body: JSON.stringify({ plan })
  });

  alert("Booking Saved");
}



// Chart
const chartEl = document.getElementById("chart");

if (chartEl) {
  new Chart(chartEl, {
  type: "bar",
  data: {
    labels: ["Jan", "Feb", "Mar", "Apr"],
    datasets: [{
      label: "Revenue",
      data: [10000, 15000, 8000, 12000],
      backgroundColor: ["red", "orange", "red", "orange"]
    }]
  }
});
}


// document.querySelectorAll(".stat-card p").forEach(el => {
//   let count = 0;
//   let target = parseInt(el.innerText);

//   let interval = setInterval(() => {
//     count += Math.ceil(target / 20);
//     if (count >= target) {
//       el.innerText = target;
//       clearInterval(interval);
//     } else {
//       el.innerText = count;
//     }
//   }, 50);
// });


const products = [
  {name:"Whey Protein", price:1999, img:"https://images.unsplash.com/photo-1605296867304-46d5465a13f1"},
  {name:"Multivitamin", price:799, img:"https://images.unsplash.com/photo-1582719478250-c89cae4dc85b"},
   {name:"Pre Workout", price:1499, img:"https://images.unsplash.com/photo-1583454110551-21f2fa2afe61"},
  {name:"Mass Gainer", price:2499, img:"https://user5381.na.imgto.link/public/20260322/spencer-davis-0shts8ipy28-unsplash.avif"},
  
  {name:"Creatine", price:1299, img:"https://user5381.na.imgto.link/public/20260322/marios-gkortsilas-1ppdokgo9cg-unsplash-2.avif"},
  
  {name:"BCAA", price:1799, img:"https://user5381.na.imgto.link/public/20260322/anastase-maragos-9dzwzqwzmde-unsplash.avif"},
  
  {name:"Fish Oil", price:999, img:"https://user5381.na.imgto.link/public/20260322/danielle-cerullo-cqfnt66ttzm-unsplash.avif"},
  
  {name:"Fat Burner", price:1399, img:"https://user5381.na.imgto.link/public/20260322/victor-freitas-wvdydxdzkhs-unsplash.avif"},
  
  {name:"Protein Bar", price:299, img:"https://pub-1407f82391df4ab1951418d04be76914.r2.dev/uploads/beca542e-92e5-4ea6-94a3-47df6969d006.jpg"},
  
  {name:"Glutamine", price:1199, img:"https://user5381.na.imgto.link/public/20260322/anastase-maragos-7kepupb8vnk-unsplash.avif"}
];

let visibleCount = 3;

function loadProducts() {
  const container = document.getElementById("productContainer");

  if (!container) return; // important

  container.innerHTML = "";

  products.slice(0, visibleCount).forEach(p => {
    container.innerHTML += `
      <div class="product">
        <img src="${p.img}">
        <h3>${p.name}</h3>
        <div class="rating">⭐⭐⭐⭐☆</div>
        <span class="discount">-20%</span>
        <p>₹${p.price}</p>
        <button onclick="addToCart('${p.name}')">Add to Cart</button>
        <button onclick="buyProduct('${p.name}')">Buy</button>
      </div>
    `;
  });
}

let cart = [];

function addToCart(name) {
  cart.push(name);
  showToast(name + " added to cart 🛒");
}

function showMoreProducts() {
  visibleCount = products.length;
  loadProducts();
  document.getElementById("viewMoreBtn").style.display = "none";
}

function buyProduct(name) {
  if (!requireLogin()) return;
  showToast(name + " ordered successfully 🛒");
}


function goToProducts() {

  if (!requireLogin()) return;

  window.location.href = "products.html";
}

// Initial load
// window.onload = function () {
//   loadProducts();
// };

document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("productContainer");

  if (container) {
    loadProducts();
  }
});

// Loading....
window.addEventListener("load", () => {
  document.getElementById("loader").style.display = "none";
});

function openModal() {
  document.getElementById("authModal").style.display = "flex";
   showLogin(); 
}

function closeModal() {
  document.getElementById("authModal").style.display = "none";
}

function requireLogin() {
  if (!isLoggedIn) {
    openModal();   // popup open
    return false;
  }
  return true;
}

