import jwt from "jsonwebtoken";
import { SESSION_KEY } from "../configurations/env.config.js";

function verifyToken(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ mensaje: 'Token no proporcionado' });
    }
  
    jwt.verify(token, SESSION_KEY, (error, decoded) => {
      if (error) {
        return res.status(401).json({ mensaje: 'Token inválido' });
      } else {
        req.usuario = decoded;
        next();
      }
    });
  }
  
export default verifyToken;