describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
})

  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })


  it('preenche os campos obrigatórios e envia o formulário', () => {
    const LongText = Cypress._.repeat('Teste, teste, teste! ', 20)
    cy.get('#firstName').type('Matheus')
    cy.get('#lastName').type('Ywata')
    cy.get('#email').type('matheus_ywata@hotmail.com')
    cy.get('#phone').type('61981223916')
    cy.get('#product').select('Mentoria')
    cy.get('#open-text-area').type(LongText)
    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')
  })  

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type('Matheus')
    cy.get('#lastName').type('Ywata')
    cy.get('#email').type('matheus_ywata@hotmail,com')
    cy.get('#phone').type('61981223916')
    cy.get('#product').select('Mentoria')
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })  

  it('campo telefone continua vazio quando preenchido com valor não numérico', () => {
    cy.get('#phone')
      .type('abcdefghij')
      .should('have.value', '')  
  })  

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('Matheus')
    cy.get('#lastName').type('Ywata')
    cy.get('#email').type('matheus_ywata@hotmail.com')
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
    })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
      .type('Matheus')
      .should('have.value', 'Matheus')
      .clear()
      .should('have.value', '')
    cy.get('#lastName')
      .type('Ywata')
      .should('have.value', 'Ywata')
      .clear()
      .should('have.value', '')
    cy.get('#email')
      .type('matheus_ywata@hotmail.com')
      .should('have.value', 'matheus_ywata@hotmail.com')
      .clear()
      .should('have.value', '')
    cy.get('#phone')
      .type('61981223916')
      .should('have.value', '61981223916')
      .clear()
      .should('have.value', '')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
     cy.contains('button', 'Enviar').click()

     cy.get('.error').should('be.visible')
  })

  it('envia o formuário com sucesso usando um comando customizado', () => {
    const data = {
      firstName: 'Renan',
      lastName: 'Silva',
      email: 'renan@hotmail.com',
      phone: '77999999999',
      textArea: 'Teste customizado'
    }

     cy.fillMandatoryFieldsAndSubmit(data)
    
     cy.get('.success').should('be.visible') 
    
  })

  it('seleciona um producto pelo seu índice', () => {

    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
  })

  it('seleciona um produto pelo seu texto', () => {
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
  })

  it('seleciona um produto pelo seu valor', () => {
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
  })

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"]')
      .check('feedback')
      .should('be.checked')
  })

  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
      .each(typeofservice => {
        cy.wrap(typeofservice)
          .check()
          .should('be.checked')
      })
  })    

  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      // .first()
      .last()
      .uncheck()
      .should('not.be.checked')
  })

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })
  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('sampleFile')     
    cy.get('#file-upload')
      .selectFile('@sampleFile')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('Verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.contains('a', 'Política de Privacidade')
    .should('have.attr', 'href', 'privacy.html')
    .and('have.attr', 'target', '_blank')
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.contains('a', 'Política de Privacidade')
      .invoke('removeAttr', 'target')
      .click()

    cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')
  })
})
