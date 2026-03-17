export function Bone({ className }: { className?: string }) {
  return <div className={`bg-stone-200 dark:bg-stone-700 rounded-lg animate-pulse ${className ?? ''}`} />
}

export function CardSkeleton() {
  return (
    <div className="bg-[#fefaf4] dark:bg-[#231d15] rounded-2xl border border-stone-200 dark:border-stone-700 overflow-hidden">
      <Bone className="aspect-video rounded-none" />
      <div className="p-4 space-y-3">
        <Bone className="h-5 w-3/4" />
        <Bone className="h-4 w-1/2" />
        <Bone className="h-4 w-full" />
        <div className="flex gap-2 pt-2">
          <Bone className="h-6 w-16 rounded-full" />
          <Bone className="h-6 w-16 rounded-full" />
        </div>
      </div>
    </div>
  )
}
