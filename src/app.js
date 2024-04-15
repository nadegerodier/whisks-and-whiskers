const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section");

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
  threshold: 0.7, // Trigger when section is 50% visible
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
