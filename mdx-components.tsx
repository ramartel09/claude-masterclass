import React from 'react'
import type { MDXComponents } from 'mdx/types'
import { CopyButton } from '@/components/CopyButton'

function extractText(children: React.ReactNode): string {
  if (typeof children === 'string') return children
  if (Array.isArray(children)) return children.map(extractText).join('')
  if (React.isValidElement<{ children?: React.ReactNode }>(children) && children.props.children) {
    return extractText(children.props.children)
  }
  return ''
}

export function useMDXComponents(): MDXComponents {
  return {
    code: ({ children, ...props }) => (
      <code className="bg-zinc-800 px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
        {children}
      </code>
    ),
    blockquote: ({ children }) => {
      const text = extractText(children)
      return (
        <blockquote className="relative border-l-4 border-indigo-500 bg-indigo-950/30 pl-4 pr-10 py-3 rounded-r-lg italic my-4">
          {children}
          <CopyButton text={text} />
        </blockquote>
      )
    },
    h2: ({ children, ...props }) => {
      const text = String(children)
      const isTryIt = text.startsWith('Try It')
      return (
        <h2
          {...props}
          data-section={isTryIt ? 'try-it' : 'learn'}
          className={
            isTryIt
              ? 'text-xl font-semibold text-white mt-10 mb-4 pb-2 border-b border-zinc-700 try-it-heading'
              : 'text-xl font-semibold text-white mt-10 mb-4 pb-2 border-b border-zinc-700'
          }
        >
          {children}
        </h2>
      )
    },
  }
}
