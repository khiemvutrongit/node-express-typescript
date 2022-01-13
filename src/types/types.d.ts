import { Payload } from "../middleware/getJwtPayload";

declare global {
  namespace Express {
    interface Request {
      payload: Payload;
    }
  }
}