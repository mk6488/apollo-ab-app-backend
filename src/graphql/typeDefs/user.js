import { gql } from 'apollo-server-express'

export default gql `
  extend type Query {
    authUser: User! @isAuth
    loginUser(username: String!, password: String!): AuthResp!
    allUsers: [User!]!
    getUsersWithPagination(page: Int, limit: Int): UserPaginator!
    getUserById(id: ID!): User!
  }

  extend type Mutation {
    registerUser(newUser: UserInput!): AuthResp!
  }

  input UserInput {
    firstName: String!
    lastName: String!
    username: String!
    email: String!
    password: String!
    avatarImage: String
  }

  input UpdateUserInput {
    firstName: String!
    lastName: String!
    username: String!
    email: String!
    group: String
    avatarImage: String
  }

  type User {
    id: ID!
    firstName: String!
    lastName: String!
    username: String!
    email: String!
    group: String
    avatarImage: String
  }

  type UserPaginator {
    users: [User!]!
    paginator: Paginator!
  }

  type AuthResp {
    user: User!
    token: String!
  }
`