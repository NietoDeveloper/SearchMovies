function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if(this.scrollY >= 350) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

const sr = ScrollReveal({
    origin: 'top',
    distance: '300px',
    duration: 2500,
    delay: 400,
})

const d = new Date();
document.getElementById("date").innerHTML = d;

sr.reveal(`.welcome`, {delay: 100}); 
sr.reveal(`.card`, {delay: 150}); 
sr.reveal(`.footer__logo`, {delay: 200}); 
sr.reveal(`.footer__content`, {interval: 250});
sr.reveal(`.footer__copy`), {interval: 300};
sr.reveal(`footer__dev-link`, {interval: 300});
sr.reveal(`date`, {interval:350}) 