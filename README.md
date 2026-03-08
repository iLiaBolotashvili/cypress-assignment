# Cypress API Testing Assignment

## Setup

``` bash
git clone https://github.com/iLiaBolotashvili/cypress-assignment.git
cd cypress-assignment
npm install
npm run test
```

ეს გაუშვებს:

WireMock Docker კონტეინერს, API ტესტებს და test-results.db დაგენერირდება.

*------------------------------------------------------------------------*

## ტესტ კლასები

POM - api, steps, e2e

პროექტში არის ორი ტესტ კლასი, ნაჩვენებია **ორი
განსხვავებული ტესტირების მიდგომა**.

### 1️⃣ `userFilterTests.cy.js`

ამ კლასში არის **სტანდარტული ტესტები**, სადაც თითოეული სცენარი ცალკე `it`
ბლოკშია.

*------------------------------------------------------------------------*

### 2️⃣ `usersFilterTestsDataDriven.cy.js`

ამ კლასში არის **data‑driven ტესტები**.

ტესტები იქმნება **userFilterCases ერეიდან**.