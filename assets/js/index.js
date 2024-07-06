// * =========> HTML Elements
var nameInput = document.getElementById("name");
var categoryInput = document.getElementById("category");
var priceInput = document.getElementById("price");
var descriptionInput = document.getElementById("description");
var imageInput = document.getElementById("imageInput");
var imgSrcContainer = document.getElementById("imgSrcContainer");
var imgSrc = document.getElementById("imgSrc");
var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");
var productsContainer = document.getElementById("productsContainer");
var searchInput = document.getElementById("searchInput");

// ^ =========> App variables
var nameRegex = /^[A-Z][a-z]{3,}/;
var priceRegex = /^([1-9]|[1-9][0-9]|100)$/;
var descriptionRegex = /^[a-z\s]{25,100}$/;

// var productList = [];
// if (JSON.parse(localStorage.getItem("productsList")) !== null) {
//   productList = JSON.parse(localStorage.getItem("productsList"))
//   displayAllProducts();
// }

var productList = JSON.parse(localStorage.getItem("productsList")) || [];
displayAllProducts();

var updatedIndex;

// & =========> Functions
function addProduct() {
  if (
    validate(nameInput, nameRegex) &&
    validate(categoryInput, nameRegex) &&
    validate(priceInput, priceRegex) &&
    validate(descriptionInput, descriptionRegex) &&
    imageInput.files.length !== 0
  ) {
    var product = {
      name: nameInput.value,
      category: categoryInput.value,
      price: priceInput.value,
      description: descriptionInput.value,
      imagePath: `./assets/imgs/${imageInput.files[0].name}`,
    };

    productList.push(product);
    localStorage.setItem("productsList", JSON.stringify(productList));
    displayProduct(productList.length - 1);
    clearForm();
  }
}

function displayProduct(index) {
  var productHTML = `
    <div class="col-md-3 col-sm-6">
      <div class="inner shadow px-3 py-4 rounded-3">
        <img
          src="${productList[index].imagePath}"
          class="w-100"
          alt="${productList[index].name}"
        />
        <div class="d-flex justify-content-between align-items-center mt-4">
          <h2 class="h5">${productList[index].name}</h2>
          <span class="h5 fw-bold">${productList[index].price}$</span>
        </div>
        <div class="d-flex gap-2 align-items-center">
          <i class="fa-solid fa-tag"></i>
          <h3 class="h6">${productList[index].category}</h3>
        </div>
        <p class="text-secondary">
         ${productList[index].description}
        </p>
        <button type="button" class="btn btn-outline-warning" onclick='getProductInfo(${index})'>Update</button>
        <button type="button" class="btn btn-outline-danger" onclick='deleteProduct(${index})'>Delete</button>
      </div>
    </div>
    `;

  productsContainer.innerHTML += productHTML;
}

function displayAllProducts() {
  productsContainer.innerHTML = "";
  for (var i = 0; i < productList.length; i++) {
    displayProduct(i);
  }
}

function deleteProduct(index) {
  productList.splice(index, 1);
  localStorage.setItem("productsList", JSON.stringify(productList));
  displayAllProducts();
}

function getProductInfo(index) {
  nameInput.value = productList[index].name;
  categoryInput.value = productList[index].category;
  priceInput.value = productList[index].price;
  descriptionInput.value = productList[index].description;
  imgSrc.innerHTML = productList[index].imagePath;

  imgSrcContainer.classList.remove("d-none");

  addBtn.classList.add("d-none");
  updateBtn.classList.remove("d-none");
  updatedIndex = index;
}

function updateProduct() {
  if (
    validate(nameInput, nameRegex) &&
    validate(categoryInput, nameRegex) &&
    validate(priceInput, priceRegex) &&
    validate(descriptionInput, descriptionRegex)
  ) {
    productList[updatedIndex].name = nameInput.value;
    productList[updatedIndex].price = priceInput.value;
    productList[updatedIndex].category = categoryInput.value;
    productList[updatedIndex].description = descriptionInput.value;

    if (imageInput.files.length > 0) {
      productList[
        updatedIndex
      ].imagePath = `./assets/imgs/${imageInput.files[0].name}`;
    }

    localStorage.setItem("productsList", JSON.stringify(productList));
    displayAllProducts();
    clearForm();
    imgSrcContainer.classList.add("d-none");

    addBtn.classList.remove("d-none");
    updateBtn.classList.add("d-none");
  }
}

function clearForm() {
  nameInput.value = "";
  nameInput.classList.remove("is-valid", "is-invalid");
  categoryInput.value = "";
  categoryInput.classList.remove("is-valid", "is-invalid");
  priceInput.value = "";
  priceInput.classList.remove("is-valid", "is-invalid");
  descriptionInput.value = "";
  descriptionInput.classList.remove("is-valid", "is-invalid");
  imageInput.value = null;
  imgSrc.innerHTML = "";
}

function searchProducts() {
  productsContainer.innerHTML = "";
  var term = searchInput.value;
  for (var i = 0; i < productList.length; i++) {
    if (productList[i].name.toLowerCase().includes(term.toLowerCase())) {
      displayProduct(i);
    }
  }
}

function validate(element, regex) {
  console.log(element);
  if (regex.test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    element.nextElementSibling.nextElementSibling.classList.add("d-none");
    return true;
  }

  element.classList.remove("is-valid");
  element.classList.add("is-invalid");
  element.nextElementSibling.nextElementSibling.classList.remove("d-none");
  return false;
}

// ~ =========> Events
addBtn.addEventListener("click", addProduct);
updateBtn.addEventListener("click", updateProduct);
