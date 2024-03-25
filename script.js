
const clearButton = document.querySelector('.clear');
const currentScreen = document.querySelector('.current');
const previousButton = document.querySelector('.previous');
const numberButton = [...document.querySelectorAll('.number')];

clearButton.addEventListener("click", () => {
    previousButton.textContent = '';
    currentScreen.textContent = 0;
})
numberButton.forEach( el =>{
    el.addEventListener("click", () => {
        currentScreen.textContent += el.textContent
    })
})
