// import { UserModel } from 'src/model/user.schemas';
import { Request, Response } from "express";
import { createHash } from "crypto";
import { UserModel } from '../model/index';

function comparePassword(password: string, userPass: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const pass = createHash("sha256").update(password).digest("hex");
    if (pass === userPass) {
      resolve(true);
    }
    reject();
  })
}

function createPassword(password: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const pass = createHash("sha256").update(password).digest("hex");
    resolve(pass);
  })
}

export const postLogin = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      message: "username and password are required"
    });
  }

  const user = await UserModel.findOne({ username });
  if (!user) {
    return res.status(400).json({
      message: "username or password is incorrect"
    });
  }

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    return res.status(400).json({
      message: "username or password is incorrect"
    });
  }
  return res.status(200).json({
    message: "login success"
  });
}

export const postRegister = async (req: Request, res: Response) => {
  const { username, password, customerName, phone, email } = req.body;

  if (!username || !password || !customerName || !phone || !email) {
    return res.status(400).json({
      message: "username, password, customerName, phone, email are required"
    });
  }

  const user = await UserModel.findOne({ username });
  if (user) {
    return res.status(400).json({
      message: "username is already exist"
    });
  }

  const pass = await createPassword(password);
  const newUser = new UserModel({
    username,
    password: pass,
    customerName,
    phone,
    email
  });

  await newUser.save();

  return res.status(200).json({
    message: "register success"
  });
}