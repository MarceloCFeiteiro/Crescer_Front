import { test } from '../fixture/hookFixture';
import { fakerPT_BR } from "@faker-js/faker";


test.describe('Testes Relacionados a Home', () => {

    test('Buscar Chapéu Inexistente', async ({ homePage }) => {
        await homePage.buscarChapeu('Crocodilo Dundee');
        await homePage.ValidarChapeuNaoEncontrado();
    });

    test('Buscar Chapéu Gaúcho', async ({ homePage }) => {
        await homePage.buscarChapeu('Gaúcho');
        await homePage.validarChapeuExibido(1, 'Gaúcho');
    });

    test('Comprar Chapeu Disponível Por Nome Sem Estar logado Com PIX', async ({ authPage, checkoutPage, homePage, user }) => {
        await homePage.adicionaChapeuNoCarrinhoPorNome('Chapéu Floppy');
        await homePage.concluirCarrinho();
        await authPage.login(user.email, user.senha);
        await homePage.clicarCarrinho();
        await homePage.concluirCarrinho();
        await checkoutPage.preencherDadosPessoais(user.nome, user.cpf, user.email, '(51) 99999-9999');
        await checkoutPage.preencherEndereco(fakerPT_BR.location.buildingNumber(), fakerPT_BR.number.int({ min: 0, max: 9999 }), fakerPT_BR.location.city(), fakerPT_BR.location.zipCode('#####-###'), fakerPT_BR.location.city(), 'RS');
        await checkoutPage.finalizarCompra('Pix');
        await checkoutPage.validarModalPagamento('Pix');
        await homePage.validarHomeVisivel();
    });
});