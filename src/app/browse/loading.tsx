import { Bone, CardSkeleton } from '@/components/ui/Skeleton'

export default function BrowseLoading() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <Bone className="h-7 w-48 mb-6" />
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filter sidebar skeleton */}
        <div className="md:w-56 lg:w-64 shrink-0 space-y-4 bg-[#fefaf4] dark:bg-[#231d15] border border-stone-200 dark:border-stone-700 rounded-2xl p-4">
          <Bone className="h-5 w-20" />
          <Bone className="h-9 w-full" />
          <Bone className="h-9 w-full" />
          <Bone className="h-9 w-full" />
          <Bone className="h-9 w-full" />
          <Bone className="h-5 w-36" />
        </div>

        {/* Cards grid skeleton */}
        <div className="flex-1 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
