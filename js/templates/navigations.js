/**
 * Navigation component that handles the main navigation bar and user profile dropdown
 * Extends AbstractTemplate for common functionality
 */
import AbstractTemplate from "./AbstractTemplate.js";
import { actions } from "../util/state.js";

import CommonNav from "./navigations/commonNav.js";
import CredNav from "./navigations/credNav.js";

export default class extends AbstractTemplate {
  constructor() {
    super();
    this.commonNav = new CommonNav();
    this.credNav = new CredNav()
  }


  /**
   * Generates the HTML for the main navigation bar
   * @returns {Promise<string>} Navigation HTML including logo, links and user menu
   */
  async getHtml() {
    return `
      <div class="nav__container">
        <a href="#/" class="nav__logo" data-link>DFCO</a>
        <div class="nav__links">
          ${await this.commonNav.geHtml()}
          ${await this.credNav.getHtml()}
        </div>
      </div>
      `;
  }


  /**
   * Bind the logout event with message
   *  */
  bindLogout() {
    document.body.addEventListener('click', async (e) => {
      if (e.target.matches(`[data-logout]`)) {
        e.preventDefault();
        actions.displayMessage("LOGGING OUT...", 500);
        setTimeout(() => actions.logout(), 500);
      }
    });
  }
}