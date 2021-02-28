import { ApolloError } from 'apollo-server-express'

import { wellnessPaginatorLabels } from '../../helpers'
import { NewWellnessRules } from '../../validators'

export default {
	Query: {
		/**
		 * @DESC to Get all Wellness
		 * @Access Public
		 */
		allWellness: async (_, {}, { Wellness }) => {
			let res = await Wellness.find().populate('author').populate('athlete')
			return res
		},

		/**
		 * @DESC to Get all Wellness for an Athlete
		 * @Access Public
		 */
		allWellnessForAthlete: async (_, { id }, { Wellness }) => {
			try {
				let res = await Wellness.find({ athlete: id })
				if (!res) {
					throw new ApolloError("No Wellness found for this Athlete")
				}
				return res
			} catch (err) {
				throw new ApolloError(err.message, 404)
			}
		},

		/**
		 * @DESC to Get single Wellness by ID
		 * @Access Public
		 */
		getWellnessById: async (_, { id }, { Wellness }) => {
			try {
				let res = await Wellness.findById(id)
				if (!res) {
					throw new ApolloError("Wellness not found")
				}
				await res.populate('author').populate('athlete').execPopulate()
				return res
			} catch (err) {
				throw new ApolloError(err.message, 404)
			}
		},

		/**
		 * @DESC to Get Wellness by Pagination variables
		 * @Access Public
		 */
		getWellnessWithPagination: async (_, { page, limit }, { Wellness }) => {
			const options = {
				page: page || 1,
				limit: limit || 10,
				populate: ['author', 'athlete'],
				sort: { date: -1 },
				customLabels: wellnessPaginatorLabels
			}
			let res = await Wellness.paginate({}, options)
			return res
		},

		/**
		 * @DESC to Get My Wellness by Pagination variables
		 * @Access Public
		 */
		getMyWellnessWithPagination: async (_, { page, limit }, { Wellness, user }) => {
			const options = {
				page: page || 1,
				limit: limit || 10,
				populate: ['author', 'athlete'],
				sort: { date: -1 },
				customLabels: wellnessPaginatorLabels
			}
			let res = await Wellness.paginate({ author: user._id.toString() }, options)
			return res
		}
	},

	Mutation: {
		/**
		 * @DESC to Create new Wellness
		 * @Params newWellness{ type!, info!, image }
		 * @Access Private
		 */
		createWellness: async (_, { newWellness }, { Wellness, user }) => {
			await NewWellnessRules.validate(newWellness, { abortEarly: false })
			let res = await Wellness.create({ ...newWellness, author: user._id })
			await res.populate('author').execPopulate()
			return res
		},

		/**
		 * @DESC to Update an Existing Wellness by ID
		 * @Params updatedWellness { type!, info!, image }
		 * @Access Private
		 */
		updateWellness: async (_, { id, updatedWellness }, { Wellness, user }) => {
			try {
				await NewWellnessRules.validate(updatedWellness, { abortEarly: false })
				let res = await Wellness.findOneAndUpdate({ _id: id, author: user.id.toString() }, { ...updatedWellness }, { new: true })
				if (!res) {
					throw new ApolloError("Unauthorized Request")
				}
				return res
			} catch (err) {
				throw new ApolloError(err.message, 401)
			}
		},

		/**
		 * @DESC to Delete an Existing Wellness by ID
		 * @Params id!
		 * @Access Private
		 */
		deleteWellness: async (_, { id }, { Wellness, user }) => {
			try {
				let res = await Wellness.findOneAndDelete({ _id: id, author: user.id.toString() })
				if (!res) {
					throw new ApolloError("Unauthorized Request")
				}
				return { success: true, id: res.id, message: "Wellness DELETED!" }
			} catch (err) {
				throw new ApolloError(err.message, 401)
			}
		}
	}
}