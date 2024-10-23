'use client'
import Skeleton from "@/components/atoms/skeleton"

export default function LoadingCatalogPage() {
  return (
    <>
      <main className="flex mx-auto">
        <aside className="hidden px-2 2xl:px-4 py-6 h-full w-60 2xl:w-64 lg:flex flex-col gap-6">
          <Skeleton className="w-40 h-8" />

          <Skeleton className="h-full flex flex-col gap-4 border-zinc-400 border-[1px] p-4">
            <Skeleton className="w-full h-6" /> 
            <Skeleton className="w-full h-8" />

            <span>Categorias</span>
            {[...Array(5)].map((_, index) => (
              <div key={index} className="flex gap-2 items-center">
                <Skeleton className="w-4 h-4" />
                <Skeleton className="w-24 h-6" />
              </div>
            ))}
          </Skeleton>
        </aside>

        <section className="py-6 grid grid-cols-1 md:grid-cols-2 xl:min-w-[1148px] xl:grid-cols-4 gap-4 grid-rows-[46px_auto]">
          <div className="w-full xl:w-[50%] col-span-1 md:col-span-2 xl:col-span-4 relative">
            <Skeleton className="w-full h-10" />
          </div>
          {[...Array(12)].map((_, index) => (
            <Skeleton key={index} className="w-full h-80" />
          ))}
        </section>
      </main>

      <footer className="pb-6">
        <Skeleton className="w-full h-12" />
      </footer>
    </>
  );
}
