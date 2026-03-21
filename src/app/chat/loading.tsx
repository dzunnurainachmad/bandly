import { Bone } from '@/components/ui/Skeleton'

export default function ChatLoading() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 flex flex-col min-h-[calc(100vh-3.5rem)]">
      {/* Header */}
      <div className="text-center mb-8">
        <Bone className="w-10 h-10 rounded-xl mx-auto mb-2" />
        <Bone className="h-7 w-40 mx-auto mb-2" />
        <Bone className="h-4 w-64 mx-auto" />
      </div>

      {/* Suggestion pills */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        <Bone className="h-7 w-36 rounded-full" />
        <Bone className="h-7 w-44 rounded-full" />
        <Bone className="h-7 w-40 rounded-full" />
        <Bone className="h-7 w-32 rounded-full" />
      </div>

      {/* Input bar */}
      <div className="mt-auto">
        <Bone className="h-12 w-full rounded-2xl" />
      </div>
    </div>
  )
}
