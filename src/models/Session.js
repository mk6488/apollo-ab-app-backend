import { model, Schema } from 'mongoose'
import paginator from 'mongoose-paginate-v2'

const SessionSchema = new Schema({
	date: {
		type: String,
		required: true
	},
	weekNumber: {
		type: Number,
		required: true
	},
	type: {
		type: String,
		required: true
	},
	info: {
		type: String,
		required: true
	},
	image: {
		type: String,
		required: false
	},
	cancelled: {
		type: Boolean,
		required: true
	},
	author: {
		ref: 'users',
		type: Schema.Types.ObjectId
	}
}, { timestamps: true })

SessionSchema.plugin(paginator)

const Session = model('sessions', SessionSchema)

export default Session