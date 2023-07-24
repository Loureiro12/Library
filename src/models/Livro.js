import mongoose from "mongoose";
import { SchemaTypes, model } from "mongoose";
import autopopulate from "mongoose-autopopulate";


const livroSchema = new mongoose.Schema({
  id: { type: SchemaTypes.ObjectId },
  titulo: {
    type: String,
    required: [true, "O título do livro é obrigatório."],
  },
  autor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "autores",
    required: [true, "O(a) autor(a) é obrigatório"],
    autopopulate: true // propriedade adicionada
  },
  editora: {
    type: String,
    required: [true, "A Editora do livro é obrigatório."],
    enum: {
      values: ["Casa do código", "Alura"],
      message: "A editora {VALUE} não é um valor permitido."
    }
  },
  numeroPaginas: {
    type: Number,
    min: [10, "O número de páginas deve estar entre 10 e 5000. Valor fornecido: {VALUE}"],
    max: [5000, "O número de páginas deve estar entre 10 e 5000. Valor fornecido: {VALUE"],
  },
});

livroSchema.plugin(autopopulate);
const livros = model("books", livroSchema);

export default livros;
