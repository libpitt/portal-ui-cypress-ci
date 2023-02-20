import {MSGS, PATHS, DATA} from "../../config/constants";

describe(`${MSGS.name}.${MSGS.provenance}.Page`, () => {

    beforeEach(() => {
        cy.login()
        cy.viewEntity('dataset', DATA.dataset.bulkRnaSeq.uuid)
    })

    context('Ensure provenance loads', () => {
        it('Displays nodes', () => {
            cy.get('.js-provenance .node').should('have.length.gte', 1)
        })
        it('Expand button loads modal with provenance', () => {
            cy.get('#Provenance .js-legend--Expand').eq(0).click()
            cy.get('.modal-full').should('have.length', 1)
            cy.get('.modal-full .modal-title').contains('Provenance')
            cy.get('.modal-full .js-provenance .node').should('have.length.gte', 1)
        })

    })

})