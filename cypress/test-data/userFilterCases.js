const { AGE_30, MALE } = require("../constants/users")
const { HttpStatusCode } = require("axios")

module.exports = [

  // positive cases
  {
    name: "filter users by age",
    filters: { age: AGE_30 },
    expectedStatus: HttpStatusCode.Ok
  },

  {
    name: "filter users by gender",
    filters: { gender: MALE },
    expectedStatus: HttpStatusCode.Ok
  },

  {
    name: "filter users by age and gender",
    filters: { age: AGE_30, gender: MALE },
    expectedStatus: HttpStatusCode.Ok
  },

  // negative cases
  {
    name: "invalid age type",
    filters: { age: "abc" },
    expectedStatus: HttpStatusCode.BadRequest
  },

  {
    name: "invalid gender value",
    filters: { gender: "robot" },
    expectedStatus: HttpStatusCode.BadRequest
  },

  {
    name: "filters returning empty result",
    filters: { age: 150 },
    expectedStatus: HttpStatusCode.Ok,
    expectedEmpty: true
  }

]