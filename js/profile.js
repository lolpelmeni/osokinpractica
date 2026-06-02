const productsContainer =
document.getElementById(
    "my-products-container"
);

const emptyProducts =
document.getElementById(
    "empty-products"
);

let userProducts =
JSON.parse(
    localStorage.getItem("userProducts")
) || [];

renderProducts();

function renderProducts(){

    productsContainer.innerHTML = "";

    if(userProducts.length === 0){

        emptyProducts.style.display =
            "block";

        return;
    }

    emptyProducts.style.display =
        "none";

    userProducts.forEach(product => {

        productsContainer.innerHTML += `

            <div class="product-card">

                <div class="product-image">
                    <img src="${product.image}" alt="">
                </div>

                <h4>${product.name}</h4>

                <div class="product-bottom">

                    <span class="price">
                        ${product.price}
                    </span>

                    <button
                        class="delete-product"
                        data-id="${product.id}">

                        ✕

                    </button>

                </div>

            </div>

        `;
    });

    addDeleteHandlers();
}

function addDeleteHandlers(){

    const deleteButtons =
    document.querySelectorAll(
        ".delete-product"
    );

    deleteButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const id =
                Number(
                    button.dataset.id
                );

                userProducts =
                userProducts.filter(
                    product =>
                    product.id !== id
                );

                localStorage.setItem(
                    "userProducts",
                    JSON.stringify(
                        userProducts
                    )
                );

                renderProducts();
            }
        );

    });
}