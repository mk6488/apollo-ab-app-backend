import * as yup from 'yup';

import { loadTypes } from '../helpers'

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
	.oneOf(loadTypes)

const duration = yup
	.number()
	.integer()
	.positive()

const rpe = yup
	.number()
	.integer()
	.positive()
	.moreThan(0)
	.lessThan(11)

const load = yup
	.number()
	.integer()
	.positive()

export const NewLoadRules = yup.object().shape({ date, weekNumber, type, duration, rpe, load });