import { Bone, CardSkeleton } from '@/components/ui/Skeleton'

export default function SavedLoading() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-center gap-3 mb-8">
        <Bone className="w-6 h-6 rounded" />
        <Bone className="h-7 w-40" />
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}
