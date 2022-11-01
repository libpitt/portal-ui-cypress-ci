// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
import {PATHS, WAIT} from "../config/constants";
import {AUTH} from "../config/auth";

Cypress.Commands.add('login', (name = 'pitt', options = { }) => {
    cy.session(name, () => {
        cy.visit(PATHS.search)
        cy.contains('Sign-in').click()
        cy.contains('Log in with your institution credentials').click()
        cy.origin('auth.globus.org',  { args: { AUTH } }, ({ AUTH }) => {
            // Use Globus
            cy.contains('Globus ID to sign in').click()
        })

        cy.origin('www.globusid.org', { args: { AUTH } }, ({ AUTH })  => {
            cy.get('input[name="username"]').type(AUTH.user)
            cy.get('input[name="password"]').type(AUTH.password)
            cy.get('button[type="submit"]').click()
        })

        cy.contains('Sign-out')
    })
})

Cypress.Commands.add('facets', (name = 'Sample', legend = 'Sample Category', index = 2) => {
    cy.wait(WAIT.time)
    cy.get(`#example_facet_undefined${name}`).parent().click()
    if (legend && legend.length) {
        cy.get('legend').eq(index).should('have.text', legend)
    }
})

Cypress.Commands.add('entityCreateForm', (entity = 'Source', index = 0) => {
    cy.get('#basic-nav-dropdown').click()
    cy.get('.dropdown .dropdown-menu a').eq(index).click()
    cy.url().should('contain', `/edit/${entity.toLowerCase()}?uuid=create`)
})

Cypress.Commands.add('copyVal', (delimiter = 'SenNet ID:', key = 'cypress.sennet_id', sel = '.modal-body p') => {
    cy.get(sel).should(($el) => {
        const txt = $el.text()
        //expect(text).to.match(/foo/)
        const id = txt.split(delimiter)[1].trim()
        localStorage.setItem(key, id)
        return id
    })
})

Cypress.Commands.add('checkHipaa', () => {
    cy.get('.hipaa-alert').should('have.length', 1)
})


//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })