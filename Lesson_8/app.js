'use strict';

let fitlerPopup = document.querySelector('.filterPopup');
let fitlerLabel = document.querySelector('.filterLabel');
let filterIcon = document.querySelector('.filterIcon');

fitlerLabel.addEventListener('click', function () {
    fitlerPopup.classList.toggle('hidden');
    fitlerLabel.classList.toggle('filterLabelPink');
    filterIcon.classList.toggle('filterIconPink');

    if (filterIcon.getAttribute('src') === 'images/filter.svg') {
        filterIcon.setAttribute('src', 'images/filterHover.svg')
    } else {
        filterIcon.setAttribute('src', 'images/filter.svg')
    }
});

let filterHeaders = document.querySelectorAll('.filterCategoryHeader');
filterHeaders.forEach(function (header) {
    header.addEventListener('click', function (event) {
        event.target.nextElementSibling.classList.toggle('hidden');
    })
});

let filterSizes = document.querySelector('.filterSizes');
let filterSizeWrap = document.querySelector('.filterSizeWrap');
filterSizeWrap.addEventListener('click', function () {
    filterSizes.classList.toggle('hidden');
});
// Решение снизу
//Увелечение колличества над значком корзины
document.querySelector('.featuredItems').addEventListener('click',
    ({ target }) => {
        if (target.tagName !== 'BUTTON') {
            return;
        }
        let tar = target.closest('.featuredItem');
        let id = tar.dataset.id;
        let nameProduct = tar.dataset.name;
        let price = tar.dataset.price;
        addToCart(basket, id, nameProduct, price);
        basketTotal.textContent = +basketTotal.textContent + 1;
    });
//Открытие и закрытие корзины
document.querySelector('.cartIconWrap').addEventListener('click', () => {
    let basket = document.querySelector('.basket');
    if (basket.className === 'basket hidden') {
        basket.classList.remove('hidden');
    } else {
        basket.classList.add('hidden');
    }
});
//функция добавления товаров в корзину.
function addToCart(basket, id, nameProduct, price) {
    let count = 1
    if (typeof basket[id] === 'undefined') {
        basket[id] = {
            'id': id, 'name': nameProduct,
            'price': price, 'count': count, 'total': price
        };
        let rows = `<div class="basketProduct" id="${basket[id].id}">
            <p>${basket[id].name}</p>
            <p>${basket[id].count} шт.</p>
            <p>$${basket[id].price}</p>
            <p>$${basket[id].total}</p>
            </div>`;
        //Вставили html разметку после шапки корзины
        document.querySelector('.basket .basketRow').insertAdjacentHTML
            ('afterend', rows);
        //увеличели общую стоимость покупки
        totalValue += +price;
        document.querySelector('.basketTotal').textContent = `Товаров в корзине
         на сумму:${totalValue}`;
    } else {
        basket[id].count += 1;
        basket[id].total = basket[id].count * basket[id].price;
        document.getElementById(id).children[1].textContent = `${basket[id].
            count} шт.`;
        document.getElementById(id).children[3].textContent = `$${basket[id].
            total}`;
        totalValue += +price;
        document.querySelector('.basketTotal').textContent = `Товаров в корзине
         на сумму:$${totalValue}`;

    }
}
//Колличество товаров на иконке в кружочке
let basketTotal = document.querySelector('.cartIconWrap').children[2];
//Наша корзина с товарами
let basket = {};
//Общая стоимость корзины
let totalValue = 0;
