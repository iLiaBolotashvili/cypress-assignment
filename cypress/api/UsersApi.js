class UsersApi {

  getUsers(filters = {}) {

    return cy.request({
      method: "GET",
      url: "/users",
      qs: filters,
      failOnStatusCode: false
    })

  }

}

module.exports = UsersApi