let removeButtons = document.getElementsByClassName("removeButton");
for (i = 0; i < removeButtons.length; i++) {
  let button = removeButtons[i];
  button.addEventListener("click", removeItem);
}

let quantityInputs = document.getElementsByClassName("quantityInput");
for (i = 0; i < quantityInputs.length; i++) {
  let input = quantityInputs[i];
  input.addEventListener("change", quantityChange);
}

let addToCartButtons = document.getElementsByClassName("addButton");
for (i = 0; i < addToCartButtons.length; i++) {
  let button = addToCartButtons[i];
  button.addEventListener("click", addToCartClicked);
}

document
  .getElementsByClassName("buttonOfPurchase")[0]
  .addEventListener("click", purchaseClicked);

function purchaseClicked() {
  alert("Thank you for your purchase.");
  let cartItems = document.getElementsByClassName("cartItems")[0];
  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild);
  }
  updateTotal();
}

function removeItem(event) {
  let buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  updateTotal();
}

function quantityChange(event) {
  let input = event.target;
  console.log(input);
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateTotal();
}

function addToCartClicked(event) {
  let button = event.target;
  let shopItem = button.parentElement.parentElement;
  let title = shopItem.getElementsByClassName("titleOfShopItem")[0].innerText;
  let price = shopItem.getElementsByClassName("priceOfShopItem")[0].innerText;
  let imageSrc = shopItem.getElementsByClassName("imageOfShopItem")[0].src;
  addItemToCart(title, price, imageSrc);
  updateTotal();
}

function addItemToCart(title, price, imageSrc) {
  let cartRow = document.createElement("div");
  cartRow.classList.add("cartRow");
  let cartItems = document.getElementsByClassName("cartItems")[0];
  let cartItemNames = cartItems.getElementsByClassName("cartItemTitle");
  for (i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == title) {
      alert("This item is already added to the cart.");
      return;
    }
  }
  let cartRowContent = `<div class="cartItem">
    <div class="cartColumn cartProduct">
    <img class="imageOfCartItem" src="${imageSrc}" width="200" height="150">
    <span class="cartItemTitle">${title}</span>
    </div>
    <span class="priceOfCart cartColumn">${price}</span>
    <div class="cartColumn cartPriceAndRemoveButton">
    <input type="number" value="1" class="quantityInputOfCart">
    <button type="button" class="removeButton">REMOVE</button>
    </div>
    </div>`;
  cartRow.innerHTML = cartRowContent;
  cartItems.append(cartRow);
  cartRow
    .getElementsByClassName("removeButton")[0]
    .addEventListener("click", removeItem);
  cartRow
    .getElementsByClassName("quantityInputOfCart")[0]
    .addEventListener("change", quantityChange); 
}

function updateTotal() {
  let cartItemContainer = document.getElementsByClassName("cartItems")[0];
  let cartRows = cartItemContainer.getElementsByClassName("cartRow");
  let total = 0;
  
  for (i = 0; i < cartRows.length; i++) {
    let cartRow = cartRows[i];
    let priceElement = cartRow.getElementsByClassName("priceOfCart")[0];
    let quantityInput = cartRow.getElementsByClassName("quantityInputOfCart")[0];
    let price = parseFloat(priceElement.innerText.replace("$", ""));
    let quantity = quantityInput.value;
    total = total + (price * quantity);
  }

  document.getElementsByClassName("priceOfCartTotal")[0].innerText =
    total + "$";
}

function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("main").style.marginRight = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginRight= "0";
}
