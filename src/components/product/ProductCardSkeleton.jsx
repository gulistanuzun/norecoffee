import { Skeleton } from '../ui/Skeleton.jsx';

export function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-lg border border-cream-dark bg-ivory">
      <Skeleton className="aspect-square rounded-none" />
      <div className="p-5">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-5 w-12" />
        </div>
        <Skeleton className="mt-2 h-4 w-24" />
        <Skeleton className="mt-4 h-7 w-28 rounded-full" />
      </div>
    </div>
  );
}
