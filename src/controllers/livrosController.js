import livros from "../models/Livro.js ";

class LivroController {
  static listarLivros = async (req, res) => {
    try {
      const data = await livros.find();
      res.status(200).json(data);
    } catch (error) {
      req.status(404).send(error);
    }
  };

  static listarLivroPorId = async (req, res) => {
    const id = req.params.id;

    try {
      const livro = await livros.findById(id);
      res.status(200).send(livro.toJSON());
    } catch (err) {
      res.status(400).send({ message: `${err.message} - ID não encontrado` });
    }
  };

  static cadastrarLivro = async (req, res) => {
    try {
      let livro = new livros(req.body);
      await livro.save();
      res.status(201).send(livro.toJSON());
    } catch (error) {
      res
        .status(501)
        .send({ message: `${error.message} - erro ao cadastrar livro` });
    }
  };

  static atualizarLivro = async (req, res) => {
    const id = req.params.id;
    try {
      await livros.findByIdAndUpdate(id, { $set: req.body });
      res
        .status(200)
        .send({ message: "O status do livro foi atualizado com sucesso" });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };

  static excluirLivro = async (req, res) => {
    const id = req.params.id;

    try {
      await livros.findByIdAndDelete(id);
      res
        .status(200)
        .send({ message: "Livro removido com sucesso!" });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  }
}

export default LivroController;
