import mongoose from "mongoose";
import autores from "../models/Autor.js";

class AutorController {
  static listarAutores = async (req, res) => {
    try {
      const data = await autores.find();
      res.status(200).json(data);
    } catch (error) {
      req.status(404).send(error);
    }
  };

  static listarAutorPorId = async (req, res) => {
    try {
      const id = req.params.id;

      const autor = await autores.findById(id);

      if (autor !== null) {
        res.status(200).send(autor.toJSON());
      } else {
        res.status(404).send({ message: "Id do autor não encontrado." });
      }
    } catch (err) {
      if (err instanceof mongoose.Error.CastError) {
        res
          .status(400)
          .send({ message: "Um ou mais dados fornecidos estão incorretos." });
      } else {
        res.status(500).send({ message: `${err} - Erro interno de servidor.` });
      }
    }
  };

  static cadastrarAutor = async (req, res) => {
    try {
      let autor = new autores(req.body);
      await autor.save();
      res.status(201).send(autor.toJSON());
    } catch (error) {
      res
        .status(501)
        .send({ message: `${error.message} - Erro ao cadastrar autor` });
    }
  };

  static atualizarAutor = async (req, res) => {
    const id = req.params.id;
    try {
      await autores.findByIdAndUpdate(id, { $set: req.body });
      res.status(200).send({ message: "Autor atualizado com sucesso!" });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };

  static excluirAutor = async (req, res) => {
    const id = req.params.id;

    try {
      await autores.findByIdAndDelete(id);
      res.status(200).send({ message: "Autor removido com sucesso!" });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };
}

export default AutorController;
