import { Schema, model } from 'mongoose'
import paginator from 'mongoose-paginate-v2'

const TestSchema = new Schema({
	date: {
		type: String,
		required: true
	},
	weekNumber: {
		type: Number,
		required: true
	},
	test: {
		type: String,
		required: true
	},
	result: {
		type: String,
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

TestSchema.plugin(paginator)

const Test = model('tests', TestSchema)

export default Test