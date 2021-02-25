import * as yup from 'yup';

const firstName = yup
	.string()
	.required()
	.min(2)

const lastName = yup
	.string()
	.required()
	.min(2)

const gender = yup
	.string()
	.required()

const squad = yup
	.mixed()
	.required()

const weight = yup
	.number()
	.positive()

const current = yup
	.boolean()
	.required()

const doe = yup
	.string()
	.matches(/^[0-9]+.*$/)

const dob = yup
	.string()

const avatar = yup
	.string()

export const NewAthleteRules = yup.object().shape({ firstName, lastName, gender, squad, weight, current, doe, dob, avatar });