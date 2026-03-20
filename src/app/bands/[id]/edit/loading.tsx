import { FormSkeleton } from '@/components/ui/Skeleton'

export default function EditBandLoading() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="h-8 w-36 bg-stone-200 dark:bg-stone-700 rounded-lg animate-pulse mb-6" />
      <FormSkeleton variant="edit" />
    </div>
  )
}
