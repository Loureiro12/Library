import mongoose from "mongoose";
import { SchemaTypes, model } from "mongoose";

const livroSchema = new mongoose.Schema({
  id: { type: SchemaTypes.ObjectId },
  titulo: { type: String, required: true },
  autor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "autores",
    required: true,
  },
  editora: { type: String, required: true },
  numeroPaginas: { type: Number },
});

// const livros = mongoose.model("livros", livroSchema);
const livros = model("books", livroSchema);

export default livros;
