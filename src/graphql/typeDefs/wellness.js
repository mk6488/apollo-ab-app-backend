import { gql } from 'apollo-server-express'

export default gql `
  extend type Query {
    allWellness: [Wellness!]!
    allWellnessForAthlete(id: ID!): [Wellness!]!
    getWellnessWithPagination(page: Int, limit: Int): WellnessPaginator!
    getMyWellnessWithPagination(page: Int, limit: Int): WellnessPaginator! @isAuth
    getWellnessById(id: ID!): Wellness!
  }

  extend type Mutation {
    createWellness(newWellness: WellnessInput!): Wellness! @isAuth
    updateWellness(updatedWellness: WellnessInput!, id: ID!): Wellness! @isAuth
    deleteWellness(id: ID!): WellnessNotification! @isAuth
  }

  input  WellnessInput {
    date: String!
    weekNumber: Int!
    sleep: Int!
    stress: Int!
    fatigue: Int!
    soreness: Int!
    nutrition: Int!
    average: Float!
    athlete: ID!
  }

  type Wellness {
    id: ID!
    date: String!
    weekNumber: Int!
    sleep: Int!
    stress: Int!
    fatigue: Int!
    soreness: Int!
    nutrition: Int!
    average: Float!
    createdAt: String
    updatedAt: String
    athlete: Athlete!
    author: User!
  }

  type WellnessPaginator {
    wellness: [Wellness!]!
    paginator: Paginator!
  }

  type WellnessNotification {
    id: ID!
    message: String!
    success: Boolean!
  }
`