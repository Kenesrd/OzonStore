import filterPrice from './filterPrice';

export default function actionPage() {
    const cards = document.querySelectorAll('.goods .card'),
        discountCheckbox = document.getElementById('discount-checkbox'),
        min = document.getElementById('min'),
        max = document.getElementById('max'),
        search = document.querySelector('.search-wrapper_input'),
        searchBtn = document.querySelector('.search-btn');
    
    discountCheckbox.addEventListener('click', filterPrice);
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