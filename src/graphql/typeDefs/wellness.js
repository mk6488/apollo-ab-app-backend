import { gql } from 'apollo-server-express'

export default gql `
  extend type Query {
    allWellness: [Wellness!]!
    getWellnessWithPagination(page: Int, limit: Int): WellnessPaginator!
    getMyWellnessWithPagination(page: Int, limit: Int): WellnessPaginator! @isAuth
    getWellnessById(id: ID!): Wellness!
  }

  extend type Mutation {
    createWellness(newWellness: WellnessInput!, athleteId: ID!): Wellness! @isAuth
    updateWellness(updatedWellness: WellnessInput!, id: ID!, athleteId: ID!): Wellness! @isAuth
    deleteWellness(id: ID!): WellnessNotification! @isAuth
  }

  input  WellnessInput {
    date: String!
    weekNumber: Int!
    sleep: Int!
    stress: Int!
    fatigue: Int!
    nutrition: Int!
    average: Float!
  }

  type Wellness {
    id: ID
    type: String!
    info: String!
    image: String
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