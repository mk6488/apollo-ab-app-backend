import * as yup from 'yup';

import { squads } from '../helpers'

const firstName = yup
	.string()
	.required()
	.min(2)

const lastName = yup
	.string()
	.required()
	.min(2)

const squad = yup
	.mixed()
	.required()
	.oneOf(squads)

const current = yup
	.boolean()
	.required()

const doe = yup
	.string()
	.matches(/^[0-9]+.*$/)

const dob = yup
	.string()

export const NewAthleteRules = yup.object().shape({ firstName, lastName, squad, current, doe, dob });