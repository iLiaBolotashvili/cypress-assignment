const UsersSteps = require("../steps/UsersSteps")
const { AGE_30, MALE } = require("../constants/users")
const { HttpStatusCode } = require("axios")

describe("Users API Filtering", () => {

  let usersSteps

  before(() => {
    cy.task("buildWiremockStubs")
  })

  beforeEach(() => {
    usersSteps = new UsersSteps()
  })

  describe("Filtering", () => {

    it("should return users filtered by age", () => {

      usersSteps
        .withAge(AGE_30)
        .requestUsers()
        .shouldReturnStatus(HttpStatusCode.Ok)
        .shouldMatchExpectedResult({
          filters: { age: AGE_30 }
        })

    })

    it("should return users filtered by gender", () => {

      usersSteps
        .withGender(MALE)
        .requestUsers()
        .shouldReturnStatus(HttpStatusCode.Ok)
        .shouldMatchExpectedResult({
          filters: { gender: MALE }
        })

    })

    it("should return users filtered by age and gender", () => {

      usersSteps
        .withAge(AGE_30)
        .withGender(MALE)
        .requestUsers()
        .shouldReturnStatus(HttpStatusCode.Ok)
        .shouldMatchExpectedResult({
          filters: { age: AGE_30, gender: MALE }
        })

    })

  })

})