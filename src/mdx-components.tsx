import React, { ComponentPropsWithoutRef } from "react";
import { Link } from "next-view-transitions";
import type { MDXComponents } from "mdx/types";
import { highlight } from "sugar-high";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
type HeadingProps = ComponentPropsWithoutRef<"h1">;
type ParagraphProps = ComponentPropsWithoutRef<"p">;
type ListProps = ComponentPropsWithoutRef<"ul">;
type ListItemProps = ComponentPropsWithoutRef<"li">;
type AnchorProps = ComponentPropsWithoutRef<"a">;
type BlockquoteProps = ComponentPropsWithoutRef<"blockquote">;

const components: MDXComponents = {
  h1: (props: HeadingProps) => (
    <h1
      className="font-black text-foreground pt-12 text-2xl tracking-tight mb-0 fade-in"
      {...props}
    />
  ),
  h2: (props: HeadingProps) => (
    <h2 className="text-foreground font-bold text-lg mt-5 mb-3" {...props} />
  ),
  h3: (props: HeadingProps) => (
    <h3 className="text-foreground font-bold text-lg mt-5 mb-3" {...props} />
  ),
  h4: (props: HeadingProps) => <h4 className="font-bold" {...props} />,
  p: (props: ParagraphProps) => (
    <p className="text-foreground leading-relaxed" {...props} />
  ),
  ol: (props: ListProps) => (
    <ol className="text-foreground list-decimal pl-5 space-y-2" {...props} />
  ),
  ul: (props: ListProps) => (
    <ul className="text-foreground list-disc pl-5 space-y-1" {...props} />
  ),
  li: (props: ListItemProps) => <li className="pl-1" {...props} />,
  em: (props: ComponentPropsWithoutRef<"em">) => (
    <em className="font-bold" {...props} />
  ),
  strong: (props: ComponentPropsWithoutRef<"strong">) => (
    <strong className="font-bold" {...props} />
  ),
  a: ({ href, children, ...props }: AnchorProps) => {
    const className = "text-blue-500 hover:text-blue-700";
    if (href?.startsWith("/")) {
      return (
        <Link href={href} className={className} {...props}>
          {children}
        </Link>
      );
    }
    if (href?.startsWith("#")) {
      return (
        <a href={href} className={className} {...props}>
          {children}
        </a>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        {...props}
      >
        {children}
      </a>
    );
  },
  code: ({ children, ...props }: ComponentPropsWithoutRef<"code">) => {
    const codeHTML = highlight(children as string);
    return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
  },
  Table: ({ data }: { data: { headers: string[]; rows: string[][] } }) => (
    <div className="rounded-lg my-6 border bg-card text-card-foreground shadow">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-border hover:bg-transparent">
            {data.headers.map((header, index) => (
              <TableHead
                key={index}
                className="h-12 px-4 text-left align-middle font-bold py-2 text-sm text-foreground"
              >
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.rows.map((row, index) => (
            <TableRow
              key={index}
              className="border-b border-border transition-colors hover:bg-muted/50"
            >
              {row.map((cell, cellIndex) => (
                <TableCell key={cellIndex} className="p-2 align-middle text-sm">
                  {cell}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  ),
  blockquote: (props: BlockquoteProps) => (
    <blockquote
      className="my-6 border-l-4 border-emerald-200 bg-emerald-500/20 pl-6 pr-4 py-4 text-gray-700 italic rounded-r-lg shadow-sm"
      {...props}
    />
  ),
};

export function useMDXComponents(
  otherComponents: MDXComponents
): MDXComponents {
  return {
    ...otherComponents,
    ...components,
  };
}
