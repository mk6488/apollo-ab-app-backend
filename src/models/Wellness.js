import { Schema, model } from 'mongoose'
import paginator from 'mongoose-paginate-v2'

const WellnessSchema = new Schema({
	date: {
		type: String,
		required: true
	},
	weekNumber: {
		type: Number,
		required: true
	},
	sleep: {
		type: Number,
		required: true,
		min: 1,
		max: 5
	},
	stress: {
		type: Number,
		required: true,
		min: 1,
		max: 5
	},
	fatigue: {
		type: Number,
		required: true,
		min: 1,
		max: 5
	},
	soreness: {
		type: Number,
		required: true,
		min: 1,
		max: 5
	},
	nutrition: {
		type: Number,
		required: true,
		min: 1,
		max: 5
	},
	average: {
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

WellnessSchema.plugin(paginator)

const Wellness = model('wellness', WellnessSchema)

export default Wellness