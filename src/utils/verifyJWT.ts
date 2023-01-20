import JWT from "jsonwebtoken";

export const verifyJWT = (token: string) => {
  try {
    JWT.verify(token, process.env.JWT_SECRET || "");
    return true;
  } catch (err) {
    return false;
  }
};
