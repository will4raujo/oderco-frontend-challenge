import Skeleton from "@/components/atoms/skeleton";

export default function LoadingProductDetailPage() {
  return (
    <>
      <main className="p-2 md:p-4 py-6 lg:p-10 max-w-[1440px] mx-auto">
      <Skeleton className="h-8 md:h-10 w-1/2 mb-6" />
      
      <div className="flex flex-col md:flex-row md:justify-between gap-4 my-6">
        <Skeleton className="w-[360px] h-[360px]" />
        
        <div className="flex flex-col justify-between lg:pr-8 my-6 md:my-0">
          <div className="flex flex-col gap-2 font-bold my-6 md:my-0">
            <Skeleton className="h-12 md:h-16 w-32" />
            <Skeleton className="h-4 md:h-6 w-60" />
          </div>

          <Skeleton className="h-16 w-64" />
        </div>

        <div className="hidden xl:flex flex-col gap-4">
          <Skeleton className="h-8 w-48" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-20 w-64" />
            <Skeleton className="h-20 w-64" />
            <Skeleton className="h-20 w-64" />
          </div>
        </div>
      </div>

      <Skeleton className="h-8 w-48 mb-4" />
      <Skeleton className="h-20 w-full" />

      <div className="flex flex-col gap-4 xl:hidden my-6">
        <Skeleton className="h-8 w-48" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </div>
      </div>
    </main>
    </>
  );
}