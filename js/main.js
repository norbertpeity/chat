class Chat {
    constructor() {
        // cache some commonly used DOM elements
        this.cache = {
            messagesWrapper: document.querySelector('.js-chat-messages-wrapper'),
            messages: document.querySelector('.js-chat-messages'),
            notification: document.querySelector('.js-chat-notification'),
            controls: document.querySelector('.js-chat-controls'),
            nickname: document.querySelector('.js-chat-nickname'),
            input: document.querySelector('.js-chat-input'),
            send: document.querySelector('.js-chat-send'),
        };

        this.nickname = 'Guest';
        this.firstMessage = true; // this is used to clear the 'start chatting' message

        this.cache.nickname.value = this.nickname; // set the nickname input value to the default nickname

        // listen to changes on the nickname input
        this.cache.nickname.addEventListener('change', (e) => this.nickname = e.target.value);

        // listen to send button clicks and enter keypresses on the input
        this.cache.send.addEventListener('click', () => this.validateNickname());
        this.cache.input.addEventListener('keyup', (e) => {
            if (e.which === 13) {
                this.validateNickname();
            }
        });

        // initialize socket.io
        this.socket = io('http://35.157.80.184:8080/');
        this.socket.on('message', response => this.addMessage(response));
    }

    // check if the nickname is empty or not
    validateNickname() {
        if (this.nickname.length > 0) {
            this.validateNewMessage();
        }
        else {
            this.setNotification('Please set your nickname to start chatting!');
            this.cache.nickname.focus();
        }
    }

    // validate input, and send it to the socket.io server if it's not empty
    // then empty the input and re-focus it so the user can keep typing
    validateNewMessage() {
        if (this.cache.input.value.length > 0) {
            const message = {
                message: this.cache.input.value,
                user: this.nickname,
            };
            this.cache.input.value = '';
            this.cache.input.focus();

            this.socket.emit('message', message);
        }
    }

    // add the message to the DOM
    addMessage(message) {
        if (this.firstMessage) {
            this.firstMessage = false;
            this.cache.messages.innerHTML = '';
        }

        const newMessage = document.createElement('div');
        newMessage.classList.add('chat__message');

        // add an extra class to the div for styling purposes if current user is the sender
        if (message.user === this.nickname) {
            newMessage.classList.add('chat__message--reply');
        }
        // otherwise prepend the name of the user to the message
        else {
            newMessage.textContent = message.user + ': ';
        }

        newMessage.textContent += message.message;
        this.cache.messages.appendChild(newMessage);

        // scroll the user to the bottom of the message container
        this.cache.messagesWrapper.scrollTop = this.cache.messagesWrapper.scrollHeight;
    }

    // display a notification for 3 seconds
    setNotification(message) {
        this.cache.notification.textContent = message;
        this.cache.notification.classList.add('chat__notification--show');

        setTimeout(() => this.cache.notification.classList.remove('chat__notification--show'), 3000);
    }
}

const chat = new Chat();