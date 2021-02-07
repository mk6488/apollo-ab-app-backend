import { sign } from 'jsonwebtoken'
import { pick } from 'lodash'

import { SECRET } from '../config'

export const issueAuthToken = async (user) => {
	let token = await sign(user, SECRET, { expiresIn: 60 * 60 * 24 })
	return `Bearer ${token}`
}

export const serializeUser = user =>
	pick(user, ['id', 'email', 'username', 'lastName', 'firstName', 'avatarImage']);