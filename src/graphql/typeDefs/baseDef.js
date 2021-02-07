import { gql } from 'apollo-server-express'

export default gql `
  directive @isAuth on FIELD_DEFINITION
  
  type Query {
    _: String!
  }

  type Mutation {
    _: String!
  }

  type Subscription {
    _: String!
  }

  type Paginator {
    count: Int!
    perPage: Int!
    pageCount: Int!
    currentPage: Int!
    slNo: Int!
    hasPrevPage: Boolean!
    hasNextPage: Boolean!
    prev: Int
    next: Int
  }
`