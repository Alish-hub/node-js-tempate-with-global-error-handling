import { logger } from "../../configs/logger";
import { datasource } from "../../configs/ormConfig";
import AppError from "../../utils/appError";
import { User } from "../entities/user.entity";

export const checkUserExist = async (email: string) => {
  const queryRunner = datasource.createQueryRunner();
  try {
    await queryRunner.connect();
    console.time("checkTime");

    const isEmailExist = await User.findOne({
      where: { email },
    });
    console.log({ isEmailExist });

    const explainResult = await queryRunner.query(
      ` EXPLAIN ANALYZE SELECT * FROM  "user" where email=$1 `,
      [email]
    );
    console.log(explainResult);
    console.timeEnd("checkTime");

    if (isEmailExist)
      throw new AppError(
        400,
        "User with this email already exist, Please login to proceed"
      );
  } catch (err: any) {
    logger.error(err.message);
    throw err;
  } finally {
    await queryRunner.release();
  }
};
