import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(): MDXComponents {
  return {
    code: ({ children, ...props }) => (
      <code className="bg-zinc-800 px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
        {children}
      </code>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-indigo-500 bg-indigo-950/30 pl-4 py-2 rounded-r-lg italic my-4">
        {children}
      </blockquote>
    ),
    h2: ({ children }) => (
      <h2 className="text-xl font-semibold text-white mt-10 mb-4 pb-2 border-b border-zinc-700">
        {children}
      </h2>
    ),
  }
}
