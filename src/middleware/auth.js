import { verify } from 'jsonwebtoken'

import { SECRET } from '../config'
import { User } from '../models'

const AuthMiddleware = async (req, res, next) => {
	// Extract Authorization Header
	const authHeader = req.get('Authorization');
	if (!authHeader) {
		req.isAuth = false
		return next()
	}

	// Extract the token and check for token
	const token = authHeader.split(" ")[1]
	if (!token || token === "") {
		req.isAuth = false
		return next()
	}

	// Verify the extracted token
	let decodedToken;
	try {
		decodedToken = verify(token, SECRET)
	} catch (err) {
		req.isAuth = false
		return next()
	}

	// If decoded token is null then set authentication of the request to false
	if (!decodedToken) {
		req.isAuth = false
		return next()
	}

	// If the user has a valid token then find the user by the decoded tokens id
	let authUser = await User.findById(decodedToken.id)
	if (!authUser) {
		req.isAuth = false
		return next()
	}

	req.user = authUser
	req.isAuth = true
	return next()
}

export default AuthMiddleware