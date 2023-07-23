import mongoose from "mongoose";
import { SchemaTypes, model } from "mongoose";

const autorSchema = new mongoose.Schema(
  {
    id: { type: SchemaTypes.ObjectId },
    nome: {
      type: String,
      required: [true, "O nome do(a) autor(a) é obrigatório."],
    },
    nacionalidade: { type: String },
  },
  {
    versionKey: false,
  }
);

const autores = model("autores", autorSchema);

export default autores;
