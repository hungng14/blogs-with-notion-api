import { notionClient } from "@/libs/notion";
import { myUpstashRedis } from "@/libs/upstashRedis";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "PUT") {
      return res.status(404).json({ message: "API NOT FOUND" });
    }
    const postId = req.query.postId as string;
    const data = req.body;
    const content = data.content
      .split("</p>")
      .filter((noEmpty) => noEmpty)
      .map((p) => ({
        text: {
          content: p + '</p>',
        },
      }));
    const result = await notionClient.pages.update({
      page_id: postId,
      properties: {
        Title: {
          title: [
            {
              text: {
                content: data.title,
              },
            },
          ],
        },
        Content: {
          rich_text: content,
        },
        Description: {
          rich_text: [
            {
              text: {
                content: data.description,
              },
            },
          ],
        },
        Tags: {
          multi_select: (data.tags || []).map((tag) => ({ name: tag })),
        },

      },
    });
    myUpstashRedis.setData(postId, result);
    return res.status(200).json({ success: true, result });
  } catch (error) {
    console.log("error", error);
    return res.status(400).send(error);
  }
}
