var itemSize = null;
var cartList;
var itemName;
var itemImage;
var itemPrice;
var cartQuantity = 0;

// initalise
function init() {
  cartList = [];
  itemName = 'Classic Tee';
  itemImage = 'images/classic-tee.jpg';
  itemPrice = '$75.00';
  updateCart();
}

// select/deselect size
function sizeClick(x) {
  for (var sml of document.getElementsByClassName('sml')) {
    sml.classList.remove("selectSize"); // remove all selected sizes on each click
  }
  var showsize = document.getElementById('sizetext');
  if (x != itemSize){
    document.getElementById(x).classList.add('selectSize');
    itemSize = x;
    showsize.innerHTML = ' ' + itemSize;
  }
  else {
    itemSize = null;
    showsize.innerHTML = '';
  }
}

// displays and updates total number of items in cart
function updateCart() {
  document.getElementById('cart').innerHTML = 'My Cart ( ' + cartQuantity.toString() + ' )';
}

// add item to cart
function addToCart () {
  if (itemSize == null) {
       alert('Please choose a size before adding to cart.');
     }
  else {
    cartQuantity += 1; // item add successful
    // check item already in cart
    if(cartList[itemName]) {
      // check item in cart with right size
      if (cartList[itemName][itemSize]) {
        cartList[itemName][itemSize].quantity += 1;
      }
      else {
        cartList[itemName][itemSize] = {quantity: 1};
      }
    }
    else {
      // add new shirt size to cart
      cartList[itemName] = {};
      cartList[itemName][itemSize] = {quantity: 1};
    }
    showCart();
  }
}

// loop through all shirts to find quantity of each size
function showCart () {
  document.getElementById("cart-div").innerHTML =""; // clear cart for item updates
  for (item in cartList) {
    for (size in cartList[item]) {
      var qty = cartList[item][size].quantity;
      createCartItem(item, size, qty);
    }
  }
}

// create div in html for each shirt size
function createCartItem(item, size, qty) {
  var html = "<div class='cartItem'><div class='cartColumn1'>"
  + "<img src=\"" + itemImage + "\" style=\"height: 100px\"></div>"
  + "<div class='cartColumn2'><p class='cartTitle'>" + item + "</p>"
  + "<span class='cartPrice'>" + qty + "x</span><span class='cartPriceBold'> $75.00</span>"
  + "<p class='cartSize'> Size: " + size + "</p></div>"
  + "</div>";
  document.getElementById("cart-div").innerHTML += html;
  updateCart();
}

init();
