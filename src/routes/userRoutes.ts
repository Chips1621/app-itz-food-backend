import express from "express";
import userController from "../controllers/userController";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateUserRequest } from "../middleware/validation";

const router = express.Router();

//Ruta para obtener un usuario
router.get('/', jwtCheck, jwtParse, userController.getUser);

//Ruta para crear usuarios
router.post('/', jwtCheck, userController.createUser);

//Ruta para actualizar usuarios
router.put('/', jwtCheck, jwtParse, validateUserRequest, userController.updateUser);

export default router;