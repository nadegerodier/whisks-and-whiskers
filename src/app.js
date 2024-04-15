const navLinks = document.querySelectorAll(".nav-link");

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
