import { NextFunction, Request, Response } from "express";
import { User } from "../entities/user.entity";
import AppError from "../../utils/appError";
import { checkUserExist } from "../services/user.service";

export const registration = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // const isEmailExist = await User.findOne({
    //   where: { email: req.body?.email },
    // });
    // if (isEmailExist)
    //   throw new AppError(
    //     400,
    //     "User with this email already exist, Please login to proceed"
    //   );
    await checkUserExist(req.body?.email);
    const newUser = User.create({
      name: req.body?.name,
      email: req.body?.email,
      mobileNumber: req.body?.mobileNumber,
      password: req.body?.password, //Need to hash password
    });
    const savedData = await User.save(newUser);
    const { password: ps, ...data } = savedData;
    return res.status(201).send({ message: "User created successfully", data });
  } catch (err) {
    next(err);
  }
};
