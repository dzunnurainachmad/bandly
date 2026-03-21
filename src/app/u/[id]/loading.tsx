import { Bone, CardSkeleton } from '@/components/ui/Skeleton'

export default function PublicProfileLoading() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* Profile header */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5 mb-8">
        <Bone className="w-20 h-20 rounded-full shrink-0" />
        <div className="space-y-2 w-full text-center sm:text-left">
          <Bone className="h-6 w-40 mx-auto sm:mx-0" />
          <Bone className="h-4 w-24 mx-auto sm:mx-0" />
          <Bone className="h-4 w-72 mx-auto sm:mx-0" />
        </div>
      </div>

      {/* Section title */}
      <Bone className="h-6 w-48 mb-4" />

      {/* Band cards */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}
