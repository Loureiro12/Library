import mongoose from "mongoose";
import { SchemaTypes, model } from "mongoose";

const livroSchema = new mongoose.Schema({
  id: { type: SchemaTypes.ObjectId },
  titulo: {
    type: String,
    required: [true, "O título do livro é obrigatório."],
  },
  autor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "autores",
    required: [true, "O Autor do livro é obrigatório."],
  },
  editora: {
    type: String,
    required: [true, "A Editora do livro é obrigatório."],
  },
  numeroPaginas: { type: Number },
});

const livros = model("books", livroSchema);

export default livros;
