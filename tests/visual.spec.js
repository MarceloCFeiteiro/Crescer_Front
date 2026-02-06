
import { test } from '../fixture/hookFixture';
import { expect } from '@playwright/test';

test('Valida Visualmente a Página de Login', async ({ authPage }) => {
    // 1. Abre a página
    await authPage.gotoAuthPage();

    // 2. Espera carregar o conteúdo principal
    await authPage.validarElementosVisiveis();

    // 3. Tira o screenshot atual e compara com o baseline
    await expect(authPage.page).toHaveScreenshot('login.png', {
        fullPage: true,
    });
});