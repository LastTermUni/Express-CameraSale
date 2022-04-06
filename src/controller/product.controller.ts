
import { Request, Response } from "express";
import { ProductModel } from "../model/index";

export const getAllProduct = async (req: Request, res: Response) => {
  await ProductModel.find({}, (err, prod) => {
    if (err) {
      res.send(err);
    }
    res.json(prod);
  });
}

export const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
  await ProductModel.findById(id).then((prod) => {
    if (!prod) {
      return res.status(400).json({
        message: "user not found",
      });
    }

    return res.status(200).json(prod);
  });
}


export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  await ProductModel.updateOne({ id: id }, data, (err: string, prod: {}) => {
    if (err) {
      return res.status(400).json({
        message: "user not found",
      });
    }
    return res.status(200).json(prod);
  })
}

export const postProduct = async (req: Request, res: Response) => {
  const data = req.body;
  const product = new ProductModel(data);
  await product.save((err, prod) => {
    if (err) {
      return res.status(400).json({
        message: "product not found",
      });
    }
    return res.status(200).json(prod);
  });

}

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  await ProductModel.findByIdAndDelete(id, (err: any, prod: string) => {
    if (err) {
      return res.status(400).json({
        message: "product not found",
      });
    }
    return res.status(200).json({ prod: `${prod} deleted` });
  });
}