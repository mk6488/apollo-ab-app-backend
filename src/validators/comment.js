import * as yup from 'yup';

const date = yup
	.string()
	.required()

const weekNumber = yup
	.number()
	.integer()
	.positive()

const type = yup
	.mixed()
	.required()

const comment = yup
	.string()
	.required()

export const NewCommentRules = yup.object().shape({ date, weekNumber, type, comment });