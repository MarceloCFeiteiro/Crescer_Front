import { expect } from '@playwright/test';

export class HomePage {
  constructor(page) {
    this.page = page;

    // Header
    this.logo = page.locator('img[alt="Hat Store"]');
    this.navHome = page.locator('nav >> text=Home');
    this.navMeusPedidos = page.locator('nav >> text=Meus Pedidos');
    this.navLogin = page.getByRole('link', { name: 'Login' });
    this.navCarrinho = page.getByRole('button', { name: 'Carrinho Carrinho' });

    // Banner
    this.bannerPromo = page.locator('text=Promoção: Ganhe 20% OFF');

    // Filtros
    this.inputPrecoMin = page.locator('input[name="min"]');
    this.inputPrecoMax = page.locator('input[name="max"]');
    this.btnAplicarPreco = page.locator('button:has-text("Aplicar")');

    // Serviços
    this.txtFreteGratis = page.locator('text=Frete grátis');
    this.txtCompraSegura = page.locator('text=Compra segura');
    this.txtSuporte24h = page.locator('text=Suporte 24h');

    // Carrinho
    this.buttonFinalizarCompra = page.getByRole('button', { name: 'Finalizar compra' })

    this.inputBuscarChapeu = page.getByRole('textbox', { name: 'Buscar chapéu...' });
    this.textoChapeuNaoencontrado = page.getByText('Nenhum chapéu encontrado.');
    this.listChapeus = page.locator('#hats .hat-card');

    this.chapeu;
  }

  async goto() {
    await this.page.goto('/');
  }

  async #getChapeu(nomeChapeu) {
    this.chapeu = this.page.locator(`//button[@data-nome="${nomeChapeu}"]`);
  }

  async adicionaChapeuNoCarrinhoPorNome(nomeChapeu) {
    await this.#getChapeu(nomeChapeu);
    await this.chapeu.click();
  }

  async concluirCarrinho() {
    await expect(this.buttonFinalizarCompra).toBeVisible();
    await this.buttonFinalizarCompra.click();
  }

  async buscarChapeu(nomeChapeu) {
    await this.inputBuscarChapeu.waitFor({ state: 'visible' });
    await this.inputBuscarChapeu.fill(nomeChapeu)
  }

  async ValidarChapeuNaoEncontrado() {
    await expect(this.textoChapeuNaoencontrado).toContainText('Nenhum chapéu encontrado.');
  }

  async validarChapeuExibido(qnt, nomeChapeu) {
    await expect(this.listChapeus).toHaveCount(qnt);
    await expect(this.listChapeus.locator(`:has-text("${nomeChapeu}")`)).toBeVisible();
  }

  async validarHomeVisivel() {
    await expect(this.navHome).toHaveText('Home');
    await expect(this.navMeusPedidos).toHaveText('Meus Pedidos');
    await expect(this.bannerPromo).toBeVisible();

    await expect(this.txtFreteGratis).toBeVisible();
    await expect(this.txtCompraSegura).toBeVisible();
    await expect(this.txtSuporte24h).toBeVisible();
  }

  async clicarLogin() {
    await this.navLogin.click();
  }

  async clicarCarrinho() {
    await expect(this.listChapeus.first()).toBeVisible();
    await expect (this.navCarrinho).toBeVisible();
    await this.navCarrinho.click();
  }

  async aplicarFiltroCategoria(nome) {
    const categoria = this.page.locator(`//label[contains(., "${nome}")]`);
    await categoria.check();
  }

  async aplicarFaixaPreco(min, max) {
    await this.inputPrecoMin.fill(String(min));
    await this.inputPrecoMax.fill(String(max));
    await this.btnAplicarPreco.click();
  }
}
