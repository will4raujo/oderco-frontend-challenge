import Skeleton from "@/components/atoms/skeleton";

export default function LoadingAdminProductsPage() {
  return (
    <main className='flex flex-col mx-auto lg:w-[1024px] xl:w-[1280px] 2xl:w-[1440px] px-10 my-4'>
      <Skeleton className='h-8 w-1/4' /> 

      <div className='flex gap-4 justify-end'>
        <Skeleton className="h-10 w-24" />
      </div>
      <div className="flex items-center py-4 relative w-[400px] gap-10">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-36" />
      </div>
      {[...Array(10)].map((_, index) => (
        <Skeleton key={index} className="h-10 w-full" />
      ))}
    </main>
  );
}
