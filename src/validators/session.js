import * as yup from 'yup';

const date = yup
	.string()
	.required()

const weekNumber = yup
	.number()
	.integer()
	.positive()

const type = yup
	.string()
	.required()

const info = yup
	.string()
	.required()
	.min(5)
	.max(3000);

const image = yup
	.string()

export const NewSessionRules = yup.object().shape({ date, weekNumber, type, info, image });