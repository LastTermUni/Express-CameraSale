import { Router } from "express";
import { prodController } from "../controller/index";

export const prodRoute = () => {
  let route = Router();

  route.get("/", prodController.getAllProduct);
  route.get('/:id', prodController.getProductById);
  route.put('/:id', prodController.updateProduct);
  route.post('/create', prodController.postProduct);
  route.delete('/:id', prodController.deleteProduct);
}
