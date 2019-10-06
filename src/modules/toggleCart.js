export default function toggleCart() {
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