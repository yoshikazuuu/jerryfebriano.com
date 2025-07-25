import { FileTextIcon } from "@/components/ui/file-text";
import Link from "next/link";

export default function MdxLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col justify-center items-center text-sm gap-4 font-sans w-full pb-8 md:pb-12">
      <article className="prose prose-neutral dark:prose-invert max-w-sm md:max-w-lg mb-24">
        {children}
        <footer className="mt-8 pt-8 border-t border-muted not-prose">
          <div className="flex justify-between items-center">
            <Link
              href="/writings"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Back to all posts
            </Link>
            <Link
              href="https://github.com/yoshikazuuu/jerryfebriano.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <FileTextIcon size={16} className="mr-2" />
              View on GitHub
            </Link>
          </div>
        </footer>
      </article>
    </div>
  );
}
