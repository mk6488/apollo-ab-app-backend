import { ApolloError } from 'apollo-server-express'

import { loadPaginatorLabels } from '../../helpers'
import { NewLoadRules } from '../../validators'

export default {
	Query: {
		/**
		 * @DESC to Get all Loads
		 * @Access Public
		 */
		allLoads: async (_, {}, { Load }) => {
			let res = await Load.find().populate('author').populate('athlete')
			return res
		},

		/**
		 * @DESC to Get all Loads for an Athlete
		 * @Access Public
		 */
		allLoadsForAthlete: async (_, { id }, { Load }) => {
			try {
				let res = await Load.find({ athlete: id })
				if (!res) {
					throw new ApolloError("No Loads found for this Athlete")
				}
				return res
			} catch (err) {
				throw new ApolloError(err.message, 404)
			}
		},

		/**
		 * @DESC to Get single Load by ID
		 * @Access Public
		 */
		getLoadById: async (_, { id }, { Load }) => {
			try {
				let res = await Load.findById(id)
				if (!res) {
					throw new ApolloError("Load not found")
				}
				await res.populate('author').populate('athlete').execPopulate()
				return res
			} catch (err) {
				throw new ApolloError(err.message, 404)
			}
		},

		/**
		 * @DESC to Get Loads by Pagination variables
		 * @Access Public
		 */
		getLoadsWithPagination: async (_, { page, limit }, { Load }) => {
			const options = {
				page: page || 1,
				limit: limit || 10,
				populate: ['author', 'athlete'],
				sort: { date: -1 },
				customLabels: loadPaginatorLabels
			}
			let res = await Load.paginate({}, options)
			return res
		},

		/**
		 * @DESC to Get My Loads by Pagination variables
		 * @Access Public
		 */
		getMyLoadsWithPagination: async (_, { page, limit }, { Load, user }) => {
			const options = {
				page: page || 1,
				limit: limit || 10,
				populate: ['author', 'athlete'],
				sort: { date: -1 },
				customLabels: loadPaginatorLabels
			}
			let res = await Load.paginate({ author: user._id.toString() }, options)
			return res
		}
	},

	Mutation: {
		/**
		 * @DESC to Create new Load
		 * @Params newLoad{ type!, info!, image }
		 * @Access Private
		 */
		createLoad: async (_, { newLoad }, { Load, user }) => {
			await NewLoadRules.validate(newLoad, { abortEarly: false })
			let res = await Load.create({ ...newLoad, author: user._id })
			await res.populate('author').execPopulate()
			return res
		},

		/**
		 * @DESC to Update an Existing Load by ID
		 * @Params updatedLoad { type!, info!, image }
		 * @Access Private
		 */
		updateLoad: async (_, { id, updatedLoad }, { Load, user }) => {
			try {
				await NewLoadRules.validate(updatedLoad, { abortEarly: false })
				let res = await Load.findOneAndUpdate({ _id: id, author: user.id.toString() }, { ...updatedLoad }, { new: true })
				if (!res) {
					throw new ApolloError("Unauthorized Request")
				}
				return res
			} catch (err) {
				throw new ApolloError(err.message, 401)
			}
		},

		/**
		 * @DESC to Delete an Existing Load by ID
		 * @Params id!
		 * @Access Private
		 */
		deleteLoad: async (_, { id }, { Load, user }) => {
			try {
				let res = await Load.findOneAndDelete({ _id: id, author: user.id.toString() })
				if (!res) {
					throw new ApolloError("Unauthorized Request")
				}
				return { success: true, id: res.id, message: "Load DELETED!" }
			} catch (err) {
				throw new ApolloError(err.message, 401)
			}
		}
	}
}