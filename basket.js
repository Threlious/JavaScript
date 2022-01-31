"use strict"

const basketCntEl = document.querySelector(".cartIconWrap span"); // кол-во товаров в корзине
const basketTotalValEl = document.querySelector(".basketTotalValue"); // общая стоимость корзины
const basketTotEl = document.querySelector(".basketTotal");
const basketEl = document.querySelector('.basket'); // для класса корзины
document.querySelector(".cartIconWrap").addEventListener("click", event => {
    basketEl.classList.toggle('hidden')
})
const basket = {

}; // объект корзины

document.querySelector('.featuredItems').addEventListener('click', event => {
    if (!event.target.closest('.addToCart')) {
        return
    }
    const featuredItem = event.target.closest('.featuredItem');
    const idItem = Number(featuredItem.dataset.id);
    const nameItem = featuredItem.dataset.name;
    const priceItem = Number(featuredItem.dataset.price);
    addToCart(idItem, nameItem, priceItem);
    // console.log(idItem, nameItem, priceItem);
});

function addToCart(idItem, nameItem, priceItem) {
    if (!(idItem in basket)) {
        basket[idItem] = {
            id: idItem,
            name: nameItem,
            price: priceItem,
            count: 0,
        };
    }
    basket[idItem].count++;
    basketCntEl.textContent = basketTotCount();
    basketTotalValEl.textContent = basketTotPrice();
    basketProducts(idItem);
}

function basketTotCount() {
    return Object.values(basket).reduce((acc, product) => acc + product.count, 0);
} // считает общее число товаров в корзине

function basketTotPrice() {
    return Object.values(basket).reduce((acc, product) =>
        acc + product.count * product.price, 0);
} //общая цена товаров

function basketProducts(id) {
    const basketRowEl = basketEl.querySelector(`.basketRow[data-id="${id}"]`);
    if (!basketRowEl) {
        basketNewProducts(id);
        return;
    }
    basketRowEl.querySelector('.productCount').textContent = basket[id].count;
    basketRowEl.querySelector('.productTotalRow').textContent =
        basket[id].count * basket[id].price;
}

function basketNewProducts(productId) {
    const productRow = `
      <div class="basketRow" data-id="${productId}">
        <div>${basket[productId].name}</div>
        <div>
          <span class="productCount">${basket[productId].count}</span> шт.
        </div>
        <div>$${basket[productId].price}</div>
        <div>
          $<span class="productTotalRow">${(basket[productId].price * basket[productId].count)}</span>
        </div>
      </div>
      `;
    basketTotEl.insertAdjacentHTML("beforebegin", productRow);
}