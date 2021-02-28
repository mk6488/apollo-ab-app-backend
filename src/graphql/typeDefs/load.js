import { gql } from 'apollo-server-express'

export default gql `
  extend type Query {
    allLoads: [Load!]!
    allLoadsForAthlete(id: ID!): [Load!]!
    getLoadsWithPagination(page: Int, limit: Int): LoadPaginator!
    getMyLoadsWithPagination(page: Int, limit: Int): LoadPaginator! @isAuth
    getLoadById(id: ID!): Load!
  }

  extend type Mutation {
    createLoad(newLoad: LoadInput!): Load! @isAuth
    updateLoad(updatedLoad: LoadInput!, id: ID!): Load! @isAuth
    deleteLoad(id: ID!): LoadNotification! @isAuth
  }

  input  LoadInput {
    date: String!
    weekNumber: Int!
    type: String!
    duration: Int!
    rpe: Int!
    load: Int!
    athlete: ID!
  }

  type Load {
    id: ID!
    date: String!
    weekNumber: Int!
    type: String!
    duration: Int!
    rpe: Int!
    load: Int!
    createdAt: String!
    updatedAt: String!
    athlete: Athlete!
    author: User!
  }

  type LoadPaginator {
    loads: [Load!]!
    paginator: Paginator!
  }

  type LoadNotification {
    id: ID!
    message: String!
    success: Boolean!
  }
`