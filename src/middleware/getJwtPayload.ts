const bearerRegex = /^Bearer\ /;
import { Request } from "express";
import { UNAUTHORIZED } from "http-status";
import jwt from "jsonwebtoken";

export interface Payload {
  acc: string;
  permissions: string | string[];
  property?: Array<string>
  email: string;
  iat?: number;
  exp?: number;
}

export async function getJwtPayload(headers: Request["headers"], publicKey: string): Promise<Payload> {
  try {
    const authorization = headers['authorization'];
    if (
      !authorization // authorization does not exist
      || typeof authorization !== "string" // authorization is not a string
      || !bearerRegex.test(authorization) // authorization not starts with `Bearer `
    ) {
      throw {
        status: UNAUTHORIZED,
        message: new Error("Invalid authorization header")
      }
    }

    // remove `Bearer ` from auth header to get token
    const token = authorization.replace(bearerRegex, "");
    if (!`${publicKey}`.trim().length) {
      throw {
        status: UNAUTHORIZED,
        message: new Error("Unable to verify jwt")
      }
    }

    try {
      const verifyOptions: jwt.VerifyOptions = {
        algorithms: [
          "RS256",
        ]
      };
      return jwt.verify(token, publicKey, verifyOptions) as Payload;
    } catch (error) {
      error.status = UNAUTHORIZED;
      throw error;
    }
  } catch (error) {
    throw error;
  }
}