import { Router } from "express";
import { authController, userController } from '../controller'

export function userRoute() {
  const route = Router();

  route.get("/", userController.getUser);
  route.put('/:id', userController.getUserById);
  route.post('/register', authController.postRegister);
  route.post('/login', authController.postLogin);
}
