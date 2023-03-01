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
    const postsCached = await myUpstashRedis.getData("admin-posts");
    if (postsCached) {
      return res.status(200).json({ data: postsCached });
    }
    const data = await reconnect(
      async () =>
        await notionClient.databases.query({
          database_id: NOTION_DATABASE_ID,
        //   filter: {
        //     and: [
        //       {
        //         property: "Publish",
        //         checkbox: {
        //           equals: true,
        //         },
        //       },
        //     ],
        //   },
        })
    );
    await myUpstashRedis.setData("admin-posts", data);
    return res.status(200).json({ data });
  } catch (error) {
    console.log("error", error);
    return res.status(400).send(error);
  }
}
