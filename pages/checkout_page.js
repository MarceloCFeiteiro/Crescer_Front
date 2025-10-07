import { expect } from "@playwright/test";


export class CheckoutPage {
    constructor(page) {
        this.page = page;

        // Coluna de dados pessoais
        this.nomeInput = page.locator('#nome');
        this.cpfInput = page.locator('#cpf');
        this.emailInput = page.locator('#email');
        this.telefoneInput = page.locator('#telefone');

        // Coluna de endereço
        this.enderecoInput = page.locator('#endereco');
        this.numeroInput = page.locator('#numero');
        this.bairroInput = page.locator('#bairro');
        this.cepInput = page.locator('#cep');
        this.cidadeInput = page.locator('#cidade');
        this.ufInput = page.locator('#uf');

        // Pagamento
        this.pixBtn = page.locator('#btn-pix');
        this.boletoBtn = page.locator('#btn-boleto');
        this.pagamentoHidden = page.locator('#pagamento');

        // Botão finalizar compra
        this.finalizarBtn = page.locator('.checkout-form-btn');

        // Modal de Pagamento
        this.tipoPagamentoTitle;
        this.codText = page.locator('#codigo-pagamento');
        this.copiarCodigoBtn = page.locator('#copiar-codigo');
        this.fecharBtn = page.locator('#fechar-modal-pagamento');

        // Mensagens de erro
        this.erroNome = page.locator('#erro-nome');
        this.erroCpf = page.locator('#erro-cpf');
        this.erroEmail = page.locator('#erro-email');
        this.erroTelefone = page.locator('#erro-telefone');
        this.erroEndereco = page.locator('#erro-endereco');
        this.erroNumero = page.locator('#erro-numero');
        this.erroBairro = page.locator('#erro-bairro');
        this.erroCep = page.locator('#erro-cep');
        this.erroCidade = page.locator('#erro-cidade');
        this.erroUf = page.locator('#erro-uf');
        this.erroPagamento = page.locator('#erro-pagamento');

        // Resumo do pedido
        this.resumoPedido = page.locator('#pedido-resumo');
        this.itensPedido = this.resumoPedido.locator('ul li');
        this.totalPedido = this.resumoPedido.locator('.pedido-total');
    }

    async #getMensansagemTituloModal(tipoPgt) {
        this.tipoPagamentoTitle = await this.page.getByRole('heading', { name: `Pagamento ${tipoPgt}` });
    }

    // Preenche dados pessoais
    async preencherDadosPessoais(nome, cpf, email, telefone) {
        await this.nomeInput.fill(nome);
        await this.cpfInput.fill(cpf);
        await this.emailInput.fill(email);
        await this.telefoneInput.fill(telefone);
    }

    // Preenche endereço
    async preencherEndereco(endereco, numero, bairro, cep, cidade, uf) {
        await this.enderecoInput.fill(endereco);
        await this.numeroInput.fill(String(numero));
        await this.bairroInput.fill(bairro);
        await this.cepInput.fill(cep);
        await this.cidadeInput.fill(cidade);
        await this.ufInput.fill(uf);
    }

    // Seleciona método de pagamento
    async #selecionarPagamento(metodo) {
        if (metodo.toLowerCase() === 'pix') {
            await this.pixBtn.click();
        } else if (metodo.toLowerCase() === 'boleto') {
            await this.boletoBtn.click();
        }
    }

    // Valida Modal de pagamento
    async validarModalPagamento(tipoPgt) {
        await this.#getMensansagemTituloModal(tipoPgt);

        const msgTipoPgmt = await this.tipoPagamentoTitle.textContent();

        expect(msgTipoPgmt.toLowerCase()).toBe(`Pagamento ${tipoPgt}`.toLowerCase());
        expect(await this.codText.textContent()).not.toBe('');

        await this.fecharBtn.click()
    }

    // Finaliza a compra
    async finalizarCompra(metodo) {
        await this.#selecionarPagamento(metodo)
        await this.finalizarBtn.click();
    }

    // Lê total do pedido
    async getTotalPedido() {
        return await this.totalPedido.textContent();
    }

    // Conta itens no resumo
    async getQuantidadeItens() {
        return await this.itensPedido.count();
    }

    // Valida se erro está visível
    async isErroVisivel(campo) {
        const erros = {
            nome: this.erroNome,
            cpf: this.erroCpf,
            email: this.erroEmail,
            telefone: this.erroTelefone,
            endereco: this.erroEndereco,
            numero: this.erroNumero,
            bairro: this.erroBairro,
            cep: this.erroCep,
            cidade: this.erroCidade,
            uf: this.erroUf,
            pagamento: this.erroPagamento
        };
        return await erros[campo].isVisible();
    }
}