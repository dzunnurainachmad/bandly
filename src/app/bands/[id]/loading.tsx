import { Bone } from '@/components/ui/Skeleton'

export default function BandDetailLoading() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Bone className="h-4 w-24 mb-6" />

      <div className="bg-[#fefaf4] dark:bg-[#231d15] rounded-2xl border border-stone-200 dark:border-stone-700 overflow-hidden">
        <Bone className="aspect-video rounded-none" />

        <div className="p-4 sm:p-6 space-y-5">
          {/* Title + location */}
          <div className="space-y-2">
            <Bone className="h-8 w-2/3" />
            <Bone className="h-4 w-1/3" />
            <Bone className="h-4 w-1/4" />
          </div>

          {/* Genre badges */}
          <div className="flex gap-2">
            <Bone className="h-6 w-16 rounded-full" />
            <Bone className="h-6 w-20 rounded-full" />
            <Bone className="h-6 w-14 rounded-full" />
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <Bone className="h-5 w-24" />
            <Bone className="h-4 w-full" />
            <Bone className="h-4 w-full" />
            <Bone className="h-4 w-3/4" />
          </div>

          {/* Player */}
          <Bone className="h-48 w-full rounded-xl" />

          {/* Contact */}
          <div className="space-y-2">
            <Bone className="h-5 w-40" />
            <div className="flex gap-2">
              <Bone className="h-10 w-44 rounded-lg" />
              <Bone className="h-10 w-28 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
