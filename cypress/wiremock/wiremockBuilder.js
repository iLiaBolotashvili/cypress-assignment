const axios = require("axios")
const fs = require("fs")
const path = require("path")

const WIREMOCK_ADMIN = "http://localhost:8080/__admin"

class WiremockBuilder {

  constructor() {
    this.users = this.loadUsers()
  }

  loadUsers() {
    const filePath = path.join(__dirname, "../fixtures/users.json")
    return JSON.parse(fs.readFileSync(filePath))
  }

  async reset() {
    await axios.post(`${WIREMOCK_ADMIN}/reset`)
  }

  async createStub({ request, body, status = 200 }) {

    await axios.post(`${WIREMOCK_ADMIN}/mappings`, {
      request,
      response: {
        status,
        headers: {
          "Content-Type": "application/json"
        },
        jsonBody: body
      }
    })

  }

  filterUsers(filters = {}) {
    return this.users.filter(user => {

      if (filters.age && user.age !== filters.age) return false
      if (filters.gender && user.gender !== filters.gender) return false

      return true

    })
  }

  async stubUsers(filters = {}) {

    const filteredUsers = this.filterUsers(filters)

    const queryParameters = {}

    if (filters.age) {
      queryParameters.age = { equalTo: String(filters.age) }
    }

    if (filters.gender) {
      queryParameters.gender = { equalTo: filters.gender }
    }

    const request = {
      method: "GET",
      urlPath: "/users"
    }

    if (Object.keys(queryParameters).length) {
      request.queryParameters = queryParameters
    }

    await this.createStub({
      request,
      body: filteredUsers
    })

  }

  async stubInvalidRequests() {

    // invalid age
    await this.createStub({
      request: {
        method: "GET",
        urlPath: "/users",
        queryParameters: {
          age: { equalTo: "abc" }
        }
      },
      body: { error: "Invalid age parameter" },
      status: 400
    })

    // invalid gender
    await this.createStub({
      request: {
        method: "GET",
        urlPath: "/users",
        queryParameters: {
          gender: { equalTo: "robot" }
        }
      },
      body: { error: "Invalid gender parameter" },
      status: 400
    })

  }

  async stubEmptyResults() {
    await this.createStub({
      request: {
        method: "GET",
        urlPath: "/users",
        queryParameters: {
          age: { equalTo: "150" }
        }
      },
      body: []
    })

  }

  async build() {

    await this.reset()

    const ages = [...new Set(this.users.map(u => u.age))]
    const genders = [...new Set(this.users.map(u => u.gender))]

    await this.stubUsers()

    for (const age of ages) {
      await this.stubUsers({ age })
    }

    for (const gender of genders) {
      await this.stubUsers({ gender })
    }

    for (const age of ages) {
      for (const gender of genders) {
        await this.stubUsers({ age, gender })
      }
    }

    // negative cases
    await this.stubInvalidRequests()
    await this.stubEmptyResults()

  }

}

module.exports = new WiremockBuilder()