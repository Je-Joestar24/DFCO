/**
 * Checkouts View Class
 * This module handles the display of all the checkout history for the user.
 * It extends the AbstractView class to manage the rendering of the checkout history page.
 */
import AbstractView from "./AbstractView.js";

import List from "./checkouts/list.js";

export default class extends AbstractView {
  constructor() {
    super();
    this.setTitle("DFCO | Checkouts");
    this.list = new List();
  }

  /**
   * Generates the HTML for the checkout history page.
   * @returns {Promise<string>} The HTML string for the checkout history section.
   */
  async getHtml() {
    return `
        <section id="app-checkouts" class="app__checkouts" role="region" aria-label="Checkout History">
          <div class="checkouts__content">
            <div class="checkouts__header">
              <h2 class="checkouts__title">My Checkout History</h2>
            </div>
            <div id="app-checkout-list" class="checkouts__list">
              <!-- ALL checkout item -->
              ${await this.list.getHtml()}
            </div>
          </div>
        </section>
        `;
  }


}