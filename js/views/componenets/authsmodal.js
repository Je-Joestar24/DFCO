import AbstractModal from "./AbstractModal.js";

export default class extends AbstractModal{
    constructor(){
        super({modal: 'auth-modal', toggledata: 'data-auth-toggle', activeclass: 'auth-modal--active'});
        this.bindButtons();
    }

/*     close(){
        const content = document.querySelector('.auth-modal__signup');
        content.classList.add('auth-modal__signup--close');
    } */
}