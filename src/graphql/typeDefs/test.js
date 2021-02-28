import { gql } from 'apollo-server-express'

export default gql `
  extend type Query {
    allTests: [Test!]!
    allTestsForAthlete(id: ID!): [Test!]!
    getTestsWithPagination(page: Int, limit: Int): TestPaginator!
    getMyTestsWithPagination(page: Int, limit: Int): TestPaginator! @isAuth
    getTestById(id: ID!): Test!
  }

  extend type Mutation {
    createTest(newTest: TestInput!): Test! @isAuth
    updateTest(updatedTest: TestInput!, id: ID!): Test! @isAuth
    deleteTest(id: ID!): TestNotification! @isAuth
  }

  input  TestInput {
    date: String!
    weekNumber: Int!
    test: String!
    result: String!
    athlete: ID!
  }

  type Test {
    id: ID
    date: String!
    weekNumber: Int!
    test: String!
    result: String!
    createdAt: String
    updatedAt: String
    athlete: Athlete!
    author: User!
  }

  type TestPaginator {
    tests: [Test!]!
    paginator: Paginator!
  }

  type TestNotification {
    id: ID!
    message: String!
    success: Boolean!
  }
`