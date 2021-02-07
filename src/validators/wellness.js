import * as yup from 'yup';

const date = yup
	.string()
	.required()

const weekNumber = yup
	.number()
	.integer()
	.positive()

const sleep = yup
	.number()
	.integer()
	.positive()
	.moreThan(0)
	.lessThan(6)

const stress = yup
	.number()
	.integer()
	.positive()
	.moreThan(0)
	.lessThan(6)

const fatigue = yup
	.number()
	.integer()
	.positive()
	.moreThan(0)
	.lessThan(6)

const soreness = yup
	.number()
	.integer()
	.positive()
	.moreThan(0)
	.lessThan(6)

const nutrition = yup
	.number()
	.integer()
	.positive()
	.moreThan(0)
	.lessThan(6)

const average = yup
	.number()
	.positive()

export const NewWellnessRules = yup.object().shape({
	date,
	weekNumber,
	sleep,
	stress,
	fatigue,
	soreness,
	nutrition,
	average
});