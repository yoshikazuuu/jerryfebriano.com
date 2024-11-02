import fs from "fs";
import path from "path";
import WritingsPageClient from "./page.client";
import Link from "next/link";

export default function WritingsPage() {
  const dir = path.join(process.cwd(), "src/app/writings");
  const folders = fs.readdirSync(dir).filter((folder) => {
    const folderPath = path.join(dir, folder);
    return fs.statSync(folderPath).isDirectory();
  });

  return (
    <WritingsPageClient>
      <ul>
        {folders.map((folder) => (
          <li key={folder}>
            <Link href={`/writings/${folder}`}>Kek</Link>
          </li>
        ))}
      </ul>
    </WritingsPageClient>
  );
}
