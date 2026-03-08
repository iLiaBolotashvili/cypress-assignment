const UsersSteps = require("../steps/UsersSteps")
const testCases = require("../test-data/userFilterCases")

describe("Users API Filtering — Data Driven", () => {

  before(() => {
    cy.task("buildWiremockStubs")
  })

  testCases.forEach(({ name, filters, expectedStatus, expectedEmpty }) => {

    it(`should ${name}`, () => {

      new UsersSteps()
        .withFilters(filters)
        .requestUsers()
        .shouldReturnStatus(expectedStatus)
        .shouldMatchExpectedResult({ filters, expectedEmpty })

    })

  })

})