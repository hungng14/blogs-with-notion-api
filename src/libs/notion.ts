import { NOTION_AUTH_TOKEN, NOTION_VERSION } from "@/config/notion";
import { Client } from "@notionhq/client";

export const notionClient = new Client({
  auth: NOTION_AUTH_TOKEN,
  notionVersion: NOTION_VERSION
});
