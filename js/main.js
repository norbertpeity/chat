/* create a wrapper to keep the global namespace pollution minimal */
const chat = ( function() {
    /* cache the frequently used DOM elements */
    const cache = {
        messages: document.querySelector('.js-chat-messages'),
        controls: document.querySelector('.js-chat-controls'),
        nickname: document.querySelector('.js-chat-nickname'),
        input: document.querySelector('.js-chat-input'),
        send: document.querySelector('.js-chat-send'),
    };

    // const inputs = ['nickname', 'input'];
    // const focusClass = 'chat__controls--focus-';
    // const focusedInputClasses = inputs.map(inputName => `${focusClass}${inputName}`);
    // console.log(focusedInputClasses);

    // function handleInputFocus(target) {
    //     console.log('focused', target);
    //     cache.controls.classList.remove(...focusedInputClasses);
    //     cache.controls.classList.add(`${focusClass}${target}`);
    // }

    // function handleInputBlur(target) {
    //     console.log('blurred', target);
    //     cache.controls.classList.remove(`${focusClass}${target}`);
    // }

    return {
        init: function() {
            console.log('initiating the chat app');
            /* Make the text inputs wider when they are in focus */
            // inputs.forEach(inputName => {
            //     cache[inputName].addEventListener('focus', () => { handleInputFocus(inputName) });
            //     cache[inputName].addEventListener('blur', () => { handleInputBlur(inputName) });
            // });
        }
    }
})();

chat.init();