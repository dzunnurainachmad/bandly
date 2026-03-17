import { Bone } from '@/components/ui/Skeleton'

export default function Loading() {
  return (
    <div>
      {/* Hero skeleton */}
      <section className="bg-linear-to-br from-amber-700 to-amber-900 py-12 sm:py-20 px-4">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <Bone className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mx-auto bg-white/20" />
          <Bone className="h-8 sm:h-12 w-3/4 mx-auto bg-white/20" />
          <Bone className="h-4 sm:h-5 w-2/3 mx-auto bg-white/20" />
          <div className="flex gap-3 justify-center pt-4">
            <Bone className="h-12 w-36 rounded-xl bg-white/20" />
            <Bone className="h-12 w-44 rounded-xl bg-white/20" />
          </div>
        </div>
      </section>

      {/* Features skeleton */}
      <section className="max-w-5xl mx-auto px-4 py-10 sm:py-16 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="text-center space-y-3">
            <Bone className="w-12 h-12 rounded-xl mx-auto" />
            <Bone className="h-5 w-32 mx-auto" />
            <Bone className="h-4 w-48 mx-auto" />
          </div>
        ))}
      </section>

      {/* Genre pills skeleton */}
      <section className="max-w-5xl mx-auto px-4 pb-16">
        <Bone className="h-6 w-40 mb-4" />
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 10 }).map((_, i) => (
            <Bone key={i} className="h-8 w-20 rounded-full" />
          ))}
        </div>
      </section>
    </div>
  )
}
