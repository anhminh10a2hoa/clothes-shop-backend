import { getRepository } from "typeorm";
import { Request, Response } from "express-serve-static-core";
import * as jwt from "jsonwebtoken";
import User from "../entities/user.entity";

class AuthController {
  constructor() {}

  loginAuth = async (req: Request, res: Response) => {
    //Check if username and password are set
    let { username, password } = req.body;
    if (!(username && password)) {
      return res.status(400).json({
        message: "Please enter a username and password",
      });
    }

    const userRepository = getRepository(User);
    let user: User;

    //Get user from database
    try {
      user = await userRepository.findOneOrFail({ where: { username } });
    } catch (error) {
      return res.status(401).json({
        message: "Check your username and password",
      });
    }

    //Check if encrypted password match
    if (!user.unencrypted_password_is_valid(password)) {
      return res.status(401).json({
        message: "Wrong password or username",
      });
    }

    //Sing JWT, valid for 1 hour
    const jwtToken = jwt.sign(
      { id: user.id, username: user.username, roll: user.roll },
      process.env.JWT_TOKEN,
      { expiresIn: process.env.JWT_TOKEN_EXPIRES_IN_HOUR }
    );

    ///// Saving JwtToken in DB
    // user.is_logged = jwtToken
    // await userRepository.save(user)

    // res.setHeader('jwt', jwtToken)

    /// Creating Cookie for Auth
    res.cookie("jwt", jwtToken, {
      expires: new Date(Date.now() + process.env.JWT_TOKEN),
      // secure:true,
      httpOnly: true,
    });

    return res.status(200).json({
      message: "Logged in successfully",
    });
  };

  logout = (_: Request, res: Response) => {
    res.clearCookie("jwt");
    res.clearCookie("user");

    return res.status(200).json({
      message: "Logged out successfully",
    });
  };
}

export default new AuthController();
