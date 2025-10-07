import { test as base } from '@playwright/test';
import { AuthPage } from '../pages/auth_page';
import { HomePage } from '../pages/home_page';
import { CheckoutPage } from '../pages/checkout_page';

export const test = base.extend({
  user: async ({ }, use, testInfo) => {
    const config = testInfo.project.use;
    await use(config.user); // injeta user direto
  },

  authPage: async ({ page }, use) => {
    const authPage = new AuthPage(page);
    await use(authPage);   // injeta no teste
  },

  checkoutPage: async ({ page }, use) => {
    const checkoutPage = new CheckoutPage(page);
    await use(checkoutPage);   // injeta no teste
  },

  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await homePage.goto(); // sempre abre a home
    await use(homePage);   // injeta no teste
  }
});