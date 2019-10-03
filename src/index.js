'use strict';

const checkbox = document.querySelectorAll('.filter-check_checkbox'),
      btnCart = document.getElementById('cart'),
      modalCart = document.querySelector('.cart'),
      cartClose = document.querySelector('.cart-close'),
      countGoods = document.querySelector('.counter');


checkbox.forEach(function(el){ 
    el.addEventListener('change', function (){
        if(this.checked){
            this.nextElementSibling.classList.add('checked');
        } else {
            this.nextElementSibling.classList.remove('checked');
        }
    });    
});

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

    // add goods card to basket
    const cards =document.querySelectorAll('.goods .card'),
      cartWrapper = document.querySelector('.cart-wrapper'),
      cartEmpty = document.getElementById('cart-empty');

    cards.forEach((card) => {
        const btn = card.querySelector('button');
         btn.addEventListener('click', () => {
            const cardClone = card.cloneNode(true);
                cartWrapper.appendChild(cardClone);
                cartEmpty.remove();
            showData();
         });
    });

    function showData(){
        const cardsCart = cartWrapper.querySelectorAll('.card'),
            cardsPrice = cartWrapper.querySelectorAll('.card-price'),
            cardTotal = document.querySelector('.cart-total span');
        let sum = 0;

        countGoods.textContent = cardsCart.length;
        console.log(countGoods);
        

        cardsPrice.forEach(function(cardPrice){
            let price = parseFloat(cardPrice.textContent);            
            sum += price;
        });
        cardTotal.textContent = sum;
    }
    // end goods card to basket
