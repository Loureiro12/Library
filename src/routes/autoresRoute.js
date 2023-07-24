import express from "express";
import AutoresController from "../controllers/autoresController.js";
import paginar from "../middlewares/paginar.js";

const router = express.Router();

router.get("/autores", AutoresController.listarAutores, paginar);

router.get("/autores/:id", AutoresController.listarAutorPorId);

router.post("/autores", AutoresController.cadastrarAutor);

router.put("/autores/:id", AutoresController.atualizarAutor);

router.delete("/autores/:id", AutoresController.excluirAutor);

export default router;
