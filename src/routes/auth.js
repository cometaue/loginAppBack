import { Router } from "express";
import {
  crearUsuario,
  loginUsuario,
  renovarToken,
} from "../controllers/auth.controller.js";
import { check } from "express-validator";
import { ValidarCampo } from "../middlewares/validarCampos.middleware.js";

import validarJWT from "../middlewares/validar-jwt.js";

const router = Router();
//creador de usuario
router.post(
  "/new",
  [
    check("nombre", "El nombre es obligatorio").notEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password es obligatorio").isLength({ min: 6 }),
    ValidarCampo,
  ],
  crearUsuario
);
//login
router.post(
  "/",
  [
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password es obligatorio").isLength({ min: 6 }),
    ValidarCampo,
  ],
  loginUsuario
);
//renovar token
router.get("/renew", validarJWT, renovarToken);

export default router;
