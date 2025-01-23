import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";

interface iAppProps {
  images: string[];
  name: string;
  price: number;
  smallDescription: string;
  id: string;
}

export default function ProductCard({
  images,
  id,
  price,
  smallDescription,
  name,
}: iAppProps) {
  return (
    <div className="rounded-lg ">
      <Carousel>
        <CarouselContent>
          {images.map((img, i) => {
            return (
              <CarouselItem key={i}>
                <div className="relative h-[230px]">
                  <Image
                    src={img}
                    alt="product"
                    fill
                    className="object-cover w-full h-full rounded-lg"
                  />
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="ml-16"/>
        <CarouselNext className="mr-16"/>
      </Carousel>

      <div className="flex justify-between items-center mt-2">
        <h1 className="font-semibold text-xl">{name}</h1>
        <h3 className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/10">
          ${price}
        </h3>
      </div>
      <p className="text-gray-600 line-clamp-2 text-sm mt-2">
        {smallDescription}
      </p>

      <Button asChild className="w-full mt-4">
          <Link href={`/product/${id}`}>Learn more</Link>
      </Button>
    </div>
  );
}

export function LoadingProduct(){
  return(
    <div className="flex flex-col">
      <Skeleton className="h-[230px] w-full" />
      <div className="flex flex-cil mt-2 gap-y-2">
        <Skeleton className="h-4 w-full"/>
        <Skeleton className="h-6 w-full"/>
      </div>

      <Skeleton className="w-full h-10 mt-5"/>
    </div>
  )
}
