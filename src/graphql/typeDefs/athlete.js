import { gql } from 'apollo-server-express'

export default gql `
  extend type Query {
    allAthletes: [Athlete!]!
    allActiveAthletes: [Athlete!]!
    getAthletesWithPagination(page: Int, limit: Int): AthletePaginator!
    getMyAthletesWithPagination(page: Int, limit: Int): AthletePaginator! @isAuth
    getAthleteById(id: ID!): Athlete!
  }

  extend type Mutation {
    createAthlete(newAthlete: AthleteInput!): Athlete! @isAuth
    updateAthlete(updatedAthlete: AthleteInput!, id: ID!): Athlete! @isAuth
    deleteAthlete(id: ID!): AthleteNotification! @isAuth
  }

  input  AthleteInput {
    firstName: String!
    lastName: String!
    squad: String!
    weight: Float
    current: Boolean!
    doe: String
    dob: String
  }

  type Athlete {
    id: ID
    firstName: String!
    lastName: String!
    squad: String!
    weight: Float
    current: Boolean!
    doe: String
    dob: String
    createdAt: String
    updatedAt: String
    author: User!
  }

  type AthletePaginator {
    athletes: [Athlete!]!
    paginator: Paginator!
  }

  type AthleteNotification {
    id: ID!
    message: String!
    success: Boolean!
  }
`