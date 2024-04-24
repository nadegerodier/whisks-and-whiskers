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

// /const addToCartBtn = document.querySelectorAll(".btn-add-to-cart");
// /const numberOfParticipants = document.querySelector(".participants-quantity");
// /const cartContentElement = document.querySelector(".cart-content");
// /const bakingClassName = document.querySelector(".class-name");
// /const bakingClassImageURL = document.querySelector(".class-img");
// /const bakingClassPrice = document.querySelector(".class-current-price");
// /const cartFooter = document.querySelector(".cart-footer");
// /let cartItems = [];

//Method 1
// function removeItem(index) {
//   cartItems.splice(index, 1);
//   updateCart();
//   saveCartToLocalStorage();
// }

// cartContentElement.addEventListener("click", function (event) {
//   if (event.target.classList.contains("trash-can")) {
//     const itemIndex = event.target.closest(".cart-item").dataset.index;
//     removeItem(itemIndex);
//     console.log(itemIndex);
//   }
// });

// function updateCart() {
//   if (cartItems.length === 0) {
//     cartContentElement.innerHTML = `<div class="empty-cart d-flex flex-column justify-content-center align-items-center">
//           <div class="empty-cart-message">
//             Your shopping cart is empty
//           </div>
//           <a href="#baking-classes" class="btn btn-empty-cart">
//             Shop our classes
//           </a>
//         </div>`;
//   } else {
//     cartContentElement.innerHTML = cartItems.join("");
//   }
// }

// function saveCartToLocalStorage() {
//   localStorage.setItem("cartItems", JSON.stringify(cartItems));
// }

// addToCartBtn.forEach((btn) => {
//   btn.addEventListener("click", function () {
//     cartFooter.classList.remove("d-none");
//     const price = bakingClassPrice.innerHTML;
//     let quantity = numberOfParticipants.value;
//     let priceTotal = price * quantity;
//     let dataIndex = cartItems.length;
//     let newItem = `<div class="cart-item pt-4 pb-4" data-index="${dataIndex}">
//         <div class="row">
//           <div class="col-3">
//             <img
//               src=${bakingClassImageURL.src}
//               alt="baking class preview"
//               class="img-fluid rounded"
//             />
//           </div>
//           <div class="col-6 ps-0">
//             <h5 class="pt-1">${bakingClassName.innerHTML}</h5>
//             <div class="pt-2">
//               Quantity:
//               <input
//                 class="item-quantity text-center"
//                 type="number"
//                 value=${quantity}
//                 min="1"
//               />
//             </div>
//           </div>
//           <div class="col-3 text-end">
//             <div class="item-price">$ ${priceTotal}.00</div>
//             <i class="fa-regular fa-trash-can trash-can pt-4"></i>
//           </div>
//         </div>
//       </div>`;
//     cartItems.push(newItem);
//     updateCart();
//     saveCartToLocalStorage();
//   });
// });

// window.addEventListener("load", function () {
//   const storedCartItems = localStorage.getItem("cartItems");
//   if (storedCartItems) {
//     cartItems = JSON.parse(storedCartItems);
//     updateCart();
//   }
// });

//Method 2
document.addEventListener("DOMContentLoaded", loadContent);

let cartItemsList = [];

function loadContent() {
  const addToCartBtn = document.querySelectorAll(".btn-add-to-cart");
  addToCartBtn.forEach((addBtn) => {
    addBtn.addEventListener("click", getItemData);
  });

  const changeCartQuantity = document.querySelectorAll(".item-quantity");
  changeCartQuantity.forEach((input) => {
    input.addEventListener("change", changeQuantity);
  });

  const removeFromCartBtn = document.querySelectorAll(".trash-can");
  removeFromCartBtn.forEach((removeBtn) => {
    removeBtn.addEventListener("click", removeItem);
  });

  updateTotalCost();

  updateCartCount();
}

function getItemData() {
  const bakingClassSection = this.closest(".class-info");
  const bakingClassName =
    bakingClassSection.querySelector(".class-name").innerHTML;
  const numberOfParticipants = bakingClassSection.querySelector(
    ".participants-quantity"
  ).value;
  const bakingClassCost = bakingClassSection.querySelector(
    ".class-current-price"
  ).innerHTML;
  const bakingClassImageURL =
    bakingClassSection.querySelector(".class-img").src;

  const newItem = {
    bakingClassName,
    numberOfParticipants,
    bakingClassCost,
    bakingClassImageURL,
  };

  cartItemsList.push(newItem);

  addToCart(
    bakingClassName,
    numberOfParticipants,
    bakingClassCost,
    bakingClassImageURL
  );

  loadContent();
}

function addToCart(
  bakingClassName,
  numberOfParticipants,
  bakingClassCost,
  bakingClassImageURL
) {
  const cartFooter = document.querySelector(".cart-footer");
  cartFooter.classList.remove("d-none");
  const cartContentElement = document.querySelector(".cart-content");
  cartContentElement.innerHTML = `<div class="cart-item pt-4 pb-4">
        <div class="row">
          <div class="col-3">
            <img
              src=${bakingClassImageURL}
              alt="baking class preview"
              class="img-fluid rounded"
            />
          </div>
          <div class="col-6 ps-0">
            <h5 class="baking-class-name pt-1">${bakingClassName}</h5>
            <div class="pt-2">
              Quantity:
              <input
                class="item-quantity text-center"
                type="number"
                value=${numberOfParticipants}
                min="1"
              />
            </div>
          </div>
          <div class="col-3 text-end">
            <span class=unit-cost>${bakingClassCost}</span>
            <div class="item-price"></div>
            <i class="fa-regular fa-trash-can trash-can pt-4"></i>
          </div>
        </div>
      </div>`;
}

function changeQuantity() {
  loadContent();
}

function removeItem() {
  const cartItemElement = this.closest(".cart-item");
  const bakingClassName =
    cartItemElement.querySelector(".baking-class-name").innerHTML;
  cartItemsList = cartItemsList.filter(
    (el) => el.bakingClassName != bakingClassName
  );
  cartItemElement.remove();

  const cartFooter = document.querySelector(".cart-footer");
  const cartContentElement = document.querySelector(".cart-content");
  if (cartItemsList.length === 0) {
    cartFooter.classList.add("d-none");
    cartContentElement.innerHTML = `<div
                class="empty-cart d-flex flex-column justify-content-center align-items-center"
              >
                <div class="empty-cart-message">
                  Your shopping cart is empty
                </div>
                <a href="/index.html#baking-classes" class="btn btn-empty-cart"
                  >Shop our classes</a
                >
              </div>`;
  }

  loadContent();
}

function updateTotalCost() {
  const cartItems = document.querySelectorAll(".cart-item");
  const cartTotalQuantity = document.querySelector(".total-quantity");
  const cartTotalCost = document.querySelector(".total-cost");
  let total = 0;
  let quantityTotal = 0;

  cartItems.forEach((item) => {
    const cartItemUnitCost = parseFloat(
      item.querySelector(".unit-cost").innerHTML
    );
    const cartItemQuantity = parseInt(
      item.querySelector(".item-quantity").value
    );
    const cartItemTotalCost = cartItemUnitCost * cartItemQuantity;

    const cartItemPriceElement = item.querySelector(".item-price");
    cartItemPriceElement.innerHTML = `$ ${cartItemTotalCost}.00`;

    quantityTotal += cartItemQuantity;
    total += cartItemTotalCost;
  });

  cartTotalQuantity.innerHTML = quantityTotal;

  cartTotalCost.innerHTML = `$ ${total}.00`;
}

function updateCartCount() {
  const cartTotalQuantity = parseInt(
    document.querySelector(".total-quantity").innerHTML
  );
  const cartCountElement = document.querySelector(".cart-count");
  const cartCountNavbarElement = document.querySelector(".cart-count-navbar");
  const itemsCount = cartTotalQuantity;

  if (itemsCount === 0) {
    cartCountElement.innerHTML = "";
    cartCountNavbarElement.innerHTML = "";
  } else {
    cartCountElement.innerHTML = ` (${itemsCount})`;
    cartCountNavbarElement.innerHTML = ` ${itemsCount}`;
  }
}
