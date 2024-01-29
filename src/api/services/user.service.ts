import AppError from "../../utils/appError";
import { User } from "../entities/user.entity";

export const checkUserExist = async (email: string) => {
  try {
    const isEmailExist = await User.findOne({
      where: { email },
    });
    if (isEmailExist)
      throw new AppError(
        400,
        "User with this email already exist, Please login to proceed"
      );
  } catch (err) {
    throw err;
  }
};
