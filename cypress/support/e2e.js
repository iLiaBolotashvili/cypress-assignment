afterEach(function () {

  const test = this.currentTest

  const result = {
    testName: test.fullTitle(),
    status: test.state,
    duration: test.duration
  }

  cy.task("saveTestResult", result)

})