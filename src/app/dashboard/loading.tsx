import { Bone, CardSkeleton } from '@/components/ui/Skeleton'

export default function DashboardLoading() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-2">
          <Bone className="h-7 w-32" />
          <Bone className="h-4 w-48" />
        </div>
        <Bone className="h-10 w-36 rounded-lg" />
      </div>

      <Bone className="h-4 w-16 mb-4" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}
