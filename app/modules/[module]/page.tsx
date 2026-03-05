export default async function ModulePage({
  params,
}: {
  params: Promise<{ module: string }>
}) {
  const { module } = await params

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-white mb-4">{module}</h1>
      <p className="text-zinc-400">Lessons will appear here in Phase 2.</p>
    </main>
  )
}
