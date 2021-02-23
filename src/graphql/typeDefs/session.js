import { gql } from 'apollo-server-express'

export default gql `
  extend type Query {
    allSessions: [Session!]!
    getSessionsWithPagination(page: Int, limit: Int): SessionPaginator!
    getMySessionsWithPagination(page: Int, limit: Int): SessionPaginator! @isAuth
    getSessionById(id: ID!): Session!
  }

  extend type Mutation {
    createSession(newSession: SessionInput!): Session! @isAuth
    updateSession(updatedSession: SessionInput!, id: ID!): Session! @isAuth
    deleteSession(id: ID!): SessionNotification! @isAuth
  }

  input  SessionInput {
    date: String!
    weekNumber: Int!
    type: String!
    info: String!
    image: String
  }

  type Session {
    id: ID
    date: String!
    weekNumber: Int!
    type: String!
    info: String!
    image: String
    createdAt: String!
    updatedAt: String!
    author: User!
  }

  type SessionPaginator {
    sessions: [Session!]!
    paginator: Paginator!
  }

  type SessionNotification {
    id: ID!
    message: String!
    success: Boolean!
  }
`