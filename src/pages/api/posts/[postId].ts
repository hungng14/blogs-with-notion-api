import { NOTION_DATABASE_ID } from "@/config/notion";
import { notionClient } from "@/libs/notion";
import { myUpstashRedis } from "@/libs/upstashRedis";
import { reconnect } from "@/utils/reconnect";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "GET") {
      return res.status(404).json({ message: "API NOT FOUND" });
    }
    const postId = req.query.postId as string;
    const postCached = await myUpstashRedis.getData(postId);
    if (postCached) {
      return res.status(200).json({ data: postCached });
    }
    const data = await reconnect(
      async () =>
        await notionClient.pages.retrieve({
          page_id: postId,
        })
    );
    console.log('data', data);
    await myUpstashRedis.setData(postId, data);
    return res.status(200).json({ data });
  } catch (error) {
    console.log("error", error);
    return res.status(400).send(error);
  }
}
