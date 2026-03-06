import type { LessonWithMeta } from '@/lib/content'

export interface NoteEntry {
  lessonId: string // format: "module-slug/lesson-slug"
  module: string
  lesson: string
  text: string
}

export function groupNotesByModule(
  lessons: LessonWithMeta[],
  notes: Record<string, string>
): Array<{ moduleName: string; entries: NoteEntry[] }> {
  // Filter to lessons with non-empty notes
  const withNotes = lessons.filter((l) => {
    const lessonId = `${l.module}/${l.lesson}`
    return notes[lessonId] && notes[lessonId].trim().length > 0
  })

  // Group by module in lessons array order (lessons already ordered)
  const moduleMap = new Map<string, NoteEntry[]>()
  for (const l of withNotes) {
    const lessonId = `${l.module}/${l.lesson}`
    const entry: NoteEntry = {
      lessonId,
      module: l.module,
      lesson: l.lesson,
      text: notes[lessonId],
    }
    const existing = moduleMap.get(l.module) ?? []
    existing.push(entry)
    moduleMap.set(l.module, existing)
  }

  return Array.from(moduleMap.entries()).map(([moduleName, entries]) => ({
    moduleName,
    entries,
  }))
}
