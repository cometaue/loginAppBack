import jwt from "jsonwebtoken";

const generarJWT = (uid, nombre) => {
  const payload = { uid, nombre };

  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.SECRET_JWT_SEED,
      {
        expiresIn: "12h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject();
        } else {
          resolve(token);
        }
      }
    );
  });
};

export default generarJWT;
