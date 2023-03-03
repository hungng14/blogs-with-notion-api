import { NOTION_TAG_DATABASE_ID } from "@/config/notion";
import { notionClient } from "@/libs/notion";
import { myUpstashRedis } from "@/libs/upstashRedis";
import { authGuardApi } from "@/middlewares/authGuardApi";
import { NextApiRequest, NextApiResponse } from "next";

const handler = authGuardApi(
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      if (req.method !== "POST") {
        return res.status(404).json({ message: "API NOT FOUND" });
      }

      const data = req.body;

      const result = await notionClient.pages.create({
        parent: {
          type: "database_id",
          database_id: NOTION_TAG_DATABASE_ID,
        },
        properties: {
          Name: {
            title: [
              {
                text: {
                  content: data.name,
                },
              },
            ],
          },
        },
      });
      myUpstashRedis.deleteKey('tags');
      return res.status(200).json({ success: true, result });
    } catch (error) {
      console.log("error", error);
      return res.status(400).send(error);
    }
  }
);

export default handler;
