import { ApolloError } from 'apollo-server-express'

import { athletePaginatorLabels } from '../../helpers'
import { NewAthleteRules } from '../../validators'

export default {
	Query: {
		/**
		 * @DESC to Get all Athletes
		 * @Access Public
		 */
		allAthletes: async (_, {}, { Athlete }) => {
			let res = await Athlete.find().populate('author')
			return res
		},

		/**
		 * @DESC to Get all Active Athletes
		 * @Access Public
		 */
		allActiveAthletes: async (_, {}, { Athlete }) => {
			let res = await Athlete.find({ current: true }).populate('author')
			return res
		},

		/**
		 * @DESC to Get single Athlete by ID
		 * @Access Public
		 */
		getAthleteById: async (_, { id }, { Athlete }) => {
			try {
				let res = await Athlete.findById(id)
				if (!res) {
					throw new ApolloError("Athlete not found")
				}
				await res.populate('author').execPopulate()
				return res
			} catch (err) {
				throw new ApolloError(err.message, 404)
			}
		},

		/**
		 * @DESC to Get Athletes by Pagination variables
		 * @Access Public
		 */
		getAthletesWithPagination: async (_, { page, limit }, { Athlete }) => {
			const options = {
				page: page || 1,
				limit: limit || 10,
				populate: 'author',
				sort: { firstName: 1 },
				customLabels: athletePaginatorLabels
			}
			let res = await Athlete.paginate({}, options)
			return res
		},

		/**
		 * @DESC to Get My Athletes by Pagination variables
		 * @Access Public
		 */
		getMyAthletesWithPagination: async (_, { page, limit }, { Athlete, user }) => {
			const options = {
				page: page || 1,
				limit: limit || 10,
				populate: 'author',
				sort: { firstName: 1 },
				customLabels: athletePaginatorLabels
			}
			let res = await Athlete.paginate({ author: user._id.toString() }, options)
			return res
		}
	},


	Mutation: {
		/**
		 * @DESC to Create new Athlete
		 * @Params newAthlete{ type!, info!, image }
		 * @Access Private
		 */
		createAthlete: async (_, { newAthlete }, { Athlete, user }) => {
			await NewAthleteRules.validate(newAthlete, { abortEarly: false })
			let res = await Athlete.create({ ...newAthlete, author: user._id })
			await res.populate('author').execPopulate()
			return res
		},

		/**
		 * @DESC to Update an Existing Athlete by ID
		 * @Params updatedAthlete { type!, info!, image }
		 * @Access Private
		 */
		updateAthlete: async (_, { id, updatedAthlete }, { Athlete, user }) => {
			try {
				await NewAthleteRules.validate(updatedAthlete, { abortEarly: false })
				let res = await Athlete.findOneAndUpdate({ _id: id, author: user.id.toString() }, { ...updatedAthlete }, { new: true })
				if (!res) {
					throw new ApolloError("Unauthorized Request")
				}
				return res
			} catch (err) {
				throw new ApolloError(err.message, 401)
			}
		},

		/**
		 * @DESC to Toggle Current
		 * @Params toggleCurrent { type!, info!, image }
		 * @Access Private
		 */
		toggleCurrent: async (_, { id, current }, { Athlete, user }) => {
			try {
				let res = await Athlete.findOneAndUpdate({ _id: id, author: user.id.toString() }, { current }, { new: true })
				if (!res) {
					throw new ApolloError("Unauthorized Request")
				}
				return res
			} catch (err) {
				throw new ApolloError(err.message, 401)
			}
		},

		/**
		 * @DESC to Delete an Existing Athlete by ID
		 * @Params id!
		 * @Access Private
		 */
		deleteAthlete: async (_, { id }, { Athlete, user }) => {
			try {
				let res = await Athlete.findOneAndDelete({ _id: id, author: user.id.toString() })
				if (!res) {
					throw new ApolloError("Unauthorized Request")
				}
				return { success: true, id: res.id, message: "Athlete DELETED!" }
			} catch (err) {
				throw new ApolloError(err.message, 401)
			}
		}
	}
}