import * as yup from 'yup';

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

const result = yup
	.string()
	.required()

export const NewTestRules = yup.object().shape({ date, weekNumber, test, result });