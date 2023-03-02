import { NOTION_USER_DATABASE_ID } from "@/config/notion";
import { notionClient } from "@/libs/notion";
import { NextApiRequest, NextApiResponse } from "next";
import { createHash } from "crypto";
import { signPayload } from "@/libs/jwt";
import { setCookie } from "cookies-next";
import { JWT_EXPIRES_IN } from "@/config/jwt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "POST") {
      return res.status(404).json({ message: "API NOT FOUND" });
    }

    const { email, password } = req.body;

    const { results } = await notionClient.databases.query({
      database_id: NOTION_USER_DATABASE_ID,
      filter: {
        and: [
          {
            property: "Email",
            title: {
              equals: email,
            },
          },
        ],
      },
    });
    if (!results?.length) {
      return res.status(404).json({ message: "Email or Password invalid" });
    }
    const hashPassword = createHash("sha256", {})
      .update(password)
      .digest("hex");
    const passSaved = (results[0] as any).properties.Password.rich_text[0]
      .plain_text;
    if (hashPassword !== passSaved) {
      return res.status(404).json({ message: "Email or Password invalid" });
    }
    const accessToken = signPayload({ email });
    const expiresTime = parseInt(JWT_EXPIRES_IN, 10);
    const expiresIn = new Date(new Date().getTime() + 1000 * 60 * 60 * expiresTime);
    setCookie("authorize_key", accessToken, {
      req,
      res,
      expires: expiresIn,
      httpOnly: false,
    });
    return res.status(200).json({ success: true, data: { accessToken } });
  } catch (error) {
    console.log("error", error);
    return res.status(400).json({message: 'Something went wrong'});
  }
}
