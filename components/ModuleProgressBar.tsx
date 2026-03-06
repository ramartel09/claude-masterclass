'use client'

interface ModuleProgressBarProps {
  completedCount: number
  total: number
}

export function ModuleProgressBar({ completedCount, total }: ModuleProgressBarProps) {
  const percent = total > 0 ? Math.round((completedCount / total) * 100) : 0

  return (
    <div className="space-y-1">
      <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
        <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${percent}%` }} />
      </div>
      <p className="text-xs text-zinc-500">{completedCount} / {total} lessons</p>
    </div>
  )
}
