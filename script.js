// ============================================================
// FLIPSHOP - COMPLETE SCRIPT
// ============================================================

// ============================================================
// PRODUCTS
// ============================================================

const products = [
    {id:1,name:"Samsung Galaxy Smartphone",price:14999,oldPrice:17999,rating:4.5,discount:17,category:"Mobiles",stock:10,image:"images/product1.jpg"},
    {id:2,name:"iPhone 15",price:59999,oldPrice:69999,rating:4.7,discount:14,category:"Mobiles",stock:8,image:"images/product2.jpg"},
    {id:3,name:"Redmi Note Smartphone",price:12999,oldPrice:15999,rating:4.3,discount:19,category:"Mobiles",stock:15,image:"images/product3.jpg"},
    {id:4,name:"HP Laptop",price:49999,oldPrice:57999,rating:4.4,discount:14,category:"Electronics",stock:7,image:"images/product4.jpg"},
    {id:5,name:"Dell Laptop",price:55999,oldPrice:64999,rating:4.5,discount:14,category:"Electronics",stock:6,image:"images/product5.jpg"},
    {id:6,name:"Wireless Headphones",price:1999,oldPrice:2999,rating:4.2,discount:33,category:"Audio",stock:20,image:"images/product6.jpg"},
    {id:7,name:"Bluetooth Speaker",price:2499,oldPrice:3499,rating:4.1,discount:29,category:"Audio",stock:12,image:"images/product7.jpg"},
    {id:8,name:"Smart Watch",price:2499,oldPrice:3999,rating:4.4,discount:38,category:"Watches",stock:18,image:"images/product8.jpg"},
    {id:9,name:"Premium Analog Watch",price:3499,oldPrice:4999,rating:4.6,discount:30,category:"Watches",stock:9,image:"images/product9.jpg"},
    {id:10,name:"Men's Casual Shirt",price:899,oldPrice:1499,rating:4.2,discount:40,category:"Fashion",stock:25,image:"images/product10.jpg"},
    {id:11,name:"Women's Kurti",price:799,oldPrice:1299,rating:4.3,discount:38,category:"Fashion",stock:30,image:"images/product11.jpg"},
    {id:12,name:"Men's Running Shoes",price:1499,oldPrice:2499,rating:4.4,discount:40,category:"Fashion",stock:14,image:"images/product12.jpg"},
    {id:13,name:"Cotton Bedsheet",price:699,oldPrice:1199,rating:4.1,discount:42,category:"Home",stock:22,image:"images/product13.jpg"},
    {id:14,name:"Table Lamp",price:999,oldPrice:1599,rating:4.3,discount:38,category:"Home",stock:16,image:"images/product14.jpg"},
    {id:15,name:"Kitchen Mixer",price:2999,oldPrice:3999,rating:4.5,discount:25,category:"Home",stock:11,image:"images/product15.jpg"},
    {id:16,name:"Remote Control Car",price:1299,oldPrice:1999,rating:4.2,discount:35,category:"Toys",stock:19,image:"images/product16.jpg"},
    {id:17,name:"Kids Building Blocks",price:599,oldPrice:999,rating:4.4,discount:40,category:"Toys",stock:24,image:"images/product17.jpg"},
    {id:18,name:"Gaming Keyboard",price:1799,oldPrice:2499,rating:4.5,discount:28,category:"Electronics",stock:13,image:"images/product18.jpg"},
    {id:19,name:"Wireless Mouse",price:699,oldPrice:999,rating:4.3,discount:30,category:"Electronics",stock:21,image:"images/product19.jpg"},
    {id:20,name:"Power Bank",price:1199,oldPrice:1799,rating:4.2,discount:33,category:"Electronics",stock:17,image:"images/product20.jpg"}
];

// ============================================================
// STATE
// ============================================================

let cartItems = JSON.parse(localStorage.getItem("flipshopCart")) || [];
let wishlist = JSON.parse(localStorage.getItem("flipshopWishlist")) || [];
let currentUser = JSON.parse(localStorage.getItem("flipshopUser")) || null;

let currentDetailsProduct = null;
let detailsQuantity = 1;
let selectedReviewRating = 5;

let selectedCategory = "All";
let currentSearchKeyword = "";
let currentSortType = "default";

let appliedCoupon = null;
let couponDiscount = 0;

let flipshopReviews =
    JSON.parse(localStorage.getItem("flipshopReviews")) || [];

// ============================================================
// COUPONS
// ============================================================

const coupons = {
    SAVE10: 10,
    SAVE20: 20,
    WELCOME: 15
};

// ============================================================
// ELEMENTS
// ============================================================

const productsContainer = document.getElementById("products");
const cartButton = document.getElementById("cart");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const loginButton = document.getElementById("loginButton");

// ============================================================
// CSS
// ============================================================

const style = document.createElement("style");

style.textContent = `

.product-image{
    width:100%;
    height:300px;
    display:flex;
    align-items:center;
    justify-content:center;
    overflow:hidden;
    background:#fff;
    padding:10px;
    box-sizing:border-box;
    cursor:pointer;
}

.product-image img{
    width:100%;
    height:100%;
    object-fit:contain;
}

.product-buttons{
    display:flex;
    flex-direction:column;
    gap:7px;
    margin-top:10px;
}

.product-buttons button{
    width:100%;
    border:none;
    padding:11px;
    border-radius:5px;
    cursor:pointer;
    font-weight:bold;
}

.add-cart-button{background:#ff9f00;color:white}
.buy-now-button{background:#fb641b;color:white}
.wishlist-button{background:#fff0f0;color:#e53935}

.wishlist-header-btn{
    border:none;
    background:white;
    color:#2874f0;
    padding:10px 15px;
    border-radius:4px;
    cursor:pointer;
    font-weight:bold;
    white-space:nowrap;
}

.wishlist-header-btn span{
    background:#e53935;
    color:white;
    border-radius:50%;
    padding:2px 7px;
    margin-left:4px;
}

.flipshop-overlay{
    position:fixed;
    inset:0;
    background:rgba(0,0,0,.65);
    z-index:99999;
    overflow-y:auto;
    padding:20px;
    box-sizing:border-box;
}

.flipshop-box{
    width:100%;
    max-width:1100px;
    margin:20px auto;
    background:white;
    border-radius:10px;
    padding:25px;
    box-sizing:border-box;
}

.flipshop-close{
    border:none;
    background:#2874f0;
    color:white;
    padding:9px 16px;
    border-radius:5px;
    cursor:pointer;
}

.flipshop-primary{
    width:100%;
    padding:12px;
    border:none;
    background:#ff9f00;
    color:white;
    border-radius:5px;
    cursor:pointer;
    font-weight:bold;
    margin-top:8px;
}

.flipshop-buy{
    width:100%;
    padding:12px;
    border:none;
    background:#fb641b;
    color:white;
    border-radius:5px;
    cursor:pointer;
    font-weight:bold;
    margin-top:8px;
}

.wishlist-grid{
    display:grid;
    grid-template-columns:repeat(auto-fit,minmax(220px,1fr));
    gap:20px;
}

.wishlist-card{
    border:1px solid #ddd;
    border-radius:8px;
    padding:15px;
}

.wishlist-card img{
    width:100%;
    height:200px;
    object-fit:contain;
}

.details-layout{
    display:grid;
    grid-template-columns:55% 45%;
    gap:25px;
}

.details-image-section{
    width:100%;
    height:600px;
    display:flex;
    align-items:center;
    justify-content:center;
    background:white;
    overflow:hidden;
}

.details-image{
    width:100%;
    height:580px;
    object-fit:contain;
}

.qty-box{
    display:flex;
    align-items:center;
    gap:12px;
    margin:20px 0;
}

.qty-box button{
    width:35px;
    height:35px;
    border:none;
    background:#2874f0;
    color:white;
    border-radius:5px;
    cursor:pointer;
    font-size:18px;
}

.qty-box span{
    font-size:20px;
    font-weight:bold;
}

.cart-panel{
    position:fixed;
    top:0;
    right:0;
    width:430px;
    max-width:95%;
    height:100vh;
    background:white;
    z-index:99998;
    box-shadow:-5px 0 20px rgba(0,0,0,.25);
    overflow-y:auto;
}

.cart-header{
    padding:20px;
    border-bottom:1px solid #ddd;
    display:flex;
    justify-content:space-between;
    align-items:center;
}

.cart-header button{
    border:none;
    background:#eee;
    padding:8px 12px;
    cursor:pointer;
    border-radius:5px;
}

.cart-item{
    padding:15px;
    border-bottom:1px solid #eee;
    overflow:hidden;
}

.cart-item img{
    width:80px;
    height:80px;
    object-fit:contain;
    float:left;
    margin-right:12px;
}

.cart-qty{
    display:flex;
    align-items:center;
    gap:8px;
    margin-top:10px;
}

.cart-qty button{
    width:28px;
    height:28px;
    border:none;
    background:#2874f0;
    color:white;
    border-radius:4px;
    cursor:pointer;
}

.cart-total{
    padding:20px;
    border-top:1px solid #ddd;
    font-size:20px;
    font-weight:bold;
}

.coupon-box{
    margin:15px 0;
    padding:15px;
    background:#f7f9fc;
    border:1px solid #ddd;
    border-radius:7px;
}

.coupon-row{
    display:flex;
    gap:7px;
}

.coupon-row input{
    flex:1;
    padding:10px;
    border:1px solid #ccc;
    border-radius:5px;
}

.coupon-row button{
    border:none;
    background:#2874f0;
    color:white;
    padding:10px 15px;
    border-radius:5px;
    cursor:pointer;
    font-weight:bold;
}

.checkout-button{
    width:100%;
    padding:13px;
    border:none;
    background:#fb641b;
    color:white;
    border-radius:5px;
    cursor:pointer;
    font-weight:bold;
    margin-top:15px;
}

.checkout-modal{
    position:fixed;
    inset:0;
    background:rgba(0,0,0,.65);
    z-index:100000;
    overflow-y:auto;
    padding:20px;
}

.checkout-box{
    width:100%;
    max-width:900px;
    margin:20px auto;
    background:white;
    border-radius:10px;
    padding:25px;
    box-sizing:border-box;
}

.checkout-header{
    display:flex;
    justify-content:space-between;
    align-items:center;
    border-bottom:1px solid #ddd;
    padding-bottom:15px;
}

.checkout-close{
    border:none;
    background:#2874f0;
    color:white;
    padding:8px 14px;
    border-radius:5px;
    cursor:pointer;
}

.checkout-content{
    display:grid;
    grid-template-columns:1fr 1fr;
    gap:20px;
    margin-top:20px;
}

.checkout-section{
    border:1px solid #ddd;
    padding:20px;
    border-radius:8px;
}

.checkout-form{
    display:flex;
    flex-direction:column;
    gap:12px;
}

.form-row{
    display:grid;
    grid-template-columns:1fr 1fr;
    gap:12px;
}

.form-group{
    display:flex;
    flex-direction:column;
    gap:6px;
}

.form-group input,
.form-group textarea{
    width:100%;
    padding:11px;
    border:1px solid #ccc;
    border-radius:5px;
    box-sizing:border-box;
}

.payment-options{
    display:flex;
    flex-direction:column;
    gap:12px;
}

.payment-option{
    border:1px solid #ddd;
    padding:12px;
    border-radius:5px;
    cursor:pointer;
}

.checkout-item{
    display:flex;
    justify-content:space-between;
    gap:15px;
    padding:10px 0;
    border-bottom:1px solid #eee;
}

.order-success{
    max-width:600px;
    margin:60px auto;
    background:white;
    padding:40px;
    text-align:center;
    border-radius:10px;
}

.review-item{
    border:1px solid #ddd;
    border-radius:7px;
    padding:15px;
    margin-top:10px;
}

.review-top{
    display:flex;
    justify-content:space-between;
}

.review-stars{
    color:#ff9800;
}

.rating-selector{
    display:flex;
    gap:5px;
    margin:10px 0;
}

.rating-selector span{
    font-size:32px;
    cursor:pointer;
    color:#ff9800;
}

.tracking-step{
    display:grid;
    grid-template-columns:50px 1fr;
    gap:15px;
    align-items:center;
}

.tracking-icon{
    width:42px;
    height:42px;
    border-radius:50%;
    background:#ddd;
    display:flex;
    align-items:center;
    justify-content:center;
}

.tracking-step.active .tracking-icon{
    background:#2874f0;
    color:white;
}

.tracking-line{
    width:3px;
    height:35px;
    background:#ddd;
    margin-left:20px;
}

.tracking-line.active-line{
    background:#2874f0;
}

.login-overlay{
    position:fixed;
    inset:0;
    background:rgba(0,0,0,.65);
    z-index:100001;
    display:flex;
    align-items:center;
    justify-content:center;
    padding:20px;
}

.login-box{
    width:100%;
    max-width:420px;
    background:white;
    border-radius:10px;
    padding:30px;
    box-sizing:border-box;
}

.login-form{
    display:flex;
    flex-direction:column;
    gap:10px;
}

.login-form input{
    width:100%;
    padding:12px;
    box-sizing:border-box;
    border:1px solid #ccc;
    border-radius:5px;
}

.login-submit{
    border:none;
    background:#fb641b;
    color:white;
    padding:12px;
    border-radius:5px;
    cursor:pointer;
    font-weight:bold;
}

.user-menu{
    position:fixed;
    top:75px;
    right:20px;
    width:250px;
    background:white;
    border-radius:8px;
    padding:15px;
    box-shadow:0 5px 20px rgba(0,0,0,.25);
    z-index:100002;
}

.user-menu button{
    width:100%;
    border:none;
    background:#f5f5f5;
    padding:10px;
    margin-top:7px;
    text-align:left;
    border-radius:5px;
    cursor:pointer;
}

@media(max-width:768px){
    .details-layout{grid-template-columns:1fr}
    .details-image-section{height:350px}
    .details-image{height:340px}
    .checkout-content{grid-template-columns:1fr}
    .form-row{grid-template-columns:1fr}
    .cart-panel{width:100%;max-width:100%}
    .product-image{height:220px}
}

`;

document.head.appendChild(style);

// ============================================================
// MONEY
// ============================================================

function money(value){
    return "₹" + Number(value).toLocaleString("en-IN");
}

// ============================================================
// PRODUCT DISPLAY
// ============================================================

function displayProducts(list){

    if(!productsContainer) return;

    productsContainer.innerHTML="";

    if(!list || list.length===0){
        productsContainer.innerHTML=`
            <div style="width:100%;text-align:center;padding:50px">
                <h3>No products found</h3>
                <p>Try another search or category.</p>
            </div>`;
        return;
    }

    list.forEach(product=>{

        const card=document.createElement("div");
        card.className="product-card";

        const wished=wishlist.includes(Number(product.id));

        card.innerHTML=`
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>

            <h3>${product.name}</h3>

            <div>⭐ ${product.rating}</div>

            <div class="price-section">
                <span class="current-price">${money(product.price)}</span>
                <span class="old-price">${money(product.oldPrice)}</span>
                <span class="discount">${product.discount}% off</span>
            </div>

            <p class="stock">
                ${product.stock>5
                    ?"In Stock"
                    :"Only "+product.stock+" left"}
            </p>

            <div class="product-buttons">

                <button class="add-cart-button">
                    🛒 Add to Cart
                </button>

                <button class="buy-now-button">
                    ⚡ Buy Now
                </button>

                <button class="wishlist-button"
                    style="
                    background:${wished?"#e53935":"#fff0f0"};
                    color:${wished?"white":"#e53935"}">
                    ${wished
                        ?"💔 Remove Wishlist"
                        :"❤️ Add to Wishlist"}
                </button>

            </div>
        `;

        const image=card.querySelector("img");

        image.addEventListener("error",function(){
            this.src="https://placehold.co/500x500?text=FlipShop";
        });

        card.querySelector(".add-cart-button").onclick=()=>{
            addToCart(product.id);
        };

        card.querySelector(".buy-now-button").onclick=()=>{
            buyNow(product.id);
        };

        card.querySelector(".wishlist-button").onclick=()=>{
            toggleWishlist(product.id);
        };

        card.querySelector(".product-image").onclick=()=>{
            openProductDetails(product.id);
        };

        card.querySelector("h3").onclick=()=>{
            openProductDetails(product.id);
        };

        productsContainer.appendChild(card);
    });
}

// ============================================================
// CART
// ============================================================

function saveCart(){
    localStorage.setItem("flipshopCart",JSON.stringify(cartItems));
}

function addToCart(productId){

    productId=Number(productId);

    const product=products.find(p=>Number(p.id)===productId);

    if(!product) return;

    const existing=cartItems.find(
        item=>Number(item.id)===productId
    );

    if(existing){

        if(existing.quantity>=product.stock){
            alert("Maximum available stock reached.");
            return;
        }

        existing.quantity++;

    }else{

        cartItems.push({
            id:product.id,
            name:product.name,
            price:product.price,
            image:product.image,
            quantity:1
        });
    }

    saveCart();
    updateCartCount();

    showMessage(product.name+" added to cart!");
}

function updateCartCount(){

    if(!cartButton) return;

    const count=cartItems.reduce(
        (sum,item)=>sum+Number(item.quantity),0
    );

    cartButton.textContent=`🛒 Cart (${count})`;
}

function getCartTotal(){

    return cartItems.reduce(
        (total,item)=>
            total+
            Number(item.price)*Number(item.quantity),
        0
    );
}

// ============================================================
// COUPON
// ============================================================

function applyCoupon(){

    const input=document.getElementById("couponInput");

    if(!input) return;

    const code=input.value.trim().toUpperCase();

    if(!code){
        alert("Please enter a coupon code.");
        return;
    }

    if(!coupons[code]){
        appliedCoupon=null;
        couponDiscount=0;
        alert("Invalid coupon code.");
        updatePriceDisplays();
        return;
    }

    const subtotal=getCartTotal();

    appliedCoupon=code;

    couponDiscount=Math.round(
        subtotal*coupons[code]/100
    );

    showMessage(
        "🎉 "+code+" applied - "+coupons[code]+"% OFF"
    );

    updatePriceDisplays();
}

function removeCoupon(){

    appliedCoupon=null;
    couponDiscount=0;

    const input=document.getElementById("couponInput");

    if(input) input.value="";

    updatePriceDisplays();

    showMessage("Coupon removed.");
}

function getFinalTotal(){

    return Math.max(
        0,
        getCartTotal()-couponDiscount
    );
}

function updatePriceDisplays(){

    const subtotal=document.getElementById("checkoutSubtotal");
    const discount=document.getElementById("checkoutDiscount");
    const final=document.getElementById("checkoutFinalTotal");

    if(subtotal)
        subtotal.textContent=money(getCartTotal());

    if(discount)
        discount.textContent="- "+money(couponDiscount);

    if(final)
        final.textContent=money(getFinalTotal());

    renderCartIfOpen();
}

// ============================================================
// MESSAGE
// ============================================================

function showMessage(message){

    const old=document.getElementById("flipshopMessage");

    if(old) old.remove();

    const box=document.createElement("div");

    box.id="flipshopMessage";
    box.textContent=message;

    box.style.cssText=`
        position:fixed;
        top:80px;
        right:20px;
        z-index:999999;
        background:#2874f0;
        color:white;
        padding:14px 20px;
        border-radius:6px;
        box-shadow:0 4px 15px rgba(0,0,0,.2);
        font-weight:bold;
    `;

    document.body.appendChild(box);

    setTimeout(()=>{
        if(box) box.remove();
    },1800);
}

// ============================================================
// CART PANEL
// ============================================================

function openCart(){

    let panel=document.getElementById("flipshopCartPanel");

    if(!panel){
        panel=document.createElement("div");
        panel.id="flipshopCartPanel";
        panel.className="cart-panel";
        document.body.appendChild(panel);
    }

    renderCart();
}

function renderCart(){

    const panel=document.getElementById("flipshopCartPanel");

    if(!panel) return;

    if(cartItems.length===0){

        appliedCoupon=null;
        couponDiscount=0;

        panel.innerHTML=`
            <div class="cart-header">
                <h2>🛒 My Cart</h2>
                <button onclick="closeCart()">✕</button>
            </div>

            <div style="text-align:center;padding:60px 20px">
                <div style="font-size:60px">🛒</div>
                <h3>Your Cart is Empty</h3>
                <p>Add some products to your cart.</p>
            </div>
        `;

        return;
    }

    let html=`
        <div class="cart-header">
            <h2>🛒 My Cart</h2>
            <button onclick="closeCart()">✕</button>
        </div>
    `;

    cartItems.forEach(item=>{

        html+=`
            <div class="cart-item">

                <img src="${item.image}" alt="${item.name}">

                <strong>${item.name}</strong>

                <p>${money(item.price)}</p>

                <div class="cart-qty">

                    <button onclick="decreaseQuantity(${item.id})">
                        −
                    </button>

                    <span>${item.quantity}</span>

                    <button onclick="increaseQuantity(${item.id})">
                        +
                    </button>

                    <button
                        onclick="removeFromCart(${item.id})"
                        style="margin-left:10px;background:#e53935">
                        🗑️
                    </button>

                </div>
            </div>
        `;
    });

    html+=`
        <div class="cart-total">

            <div class="coupon-box">

                <strong>🎟️ Coupon Code</strong>

                <div class="coupon-row" style="margin-top:8px">

                    <input
                        id="couponInput"
                        placeholder="SAVE10"
                        value="${appliedCoupon||""}"
                    >

                    <button onclick="applyCoupon()">
                        Apply
                    </button>

                </div>

                <small>
                    Try SAVE10, SAVE20 or WELCOME
                </small>

                ${
                    appliedCoupon
                    ?`
                    <button
                        onclick="removeCoupon()"
                        style="
                            margin-top:8px;
                            border:none;
                            background:none;
                            color:#e53935;
                            cursor:pointer;
                        ">
                        Remove Coupon
                    </button>`
                    :""
                }

            </div>

            <div style="
                display:flex;
                justify-content:space-between;
                margin:8px 0;
            ">
                <span>Subtotal</span>
                <strong>${money(getCartTotal())}</strong>
            </div>

            <div style="
                display:flex;
                justify-content:space-between;
                color:green;
                margin:8px 0;
            ">
                <span>Discount</span>
                <strong>- ${money(couponDiscount)}</strong>
            </div>

            <div style="
                display:flex;
                justify-content:space-between;
                border-top:1px solid #ddd;
                padding-top:12px;
            ">
                <span>Total</span>
                <strong>${money(getFinalTotal())}</strong>
            </div>

            <button
                class="checkout-button"
                onclick="checkout()">
                Proceed to Checkout
            </button>

        </div>
    `;

    panel.innerHTML=html;
}

function renderCartIfOpen(){

    const panel=document.getElementById("flipshopCartPanel");

    if(panel) renderCart();
}

function increaseQuantity(productId){

    const item=cartItems.find(
        item=>Number(item.id)===Number(productId)
    );

    const product=products.find(
        p=>Number(p.id)===Number(productId)
    );

    if(!item||!product) return;

    if(item.quantity>=product.stock){
        alert("Maximum available stock reached.");
        return;
    }

    item.quantity++;

    saveCart();
    updateCartCount();
    renderCart();
}

function decreaseQuantity(productId){

    const item=cartItems.find(
        item=>Number(item.id)===Number(productId)
    );

    if(!item) return;

    if(item.quantity>1){
        item.quantity--;
    }else{
        removeFromCart(productId);
        return;
    }

    saveCart();
    updateCartCount();
    renderCart();
}

function removeFromCart(productId){

    cartItems=cartItems.filter(
        item=>Number(item.id)!==Number(productId)
    );

    saveCart();
    updateCartCount();
    renderCart();
}

function closeCart(){

    const panel=document.getElementById("flipshopCartPanel");

    if(panel) panel.remove();
}

// ============================================================
// BUY NOW
// ============================================================

function buyNow(productId){

    const product=products.find(
        p=>Number(p.id)===Number(productId)
    );

    if(!product) return;

    if(product.stock<=0){
        alert("This product is out of stock.");
        return;
    }

    appliedCoupon=null;
    couponDiscount=0;

    cartItems=[{
        id:product.id,
        name:product.name,
        price:product.price,
        image:product.image,
        quantity:1
    }];

    saveCart();
    updateCartCount();

    checkout();
}

// ============================================================
// PRODUCT DETAILS
// ============================================================

function openProductDetails(productId){

    const product=products.find(
        p=>Number(p.id)===Number(productId)
    );

    if(!product) return;

    currentDetailsProduct=product;
    detailsQuantity=1;

    closeProductDetails();

    const panel=document.createElement("div");

    panel.id="productDetailsPanel";
    panel.className="flipshop-overlay";

    panel.innerHTML=`
        <div class="flipshop-box">

            <div style="
                display:flex;
                justify-content:space-between;
                align-items:center;
                margin-bottom:20px;
            ">
                <h2>Product Details</h2>

                <button
                    class="flipshop-close"
                    onclick="closeProductDetails()">
                    ✕ Close
                </button>
            </div>

            <div class="details-layout">

                <div class="details-image-section">
                    <img
                        class="details-image"
                        src="${product.image}"
                        alt="${product.name}"
                        onerror="this.src='https://placehold.co/600x600?text=FlipShop'">
                </div>

                <div>

                    <h1>${product.name}</h1>

                    <p>⭐ ${product.rating}</p>

                    <h2>${money(product.price)}</h2>

                    <p>
                        <del>${money(product.oldPrice)}</del>
                        &nbsp;
                        <span style="color:green;font-weight:bold">
                            ${product.discount}% off
                        </span>
                    </p>

                    <p>
                        Category:
                        <strong>${product.category}</strong>
                    </p>

                    <p>
                        Stock:
                        <strong>${product.stock}</strong>
                    </p>

                    <div class="qty-box">

                        <button onclick="changeDetailsQuantity(-1)">
                            −
                        </button>

                        <span id="detailsQuantity">1</span>

                        <button onclick="changeDetailsQuantity(1)">
                            +
                        </button>

                    </div>

                    <button
                        class="flipshop-primary"
                        onclick="addDetailsToCart()">
                        🛒 Add to Cart
                    </button>

                    <button
                        class="flipshop-buy"
                        onclick="buyDetailsNow()">
                        ⚡ Buy Now
                    </button>

                    <button
                        class="flipshop-primary"
                        style="background:#2874f0"
                        onclick="openReviewBox(${product.id})">
                        ⭐ Reviews & Rating
                    </button>

                </div>
            </div>
        </div>
    `;

    document.body.appendChild(panel);
}

function closeProductDetails(){

    const panel=document.getElementById("productDetailsPanel");

    if(panel) panel.remove();
}

function changeDetailsQuantity(change){

    if(!currentDetailsProduct) return;

    detailsQuantity+=change;

    if(detailsQuantity<1)
        detailsQuantity=1;

    if(detailsQuantity>currentDetailsProduct.stock)
        detailsQuantity=currentDetailsProduct.stock;

    const element=document.getElementById("detailsQuantity");

    if(element)
        element.textContent=detailsQuantity;
}

function addDetailsToCart(){

    if(!currentDetailsProduct) return;

    const product=currentDetailsProduct;

    const existing=cartItems.find(
        item=>Number(item.id)===Number(product.id)
    );

    if(existing){

        if(
            existing.quantity+detailsQuantity>
            product.stock
        ){
            alert("Maximum available stock reached.");
            return;
        }

        existing.quantity+=detailsQuantity;

    }else{

        cartItems.push({
            id:product.id,
            name:product.name,
            price:product.price,
            image:product.image,
            quantity:detailsQuantity
        });
    }

    saveCart();
    updateCartCount();

    showMessage(product.name+" added to cart!");

    closeProductDetails();
}

function buyDetailsNow(){

    if(!currentDetailsProduct) return;

    appliedCoupon=null;
    couponDiscount=0;

    cartItems=[{
        id:currentDetailsProduct.id,
        name:currentDetailsProduct.name,
        price:currentDetailsProduct.price,
        image:currentDetailsProduct.image,
        quantity:detailsQuantity
    }];

    saveCart();
    updateCartCount();

    closeProductDetails();

    checkout();
}

// ============================================================
// WISHLIST
// ============================================================

function saveWishlist(){
    localStorage.setItem(
        "flipshopWishlist",
        JSON.stringify(wishlist)
    );
}

function updateWishlistCount(){

    const count=document.getElementById("wishlistCount");

    if(count)
        count.textContent=wishlist.length;
}

function toggleWishlist(productId){

    productId=Number(productId);

    const index=wishlist.indexOf(productId);

    if(index===-1){
        wishlist.push(productId);
        showMessage("❤️ Added to Wishlist");
    }else{
        wishlist.splice(index,1);
        showMessage("💔 Removed from Wishlist");
    }

    saveWishlist();
    updateWishlistCount();
    applyFilters();
}

function openWishlist(){

    const old=document.getElementById("wishlistPanel");

    if(old) old.remove();

    const panel=document.createElement("div");

    panel.id="wishlistPanel";
    panel.className="flipshop-overlay";

    const list=products.filter(
        product=>wishlist.includes(Number(product.id))
    );

    let html=`
        <div class="flipshop-box">

            <div style="
                display:flex;
                justify-content:space-between;
                align-items:center;
                margin-bottom:20px;
            ">

                <h2>❤️ My Wishlist (${list.length})</h2>

                <button
                    class="flipshop-close"
                    onclick="closeWishlist()">
                    ✕ Close
                </button>

            </div>
    `;

    if(list.length===0){

        html+=`
            <div style="text-align:center;padding:60px 20px">
                <div style="font-size:60px">💔</div>
                <h3>Your Wishlist is Empty</h3>
                <p>Add products you love.</p>
            </div>
        `;

    }else{

        html+=`<div class="wishlist-grid">`;

        list.forEach(product=>{

            html+=`
                <div class="wishlist-card">

                    <img
                        src="${product.image}"
                        onerror="this.src='https://placehold.co/500x500?text=FlipShop'"
                    >

                    <h3>${product.name}</h3>

                    <p>⭐ ${product.rating}</p>

                    <h3>${money(product.price)}</h3>

                    <button
                        class="flipshop-primary"
                        onclick="wishlistAddToCart(${product.id})">
                        🛒 Add to Cart
                    </button>

                    <button
                        class="flipshop-primary"
                        style="background:#e53935"
                        onclick="removeFromWishlist(${product.id})">
                        💔 Remove
                    </button>

                </div>
            `;
        });

        html+=`</div>`;
    }

    html+=`</div>`;

    panel.innerHTML=html;

    document.body.appendChild(panel);
}

function closeWishlist(){

    const panel=document.getElementById("wishlistPanel");

    if(panel) panel.remove();
}

function removeFromWishlist(productId){

    wishlist=wishlist.filter(
        id=>Number(id)!==Number(productId)
    );

    saveWishlist();
    updateWishlistCount();

    openWishlist();
    applyFilters();
}

function wishlistAddToCart(productId){
    addToCart(productId);
}

// ============================================================
// HEADER BUTTONS
// ============================================================

function createWishlistButton(){

    const header=document.querySelector(".header");

    if(!header) return;

    if(document.getElementById("wishlistHeaderButton"))
        return;

    const button=document.createElement("button");

    button.id="wishlistHeaderButton";
    button.className="wishlist-header-btn";

    button.innerHTML=`
        ❤️ Wishlist
        <span id="wishlistCount">${wishlist.length}</span>
    `;

    button.onclick=openWishlist;

    if(cartButton)
        header.insertBefore(button,cartButton);
    else
        header.appendChild(button);
}

function createOrdersButton(){

    const header=document.querySelector(".header");

    if(!header) return;

    if(document.getElementById("myOrdersHeaderButton"))
        return;

    const button=document.createElement("button");

    button.id="myOrdersHeaderButton";
    button.className="wishlist-header-btn";
    button.textContent="📦 My Orders";
    button.onclick=openMyOrders;

    const wishlistButton=
        document.getElementById("wishlistHeaderButton");

    if(wishlistButton)
        header.insertBefore(button,wishlistButton);
    else if(cartButton)
        header.insertBefore(button,cartButton);
    else
        header.appendChild(button);
}

// ============================================================
// ORDERS
// ============================================================

function openMyOrders(){

    const orders=
        JSON.parse(localStorage.getItem("flipshopOrders"))||[];

    const old=document.getElementById("myOrdersPanel");

    if(old) old.remove();

    const panel=document.createElement("div");

    panel.id="myOrdersPanel";
    panel.className="flipshop-overlay";

    let html=`
        <div class="flipshop-box">

            <div style="
                display:flex;
                justify-content:space-between;
                align-items:center;
                margin-bottom:20px;
            ">
                <h2>📦 My Orders</h2>

                <button
                    class="flipshop-close"
                    onclick="closeMyOrders()">
                    ✕ Close
                </button>
            </div>
    `;

    if(orders.length===0){

        html+=`
            <div style="text-align:center;padding:60px">
                <div style="font-size:60px">📦</div>
                <h3>No Orders Yet</h3>
                <p>Your placed orders will appear here.</p>
            </div>
        `;

    }else{

        orders.slice().reverse().forEach(order=>{

            html+=`
                <div style="
                    border:1px solid #ddd;
                    border-radius:8px;
                    padding:20px;
                    margin-bottom:20px;
                ">

                    <strong>Order ID: ${order.id}</strong>

                    <p>📅 ${order.date}</p>

                    <hr>

                    <h3>🛍️ Products</h3>
            `;

            order.items.forEach(item=>{

                html+=`
                    <div style="
                        padding:8px 0;
                        border-bottom:1px solid #eee;
                    ">
                        <strong>${item.name}</strong>
                        <br>
                        Qty: ${item.quantity}
                        &nbsp; × &nbsp;
                        ${money(item.price)}
                    </div>
                `;
            });

            html+=`

                    <h3>
                        💰 Total: ${money(order.total)}
                    </h3>

                    ${
                        order.coupon &&
                        order.coupon!=="None"
                        ?`
                        <p style="color:green">
                            🎟️ Coupon:
                            <strong>${order.coupon}</strong>
                            &nbsp;
                            Discount:
                            ${money(order.discount||0)}
                        </p>`
                        :""
                    }

                    <p>
                        💳 Payment: ${order.payment}
                    </p>

                    <p>
                        📍 Delivery: ${order.customer.address}
                    </p>

                    <p>
                        📞 Phone: ${order.customer.phone}
                    </p>

                    <button
                        class="flipshop-primary"
                        onclick="trackOrder('${order.id}')">
                        🚚 Track Order
                    </button>

                </div>
            `;
        });
    }

    html+=`</div>`;

    panel.innerHTML=html;

    document.body.appendChild(panel);
}

function closeMyOrders(){

    const panel=document.getElementById("myOrdersPanel");

    if(panel) panel.remove();
}

// ============================================================
// TRACKING
// ============================================================

function trackOrder(orderId){

    const orders=
        JSON.parse(localStorage.getItem("flipshopOrders"))||[];

    const order=orders.find(
        item=>String(item.id)===String(orderId)
    );

    if(!order){
        alert("Order not found.");
        return;
    }

    const old=document.getElementById("trackingPanel");

    if(old) old.remove();

    const panel=document.createElement("div");

    panel.id="trackingPanel";
    panel.className="flipshop-overlay";

    const steps=[
        "Order Placed",
        "Packed",
        "Shipped",
        "Out for Delivery",
        "Delivered"
    ];

    let html=`
        <div class="flipshop-box">

            <div style="
                display:flex;
                justify-content:space-between;
            ">

                <h2>🚚 Order Tracking</h2>

                <button
                    class="flipshop-close"
                    onclick="closeTracking()">
                    ✕ Close
                </button>

            </div>

            <p>
                Order ID:
                <strong>${order.id}</strong>
            </p>

            <hr>
    `;

    steps.forEach((step,index)=>{

        const active=index===0;

        html+=`
            <div class="tracking-step ${active?"active":""}">

                <div class="tracking-icon">
                    ${active?"✓":"○"}
                </div>

                <div>
                    <strong>${step}</strong>
                    <small style="display:block;color:#777">
                        ${active?"Order received":"Pending"}
                    </small>
                </div>

            </div>
        `;

        if(index<steps.length-1){

            html+=`
                <div class="
                    tracking-line
                    ${index===0?"active-line":""}
                "></div>
            `;
        }
    });

    html+=`</div>`;

    panel.innerHTML=html;

    document.body.appendChild(panel);
}

function closeTracking(){

    const panel=document.getElementById("trackingPanel");

    if(panel) panel.remove();
}

// ============================================================
// FILTER SYSTEM
// ============================================================

function applyFilters(){

    let list=[...products];

    if(selectedCategory!=="All"){

        list=list.filter(
            product=>product.category===selectedCategory
        );
    }

    if(currentSearchKeyword){

        list=list.filter(product=>{

            const name=product.name.toLowerCase();
            const category=product.category.toLowerCase();

            return(
                name.includes(currentSearchKeyword)||
                category.includes(currentSearchKeyword)
            );
        });
    }

    if(currentSortType==="priceLow")
        list.sort((a,b)=>a.price-b.price);

    else if(currentSortType==="priceHigh")
        list.sort((a,b)=>b.price-a.price);

    else if(currentSortType==="ratingHigh")
        list.sort((a,b)=>b.rating-a.rating);

    else if(currentSortType==="nameAZ")
        list.sort((a,b)=>a.name.localeCompare(b.name));

    else if(currentSortType==="nameZA")
        list.sort((a,b)=>b.name.localeCompare(a.name));

    displayProducts(list);

    const section=document.getElementById("productsSection");

    if(section)
        section.scrollIntoView({behavior:"smooth"});
}

function performSearch(){

    if(!searchInput) return;

    currentSearchKeyword=
        searchInput.value.trim().toLowerCase();

    applyFilters();
}

function filterCategory(category){

    selectedCategory=category;
    currentSearchKeyword="";

    if(searchInput)
        searchInput.value="";

    applyFilters();
}

// ============================================================
// SEARCH / CATEGORY / SORT SETUP
// ============================================================

function setupCategories(){

    document.querySelectorAll(".category").forEach(element=>{

        element.addEventListener("click",function(){

            const value=this.dataset.category;

            if(value)
                filterCategory(value);
        });
    });
}

function setupSearch(){

    if(searchButton)
        searchButton.addEventListener("click",performSearch);

    if(searchInput){

        searchInput.addEventListener("keydown",event=>{

            if(event.key==="Enter")
                performSearch();

        });
    }
}

function setupSorting(){

    const select=document.getElementById("sortProducts");

    if(!select) return;

    select.addEventListener("change",function(){

        currentSortType=this.value;

        applyFilters();
    });
}

// ============================================================
// CHECKOUT
// ============================================================

function checkout(){

    if(cartItems.length===0){

        alert("Your cart is empty!");

        return;
    }

    closeCart();

    const old=document.getElementById("checkoutModal");

    if(old) old.remove();

    const modal=document.createElement("div");

    modal.id="checkoutModal";
    modal.className="checkout-modal";

    let itemsHTML="";

    cartItems.forEach(item=>{

        itemsHTML+=`
            <div class="checkout-item">

                <div>
                    <strong>${item.name}</strong>

                    <p>
                        Quantity: ${item.quantity}
                    </p>
                </div>

                <strong>
                    ${money(item.price*item.quantity)}
                </strong>

            </div>
        `;
    });

    modal.innerHTML=`
        <div class="checkout-box">

            <div class="checkout-header">

                <h2>🛒 Checkout</h2>

                <button
                    class="checkout-close"
                    onclick="closeCheckout()">
                    ✕
                </button>

            </div>

            <div class="checkout-content">

                <div class="checkout-section">

                    <h3>👤 Delivery Details</h3>

                    <form
                        id="checkoutForm"
                        class="checkout-form">

                        <div class="form-row">

                            <div class="form-group">
                                <label>Full Name *</label>
                                <input id="customerName" required>
                            </div>

                            <div class="form-group">
                                <label>Mobile Number *</label>
                                <input
                                    id="customerPhone"
                                    type="tel"
                                    maxlength="10"
                                    required>
                            </div>

                        </div>

                        <div class="form-group">
                            <label>PIN Code *</label>
                            <input id="customerPin" maxlength="6" required>
                        </div>

                        <div class="form-group">
                            <label>Address *</label>
                            <textarea
                                id="customerAddress"
                                rows="4"
                                required></textarea>
                        </div>

                    </form>

                </div>

                <div class="checkout-section">

                    <h3>💳 Payment Method</h3>

                    <div class="payment-options">

                        <label class="payment-option">
                            <input
                                type="radio"
                                name="payment"
                                value="Cash on Delivery"
                                checked>
                            Cash on Delivery
                        </label>

                        <label class="payment-option">
                            <input
                                type="radio"
                                name="payment"
                                value="UPI">
                            UPI
                        </label>

                        <label class="payment-option">
                            <input
                                type="radio"
                                name="payment"
                                value="Card">
                            Card
                        </label>

                    </div>

                    <h3>🎟️ Apply Coupon</h3>

                    <div class="coupon-box">

                        <div class="coupon-row">

                            <input
                                id="couponInput"
                                placeholder="SAVE10"
                                value="${appliedCoupon||""}">

                            <button onclick="applyCoupon()">
                                Apply
                            </button>

                        </div>

                        <small>
                            SAVE10 = 10% |
                            SAVE20 = 20% |
                            WELCOME = 15%
                        </small>

                    </div>

                    <h3>🛍️ Order Summary</h3>

                    ${itemsHTML}

                    <div style="
                        margin-top:15px;
                        border-top:1px solid #ddd;
                        padding-top:15px;
                    ">

                        <div style="
                            display:flex;
                            justify-content:space-between;
                            margin:8px 0;
                        ">
                            <span>Subtotal</span>
                            <strong id="checkoutSubtotal">
                                ${money(getCartTotal())}
                            </strong>
                        </div>

                        <div style="
                            display:flex;
                            justify-content:space-between;
                            color:green;
                            margin:8px 0;
                        ">
                            <span>Coupon Discount</span>
                            <strong id="checkoutDiscount">
                                - ${money(couponDiscount)}
                            </strong>
                        </div>

                        <div style="
                            display:flex;
                            justify-content:space-between;
                            font-size:21px;
                            font-weight:bold;
                            border-top:1px solid #ddd;
                            padding-top:12px;
                            margin-top:10px;
                        ">
                            <span>Final Total</span>

                            <strong id="checkoutFinalTotal">
                                ${money(getFinalTotal())}
                            </strong>
                        </div>

                    </div>

                    <button
                        class="checkout-button"
                        onclick="placeOrder()">
                        💳 Place Order
                    </button>

                </div>

            </div>

        </div>
    `;

    document.body.appendChild(modal);

    updatePriceDisplays();
}

function closeCheckout(){

    const modal=document.getElementById("checkoutModal");

    if(modal) modal.remove();
}

// ============================================================
// PLACE ORDER
// ============================================================

function placeOrder(){

    const nameElement=document.getElementById("customerName");
    const phoneElement=document.getElementById("customerPhone");
    const pinElement=document.getElementById("customerPin");
    const addressElement=document.getElementById("customerAddress");

    if(
        !nameElement||
        !phoneElement||
        !pinElement||
        !addressElement
    ) return;

    const name=nameElement.value.trim();
    const phone=phoneElement.value.trim();
    const pin=pinElement.value.trim();
    const address=addressElement.value.trim();

    if(!name||!phone||!pin||!address){

        alert("Please fill all required details.");

        return;
    }

    if(!/^[0-9]{10}$/.test(phone)){

        alert("Enter a valid 10 digit mobile number.");

        return;
    }

    if(!/^[0-9]{6}$/.test(pin)){

        alert("Enter a valid 6 digit PIN code.");

        return;
    }

    const paymentElement=
        document.querySelector(
            'input[name="payment"]:checked'
        );

    const payment=
        paymentElement
        ?paymentElement.value
        :"Cash on Delivery";

    const order={
        id:"FS"+Date.now(),

        date:new Date().toLocaleString("en-IN"),

        items:JSON.parse(JSON.stringify(cartItems)),

        subtotal:getCartTotal(),

        coupon:appliedCoupon||"None",

        discount:couponDiscount,

        total:getFinalTotal(),

        payment:payment,

        customer:{
            name:name,
            phone:phone,
            pin:pin,
            address:address
        }
    };

    const orders=
        JSON.parse(
            localStorage.getItem("flipshopOrders")
        )||[];

    orders.push(order);

    localStorage.setItem(
        "flipshopOrders",
        JSON.stringify(orders)
    );

    cartItems=[];

    saveCart();
    updateCartCount();

    appliedCoupon=null;
    couponDiscount=0;

    closeCheckout();

    showOrderSuccess(order);
}

// ============================================================
// ORDER SUCCESS
// ============================================================

function showOrderSuccess(order){

    const panel=document.createElement("div");

    panel.id="orderSuccessPanel";
    panel.className="flipshop-overlay";

    panel.innerHTML=`
        <div class="order-success">

            <div style="font-size:70px">✅</div>

            <h1>
                Order Placed Successfully!
            </h1>

            <p>
                Thank you for shopping with FlipShop.
            </p>

            <h3>
                Order ID: ${order.id}
            </h3>

            ${
                order.coupon!=="None"
                ?`
                <p style="color:green">
                    🎟️ ${order.coupon}
                    - Saved ${money(order.discount)}
                </p>`
                :""
            }

            <h2>
                Total: ${money(order.total)}
            </h2>

            <button
                class="flipshop-primary"
                onclick="
                    closeOrderSuccess();
                    openMyOrders();
                ">
                📦 View My Orders
            </button>

            <button
                class="flipshop-buy"
                onclick="closeOrderSuccess()">
                Continue Shopping
            </button>

        </div>
    `;

    document.body.appendChild(panel);
}

function closeOrderSuccess(){

    const panel=document.getElementById("orderSuccessPanel");

    if(panel) panel.remove();
}

// ============================================================
// REVIEWS
// ============================================================

function openReviewBox(productId){

    productId=Number(productId);

    const product=products.find(
        p=>Number(p.id)===productId
    );

    if(!product) return;

    const old=document.getElementById("reviewPanel");

    if(old) old.remove();

    selectedReviewRating=5;

    const reviews=flipshopReviews.filter(
        review=>Number(review.productId)===productId
    );

    let reviewsHTML="";

    if(reviews.length===0){

        reviewsHTML=`
            <p style="text-align:center;color:#777;padding:20px">
                No reviews yet.
            </p>
        `;

    }else{

        reviews.slice().reverse().forEach(review=>{

            reviewsHTML+=`
                <div class="review-item">

                    <div class="review-top">

                        <strong>${review.name}</strong>

                        <span class="review-stars">
                            ${"★".repeat(Number(review.rating))}
                            ${"☆".repeat(5-Number(review.rating))}
                        </span>

                    </div>

                    <p>${review.comment}</p>

                    <small>${review.date}</small>

                </div>
            `;
        });
    }

    const panel=document.createElement("div");

    panel.id="reviewPanel";
    panel.className="flipshop-overlay";

    panel.innerHTML=`
        <div class="flipshop-box">

            <div style="
                display:flex;
                justify-content:space-between;
                align-items:center;
            ">

                <div>
                    <h2>⭐ Product Reviews</h2>
                    <h3>${product.name}</h3>
                </div>

                <button
                    class="flipshop-close"
                    onclick="closeReviewBox()">
                    ✕
                </button>

            </div>

            <hr>

            <h3>Write a Review</h3>

            <p>Your Rating</p>

            <div class="rating-selector">

                ${[1,2,3,4,5].map(n=>`
                    <span onclick="selectReviewRating(${n})">
                        ${n<=5?"★":"☆"}
                    </span>
                `).join("")}

            </div>

            <textarea
                id="reviewComment"
                rows="4"
                placeholder="Write your review..."
                style="
                    width:100%;
                    padding:12px;
                    box-sizing:border-box;
                "></textarea>

            <button
                class="flipshop-primary"
                onclick="submitReview(${product.id})">
                Submit Review
            </button>

            <hr style="margin:25px 0">

            <h3>Customer Reviews</h3>

            ${reviewsHTML}

        </div>
    `;

    document.body.appendChild(panel);
}

function selectReviewRating(rating){

    selectedReviewRating=Number(rating);

    document.querySelectorAll(
        ".rating-selector span"
    ).forEach((star,index)=>{

        star.textContent=
            index<selectedReviewRating
            ?"★"
            :"☆";
    });
}

function submitReview(productId){

    const element=document.getElementById("reviewComment");

    if(!element) return;

    const comment=element.value.trim();

    if(!comment){

        alert("Please write a review.");

        return;
    }

    const name=
        currentUser&&currentUser.name
        ?currentUser.name
        :"Guest User";

    flipshopReviews.push({

        productId:Number(productId),
        name:name,
        rating:selectedReviewRating,
        comment:comment,
        date:new Date().toLocaleDateString("en-IN")

    });

    localStorage.setItem(
        "flipshopReviews",
        JSON.stringify(flipshopReviews)
    );

    showMessage("⭐ Review submitted successfully!");

    openReviewBox(productId);
}

function closeReviewBox(){

    const panel=document.getElementById("reviewPanel");

    if(panel) panel.remove();
}

// ============================================================
// LOGIN
// ============================================================

function openLogin(){

    const old=document.getElementById("loginModal");

    if(old) old.remove();

    const modal=document.createElement("div");

    modal.id="loginModal";
    modal.className="login-overlay";

    modal.innerHTML=`
        <div class="login-box">

            <div style="
                display:flex;
                justify-content:space-between;
                align-items:center;
            ">

                <h2>🔐 Login</h2>

                <button
                    onclick="closeLogin()"
                    style="
                        border:none;
                        background:#eee;
                        padding:8px 12px;
                        cursor:pointer;
                    ">
                    ✕
                </button>

            </div>

            <form
                class="login-form"
                id="loginForm">

                <label>Email</label>

                <input
                    type="email"
                    id="loginEmail"
                    required>

                <label>Password</label>

                <input
                    type="password"
                    id="loginPassword"
                    required>

                <button
                    class="login-submit"
                    type="submit">
                    Login
                </button>

            </form>

            <p style="text-align:center;margin-top:15px">

                Don't have an account?

                <button
                    onclick="openSignup()"
                    style="
                        border:none;
                        background:none;
                        color:#2874f0;
                        font-weight:bold;
                        cursor:pointer;
                    ">
                    Sign Up
                </button>

            </p>

        </div>
    `;

    document.body.appendChild(modal);

    document.getElementById("loginForm").onsubmit=e=>{
        e.preventDefault();
        loginUser();
    };
}

function closeLogin(){

    const modal=document.getElementById("loginModal");

    if(modal) modal.remove();
}

function openSignup(){

    closeLogin();

    const old=document.getElementById("signupModal");

    if(old) old.remove();

    const modal=document.createElement("div");

    modal.id="signupModal";
    modal.className="login-overlay";

    modal.innerHTML=`
        <div class="login-box">

            <div style="
                display:flex;
                justify-content:space-between;
                align-items:center;
            ">

                <h2>📝 Sign Up</h2>

                <button
                    onclick="closeSignup()"
                    style="
                        border:none;
                        background:#eee;
                        padding:8px 12px;
                        cursor:pointer;
                    ">
                    ✕
                </button>

            </div>

            <form
                class="login-form"
                id="signupForm">

                <label>Name</label>

                <input
                    type="text"
                    id="signupName"
                    required>

                <label>Email</label>

                <input
                    type="email"
                    id="signupEmail"
                    required>

                <label>Password</label>

                <input
                    type="password"
                    id="signupPassword"
                    required>

                <button
                    class="login-submit"
                    type="submit">
                    Create Account
                </button>

            </form>

            <p style="text-align:center;margin-top:15px">

                Already have an account?

                <button
                    onclick="openLogin()"
                    style="
                        border:none;
                        background:none;
                        color:#2874f0;
                        font-weight:bold;
                        cursor:pointer;
                    ">
                    Login
                </button>

            </p>

        </div>
    `;

    document.body.appendChild(modal);

    document.getElementById("signupForm").onsubmit=e=>{
        e.preventDefault();
        signupUser();
    };
}

function closeSignup(){

    const modal=document.getElementById("signupModal");

    if(modal) modal.remove();
}

function signupUser(){

    const name=document.getElementById("signupName").value.trim();
    const email=document.getElementById("signupEmail").value.trim();
    const password=document.getElementById("signupPassword").value;

    let users=
        JSON.parse(localStorage.getItem("flipshopUsers"))||[];

    if(users.some(user=>user.email===email)){

        alert("This email is already registered.");

        return;
    }

    users.push({
        name:name,
        email:email,
        password:password
    });

    localStorage.setItem(
        "flipshopUsers",
        JSON.stringify(users)
    );

    currentUser={
        name:name,
        email:email
    };

    localStorage.setItem(
        "flipshopUser",
        JSON.stringify(currentUser)
    );

    closeSignup();
    updateLoginButton();

    showMessage("✅ Account created successfully!");
}

function loginUser(){

    const email=document.getElementById("loginEmail").value.trim();
    const password=document.getElementById("loginPassword").value;

    const users=
        JSON.parse(localStorage.getItem("flipshopUsers"))||[];

    const user=users.find(
        item=>item.email===email&&item.password===password
    );

    if(!user){

        alert("Invalid email or password.");

        return;
    }

    currentUser={
        name:user.name,
        email:user.email
    };

    localStorage.setItem(
        "flipshopUser",
        JSON.stringify(currentUser)
    );

    closeLogin();
    updateLoginButton();

    showMessage("✅ Login successful!");
}

function updateLoginButton(){

    if(!loginButton) return;

    if(currentUser){

        loginButton.textContent="👤 "+currentUser.name;
        loginButton.onclick=openUserMenu;

    }else{

        loginButton.textContent="Login";
        loginButton.onclick=openLogin;
    }
}

function openUserMenu(){

    const old=document.getElementById("userMenu");

    if(old){
        old.remove();
        return;
    }

    if(!currentUser){
        openLogin();
        return;
    }

    const menu=document.createElement("div");

    menu.id="userMenu";
    menu.className="user-menu";

    menu.innerHTML=`
        <strong>👤 ${currentUser.name}</strong>

        <p style="color:#777;font-size:13px">
            ${currentUser.email}
        </p>

        <hr>

        <button onclick="
            closeUserMenu();
            openMyOrders();
        ">
            📦 My Orders
        </button>

        <button onclick="
            closeUserMenu();
            openWishlist();
        ">
            ❤️ Wishlist
        </button>

        <button onclick="logoutUser()">
            🚪 Logout
        </button>
    `;

    document.body.appendChild(menu);
}

function closeUserMenu(){

    const menu=document.getElementById("userMenu");

    if(menu) menu.remove();
}

function logoutUser(){

    currentUser=null;

    localStorage.removeItem("flipshopUser");

    closeUserMenu();
    updateLoginButton();

    showMessage("You have been logged out.");
}

// ============================================================
// SETUP
// ============================================================

function setupCart(){

    if(cartButton)
        cartButton.addEventListener("click",openCart);
}

function setupLogin(){

    updateLoginButton();
}

function setupShopButton(){

    const button=document.getElementById("shopButton");

    if(!button) return;

    button.addEventListener("click",()=>{

        const section=document.getElementById("productsSection");

        if(section)
            section.scrollIntoView({behavior:"smooth"});
    });
}

function removeDuplicateHeaders(){

    const headers=document.querySelectorAll(".header");

    headers.forEach((header,index)=>{

        if(index>0)
            header.remove();
    });
}

// ============================================================
// INITIALIZE
// ============================================================

document.addEventListener("DOMContentLoaded",()=>{

    removeDuplicateHeaders();

    displayProducts(products);

    updateCartCount();

    updateWishlistCount();

    updateLoginButton();

    createWishlistButton();

    createOrdersButton();

    setupCategories();

    setupSearch();

    setupSorting();

    setupCart();

    setupLogin();

    setupShopButton();

    console.log("FlipShop loaded successfully!");
});