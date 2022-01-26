"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtMiddleware = void 0;
const http_status_1 = require("http-status");
const getJwtPayload_1 = require("./getJwtPayload");
function JwtMiddleware(condition) {
    const { publicKey, permission } = condition;
    let requiredPermissions = [];
    if (typeof permission === "string") {
        requiredPermissions = permission.split(" ");
    }
    if (Array.isArray(permission)) {
        requiredPermissions = permission;
    }
    return async function jwtVerifyMiddleware(req, res, next) {
        try {
            const { headers } = req;
            try {
                req.payload = await getJwtPayload_1.getJwtPayload(headers, publicKey);
            }
            catch (error) {
                return res.status(error.status).json(error);
            }
            if (permission) {
                const { payload: { permissions }, } = req;
                const permissionsArr = `${permissions || ""}`.split(" ");
                let checkRole = false;
                if (typeof permission == "string") {
                    if (permissionsArr.includes(permission)) {
                        checkRole = true;
                    }
                }
                else {
                    permission.forEach((perm) => {
                        if (permissionsArr.includes(perm)) {
                            checkRole = true;
                        }
                    });
                }
                if (!checkRole) {
                    return res.status(http_status_1.FORBIDDEN).json("Forbidden");
                }
                next();
            }
        }
        catch (error) {
            return res.status(http_status_1.UNAUTHORIZED).json(error);
        }
    };
}
exports.JwtMiddleware = JwtMiddleware;
