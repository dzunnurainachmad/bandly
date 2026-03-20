import { FormSkeleton } from '@/components/ui/Skeleton'

export default function SubmitLoading() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="h-8 w-72 bg-stone-200 dark:bg-stone-700 rounded-lg animate-pulse mb-2" />
      <div className="h-4 w-full max-w-sm bg-stone-200 dark:bg-stone-700 rounded animate-pulse mb-8" />
      <FormSkeleton variant="submit" />
    </div>
  )
}
