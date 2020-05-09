document.addEventListener('DOMContentLoaded', (e) => {
    const burgerIcon = document.querySelector('.burger');
    const nav = document.querySelector('.navigation');


    // add sliding effect
    burgerIcon.addEventListener('click', () => {
        nav.classList.toggle('slide');
        nav.classList.toggle('width-100');
        nav.classList.toggle('height-100');
        burgerIcon.classList.toggle('black-background');
    })
})