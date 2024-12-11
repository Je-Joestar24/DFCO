import { actions } from "../../../util/state.js";

export default class {
    bindAuths(modal) {
        document.body.addEventListener('submit', async (e) => {
            if (e.target.matches(`[data-signup-form]`)) {
                e.preventDefault();
                this.signupNow(modal);
            }
            if (e.target.matches(`[data-login-form]`)) {
                e.preventDefault();
                this.loginNow(modal);
            }
        });
    }

    async signupNow(modal) {
        const email = modal.querySelector("#auth-signup__email").value.trim();
        const password = modal.querySelector("#auth-signup__pass").value;
        const cpass = modal.querySelector("#auth-signup__pass-confirm").value;
        const message = modal.querySelector("#auth-modal__signup-message");

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            this.displayMessage(message, "error", "INVALID EMAIL ADDRESS");
            return;
        }

        if (password !== cpass) {
            this.displayMessage(message, "error", "PASSWORD DOESN'T MATCH");
            return;
        }

        this.displayMessage(message, "success", "SIGNUP SUCCESS");
        await actions.signup({ email, password });
        await this.login(email, password, modal);
    }

    async loginNow(modal) {
        const email = modal.querySelector("#auth-login__email").value.trim();
        const password = modal.querySelector("#auth-login__pass").value;
        await this.login(email, password, modal);
    }

    async login(email, password, modal) {
        const res = await actions.login({ email, password });
        if (res.success) {
            window.location.href = window.location.origin + "#/products";
            await actions.displayMessage("LOGGING IN...", 500);
            setTimeout(() => location.reload(), 500);
        } else {
            this.displayMessage(modal.querySelector("#auth-modal__signup-message"), "error", "LOGIN FAILED, NO MATCH FOUND!");
        }
    }

    displayMessage(element, type, text) {
        element.classList.remove("error", "success");
        element.classList.add(type);
        element.innerHTML = text;
        element.style.display = "block";
    }
}
