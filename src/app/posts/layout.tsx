import { FileText } from "lucide-react";
import Link from "next/link";

export default function MdxLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col justify-center items-center text-sm gap-4 font-mono w-full">
      <div className="max-w-sm md:max-w-lg mb-24">
        {children}
        <footer className="mt-8 pt-8 border-t border-muted">
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
              <FileText className="w-4 h-4 mr-2" />
              View on GitHub
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
