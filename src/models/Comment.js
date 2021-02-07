import { Schema, model } from 'mongoose'
import paginator from 'mongoose-paginate-v2'

const CommentSchema = new Schema({
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
	comment: {
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

CommentSchema.plugin(paginator)

const Comment = model('comments', CommentSchema)

export default Comment