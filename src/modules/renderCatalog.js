import filterPrice from './filterPrice';

export default function renderCatalog() {
    const cards = document.querySelectorAll('.goods .card');
    const catalogList = document.querySelector('.catalog-list');
    const catalogBtn = document.querySelector('.catalog-button');
    const catalogWrapper = document.querySelector('.catalog');
    const categories = new Set();
    const filterTitle = document.querySelector('.filter-title h5');   

    cards.forEach((card) => {
        categories.add(card.dataset.category);
    });

    categories.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = item;
        catalogList.appendChild(li);
    });

    const allLi = catalogList.querySelectorAll('li');

    catalogBtn.addEventListener('click', (e) => {
        if(catalogWrapper.style.display){
            catalogWrapper.style.display = '';
        } else {
            catalogWrapper.style.display = 'block';
        }

        if(e.target.tagName === 'LI'){
                allLi.forEach((el) => {
                    if(el === e.target){
                        el.classList.add('active');
                    } else {
                        el.classList.remove('active');
                    }
                });
                
                filterTitle.textContent = e.target.textContent;
                filterPrice();              
            
        }
    });
}