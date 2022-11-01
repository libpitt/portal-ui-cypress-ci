import {MSGS, PATHS, WAIT} from "../../config/constants";

describe(`${MSGS.name}.${MSGS.search}.Facets.Sample`, () => {
    beforeEach(() => {
        cy.login()
        cy.visit(PATHS.search)
    })

    context('When selecting “Sample”', () => {
        it('Displays Sample Category facet', () => {
            cy.facets()
        })

        it("Headers include: 'Created By', 'SenNet ID', 'Lab ID', 'Category', 'Group'", () => {
            cy.facets()
            const headers = ['Created By', 'SenNet ID', 'Lab ID', 'Category', 'Group']
            for (let i = 0; i < headers.length; i++) {
                cy.get('.results-header th').eq(i).should('have.text', headers[i])
            }
        })

        it('Displays Organ facet', () => {
            cy.facets()
            cy.wait(WAIT.time)
            //TODO: use className sui-facet__title--Organ
            cy.get('legend').eq(4).should('have.text', 'Organ')
        })

        it('Displays Large Intestine on click of + More under Organ (#136)', () => {
            cy.facets()
            cy.wait(WAIT.time)
            cy.get('.sui-facet-view-more').eq(1).click()
            //DATA: A data specific test, this will fail if no entries are available
            cy.get('[for="example_facet_undefinedkidney"] .sui-multi-checkbox-facet__input-text').eq(0).should('have.text', 'kidney')
        })
    })

    context('When 0 items are selecting OR more than 2 are selected', () => {

        it('Entity Type header should show in results table', () => {
            cy.facets()
            cy.facets('Dataset')
            cy.wait(1000)
            cy.get('.results-header th').eq(2).should('have.text', 'Entity Type')
        })

    })
})
