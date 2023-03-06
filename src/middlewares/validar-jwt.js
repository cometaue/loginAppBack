import { request, response } from "express";
import jwt from "jsonwebtoken";

const validarJWT = (req = request, res = response, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({ ok: false, msg: "err token renew" });
  }

  try {
    const { uid, nombre } = jwt.verify(token, process.env.SECRET_JWT_SEED);
    req.uid = uid;
    req.nombre = nombre;
  } catch (error) {
    return res.status(401).json({ ok: false, msg: "token no valido" });
  }

  next();
};

export default validarJWT;
