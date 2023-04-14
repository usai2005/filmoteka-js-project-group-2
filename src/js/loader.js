import refs from './refs.js';

export const showSpinnerIfPageLoads = function() {
        
    //при завантаженні сторінки спінер не зникає протягои 500мс і дозволяє повністю її завантжити
    setTimeout(function() {
        
    if (!refs.loader.classList.contains('preloader__loader--page-loaded')) {

        refs.loader.classList.add('preloader__loader--page-loaded');
    }
    }, 500);    
};

