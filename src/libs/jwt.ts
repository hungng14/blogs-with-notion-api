import { JWT_EXPIRES_IN, JWT_SECRET_KEY } from "@/config/jwt";
import jwt from "jsonwebtoken";

export const signPayload = (payload: Record<string, any>) => {
  return jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: JWT_EXPIRES_IN });
};

export const verifyToken = (token: string) => {
    return jwt.verify(token, JWT_SECRET_KEY);
}
