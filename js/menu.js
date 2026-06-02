const burgerBtn = document.querySelector(".burger-btn");
const mobileMenu = document.querySelector(".mobile-menu");
const closeBtn = document.querySelector(".close-menu");

if (burgerBtn) {
    burgerBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle("active");
    });
}

if (closeBtn) {
    closeBtn.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
    });
}

document.querySelectorAll(".mobile-menu a").forEach(link => {
    link.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
    });
});