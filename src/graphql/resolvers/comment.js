import { ApolloError } from 'apollo-server-express'

import { commentPaginatorLabels } from '../../helpers'
import { NewCommentRules } from '../../validators'

export default {
	Query: {
		/**
		 * @DESC to Get all Comments
		 * @Access Public
		 */
		allComments: async (_, {}, { Comment }) => {
			let res = await Comment.find().populate('author').populate('athlete')
			return res
		},

		/**
		 * @DESC to Get single Comment by ID
		 * @Access Public
		 */
		getCommentById: async (_, { id }, { Comment }) => {
			try {
				let res = await Comment.findById(id)
				if (!res) {
					throw new ApolloError("Comment not found")
				}
				await res.populate('author').populate('athlete').execPopulate()
				return res
			} catch (err) {
				throw new ApolloError(err.message, 404)
			}
		},

		/**
		 * @DESC to Get Comments by Pagination variables
		 * @Access Public
		 */
		getCommentsWithPagination: async (_, { page, limit }, { Comment }) => {
			const options = {
				page: page || 1,
				limit: limit || 10,
				populate: ['author', 'athlete'],
				sort: { date: -1 },
				customLabels: commentPaginatorLabels
			}
			let res = await Comment.paginate({}, options)
			return res
		},

		/**
		 * @DESC to Get My Comments by Pagination variables
		 * @Access Public
		 */
		getMyCommentsWithPagination: async (_, { page, limit }, { Comment, user }) => {
			const options = {
				page: page || 1,
				limit: limit || 10,
				populate: ['author', 'athlete'],
				sort: { date: -1 },
				customLabels: commentPaginatorLabels
			}
			let res = await Comment.paginate({ author: user._id.toString() }, options)
			return res
		}
	},

	Mutation: {
		/**
		 * @DESC to Create new Comment
		 * @Params newComment{ type!, info!, image }
		 * @Access Private
		 */
		createComment: async (_, { newComment }, { Comment, user }) => {
			await NewCommentRules.validate(newComment, { abortEarly: false })
			let res = await Comment.create({ ...newComment, author: user._id })
			await res.populate('author').execPopulate()
			return res
		},

		/**
		 * @DESC to Update an Existing Comment by ID
		 * @Params updatedComment { type!, info!, image }
		 * @Access Private
		 */
		updateComment: async (_, { id, updatedComment }, { Comment, user }) => {
			try {
				await NewCommentRules.validate(updatedComment, { abortEarly: false })
				let res = await Comment.findOneAndUpdate({ _id: id, author: user.id.toString() }, { ...updatedComment }, { new: true })
				if (!res) {
					throw new ApolloError("Unauthorized Request")
				}
				return res
			} catch (err) {
				throw new ApolloError(err.message, 401)
			}
		},

		/**
		 * @DESC to Delete an Existing Comment by ID
		 * @Params id!
		 * @Access Private
		 */
		deleteComment: async (_, { id }, { Comment, user }) => {
			try {
				let res = await Comment.findOneAndDelete({ _id: id, author: user.id.toString() })
				if (!res) {
					throw new ApolloError("Unauthorized Request")
				}
				return { success: true, id: res.id, message: "Comment DELETED!" }
			} catch (err) {
				throw new ApolloError(err.message, 401)
			}
		}
	}
}