Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (data  = {
    firstName: 'Ronaldo',
    lastName: 'Silva',
    email: 'ronaldo@teste.com',
    phone: '11999999999',
    textArea: 'Teste'
}) => {
    cy.get('#firstName').type(data.firstName)
    cy.get('#lastName').type(data.lastName)
    cy.get('#email').type(data.email)
    cy.get('#phone').type(data.phone)
    cy.get('#open-text-area').type(data.textArea)
    cy.contains('button', 'Enviar').click()
})