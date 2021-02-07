import { Schema, model } from 'mongoose'
import paginator from 'mongoose-paginate-v2'

const LoadSchema = new Schema({
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
	duration: {
		type: Number,
		required: true
	},
	rpe: {
		type: Number,
		required: true,
		min: 1,
		max: 10
	},
	load: {
		type: Number,
		required: true
	},
	athlete: {
		ref: 'athletes',
		type: Schema.Types.ObjectId,
		required: true
	},
	author: {
		ref: 'users',
		type: Schema.Types.ObjectId
	}
}, { timestamps: true })

LoadSchema.plugin(paginator)

const Load = model('loads', LoadSchema)

export default Load