const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section");
const navbar = document.getElementById("nav");

function makeActive(currentLink) {
  navLinks.forEach((link) => {
    link.classList.remove("nav-link-active");
  });
  currentLink.classList.add("nav-link-active");
}

navLinks.forEach((link) => {
  link.addEventListener("click", function () {
    makeActive(this);
  });
});

const options = {
  threshold: 0.7, // Trigger when section is 70% visible
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const targetId = entry.target.getAttribute("id");
      const currentNavLink = document.querySelector(
        `.nav-link[href="#${targetId}"]`
      );
      if (currentNavLink) {
        navLinks.forEach((link) => link.classList.remove("nav-link-active"));
        currentNavLink.classList.add("nav-link-active");
      }
    }
  });
}, options);

sections.forEach((section) => {
  observer.observe(section);
});

const navbarTogglerIcon = document.getElementById("navbar-toggler-icon");

navbar.addEventListener("show.bs.collapse", () => {
  navbarTogglerIcon.classList.add("menu-icon-exit");
  navbarTogglerIcon.classList.remove("menu-icon-list");
});

navbar.addEventListener("hide.bs.collapse", () => {
  navbarTogglerIcon.classList.add("menu-icon-list");
  navbarTogglerIcon.classList.remove("menu-icon-exit");
});

const bakingClassDropdown = document.querySelectorAll(".dropdown-name-area");

bakingClassDropdown.forEach((dropdown) => {
  dropdown.addEventListener("click", function () {
    const bakingClassDropdownIcon = dropdown.querySelector(".dropdown-icon");
    bakingClassDropdownIcon.classList.toggle("fa-minus");
    bakingClassDropdownIcon.classList.toggle("fa-plus");
  });
});

const cartSection = document.querySelector("#cart");
const cartArea = document.querySelector(".cart-area");
const shoppingCartIcon = document.querySelectorAll(".shopping-cart");
const cartExitIcon = document.querySelector("#exit-cart");
const emptyCartBtn = document.querySelector(".btn-empty-cart");

shoppingCartIcon.forEach((cartIcon) => {
  cartIcon.addEventListener("click", function () {
    cartSection.style.display = "flex";
    setTimeout(function () {
      cartSection.style.opacity = "1";
      cartArea.style.transform = "translateX(0px)";
    }, 1);
  });
});

cartExitIcon.addEventListener("click", function () {
  cartArea.style.transform = "translateX(30px)";
  cartSection.style.opacity = "0";
  setTimeout(function () {
    cartSection.style.display = "none";
  }, 500);
});

document.addEventListener("click", function (event) {
  const target = event.target;
  if (
    target === emptyCartBtn ||
    (!cartArea.contains(target) && target !== shoppingCartIcon[0])
  ) {
    cartArea.style.transform = "translateX(30px)";
    cartSection.style.opacity = "0";
    setTimeout(function () {
      cartSection.style.display = "none";
    }, 500);
  }
});

const bookBtn = document.querySelectorAll(".btn-book");
const numberOfParticipants = document.querySelector(".participants-quantity");
const bakingClassName = document.querySelector(".class-name");
const classImage = document.querySelector(".class-img");
const unitCost = document.querySelector(".unit-cost");
const cartContentElement = document.querySelector(".cart-content");
const cartFooter = document.querySelector(".cart-footer");
let cartItems = [];

function updateCart() {
  if (cartItems.length === 0) {
    cartContentElement.innerHTML = `<div class="empty-cart d-flex flex-column justify-content-center align-items-center">
          <div class="empty-cart-message">
            Your shopping cart is empty
          </div>
          <a href="#baking-classes" class="btn btn-empty-cart">
            Shop our classes
          </a>
        </div>`;
  } else {
    cartContentElement.innerHTML = cartItems.join("");
  }
}

function saveCartToLocalStorage() {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

bookBtn.forEach((btn) => {
  btn.addEventListener("click", function () {
    cartFooter.classList.remove("d-none");
    const price = unitCost.innerHTML;
    let quantity = numberOfParticipants.value;
    let priceTotal = price * quantity;
    let newItem = `<div class="cart-item pt-4 pb-4">
        <div class="row">
          <div class="col-3">
            <img
              src=${classImage.src}
              alt="baking class preview"
              class="img-fluid rounded"
            />
          </div>
          <div class="col-6 ps-0">
            <h5 class="pt-1">${bakingClassName.innerHTML}</h5>
            <div class="pt-2">
              Quantity:
              <input
                class="item-quantity text-center"
                type="number"
                value=${quantity}
                min="1"
              />
            </div>
          </div>
          <div class="col-3 text-end">
            <div class="item-price">$ ${priceTotal}.00</div>
            <i class="fa-regular fa-trash-can pt-4"></i>
          </div>
        </div>
      </div>`;
    cartItems.push(newItem);
    updateCart();
    saveCartToLocalStorage();
  });
});

window.addEventListener("load", function () {
  updateCart();
});
