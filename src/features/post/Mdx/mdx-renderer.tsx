import { MDXRemote } from "next-mdx-remote/rsc";
import { useMDXComponents } from "./mdx-components";

export default function MDXRenderer({ source }: { source: string }) {
  const components = useMDXComponents();
  if (!source?.trim()) return <p>No content to render.</p>;
  return <MDXRemote source={source} components={components} />;
}
