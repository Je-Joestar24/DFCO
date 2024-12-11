export default class {
    constructor(modal) {
        this.modal = modal;
    }

    hide() {
        const message = this.modal.querySelector("#auth-modal__signup-message");
        message.classList.remove("error", "success");
        message.style.display = "none";
    }
}
