const favoritesContainer =
document.getElementById("favorites-container");

const favoritesCount =
document.getElementById("favorites-count");

const emptyFavorites =
document.getElementById("empty-favorites");

let favorites =
JSON.parse(localStorage.getItem("favorites")) || [];

renderFavorites();

function renderFavorites(){

    favoritesContainer.innerHTML = "";

    favoritesCount.textContent =
        `${favorites.length} товаров`;

    if(favorites.length === 0){

        emptyFavorites.style.display = "block";

        return;
    }

    emptyFavorites.style.display = "none";

    favorites.forEach(product => {

        favoritesContainer.innerHTML += `
            <div class="product-card">

                <button class="favorite-btn">
                    <img src="../images/favorites-filled.png" alt="">
                </button>

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

                    <button class="cart-btn">
                        <img src="../images/basket.png" alt="">
                    </button>

                </div>

            </div>
        `;
    });

    addRemoveHandlers();
}

function addRemoveHandlers(){

    const buttons =
        document.querySelectorAll(".favorite-btn");

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            const card =
                button.closest(".product-card");

            const productName =
                card.querySelector("h4").textContent;

            favorites = favorites.filter(product =>
                product.name !== productName
            );

            localStorage.setItem(
                "favorites",
                JSON.stringify(favorites)
            );

            renderFavorites();

        });

    });

}