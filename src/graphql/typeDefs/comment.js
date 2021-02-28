import { gql } from 'apollo-server-express'

export default gql `
  extend type Query {
    allComments: [Comment!]!
    allCommentsForAthlete(id: ID!): [Comment!]!
    getCommentsWithPagination(page: Int, limit: Int): CommentPaginator!
    getMyCommentsWithPagination(page: Int, limit: Int): CommentPaginator! @isAuth
    getCommentById(id: ID!): Comment!
  }

  extend type Mutation {
    createComment(newComment: CommentInput!): Comment! @isAuth
    updateComment(updatedComment: CommentInput!, id: ID!): Comment! @isAuth
    deleteComment(id: ID!): CommentNotification! @isAuth
  }

  input  CommentInput {
    date: String!
    weekNumber: Int!
    type: String!
    comment: String!
    athlete: ID!
  }

  type Comment {
    id: ID
    date: String!
    weekNumber: Int!
    type: String!
    comment: String!
    createdAt: String
    updatedAt: String
    athlete: Athlete!
    author: User!
  }

  type CommentPaginator {
    comments: [Comment!]!
    paginator: Paginator!
  }

  type CommentNotification {
    id: ID!
    message: String!
    success: Boolean!
  }
`