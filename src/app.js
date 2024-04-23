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
  if (!cartArea.contains(target) && target !== shoppingCartIcon[0]) {
    cartArea.style.transform = "translateX(30px)";
    cartSection.style.opacity = "0";
    setTimeout(function () {
      cartSection.style.display = "none";
    }, 500);
  }
});
