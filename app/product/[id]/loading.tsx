import { Skeleton } from "@/components/ui/skeleton";

export default function loading() {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 mt-10">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-10">
            <div className="col-span-1">
                <Skeleton className="h-[250px] lg:h-[400px] w-full"/>
                <Skeleton className="h-[500px] mt-10 w-full"/>
            </div>
            <div className="col-span-1">
            <Skeleton className="h-[400px] w-full"/>
            </div>
        </div>
    </section>
  )
}
