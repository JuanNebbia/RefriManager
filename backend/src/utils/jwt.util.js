import jwt from 'jsonwebtoken';
import { SESSION_KEY } from "../configurations/env.config.js";

export const generateToken = (payload) => {
	const token = jwt.sign(payload, SESSION_KEY, { expiresIn: '24h' });
	return token;
};