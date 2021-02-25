import { Schema, model } from 'mongoose'
import paginator from 'mongoose-paginate-v2'

const AthleteSchema = new Schema({
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	gender: {
		type: String,
		required: true
	},
	squad: {
		type: String,
		required: true
	},
	weight: {
		type: Number,
		required: false
	},
	current: {
		type: Boolean,
		default: true
	},
	doe: {
		type: String,
		required: false
	},
	dob: {
		type: String,
		required: false
	},
	avatar: {
		type: String,
		required: false
	},
	author: {
		ref: 'users',
		type: Schema.Types.ObjectId
	}
}, { timestamps: true })

AthleteSchema.plugin(paginator)

const Athlete = model('athletes', AthleteSchema)

export default Athlete