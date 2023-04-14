import refs from './refs.js';

export const showSpinnerIfPageLoads = function() {

    setTimeout(function() {if (!refs.loader.classList.contains('preloader__loader--page-loaded')) {

        console.log('hey')
        refs.loader.classList.add('preloader__loader--page-loaded');
    }
    }, 500)

}

