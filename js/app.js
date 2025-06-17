document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".btn");
  const basket = document.querySelector(".basket");
  

  let cart = {};

  function updateBasketUI() {
    let totalCount = 0;
    let totalPrice = 0;
    let html = `<h2 class="basket_title">Your Cart</h2>`;

    if (Object.keys(cart).length === 0) {
      html += `
          <img class="basket_img" src="./img/Empty-Illustration.svg" alt="">
          <p class="basket_info">Your added items will appear here</p>
        `;
    } else {
      for (const id in cart) {
        const item = cart[id];
        totalCount += item.count;
        totalPrice += item.price * item.count;

        html += `
            <div class="">
             <div class="basket_item"> <p class="count">${item.name}x</p>
              <div class="wrapper">
                <p class="item_name">${item.count}x</p>
                <p class="realPrice">@ $${item.price.toFixed(2)}</p>
                <p class="owerPrice">$${(item.price * item.count).toFixed(
                  2
                )}</p>
              </div></div>
             <hr style="width:336px">
            </div>
           
          `;
      }
      html += `
          <div class="Order_Total">
            <p>Order Total</p>
            <h3>$${totalPrice.toFixed(2)}</h3>
          </div>
          <div class="end"> <p>This is a
 carbon-neutral
 delivery</p></div>
   <a class="btnn" href="">Confirm Order</a>
        `;
    }

    html = html.replace("Your Cart", `Your Cart (${totalCount})`);
    basket.innerHTML = html;
  }

  function transformButton(btn, id) {
    const itemElem = btn.closest(".disserts_item");
    const name = itemElem.querySelector(".desserts_title").textContent;
    const priceText = itemElem.querySelector(".disserts_price").textContent;
    const price = parseFloat(priceText.replace("$", ""));

    if (!cart[id]) {
      cart[id] = { name, price, count: 1 };
    }

    btn.style.display = "flex";
    btn.style.width = "160px";
    btn.style.maxWidth = "160px";
    btn.style.padding = "12px";
    btn.style.justifyContent = "space-between";
    btn.style.alignItems = "center";
    btn.style.borderRadius = "999px";
    btn.style.background = "#C73B0F";

    const image = itemElem.querySelector(".disserts_img");
  image.style.borderRadius = "8px";
  image.style.border = "2px solid #c73b0f";


    btn.innerHTML = `
        <img class="img1" id="minus-${id}" src="./img/Subtract-Icon.svg" style="cursor:pointer" />
        <span class="text" id="counterText-${id}">${cart[id].count}</span>
        <img class="img2" id="plus-${id}" src="./img/Add-icon.svg" style="cursor:pointer" />
      `;

    document.getElementById(`minus-${id}`).addEventListener("click", (e) => {
      e.stopPropagation();
      if (cart[id].count > 0) {
        cart[id].count--;
        if (cart[id].count === 0) {
          delete cart[id];
          resetButton(btn, id);
        }
        updateCounterDisplay(id);
        updateBasketUI();
      }
    });

    document.getElementById(`plus-${id}`).addEventListener("click", (e) => {
      e.stopPropagation();
      cart[id].count++;
      updateCounterDisplay(id);
      updateBasketUI();
    });

    updateBasketUI();
  }

  function updateCounterDisplay(id) {
    const counterText = document.getElementById(`counterText-${id}`);
    if (cart[id]) {
      counterText.textContent = cart[id].count;
    }
  }

  function resetButton(btn, id) {
    btn.style = "";
    btn.innerHTML = `
        <img class="imgs" src="./img/carbon_shopping-cart-plus.svg" alt="" />
        Add to Cart
      `;
  }

  buttons.forEach((btn) => {
    const id = btn.dataset.id;
    if (cart[id] && cart[id].count > 0) {
      transformButton(btn, id);
    }

    btn.addEventListener("click", () => {
      if (!cart[id]) {
        transformButton(btn, id);
      }
    });
  });
});
