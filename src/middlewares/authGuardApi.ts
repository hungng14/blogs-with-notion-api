import { NextApiRequest, NextApiResponse } from "next";
import { verifyToken } from "@/libs/jwt";

type HandlerFn = (req: NextApiRequest, res: NextApiResponse) => any;

export const authGuardApi = (cb: HandlerFn) => {
  return (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const token = req.cookies.authorize_key as string;
      if (!token || !verifyToken(token)) {
        return res.status(401).send({ message: "Unauthorized", status: 401 });
      }
      return cb(req, res);
    } catch (error) {
      return res.status(401).send({ message: "Unauthorized", status: 401 });
    }
  };
};
