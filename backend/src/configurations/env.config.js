import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 8080;
export const MONGODB_URI = process.env.MONGODB_URI;
export const APP_USERNAME = process.env.APP_USERNAME;
export const APP_PASSWORD = process.env.APP_PASSWORD;
export const COOKIE_VALUE = process.env.COOKIE_VALUE;
export const SESSION_KEY = process.env.SESSION_KEY
