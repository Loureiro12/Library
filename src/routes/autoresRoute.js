import express from "express";
import AutoresController from "../controllers/autoresController.js";

const router = express.Router();

router.get("/autores", AutoresController.listarAutores);

router.get("/autores/:id", AutoresController.listarAutorPorId);

router.post("/autores", AutoresController.cadastrarAutor);

router.put("/autores/:id", AutoresController.atualizarAutor);

router.delete("/autores/:id", AutoresController.excluirAutor);

export default router;
