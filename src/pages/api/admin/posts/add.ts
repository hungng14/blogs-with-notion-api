import { NOTION_DATABASE_ID } from "@/config/notion";
import { notionClient } from "@/libs/notion";
import { NextApiRequest, NextApiResponse } from "next";
// import { IncomingForm } from "formidable";
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "POST") {
      return res.status(404).json({ message: "API NOT FOUND" });
    }
    // const body = await new Promise<{
    //   fields: Record<string, any>;
    //   files: Record<string, any>;
    // }>((resolve, reject) => {
    //   const form = new IncomingForm();

    //   form.parse(req, (err, fields, files) => {
    //     if (err) return reject(err);
    //     resolve({
    //       fields: Object.keys(fields).reduce(
    //         (obj, key) => ((obj[key] = JSON.parse(fields[key])), obj),
    //         {}
    //       ),
    //       files,
    //     });
    //   });
    // });

    const data = req.body;
    const content = data.content
      .split("</p>")
      .filter((noEmpty) => noEmpty)
      .map((p) => ({
        text: {
          content: p + '</p>',
        },
      }));
    const result = await notionClient.pages.create({
      parent: {
        type: "database_id",
        database_id: NOTION_DATABASE_ID,
      },
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
    return res.status(200).json({ success: true, result });
  } catch (error) {
    console.log("error", error);
    return res.status(400).send(error);
  }
}
