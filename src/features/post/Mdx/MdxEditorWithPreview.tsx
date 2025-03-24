"use client";

import { compile } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";

export async function compileMdx(code: string) {
  const compiled = await compile(code, { outputFormat: "function-body" });
  const fn = new Function("React", "jsx", "jsxs", `${compiled}`);
  const reactComponentFunction = fn(runtime, runtime.jsx, runtime.jsxs).default;
  return reactComponentFunction;
}

import { useState, useEffect } from "react";
import { MDXProvider } from "@mdx-js/react";
import { useMDXComponents } from "./mdx-components";

export default function MdxEditorWithPreview({
  initialContent = `# Hello\n\nThis is **live MDX preview**!`,
}: {
  initialContent?: string;
}) {
  const [content, setContent] = useState(initialContent);
  const [Compiled, setCompiled] = useState<React.ReactNode | null>(null);
  const [error, setError] = useState<string | null>(null);
  const components = useMDXComponents();

  useEffect(() => {
    compileMdx(content)
      .then((CompiledComponent) =>
        setCompiled(
          <MDXProvider components={components}>
            <CompiledComponent components={components} />
          </MDXProvider>
        )
      )
      .catch((err) => setError(err.message));
  }, [content, components]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <textarea
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
          setError(null);
        }}
        className="w-full h-80 p-2 border rounded font-mono"
      />
      <div className="border p-4 rounded bg-white shadow prose dark:prose-invert max-w-none">
        {error ? <pre className="text-red-500">{error}</pre> : Compiled}
      </div>
    </div>
  );
}
