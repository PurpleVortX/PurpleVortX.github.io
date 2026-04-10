// Fade IN on page load
window.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("page-loaded");
});

// Fade OUT on navigation
document.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", function (e) {
    const href = this.getAttribute("href");

    // Ignore:
    if (
      !href ||
      href.startsWith("#") ||
      href.startsWith("http") ||
      this.target === "_blank"
    ) return;

    e.preventDefault();

    document.body.classList.remove("page-loaded");

    setTimeout(() => {
      window.location.href = href;
    }, 300);
  });
});

const indicator = document.querySelector(".nav-indicator");
const links = document.querySelectorAll(".topnav a");

function moveIndicator(el) {
  const rect = el.getBoundingClientRect();
  const parentRect = el.parentElement.getBoundingClientRect();

  indicator.style.width = rect.width + "px";
  indicator.style.left = (rect.left - parentRect.left) + "px";
}

// Move on click
links.forEach(link => {
  link.addEventListener("click", () => {
    moveIndicator(link);
  });
});

// Set position on page load (active page)
window.addEventListener("DOMContentLoaded", () => {
  const current = [...links].find(link =>
    link.href === window.location.href
  );

  if (current) {
    moveIndicator(current);
  } else if (links[0]) {
    moveIndicator(links[0]);
  }
});