import * as yup from 'yup';

import { commentTypes } from '../helpers'

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
	.oneOf(commentTypes)

const comment = yup
	.string()
	.required()

export const NewCommentRules = yup.object().shape({ date, weekNumber, type, comment });