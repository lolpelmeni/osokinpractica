const slides = document.querySelectorAll('.slide');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

let currentSlide = 0;

function showSlide(index) {

    slides.forEach(slide => {
        slide.classList.remove('active');
    });

    slides[index].classList.add('active');
}

nextBtn.addEventListener('click', function () {

    currentSlide++;

    if (currentSlide >= slides.length) {
        currentSlide = 0;
    }

    showSlide(currentSlide);
});

prevBtn.addEventListener('click', function () {

    currentSlide--;

    if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    }

    showSlide(currentSlide);
});

const burgerBtn = document.querySelector('.burger-btn');
const mobileMenu = document.querySelector('.mobile-menu');

burgerBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
});

const closeBtn = document.querySelector('.close-menu');

closeBtn.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
});

const menuLinks = document.querySelectorAll('.mobile-menu a');

menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });
});


const productCards = document.querySelectorAll('.product-card');

const modal = document.getElementById('productModal');

const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalPrice = document.getElementById('modalPrice');
const modalOldPrice = document.getElementById('modalOldPrice');

const modalClose = document.querySelector('.modal-close');

productCards.forEach(card => {

    card.addEventListener('click', () => {

        const image =
            card.querySelector('.product-image img').src;

        const title =
            card.querySelector('h4').textContent;

        const price =
            card.querySelector('.price').textContent;

        const oldPriceElement =
            card.querySelector('.old-price');

        modalImage.src = image;
        modalTitle.textContent = title;
        modalPrice.textContent = price;

        if(oldPriceElement){
            modalOldPrice.textContent =
                oldPriceElement.textContent;
        }else{
            modalOldPrice.textContent = '';
        }

        modal.classList.add('active');
    });

});

modalClose.addEventListener('click', () => {
    modal.classList.remove('active');
});

modal.addEventListener('click', (e) => {

    if(e.target === modal){
        modal.classList.remove('active');
    }

});

const favoriteButtons = document.querySelectorAll(".favorite-btn");

favoriteButtons.forEach(button => {

    const card = button.closest(".product-card");

    const product = {
        name: card.querySelector("h4").textContent.trim(),
        price: card.querySelector(".price").textContent.trim(),
        image: card.querySelector(".product-image img").src,
        oldPrice: card.querySelector(".old-price")
            ? card.querySelector(".old-price").textContent.trim()
            : ""
    };

    let favorites =
        JSON.parse(localStorage.getItem("favorites")) || [];

    if (
        favorites.some(item => item.name === product.name)
    ) {
        button.querySelector("img").src =
            "../images/favorites-filled.png";
    }

    button.addEventListener("click", (e) => {

        e.stopPropagation();

        let favorites =
            JSON.parse(localStorage.getItem("favorites")) || [];

        const index = favorites.findIndex(
            item => item.name === product.name
        );

        if (index !== -1) {

            favorites.splice(index, 1);

            button.querySelector("img").src =
                "../images/favorites.png";

        } else {

            favorites.push(product);

            button.querySelector("img").src =
                "../images/favorites-filled.png";
        }

        localStorage.setItem(
            "favorites",
            JSON.stringify(favorites)
        );
    });

});

const cartButtons =
document.querySelectorAll(".cart-btn");

cartButtons.forEach(button => {

    button.addEventListener("click", (e) => {

        e.stopPropagation();

        const card =
            button.closest(".product-card");

        const product = {
            name: card.querySelector("h4").textContent,
            price: card.querySelector(".price").textContent,
            image: card.querySelector(".product-image img").src,
            oldPrice: card.querySelector(".old-price")
                ? card.querySelector(".old-price").textContent
                : ""
        };

        let cart =
            JSON.parse(localStorage.getItem("cart")) || [];

        const exists = cart.some(item =>
            item.name === product.name
        );

        if(!exists){

            cart.push(product);

            localStorage.setItem(
                "cart",
                JSON.stringify(cart)
            );
        }

    });

});