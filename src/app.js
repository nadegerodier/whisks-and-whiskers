const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section");
const navbar = document.getElementById("nav");

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const navbarCollapse = document.querySelector(".navbar-collapse");
    const isNavbarOpen = navbarCollapse.classList.contains("show");
    if (isNavbarOpen) {
      const bsCollapse = new bootstrap.Collapse(navbarCollapse);
      bsCollapse.hide();
    }
  });
});

document.addEventListener("click", function (event) {
  const target = event.target;
  const navbarArea = document.querySelectorAll(".navbar");
  const navbarCollapse = document.querySelector(".navbar-collapse");
  const isNavbarOpen = navbarCollapse.classList.contains("show");
  navbarArea.forEach((navbar) => {
    if (isNavbarOpen && target !== navbar) {
      const bsCollapse = new bootstrap.Collapse(navbarCollapse);
      bsCollapse.hide();
    }
  });
});

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
  threshold: 0.4, // Trigger when section is 40% visible
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
const addToCartBtn = document.querySelectorAll(".btn-add-to-cart");
const cartExitIcon = document.querySelector("#exit-cart");
const emptyCartBtn = document.querySelector(".btn-empty-cart");

function showCart() {
  cartSection.style.display = "flex";
  setTimeout(function () {
    cartSection.style.opacity = "1";
    cartArea.style.transform = "translateX(0px)";
  }, 1);
}

function hideCart() {
  cartArea.style.transform = "translateX(30px)";
  cartSection.style.opacity = "0";
  setTimeout(function () {
    cartSection.style.display = "none";
  }, 500);
}

addToCartBtn.forEach((cartBtn) => {
  cartBtn.addEventListener("click", showCart);
});

shoppingCartIcon.forEach((cartIcon) => {
  cartIcon.addEventListener("click", showCart);
});

cartExitIcon.addEventListener("click", hideCart);

document.addEventListener("click", function (event) {
  const target = event.target;
  if (
    target === emptyCartBtn ||
    (!cartArea.contains(target) && target !== shoppingCartIcon[0])
  )
    if (
      target === emptyCartBtn ||
      (!cartArea.contains(target) && target !== addToCartBtn[0])
    )
      if (
        target === emptyCartBtn ||
        (!cartArea.contains(target) && !target.classList.contains("trash-can"))
      ) {
        hideCart();
      }
});

window.addEventListener("load", function () {
  const storedCartItems = localStorage.getItem("cartItems");
  if (storedCartItems) {
    try {
      cartItemsList = JSON.parse(storedCartItems);
      cartItemsList.forEach((item) => addToCart(item));
    } catch (error) {
      console.error("Error parsing cart items:", error);
    }
  }
  loadContent();
});

function saveCartToLocalStorage() {
  localStorage.setItem("cartItems", JSON.stringify(cartItemsList));
}

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

  const duplicateItem = cartItemsList.find(
    (el) => el.bakingClassName == newItem.bakingClassName
  );
  if (duplicateItem) {
    newItem.numberOfParticipants =
      Number(newItem.numberOfParticipants) +
      Number(duplicateItem.numberOfParticipants);
    duplicateItem.numberOfParticipants = newItem.numberOfParticipants;
    updateCart(duplicateItem);
  } else {
    cartItemsList.push(newItem);
  }

  addToCart(newItem);

  loadContent();
}

function updateCart(item) {
  const cartContentElement = document.querySelector(".cart-content");
  const cartContentH5Elements = cartContentElement.querySelectorAll("h5");

  let foundDuplicateItem;
  cartContentH5Elements.forEach((h5Element) => {
    if (h5Element.innerHTML === item.bakingClassName) {
      foundDuplicateItem = h5Element;
    }
  });

  const foundDuplicateItemElement = foundDuplicateItem.closest(".cart-item");
  foundDuplicateItemElement.remove();
}

function addToCart(item) {
  const cartFooter = document.querySelector(".cart-footer");
  cartFooter.classList.remove("d-none");
  const emptyCartInfo = document.querySelector(".empty-cart");
  emptyCartInfo.classList.add("d-none");
  const cartContentElement = document.querySelector(".cart-content");
  const cartItemHTML = `<div class="cart-item pt-4 pb-4">
        <div class="row">
          <div class="col-2 col-sm-3 d-sm-flex align-items-center">
            <img
              src=${item.bakingClassImageURL}
              alt="baking class preview"
              class="img-fluid rounded"
            />
          </div>
          <div class="col-7 col-sm-6 ps-0">
            <h5 class="baking-class-name">${item.bakingClassName}</h5>
            <div class="quantity pt-2">
              Quantity:
              <input
                class="item-quantity text-center"
                type="number"
                value=${item.numberOfParticipants}
                min="1"
                name="item-quantity"
              />
            </div>
          </div>
          <div class="col-3 text-end">
            <span class=unit-cost>${item.bakingClassCost}</span>
            <div class="item-price"></div>
            <i class="fa-regular fa-trash-can trash-can pt-4"></i>
          </div>
        </div>
      </div>`;
  cartContentElement.insertAdjacentHTML("beforeend", cartItemHTML);
  saveCartToLocalStorage();
}

function changeQuantity() {
  const cartItemElement = this.closest(".cart-item");
  const cartItemBakingClassName =
    cartItemElement.querySelector(".baking-class-name").innerHTML;
  const cartItemQuantity =
    cartItemElement.querySelector(".item-quantity").value;

  const cartItemElementIndex = cartItemsList.findIndex(
    (item) => item.bakingClassName == cartItemBakingClassName
  );

  cartItemsList[cartItemElementIndex].numberOfParticipants = cartItemQuantity;

  loadContent();

  saveCartToLocalStorage();
}

function removeItem() {
  const cartItemElement = this.closest(".cart-item");
  cartItemElement.style.opacity = "0.4";
  setTimeout(function () {
    cartItemElement.remove();
    loadContent();
  }, 500);

  const bakingClassName =
    cartItemElement.querySelector(".baking-class-name").innerHTML;
  cartItemsList = cartItemsList.filter(
    (el) => el.bakingClassName != bakingClassName
  );
  saveCartToLocalStorage();

  const cartFooter = document.querySelector(".cart-footer");
  const cartContentElement = document.querySelector(".cart-content");
  if (cartItemsList.length === 0) {
    setTimeout(function () {
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
    }, 500);
  }
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

const checkoutBtn = document.querySelectorAll(".btn-checkout");
checkoutBtn.forEach((Btn) => {
  Btn.addEventListener("click", function () {
    alert("Checkout is disabled on this site");
  });
});

const thumbnailImages = document.querySelectorAll(".thumbnail");

function addClassActive(currentThumbnail) {
  thumbnailImages.forEach((thumbnail) => {
    thumbnail.classList.remove("active");
  });
  currentThumbnail.classList.add("active");
}

thumbnailImages.forEach((thumbnail) => {
  thumbnail.addEventListener("mouseover", function () {
    const mainImageElement = thumbnail
      .closest(".col-xl-6")
      .querySelector(".main-img");
    mainImageElement.src = thumbnail.src;
    addClassActive(this);
  });
});
