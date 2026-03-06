'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu } from 'lucide-react'
import { Sidebar } from '@/components/Sidebar'
import type { LessonWithMeta } from '@/lib/content'

interface AppShellProps {
  lessons: LessonWithMeta[]
  children: React.ReactNode
}

export default function AppShell({ lessons, children }: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    if (sidebarOpen) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
    return () => {
      document.body.classList.remove('overflow-hidden')
    }
  }, [sidebarOpen])

  return (
    <div className="flex min-h-screen">
      {/* Sidebar — desktop: static column; mobile: fixed overlay */}
      <aside
        className={[
          'fixed left-0 top-0 h-full w-64 z-50 bg-zinc-900 border-r border-zinc-800 overflow-y-auto transform transition-transform duration-200 ease-in-out',
          'lg:static lg:translate-x-0 lg:flex lg:flex-col',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
        ].join(' ')}
      >
        <Sidebar lessons={lessons} onClose={() => setSidebarOpen(false)} />
      </aside>

      {/* Backdrop — mobile only, shown when sidebar is open */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content area */}
      <div className="flex flex-col flex-1 lg:ml-0 min-w-0">
        {/* Header */}
        <header className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-sm sticky top-0 z-30">
          <div className="px-4 sm:px-6 py-4 flex items-center gap-3">
            {/* Hamburger — mobile only */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-1 rounded-md text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors"
              aria-label="Open navigation"
            >
              <Menu size={20} />
            </button>
            <Link
              href="/"
              className="text-lg font-bold text-white hover:text-indigo-400 transition-colors"
            >
              Claude Masterclass
            </Link>
          </div>
        </header>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}
