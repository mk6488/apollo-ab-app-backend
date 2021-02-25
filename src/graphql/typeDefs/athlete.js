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
    toggleCurrent(current: Boolean!, id: ID!): Session! @isAuth
    deleteAthlete(id: ID!): AthleteNotification! @isAuth
  }

  input  AthleteInput {
    firstName: String!
    lastName: String!
    gender: String!
    squad: String!
    weight: Float
    current: Boolean!
    doe: String
    dob: String
    avatar: String
  }

  type Athlete {
    id: ID
    firstName: String!
    lastName: String!
    gender: String!
    squad: String!
    weight: Float
    current: Boolean!
    doe: String
    dob: String
    avatar: String
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