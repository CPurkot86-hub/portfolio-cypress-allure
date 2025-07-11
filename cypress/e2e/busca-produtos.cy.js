// Importa o plugin Allure para Cypress
import '@shelex/cypress-allure-plugin';

describe('Busca de produtos - Loja da Construção', () => {

  beforeEach(() => {
    // Adiciona uma label de recurso (feature) para organização no Allure
    cy.allure().label('feature', 'Busca por produtos');

    // Define a severidade do teste (pode ser: blocker, critical, normal, minor, trivial)
    cy.allure().severity('critical');

    // Step visível no relatório indicando a navegação inicial
    cy.allure().step('Acessa o site da Loja da Construção');

    cy.visit('https://www.lojaconstrucao.com.br');
  });

  it('Deve falhar ao buscar por cimento (sem sugestões)', () => {
    // Adiciona parâmetro visível no relatório para esse cenário
    cy.allure().parameter('Produto buscado', 'cimento');

    // Step: digitação no campo de busca
    cy.allure().step('Digita "cimento" no campo de busca');
    cy.get('.col-md-12 > .search-element > .d-flex > input', { timeout: 10000 })
      .type('cimento');

    // Step: validação de sugestões
    cy.allure().step('Valida se aparecem sugestões contendo "cimento"');
    cy.get('.search-item', { timeout: 10000 })
      .should('contain.text', 'cimento')
      .and('have.length.greaterThan', 0); // Esse teste provavelmente falha (como esperado)
  });

  it('Deve buscar por cimento e validar produto Tocantins no DOM', () => {
    cy.allure().parameter('Produto esperado', 'Cimento Tocantins TODAS AS OBRAS 25Kg');

    // Step: digitação no campo de busca
    cy.allure().step('Digita "cimento" no campo de busca');
    cy.get('.col-md-12 > .search-element > .d-flex > input', { timeout: 10000 })
      .type('cimento');

    // Step: validação do produto específico no resultado
    cy.allure().step('Valida se o produto "Cimento Tocantins TODAS AS OBRAS 25Kg" aparece');
    cy.get('h2', { timeout: 10000 })
      .contains('Cimento Tocantins TODAS AS OBRAS 25Kg')
      .should('exist');
  });
});
