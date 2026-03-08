const { defineConfig } = require("cypress")
const wiremock = require("./cypress/wiremock/wiremockBuilder")
const resultsRepo = require("./cypress/db/resultsRepo")

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:8080",

    setupNodeEvents(on, config) {

      on("task", {

        async buildWiremockStubs() {
          await wiremock.build()
          return null
        },

        saveTestResult(result) {
          resultsRepo.saveTestResult(result)
          return null
        }

      })

    }

  }
})