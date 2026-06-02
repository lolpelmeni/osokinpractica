const cartContainer =
document.getElementById("cart-container");

const cartCount =
document.getElementById("cart-count");

const summaryCount =
document.getElementById("summary-count");

const summaryPrice =
document.getElementById("summary-price");

const emptyCart =
document.getElementById("empty-cart");

const cartSummary =
document.getElementById("cart-summary");

let cart =
JSON.parse(localStorage.getItem("cart")) || [];

renderCart();

function renderCart(){

    cartContainer.innerHTML = "";

    cartCount.textContent =
        `${cart.length} товаров`;

    summaryCount.textContent =
        cart.length;

    if(cart.length === 0){

        emptyCart.style.display = "block";
        cartSummary.style.display = "none";

        return;
    }

    emptyCart.style.display = "none";
    cartSummary.style.display = "block";

    let total = 0;

    cart.forEach(product => {

        total += parseInt(
            product.price.replace(/\D/g, "")
        );

        cartContainer.innerHTML += `
            <div class="product-card">

                <div class="product-image">
                    <img src="${product.image}" alt="">
                </div>

                <h4>${product.name}</h4>

                ${
                    product.oldPrice
                    ?
                    `<span class="old-price">${product.oldPrice}</span>`
                    :
                    ""
                }

                <div class="product-bottom">
                    <span class="price">
                        ${product.price}
                    </span>

                    <button class="cart-remove">
                        ✕
                    </button>
                </div>

            </div>
        `;
    });

    summaryPrice.textContent =
        total.toLocaleString("ru-RU") + " ₽";

    addRemoveHandlers();
}

function addRemoveHandlers(){

    const removeButtons =
    document.querySelectorAll(".cart-remove");

    removeButtons.forEach(button => {

        button.addEventListener("click", () => {

            const card =
                button.closest(".product-card");

            const name =
                card.querySelector("h4").textContent;

            cart = cart.filter(item =>
                item.name !== name
            );

            localStorage.setItem(
                "cart",
                JSON.stringify(cart)
            );

            renderCart();

        });

    });

}