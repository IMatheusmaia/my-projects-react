/// <reference types="cypress" />


describe('2 - Crie todos os elementos que devem respeitar os atributos descritos no protótipo para a tela de login', () => {
  it('Tem os data-testids email-input, password-input e login-submit-btn', () => {
    cy.visit('http://localhost:3000/');

    cy.get('[data-testid="email-input"]');
    cy.get('[data-testid="password-input"]');
    cy.get('[data-testid="login-submit-btn"]');
  });
});

describe('3 - Desenvolva a tela de maneira que a pessoa consiga escrever seu email no input de email e sua senha no input de senha', () => {
  it('É possível escrever o email e a senha', () => {
    cy.visit('http://localhost:3000/');

    cy.get('[data-testid="email-input"]').type('email@mail.com');
    cy.get('[data-testid="email-input"]').should('have.value', 'email@mail.com');
    
    cy.get('[data-testid="password-input"]').type('1234567');
    cy.get('[data-testid="password-input"]').should('have.value', '1234567');
  });
});

describe('4 - Desenvolva a tela de maneira que o formulário só seja válido após um email válido e uma senha de mais de 6 caracteres serem preenchidos', () => {
  it('O botão deve estar desativado se o email for inválido', () => {
    cy.visit('http://localhost:3000/');

    cy.get('[data-testid="login-submit-btn"]').should('be.disabled');

    cy.get('[data-testid="email-input"]').type('email@mail');
    cy.get('[data-testid="password-input"]').type('1234567');

    cy.get('[data-testid="login-submit-btn"]').should('be.disabled');

    cy.get('[data-testid="email-input"]').clear().type('email.com');

    cy.get('[data-testid="login-submit-btn"]').should('be.disabled');
  });

  it('O botão deve estar desativado se a senha deve tiver 6 caracteres ou menos', () => {
    cy.visit('http://localhost:3000/');

    cy.get('[data-testid="login-submit-btn"]').should('be.disabled');

    cy.get('[data-testid="email-input"]').type('email@mail.com');
    cy.get('[data-testid="password-input"]').type('123456');

    cy.get('[data-testid="login-submit-btn"]').should('be.disabled');
  });

  it('O botão deve estar ativado se o email e a senha forem válidos', () => {
    cy.visit('http://localhost:3000/');

    cy.get('[data-testid="login-submit-btn"]').should('be.disabled');

    cy.get('[data-testid="email-input"]').type('email@mail.com');
    cy.get('[data-testid="password-input"]').type('1234567');

    cy.get('[data-testid="login-submit-btn"]').should('not.be.disabled');
  });

  it('Verifica a cobertura de 45% da tela de Login', () => {
    cy.getCoverage().its('Login.functions.pct', { timeout: 0 }).should('be.gte', 45.00);
    cy.getCoverage().its('Login.branches.pct', { timeout: 0 }).should('be.gte', 45.00);
  });
  
});

describe('5 - Após a submissão do formulário, salve no localStorage o e-mail da pessoa usuária na chave `user`', () => {
  it('Após o login, os dados devem estar salvos no localStorage', () => {
    cy.visit('http://localhost:3000/', {
      onBeforeLoad(win) {
        win.localStorage.clear();
      },
    });

    cy.get('[data-testid="login-submit-btn"]').should('be.disabled');


    cy.get('[data-testid="email-input"]').type('email@mail.com');
    cy.get('[data-testid="password-input"]').type('1234567');
    cy.get('[data-testid="login-submit-btn"]').click();

    cy.window().then((win) => {
      expect(JSON.parse(win.localStorage.getItem('user'))).to.deep.eq({ email: 'email@mail.com' });
      win.localStorage.clear();
    });
  });
});


describe('6 - Redirecione a pessoa usuária para a tela principal de receitas de comidas após a submissão e validação com sucesso do login', () => {
  it('A rota muda para a tela principal de receitas de comidas', () => {
    cy.visit('http://localhost:3000/', {
      onBeforeLoad(win) {
        win.localStorage.clear();
      },
    });

    cy.get('[data-testid="login-submit-btn"]').should('be.disabled');
    cy.window().then((win) => {
      expect(win.localStorage.getItem('user')).to.be.null;
    });


    cy.get('[data-testid="email-input"]').type('email@mail.com');
    cy.get('[data-testid="password-input"]').type('1234567');
    cy.get('[data-testid="login-submit-btn"]').click();

    cy.location().should((loc) => expect(loc.pathname).to.eq('/meals'));

    cy.window().then((win) => {
      win.localStorage.clear();
    });
  });

  it('Verifica a cobertura de 90% da tela de Login', () => {
    cy.getCoverage().its('Login.functions.pct', { timeout: 0 }).should('be.gte', 90.00);
    cy.getCoverage().its('Login.branches.pct', { timeout: 0 }).should('be.gte', 90.00);
  });
});
