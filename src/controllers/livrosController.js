import livros from "../models/Livro.js ";
import NaoEncontrado from "../errors/NaoEncontrado.js";

class LivroController {
  static listarLivros = async (req, res, next) => {
    try {
      const data = await livros.find().populate("autor").exec();
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  };

  static listarLivroPorId = async (req, res, next) => {
    const id = req.params.id;

    try {
      const livro = await livros.findById(id).populate("autor", "nome").exec();

      if (livro !== null) {
        res.status(200).send(livro.toJSON());
      } else {
        next(new NaoEncontrado("Id do livro não encontrado."));
      }
    } catch (err) {
      next(err);
    }
  };

  static listarLivroPorEditora = async (req, res, next) => {
    try {
      const editora = req.query.editora;

      const livrosResultado = await livros.find({ editora: editora });

      if (livrosResultado !== null) {
        res.status(200).json(livrosResultado);
      }
    } catch (err) {
      next(err);
    }
  };

  static cadastrarLivro = async (req, res, next) => {
    try {
      let livro = new livros(req.body);
      await livro.save();
      res.status(201).send(livro.toJSON());
    } catch (err) {
      next(err);
    }
  };

  static atualizarLivro = async (req, res, next) => {
    const id = req.params.id;
    try {
      await livros.findByIdAndUpdate(id, { $set: req.body });

      if (livros !== null) {
        res.status(200).send({ message: "Livro atualizado com sucesso!" });
      } else {
        next(new NaoEncontrado("Id do livro não encontrado."));
      }
    } catch (err) {
      next(err);
    }
  };

  static excluirLivro = async (req, res, next) => {
    const id = req.params.id;

    try {
      await livros.findByIdAndDelete(id);

      if (livros !== null) {
        res.status(200).send({ message: "Livro removido com sucesso!" });
      } else {
        next(new NaoEncontrado("Id do livro não encontrado."));
      }
    } catch (err) {
      next(err);
    }
  };
}

export default LivroController;
