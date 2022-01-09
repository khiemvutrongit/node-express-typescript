import { Request, RequestHandler, Response } from "express";
import { FORBIDDEN, UNAUTHORIZED } from "http-status";
import { getJwtPayload } from "./getJwtPayload";

export interface ConditionHeader {
  permission?: string | string[];
  publicKey: string;
}

export function JwtMiddleware(condition: ConditionHeader): RequestHandler {
  const { publicKey, permission } = condition;

  let requiredPermissions: string[] = [];
  if (typeof permission === "string") {
    requiredPermissions = permission.split(" ");
  }

  if (Array.isArray(permission)) {
    requiredPermissions = permission;
  }

  return async function jwtVerifyMiddleware(req: Request, res: Response, next) {
    try {
      const { headers } = req;

      try {
        req.payload = await getJwtPayload(headers, publicKey);
      } catch (error) {
        res.status(error.status).json(error);
      }

      if (permission) {
        const {
          payload: { permissions },
        } = req;

        const permissionsArr = `${permissions || ""}`.split(" ");
        
        let checkRole = false;
        if (typeof permission == "string") {
          if (permissionsArr.includes(permission)) {
            checkRole = true;
          }
        } else {
          permission.forEach((perm: string) => {
            if (permissionsArr.includes(perm)) {
              checkRole = true;
            }
          });
        }

        if (!checkRole) {
          return res.status(FORBIDDEN).json("Forbidden");
        }

        next();
      }
    } catch (error) {
      return res.status(UNAUTHORIZED).json(error);
    }
  };
}
