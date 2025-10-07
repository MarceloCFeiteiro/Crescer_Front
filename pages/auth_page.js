// pages/login-page.js
import { expect } from '@playwright/test';

export class AuthPage {

  constructor(page) {
    this.page = page;

    // Seletores para o campo e-mail (tenta cobrir variações comuns)
    this.inputEmail = page.getByRole('textbox', { name: 'Email' });

    // Seletores para o campo senha
    this.inputPassword = page.getByRole('textbox', { name: 'Senha' });

    // Botão Entrar (cobre <button> ou <input type="submit"> com texto "Entrar" / "Login")
    this.btnEntrar = page.getByRole('button', { name: 'Entrar' });
  }
    async gotoAuthPage() {
    await this.page.goto('/auth.html');
  }

  // Preenche o e-mail
  async preencherEmail(email) {
    await this.inputEmail.fill(String(email));
  }

  // Preenche a senha
  async preencherPassword(password) {
    await this.inputPassword.fill(String(password));
  }

  // Clica no botão Entrar
  async clickEntrar() {
    await this.btnEntrar.click();
  }

  // Método utilitário para fazer login de uma vez
  async login(email, password) {
    await this.preencherEmail(email);
    await this.preencherPassword(password);
    await this.clickEntrar();
  }

  // (Opcional) valida que os campos e o botão existem na página
  async validarElementosVisiveis() {
    await expect(this.inputEmail).toBeVisible();
    await expect(this.inputPassword).toBeVisible();
    await expect(this.btnEntrar).toBeVisible();
  }
}
