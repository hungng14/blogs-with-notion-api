import { NOTION_DATABASE_ID } from "@/config/notion";
import { notionClient } from "@/libs/notion";
import { myUpstashRedis } from "@/libs/upstashRedis";
import { reconnect } from "@/utils/reconnect";
import { NextApiRequest, NextApiResponse } from "next";
import { QueryDatabaseParameters } from "@notionhq/client/build/src/api-endpoints";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "GET") {
      return res.status(404).json({ message: "API NOT FOUND" });
    }
    let keyCached = "posts";
    const query = req.query;
    if (query.tag) {
      keyCached += `-${query.tag}`;
    }
    const postsCached = await myUpstashRedis.getData(keyCached);
    if (postsCached) {
      return res.status(200).json({ data: postsCached });
    }
    const queryFilters: QueryDatabaseParameters = {
      database_id: NOTION_DATABASE_ID,
    };
    queryFilters.filter = {
      and: [
        {
          property: "Publish",
          checkbox: {
            equals: true,
          },
        },
      ],
    };
    if (query.tag) {
      queryFilters.filter.and.push({
        property: "Tags",
        multi_select: {
          contains: query.tag as string,
        },
      });
    }

    const data = await reconnect(
      async () => await notionClient.databases.query(queryFilters)
    );
    await myUpstashRedis.setData(keyCached, data);
    return res.status(200).json({ data });
  } catch (error) {
    console.log("error", error);
    return res.status(400).send(error);
  }
}
