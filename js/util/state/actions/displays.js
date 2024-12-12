import getter from "../getters.js";

const getters = getter.functions;

const display = {
    functions: {
        /**
         * Sets the active navigation item in the application.
         * This function removes the active class from all navigation items
         * and adds it to the specified item based on its ID.
         * 
         * @param {string} active_id - The ID of the navigation item to activate.
         * @param {string} active_class - The class name to apply for the active state.
         */
        setActiveNavigation(active_id, active_class) {
            const nav = document.getElementById(`app__nav`);
            nav.querySelectorAll(`.${active_class}`).forEach(e => {
                e.classList.remove(active_class);
            });
            const found = nav.querySelector(`#${active_id}`);
            if (found) found.classList.add(active_class);
        }, 
        
        /**
         * Displays a message on the application page.
         * This function updates the message display area with the provided message
         * and fades it out after a specified duration.
         * 
         * @param {string} message - The message to display.
         * @param {number} custom - The duration in milliseconds before the message fades out (default is 10).
         */
        displayMessage(message, custom = 10) {
            const message_display = document.querySelector('.app__message');
            message_display.classList.remove('fade-out');
            message_display.innerHTML = message;
            setTimeout(() => {
                message_display.classList.add('fade-out');
            }, custom);
        }, 
        
        /**
         * Updates the notification badge for the cart.
         * This function retrieves the current cart count and updates the badge
         * visibility and text accordingly.
         */
        async setNotificationMark() {
            const count = await getters.getCartCount();
            const notif = document.getElementById("nav__cart-badge");
            if (count != 0) {
                notif.innerText = count;
                notif.style.opacity = 1;
            }
            else notif.style.opacity = 0;
        }
    }
}

export default display;