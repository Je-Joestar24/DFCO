/**
 * Footer component that handles the site footer including brand info, navigation links and decorative elements
 * Extends AbstractTemplate for common functionality
 */
import AbstractTemplate from "./AbstractTemplate.js";
import { state, actions } from "../util/state.js";

import Brand from "./footer/Brand.js";
import Navs from "./footer/Navs.js";
import Decorations from "./footer/Decorations.js";

export default class extends AbstractTemplate {
  constructor() {
    super();
    this.brand = new Brand();
    this.navs = new Navs();
    this.decoration = new Decorations();
  }

  /**
   * Generates the complete HTML structure for the footer
   * @returns {Promise<string>} Footer HTML including brand section, navigation and decorations
   */
  async getHtml() {
    return `
        <div class="footer__container">
          
          ${await this.brand.getHtml()}
          ${await this.navs.getHtml()}

          <div class="footer__copyright">
            <p>&copy; 2024 DFCO. All rights reserved.</p>
          </div>
        </div>
        ${await this.decoration.getHtml()}
      `;
  }

}