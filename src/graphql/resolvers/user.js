import { ApolloError } from 'apollo-server-express'
import { compare, hash } from 'bcryptjs'

import { issueAuthToken, userPaginatorLabels, serializeUser } from '../../helpers'
import { UserAuthenticationRules, UserRegistrationRules } from '../../validators'

export default {
	Query: {
		/**
		 * @DESC to get the authenticated User
		 * @Headers Authorization
		 * @Access Private
		 */
		authUser: async (_, {}, { user }) => user,

		/**
		 * @DESC to authenticate using parameters
		 * @Params { username, password }
		 * @Access Public
		 */
		loginUser: async (_, { password, username }, { User }) => {
			try {
				await UserAuthenticationRules.validate({ username, password }, { abortEarly: false })

				// Check if Username already exists
				let user = await User.findOne({ username })
				if (!user) {
					throw new ApolloError('Username not found.')
				}

				// Check Password
				let isMatch = await compare(password, user.password)
				if (!isMatch) {
					throw new ApolloError('Invalid Password.')
				}

				// Serialize user (removes password field)
				user = user.toObject()
				user.id = user._id
				user = serializeUser(user)

				// Issue new Authentication Token
				let token = await issueAuthToken(user)
				return { token, user }
			} catch (err) {
				throw new ApolloError(err.message, 403)
			}
		},

		/**
		 * @DESC to Get all Users
		 * @Access Public
		 */
		allUsers: async (_, {}, { User }) => {
			let res = await User.find()
			return res
		},

		/**
		 * @DESC to Get single User by ID
		 * @Access Public
		 */
		getUserById: async (_, { id }, { User }) => {
			try {
				let res = await User.findById(id)
				if (!res) {
					throw new ApolloError('User not found', 404)
				}
				return res
			} catch ({ message, extensions }) {
				throw new ApolloError(message, extensions.code)
			}
		},

		/**
		 * @DESC to Get Users by Pagination variables
		 * @Access Public
		 */
		getUsersWithPagination: async (_, { page, limit }, { User }) => {
			const options = {
				page: page || 1,
				limit: limit || 10,
				sort: { createdAt: -1 },
				customLabels: userPaginatorLabels
			}
			let res = await User.paginate({}, options)
			return res
		},
	},

	Mutation: {
		/**
		 * @DESC to Register new user
		 * @Params newUser{ username, firstName, lastName, email, password }
		 * @Access Public
		 */
		registerUser: async (_, { newUser }, { User }) => {
			try {
				await UserRegistrationRules.validate(newUser, { abortEarly: false })

				let { email, username } = newUser

				// Check if Username already exists
				let user = await User.findOne({ username });
				if (user) {
					throw new ApolloError('Username is already taken.')
				}

				// Check if Email is already registered
				user = await User.findOne({ email });
				if (user) {
					throw new ApolloError('Email is already registered.')
				}

				// Create new User Instance
				user = new User(newUser)

				// Hash the Password
				user.password = await hash(user.password, 10);

				// Save User to the Database
				let res = await user.save()

				// Serialize user (removes password field)
				res = res.toObject()
				res.id = res._id
				res = serializeUser(res)

				// Issue the Authentication Token
				let token = await issueAuthToken(res)
				return { token, user: res }
			} catch (err) {
				console.log(err)
				throw new ApolloError(err.message)
			}
		}
	}
}