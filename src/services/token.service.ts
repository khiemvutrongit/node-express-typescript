import jwt, { SignOptions } from "jsonwebtoken";
import { Payload } from "../middleware";

export const generateToken = (payload: Payload, privateKey: any) => {
  const signOptions: SignOptions = {
    expiresIn: "15m",
    algorithm: "RS256"
  };
  return jwt.sign(payload, privateKey, signOptions);
}