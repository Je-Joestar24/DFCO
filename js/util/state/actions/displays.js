import getter from "../getters.js";

const getters = getter.functions;

const display = {
    functions: {
        setActiveNavigation(active_id, active_class) {
            const nav = document.getElementById(`app__nav`);
            nav.querySelectorAll(`.${active_class}`).forEach(e => {
                e.classList.remove(active_class);
            });
            const found = nav.querySelector(`#${active_id}`);
            if (found) found.classList.add(active_class);
        }, displayMessage(message, custom = 10) {
            const message_display = document.querySelector('.app__message');
            message_display.classList.remove('fade-out');
            message_display.innerHTML = message;
            setTimeout(() => {
                message_display.classList.add('fade-out');
            }, custom);
        }, async setNotificationMark() {
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