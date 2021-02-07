import * as yup from 'yup';

import { tests } from '../helpers'

const date = yup
	.string()
	.required()

const weekNumber = yup
	.number()
	.integer()
	.positive()

const test = yup
	.mixed()
	.required()
	.oneOf(tests)

const result = yup
	.string()
	.required()

export const NewTestRules = yup.object().shape({ date, weekNumber, test, result });