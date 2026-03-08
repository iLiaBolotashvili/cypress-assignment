const { HttpStatusCode } = require("axios")
const UsersApi = require("../api/UsersApi")

class UsersSteps {

  constructor() {
    this.api = new UsersApi()
    this.filters = {}
  }

  withFilters(filters = {}) {
    this.filters = filters
    return this
  }

  withAge(age) {
    this.filters.age = age
    return this
  }

  withGender(gender) {
    this.filters.gender = gender
    return this
  }

  requestUsers() {

    this.api
      .getUsers(this.filters)
      .as("response")

    return this
  }

  shouldReturnStatus(expectedStatus) {

    cy.get("@response")
      .its("status")
      .should("eq", expectedStatus)

    return this
  }

  shouldMatchExpectedResult({ filters = this.filters, expectedEmpty = false } = {}) {

    cy.get("@response").then(response => {

      if (!this.#isSuccess(response)) return

      if (expectedEmpty) {
        this.#assertEmpty(response)
        return
      }

      this.#assertArray(response)
      this.#assertFilters(response.body, filters)

    })

    return this
  }

  #isSuccess(response) {
    return response.status === HttpStatusCode.Ok
  }

  #assertEmpty(response) {
    expect(response.body).to.be.an("array").that.is.empty
  }

  #assertArray(response) {
    expect(response.body).to.be.an("array")
  }

  #assertFilters(users, filters) {

    users.forEach(user => {

      if (filters.age !== undefined) {
        this.#assertAge(user, filters.age)
      }

      if (filters.gender !== undefined) {
        this.#assertGender(user, filters.gender)
      }

    })

  }

  #assertAge(user, expectedAge) {
    expect(user.age).to.eq(expectedAge)
  }

  #assertGender(user, expectedGender) {
    expect(user.gender).to.eq(expectedGender)
  }

}

module.exports = UsersSteps