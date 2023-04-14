import refs from "./refs";

export function showFailureMessage() {
    if (!refs.formFailureMessage.classList.contains('is-hidden')) {
        return
    };
    refs.formFailureMessage.classList.remove('is-hidden');
    setTimeout(() => {
        refs.formFailureMessage.classList.add('is-hidden');
    }, 3000);
}