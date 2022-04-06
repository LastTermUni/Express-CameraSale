import { Request, Response } from "express";
import { UserModel } from "../model/index";

export const getUser = async (req: Request, res: Response) => {
  await UserModel.find({}, (err: any, users: any) => {
    if (err) {
      res.send(err);
    }
    res.json(users);
  });
}

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const data = req.body;
  await UserModel.findById(id).then((user) => {
    if (!user) {
      return res.status(400).json({
        message: "user not found",
      });
    }

    return res.status(200).json(user);
  });

  await UserModel.updateOne({ id: id }, data, (err: string, user: {}) => {
    if (err) {
      return res.status(400).json({
        message: "user not found",
      });
    }
    return res.status(200).json(user);
  })
}