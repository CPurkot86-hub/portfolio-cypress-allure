import '@shelex/cypress-allure-plugin';

//Rodar o teste:
//1-npx cypress run --env allure=true
//2-npx allure generate allure-results --clean
//3-npx allure open

describe('Busca de produtos - Loja da Construção', () => {

  it('Deve Falhar ao buscar por cimento', () => {
    cy.visit('https://www.lojaconstrucao.com.br');

    cy.get('.col-md-12 > .search-element > .d-flex > input', { timeout: 10000 })
      .type('cimento');

    // Espera e valida sugestões aparecendo
    cy.get('.search-item', { timeout: 10000 })
      .should('contain.text', 'cimento')
      .and('have.length.greaterThan', 0);
  });

it('Deve buscar por cimento e validar produto Tocantins no DOM', () => {
    cy.visit('https://www.lojaconstrucao.com.br');

    cy.get('.col-md-12 > .search-element > .d-flex > input', { timeout: 10000 })
      .type('cimento');

    cy.get('h2', { timeout: 10000 })
      .contains('Cimento Tocantins TODAS AS OBRAS 25Kg')
      .should('exist');
  });
});