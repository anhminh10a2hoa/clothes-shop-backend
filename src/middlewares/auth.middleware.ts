import * as jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

/////  if 3rd param is next() & jwt cookie token is NOT valid then just redirected to LoginPage
export const checkJwt = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  _checkJwt(req, res, next);
};

export const isLogged = async (
  req: Request,
  res: Response,
  _: NextFunction
) => {
  _checkJwt(req, res, "isLoggedIn");
};

//////// Method  created Code Reusablity of ChecKJWT & isLogged both method using 95% same Code
const _checkJwt = async (req: Request, res: Response, next: any) => {
  //Get the jwt token from the head
  // const token = <string>req.headers['auth']
  if(!req.headers.cookie) {
    return res.status(401).json({
      error: "401 (unauthorized), Please login first",
    });
  }
  let jwtCookieToken = req.headers.cookie.split('jwt=')[1];
  let jwtPayload;
  console.log(jwtCookieToken)

  //Try to validate the token and get data
  try {
    jwtPayload = await (<any>(
      jwt.verify(
        jwtCookieToken,
        process.env.JWT_TOKEN ? process.env.JWT_TOKEN : "abcdef123"
      )
    ));
    res.locals.jwtPayload = jwtPayload;
  } catch (err) {
    // If token is not valid, respond with 401 (unauthorized)
    // Throw an error just in case anything goes wrong with verification
    res.status(401).json({
      error: "401 (unauthorized), Please login first",
    });
    throw new Error(err);
    return;
  }

  // The token is valid for 1 hour
  // We want to send a new token on every request
  const { id, username } = jwtPayload;
  //Sing JWT, valid for 1 hour
  const jwtToken = jwt.sign(
    { id, username },
    process.env.JWT_TOKEN ? process.env.JWT_TOKEN : "abcdef123",
    {
      expiresIn: process.env.JWT_TOKEN_EXPIRES_IN_HOUR,
    }
  );

  // // res.setHeader('jwt', jwtToken)

  /// creating Cookie in Client machine for Auth
  res.cookie("jwt", jwtToken, {
    expires: new Date(
      Date.now() + (process.env.JWT_TOKEN ? process.env.JWT_TOKEN : "abcdef123")
    ),
    // secure:true,
    httpOnly: true,
  });
  /// creating Cookie of Logged user Details in claint machine
  res.cookie("user", jwtPayload, {
    expires: new Date(
      Date.now() + (process.env.JWT_TOKEN ? process.env.JWT_TOKEN : "abcdef123")
    ),
  });

  //Call the next middleware or controller
  if (next !== "isLoggedIn") {
    return next();
  }
};
