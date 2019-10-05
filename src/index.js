'use strict';

function toggleCheckbox() {
    const checkbox = document.querySelectorAll('.filter-check_checkbox');
    checkbox.forEach(function (el) {
        el.addEventListener('change', function () {
            if (this.checked) {
                this.nextElementSibling.classList.add('checked');
            } else {
                this.nextElementSibling.classList.remove('checked');
            }
        });
    });
}




function toggleCart() {
    const btnCart = document.getElementById('cart'),
        modalCart = document.querySelector('.cart'),
        cartClose = document.querySelector('.cart-close');
        

    // Basket
    btnCart.addEventListener('click', () => {
        modalCart.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });

    cartClose.addEventListener('click', () => {
        modalCart.style.display = 'none';
        document.body.style.overflow = '';
    });
    // end basket
}


function addToCart() {
    // add goods card to basket
    const cards = document.querySelectorAll('.goods .card'),
        cartWrapper = document.querySelector('.cart-wrapper'),
        cartEmpty = document.getElementById('cart-empty'),
        countGoods = document.querySelector('.counter');

    cards.forEach((card) => {
        const btn = card.querySelector('button');
        btn.addEventListener('click', () => {
            const cardClone = card.cloneNode(true);

            cartWrapper.appendChild(cardClone);

            showData();
            const removeBtn = cardClone.querySelector('.btn');
            removeBtn.textContent = 'Удалить из корзины';

            removeBtn.addEventListener('click', () => {
                cardClone.remove();
                showData();
            });
        });
    });

    function showData() {
        const cardsCart = cartWrapper.querySelectorAll('.card'),
            cardsPrice = cartWrapper.querySelectorAll('.card-price'),
            cardTotal = document.querySelector('.cart-total span');
        let sum = 0;

        countGoods.textContent = cardsCart.length;


        cardsPrice.forEach(function (cardPrice) {
            let price = parseFloat(cardPrice.textContent);
            sum += price;
        });
        cardTotal.textContent = sum;

        if (cardsCart.length !== 0) {
            cartEmpty.remove();
        } else {
            cartWrapper.appendChild(cartEmpty);
        }
    }
    // end goods card to basket
}


// filter action
function actionPage() {
    const cards = document.querySelectorAll('.goods .card'),
        discountCheckbox = document.getElementById('discount-checkbox'),
        min = document.getElementById('min'),
        max = document.getElementById('max'),
        search = document.querySelector('.search-wrapper_input'),
        searchBtn = document.querySelector('.search-btn');

    discountCheckbox.addEventListener('click', () => {
        cards.forEach((card) => {
            if(discountCheckbox.checked){
                if(!card.querySelector('.card-sale')){
                    card.parentNode.style.display = 'none';
                }
            } else {
                card.parentNode.style.display = '';
            }
        });
    });

    function filterPrice() {
        cards.forEach((card) => {
            const cardPrice = card.querySelector('.card-price'),
                 price = parseFloat(cardPrice.textContent),
                 discount = card.querySelector('.card-sale');
            
            if((min.value && price < min.value) || (max.value && price > max.value)){
                card.parentNode.style.display = 'none';                 
            } else if (discountCheckbox.checked && !discount) {
                card.parentNode.style.display = 'none'; 
            } else{
                card.parentNode.style.display = '';
            }            
        });
    }

    min.addEventListener('keyup', filterPrice);
    max.addEventListener('change', filterPrice);

    // search===============================
    searchBtn.addEventListener('click', () => {
        const searchText = new RegExp(search.value.trim(), 'i');

            cards.forEach((card) => {
                const title = card.querySelector('.card-title');
                if(!searchText.test(title.textContent)){
                    card.parentNode.style.display = 'none'; 
                } else {
                    card.parentNode.style.display = '';
                }
            });
            search.value = '';
    });
// search end===================================

}

// end filter action


// get data server
function getData() {
    const goodsWrapper = document.querySelector('.goods');
   return fetch('../db/db.json')
        .then(response => {
            if (response.ok){
                return response.json();                
            } else {
                throw new Error ('Данные не были получены, ошибка: ' + response.status);
            }
        })
        .then(json => json.goods)
        .catch(err => {
            console.log(err);
            goodsWrapper.innerHTML = '<div style="color: red; font-size: 50px;">Упс что то пошло не так...!</div>';
        });       
}


function renderCards(data){
    
    data.forEach((good) => {
        
        const card = document.createElement('div');
            card.className = 'col-12 col-md-6 col-lg-4 col-xl-3';
        const goodsWrapper = document.querySelector('.goods');
            card.innerHTML = `
            <div class="card" data-category="${good.category}">
            ${good.sale ? '<div class="card-sale">🔥Hot Sale🔥</div>': ''}
                <div class="card-img-wrapper">
                    <span class="card-img-top"
                        style="background-image: url('${good.img}')"></span>
                </div>
                <div class="card-body justify-content-between">
                    <div class="card-price" style="${good.sale ? 'color: red;' : ''}">${good.price} ₽</div>
                    <h5 class="card-title">${good.title}</h5>
                    <button class="btn btn-primary">В корзину</button>
                </div>
            </div>
            `;
            goodsWrapper.appendChild(card);
    }); 
}

// end-get data server

function renderCatalog() {
    const cards = document.querySelectorAll('.goods .cart');
    const catalogList = document.querySelector('.catalog-list');
    const catalogBtn = document.querySelector('.catalog-button');
    const catalogWrapper = document.querySelector('.catalog');
    const categories = new Set();

    console.dir(cards);
    
    cards.forEach((card) => {
        categories.add(card.dataset.category);
    });

    categories.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = item;
        catalogList.appendChild(li);
    });

    catalogBtn.addEventListener('click', () => {
        catalogWrapper.style.display = 'block';
    });
    console.log(categories);
}

getData().then((data) => {
    renderCards(data);
    toggleCheckbox();
    toggleCart();
    addToCart();
    actionPage();
    renderCatalog();
});





