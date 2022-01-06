import jwt from "jsonwebtoken";
import { payload, privateKey, signOptions } from "../mocks/jwt";

export const generateToken = () => {
  return jwt.sign(payload, privateKey, signOptions);
}