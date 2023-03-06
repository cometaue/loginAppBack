import mongoose from "mongoose";

mongoose.set("strictQuery", false);
export const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.BD_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("DB Online");
  } catch (error) {
    console.log("fallo la coneccion");
    throw new Error("fallo la conexion con la base de datos");
  }
};
