/**
 * Home View Class
 * Extends AbstractView to handle the home page rendering
 */
import AbstractView from './AbstractView.js';

import Hero from './home/hero.js';
import Features from './home/features.js';
import BestSeller from './home/bestseller.js';
import Steps from './home/steps.js';
import Testimonials from './home/testimonials.js';
import Cta from './home/cta.js';

export default class extends AbstractView {



  /**
   * Constructor
   * Initializes the home view and sets the page title
   */
  constructor() {
    super();
    this.setTitle('DFCO | Home');
    this.hero = new Hero();
    this.features = new Features();
    this.bestseller = new BestSeller();
    this.steps = new Steps();
    this.testimonials = new Testimonials();
    this.cta = new Cta();
  }

  /**
   * Main HTML renderer
   * Assembles all section components into final page HTML
   * @returns {Promise<string>} Complete HTML for home page
   */
  async getHtml() {
    return `
        <!-- Section Hero Section -->
        ${await this.hero.getHtml()}

        <!-- Section 2, features -->
        ${await this.features.getHtml()}

        <!-- Section 3, best sellers -->
        ${await this.bestseller.getHtml()}

        <!-- Section 4, how to shop -->
        ${await this.steps.getHtml()}

        <!-- Section 5, testimonials -->
        ${await this.testimonials.getHtml()}

        <!-- Section 6, cta -->
        ${await this.cta.getHtml()}
        `;
  }
}