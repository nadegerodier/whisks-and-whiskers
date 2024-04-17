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
      navLinks.forEach((link) => link.classList.remove("nav-link-active"));
      currentNavLink.classList.add("nav-link-active");
    }
  });
}, options);

sections.forEach((section) => {
  observer.observe(section);
});

function handleScroll() {
  const alpha = Math.min(window.scrollY / 500, 1);
  navbar.style.backgroundColor = `rgba(48, 48, 48, ${alpha})`;
}

window.addEventListener("scroll", handleScroll);

const navbarTogglerIcon = document.getElementById("navbar-toggler-icon");

navbar.addEventListener("show.bs.collapse", () => {
  navbarTogglerIcon.classList.add("menu-icon-exit");
  navbarTogglerIcon.classList.remove("menu-icon-list");
});

navbar.addEventListener("hide.bs.collapse", () => {
  navbarTogglerIcon.classList.add("menu-icon-list");
  navbarTogglerIcon.classList.remove("menu-icon-exit");
});
