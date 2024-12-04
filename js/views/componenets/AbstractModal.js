export default class {
    constructor(config = { modal, toggledata, activeclass, beforeclose: null, beforeopen: null }) {
        const { modal, toggledata, activeclass, beforeclose, beforeopen } = config;
        this.toggleAttr = toggledata;
        this.activeclass = activeclass;
        this.modal = document.getElementById(modal);
        this.beforeClose = beforeclose;
        this.beforeOpen = beforeopen;
        this.bindButtons();
    }

    modalContent() {

    }

    bindButtons() {
        document.body.addEventListener('click', (e) => {
            if (e.target.matches(`[${this.toggleAttr}]`)) {
                e.preventDefault();
                this.toggle();
            }
        });

        window.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' || event.key === 'Esc') { 
                this.close();
            }
        });
        
    }

    toggle() {
        if(this.modal.classList.contains(this.activeclass)) this.close();
        else this.open();
    }

    close() {
        this.modal.classList.remove(this.activeclass);
    }

    open() {
        this.modal.classList.add(this.activeclass);
    }
}