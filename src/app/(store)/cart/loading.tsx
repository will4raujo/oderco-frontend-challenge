import Skeleton from "@/components/atoms/skeleton"
export default function LoadingCartPage() {
  return (
    <>
      <main className="my-6 flex flex-col md:grid grid-cols-6 gap-4 max-w-[1440px] px-4 lg:px-10">
        <div className="col-span-3 lg:col-span-4 flex flex-col gap-4 mb-4">
          <Skeleton className="h-8 w-1/2" />
          <Skeleton className="h-6 w-1/3" />

          <div className="flex flex-col gap-4 flex-1">
            <Skeleton className="h-12 w-full" />
            {Array.from({ length: 3 }).map((_, index) => ( // Placeholder para produtos no carrinho
              <Skeleton key={index} className="h-20 w-full" />
            ))}
          </div>
        </div>

        <div className="col-span-3 lg:col-span-2 px-4 py-6 uppercase flex flex-col gap-4">
          <Skeleton className="h-8 w-1/2" />

          <div className="flex justify-between">
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-6 w-1/4" />
          </div>
          <div className="flex justify-between">
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-6 w-1/4" />
          </div>
          <div className="flex justify-between">
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-6 w-1/4" />
          </div>

          <div className="mt-4 h-full flex flex-col justify-between">
            <div className="mt-10 md:mt-0 flex flex-col gap-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} className="h-4 w-1/2" />
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}