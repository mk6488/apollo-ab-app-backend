import { model, Schema } from 'mongoose'
import paginator from 'mongoose-paginate-v2'

const UserSchema = new Schema({
	username: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	group: {
		type: String,
		required: false
	},
	password: {
		type: String,
		required: true
	},
	avatarImage: {
		type: String,
		default: '../assets/user_profile.png'
	},
}, { timestamps: true })

UserSchema.plugin(paginator)

const User = model('users', UserSchema)

export default User