import { ApolloServer } from 'apollo-server-express'
import bodyParser from 'body-parser'
import { error, success } from 'consola'
import express from 'express'
import mongoose from 'mongoose'
import { join } from 'path'

import { DB, IN_PROD, PORT } from './config'
import { resolvers, typeDefs } from './graphql'
import { schemaDirectives } from './graphql/directives'
import AuthMiddleware from './middleware/auth';
import * as AppModels from './models'

// Initialize the Express Application
const app = express()
app.use(AuthMiddleware)
app.use(bodyParser.json())
app.use(express.static(join(__dirname, './uploads')))

const server = new ApolloServer({
	typeDefs,
	resolvers,
	schemaDirectives,
	playground: IN_PROD,
	context: ({ req }) => {
		let { isAuth, user } = req
		return {
			req,
			isAuth,
			user,
			...AppModels
		}
	}
})

const startApp = async () => {
	try {
		// Connect with the Database
		await mongoose.connect(DB, {
			useFindAndModify: false,
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		success(`Successfully connected with the Database.`)

		// Inject Apollo Server Middleware
		server.applyMiddleware({ app })
		app.listen(PORT, () => success(`Server started on PORT ${PORT}`))
	} catch (err) {
		error(err.message)
	}
}

startApp()