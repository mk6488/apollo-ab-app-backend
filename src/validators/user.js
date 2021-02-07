import * as yup from 'yup';

const username = yup
	.string()
	.required()
	.min(2)
	.matches(/^\w+$/);

const firstName = yup
	.string()
	.required()
	.min(2);

const lastName = yup
	.string()
	.required()
	.min(2);

const email = yup
	.string()
	.required()
	.email();

const group = yup
	.string()

const password = yup
	.string()
	.required()
	.min(5)
	.max(10)

export const UserRegistrationRules = yup.object().shape({
	username,
	firstName,
	lastName,
	email,
	group,
	password,
});

export const UserAuthenticationRules = yup.object().shape({
	username,
	password
});