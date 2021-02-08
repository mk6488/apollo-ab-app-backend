import { ApolloError } from 'apollo-server-express'

import { sessionPaginatorLabels } from '../../helpers'
import { NewSessionRules } from '../../validators'

export default {
	Query: {
		/**
		 * @DESC to Get all Sessions
		 * @Access Public
		 */
		allSessions: async (_, {}, { Session }) => {
			let res = await Session.find().populate('author')
			return res
		},

		/**
		 * @DESC to Get single Session by ID
		 * @Access Public
		 */
		getSessionById: async (_, { id }, { Session }) => {
			try {
				let res = await Session.findById(id)
				if (!res) {
					throw new ApolloError("Session not found")
				}
				await res.populate('author').execPopulate()
				return res
			} catch (err) {
				throw new ApolloError(err.message, 404)
			}
		},

		/**
		 * @DESC to Get Sessions by Pagination variables
		 * @Access Public
		 */
		getSessionsWithPagination: async (_, { page, limit }, { Session }) => {
			const options = {
				page: page || 1,
				limit: limit || 10,
				populate: 'author',
				sort: { date: -1 },
				customLabels: sessionPaginatorLabels
			}
			let res = await Session.paginate({}, options)
			return res
		},

		/**
		 * @DESC to Get My Sessions by Pagination variables
		 * @Access Public
		 */
		getMySessionsWithPagination: async (_, { page, limit }, { Session, user }) => {
			const options = {
				page: page || 1,
				limit: limit || 10,
				populate: 'author',
				sort: { date: -1 },
				customLabels: sessionPaginatorLabels
			}
			let res = await Session.paginate({ author: user._id.toString() }, options)
			return res
		}
	},

	Mutation: {
		/**
		 * @DESC to Create new Session
		 * @Params newSession{ type!, info!, image }
		 * @Access Private
		 */
		createSession: async (_, { newSession }, { Session, user }) => {
			await NewSessionRules.validate(newSession, { abortEarly: false })
			let res = await Session.create({ ...newSession, author: user._id })
			await res.populate('author').execPopulate()
			return res
		},

		/**
		 * @DESC to Update an Existing Session by ID
		 * @Params updatedSession { type!, info!, image }
		 * @Access Private
		 */
		updateSession: async (_, { id, updatedSession }, { Session, user }) => {
			try {
				await NewSessionRules.validate(updatedSession, { abortEarly: false })
				let res = await Session.findOneAndUpdate({ _id: id, author: user.id.toString() }, { ...updatedSession }, { new: true })
				if (!res) {
					throw new ApolloError("Unauthorized Request")
				}
				return res
			} catch (err) {
				throw new ApolloError(err.message, 401)
			}
		},

		/**
		 * @DESC to Delete an Existing Session by ID
		 * @Params id!
		 * @Access Private
		 */
		deleteSession: async (_, { id }, { Session, user }) => {
			try {
				let res = await Session.findOneAndDelete({ _id: id, author: user.id.toString() })
				if (!res) {
					throw new ApolloError("Unauthorized Request")
				}
				return { success: true, id: res.id, message: "Session DELETED!" }
			} catch (err) {
				throw new ApolloError(err.message, 401)
			}
		}
	}
}