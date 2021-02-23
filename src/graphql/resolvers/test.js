import { ApolloError } from 'apollo-server-express'

import { testPaginatorLabels } from '../../helpers'
import { NewTestRules } from '../../validators'

export default {
	Query: {
		/**
		 * @DESC to Get all Tests
		 * @Access Public
		 */
		allTests: async (_, {}, { Test }) => {
			let res = await Test.find().populate('author').populate('athlete')
			return res
		},

		/**
		 * @DESC to Get single Test by ID
		 * @Access Public
		 */
		getTestById: async (_, { id }, { Test }) => {
			try {
				let res = await Test.findById(id)
				if (!res) {
					throw new ApolloError("Test not found")
				}
				await res.populate('author').populate('athlete').execPopulate()
				return res
			} catch (err) {
				throw new ApolloError(err.message, 404)
			}
		},

		/**
		 * @DESC to Get Tests by Pagination variables
		 * @Access Public
		 */
		getTestsWithPagination: async (_, { page, limit }, { Test }) => {
			const options = {
				page: page || 1,
				limit: limit || 10,
				populate: ['author', 'athlete'],
				sort: { date: -1 },
				customLabels: testPaginatorLabels
			}
			let res = await Test.paginate({}, options)
			return res
		},

		/**
		 * @DESC to Get My Tests by Pagination variables
		 * @Access Public
		 */
		getMyTestsWithPagination: async (_, { page, limit }, { Test, user }) => {
			const options = {
				page: page || 1,
				limit: limit || 10,
				populate: ['author', 'athlete'],
				sort: { date: -1 },
				customLabels: testPaginatorLabels
			}
			let res = await Test.paginate({ author: user._id.toString() }, options)
			return res
		}
	},

	Mutation: {
		/**
		 * @DESC to Create new Test
		 * @Params newTest{ type!, info!, image }
		 * @Access Private
		 */
		createTest: async (_, { newTest }, { Test, user }) => {
			await NewTestRules.validate(newTest, { abortEarly: false })
			let res = await Test.create({ ...newTest, author: user._id })
			await res.populate('author').execPopulate()
			return res
		},

		/**
		 * @DESC to Update an Existing Test by ID
		 * @Params updatedTest { type!, info!, image }
		 * @Access Private
		 */
		updateTest: async (_, { id, updatedTest }, { Test, user }) => {
			try {
				await NewTestRules.validate(updatedTest, { abortEarly: false })
				let res = await Test.findOneAndUpdate({ _id: id, author: user.id.toString() }, { ...updatedTest }, { new: true })
				if (!res) {
					throw new ApolloError("Unauthorized Request")
				}
				return res
			} catch (err) {
				throw new ApolloError(err.message, 401)
			}
		},

		/**
		 * @DESC to Delete an Existing Test by ID
		 * @Params id!
		 * @Access Private
		 */
		deleteTest: async (_, { id }, { Test, user }) => {
			try {
				let res = await Test.findOneAndDelete({ _id: id, author: user.id.toString() })
				if (!res) {
					throw new ApolloError("Unauthorized Request")
				}
				return { success: true, id: res.id, message: "Test DELETED!" }
			} catch (err) {
				throw new ApolloError(err.message, 401)
			}
		}
	}
}