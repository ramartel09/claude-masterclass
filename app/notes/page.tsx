import { getAllLessonsWithMeta } from '@/lib/content'
import NotesPage from '@/components/NotesPage'

export default async function NotesRoute() {
  const lessons = await getAllLessonsWithMeta()
  return <NotesPage lessons={lessons} />
}
