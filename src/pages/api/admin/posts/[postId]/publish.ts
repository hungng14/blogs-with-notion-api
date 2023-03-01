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
    const result = await notionClient.pages.update({
      page_id: postId,
      properties: {
        Publish: {
          checkbox: data.publish
        },
      },
    });
    myUpstashRedis.deleteKey('posts');
    myUpstashRedis.setData(postId, result);
    return res.status(200).json({ success: true, result });
  } catch (error) {
    console.log("error", error);
    return res.status(400).send(error);
  }
}
