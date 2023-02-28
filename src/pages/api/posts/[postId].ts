import { NOTION_DATABASE_ID } from "@/config/notion";
import { notionClient } from "@/libs/notion";
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
    const data = await notionClient.pages.retrieve({
      page_id: postId,
    //   filter_properties: {
    //     and: [
    //       {
    //         property: "Publish",
    //         checkbox: {
    //           equals: true,
    //         },
    //       },
    //     ],
    //   },
    });
    return res.status(200).json({ data });
  } catch (error) {
    console.log("error", error);
    return res.status(400).send(error);
  }
}
