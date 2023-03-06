import { response, request } from "express";
import modelo from "../models/Usuario.js";
import bcrypt from "bcryptjs";
import jwt from "../helpers/jwt.js";

//crear nuevo usuario
export const crearUsuario = async (req = request, res = response) => {
  const { email, nombre, password } = req.body;
  //Verificar email
  try {
    let usuario = await modelo.findOne({ email });
    if (usuario) {
      return res
        .status(400)
        .json({ ok: false, msg: "Ya existe un usuario con ese email" });
    }

    //crear modelo del usuario
    const dbUser = new modelo(req.body);
    //hashear contraseña
    const salt = bcrypt.genSaltSync();
    dbUser.password = bcrypt.hashSync(password, salt);
    //generar JWT
    const token = await jwt(dbUser.id, nombre);
    //crear usuario db
    await dbUser.save();
    //generar respuesto exitosa
    return res.status(201).json({
      ok: true,
      msg: "Se creo el usuario correctamente",
      id: dbUser.id,
      nombre,
      token,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ ok: true, msg: "Se creo un nuevo usuario /new" });
  }
};

//login usuario
export const loginUsuario = async (req = request, res = response) => {
  const { email, password } = req.body;
  const dbUser = await modelo.findOne({ email });

  try {
    if (!dbUser) {
      return res.status(400).json({ ok: false, msg: "El correo no existe" });
    }

    //confirmar pasw hace match
    const validPassword = bcrypt.compareSync(password, dbUser.password);
    if (!validPassword) {
      return res
        .status(400)
        .json({ ok: false, msg: "EL password no es valido" });
    }
    //generar JWT
    const token = await jwt(dbUser.id, dbUser.nombre);

    return res.status(201).json({
      ok: true,
      msg: "Login exitoso",
      uid: dbUser.id,
      nombre: dbUser.nombre,
      token,
    });
  } catch (error) {}
};
//revalidar token del usuario
export const renovarToken = async (req = request, res = response) => {
  const { uid, nombre } = req;

  //generar jwt
  const token = await jwt(uid, nombre);

  return res.json({ ok: true, uid, nombre, token });
};
