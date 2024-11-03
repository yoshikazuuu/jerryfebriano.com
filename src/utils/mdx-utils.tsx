import fs from "fs";
import path from "path";
import { PostMetadata, FolderData } from "../types/blog";

export function getBlogDirectories(baseDir: string): string[] {
  return fs.readdirSync(baseDir).filter((folder) => {
    const folderPath = path.join(baseDir, folder);
    return fs.statSync(folderPath).isDirectory();
  });
}

export async function getPostMetadata(
  filePath: string
): Promise<PostMetadata | null> {
  try {
    const content = fs.readFileSync(filePath, "utf-8");
    const metadataMatch = content.match(
      /export const metadata = ({[\s\S]*?});/
    );

    if (!metadataMatch) {
      return null;
    }

    const metadataString = metadataMatch[1];
    const metadata = eval(`(${metadataString})`);

    return metadata;
  } catch (error) {
    console.error(`Error reading metadata from ${filePath}:`, error);
    return null;
  }
}

export async function getAllPostsMetadata(
  baseDir: string
): Promise<FolderData[]> {
  const folders = getBlogDirectories(baseDir);

  return Promise.all(
    folders.map(async (folderName) => {
      const mdxPath = path.join(baseDir, folderName, "page.mdx");
      const metadata = await getPostMetadata(mdxPath);

      return {
        folderName,
        metadata: metadata || {
          title: folderName,
          description: "",
          date: new Date().toISOString(),
          slug: folderName,
        },
      };
    })
  );
}
