const form = document.getElementById("sellForm");

form.addEventListener("submit", function(e){

    e.preventDefault();

    const name =
        document.getElementById("productName").value;

    const price =
        document.getElementById("productPrice").value;

    const category =
        document.getElementById("productCategory").value;

    const description =
        document.getElementById("productDescription").value;

    const imageInput =
        document.getElementById("productImage");

    const file =
        imageInput.files[0];

    if(!file){
        alert("Выберите изображение");
        return;
    }

    const reader = new FileReader();

    reader.onload = function(){

        const product = {

            id: Date.now(),

            name: name,

            price: price + " ₽",

            category: category,

            description: description,

            image: reader.result

        };

        let userProducts =
            JSON.parse(
                localStorage.getItem("userProducts")
            ) || [];

        userProducts.push(product);

        localStorage.setItem(
            "userProducts",
            JSON.stringify(userProducts)
        );

        alert("Товар опубликован");

        form.reset();
    };

    reader.readAsDataURL(file);
});

const imageInput =
document.getElementById("productImage");

const previewImage =
document.getElementById("previewImage");

imageInput.addEventListener("change", () => {

    const file = imageInput.files[0];

    if(!file) return;

    const reader = new FileReader();

    reader.onload = function(e){

        previewImage.src = e.target.result;

    };

    reader.readAsDataURL(file);

});