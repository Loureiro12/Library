import NaoEncontrado from "../errors/NaoEncontrado.js";
import { autores } from "../models/index.js";

class AutorController {
  static listarAutores = async (req, res, next) => {
    try {
      const data = await autores.find();
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  };

  static listarAutorPorId = async (req, res, next) => {
    try {
      const id = req.params.id;

      const autor = await autores.findById(id);

      if (autor !== null) {
        res.status(200).send(autor.toJSON());
      } else {
        next(new NaoEncontrado("Id do autor não encontrado."));
      }
    } catch (err) {
      next(err);
    }
  };

  static cadastrarAutor = async (req, res, next) => {
    try {
      let autor = new autores(req.body);
      await autor.save();
      res.status(201).send(autor.toJSON());
    } catch (err) {
      next(err);
    }
  };

  static atualizarAutor = async (req, res, next) => {
    const id = req.params.id;
    try {
      const autor = await autores.findByIdAndUpdate(id, { $set: req.body });

      if (autor !== null) {
        res.status(200).send({ message: "Autor atualizado com sucesso!" });
      } else {
        next(new NaoEncontrado("Id do autor não encontrado."));
      }
    } catch (err) {
      next(err);
    }
  };

  static excluirAutor = async (req, res, next) => {
    const id = req.params.id;

    try {
      const autor = await autores.findByIdAndDelete(id);

      if (autor !== null) {
        res.status(200).send({ message: "Autor removido com sucesso!" });
      } else {
        next(new NaoEncontrado("Id do autor não encontrado."));
      }
    } catch (err) {
      next(err);
    }
  };
}

export default AutorController;
