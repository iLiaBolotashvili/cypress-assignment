class User {

  constructor(data) {
    this.customerId = data.customerId
    this.firstName = data.firstName
    this.lastName = data.lastName
    this.personalNumber = data.personalNumber
    this.email = data.email
    this.phoneNumber = data.phoneNumber
    this.age = data.age
    this.gender = data.gender
    this.country = data.country
    this.city = data.city
    this.segment = data.segment
    this.status = data.status
    this.registeredAt = data.registeredAt
  }

}

module.exports = User