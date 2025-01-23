import prisma from "@/lib/db";
import { CategoryTypes } from "@prisma/client";
import Link from "next/link"
import ProductCard, { LoadingProduct } from "./ProductCard";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

async function getData(category : string) {
    let data;
    if (category !== 'newest') {
        data = await prisma.product.findMany({
            where:{
                category: category as CategoryTypes
            },
            select: {
                id: true,
                name: true,
                price: true,
                images: true,
                category: true,
                smallDescription: true
            },
            take:4,
            orderBy:{
                createdAt: 'desc'
            }
        })
    } else{
         data = await prisma.product.findMany({
            select: {
                id: true,
                name: true,
                price: true,
                images: true,
                category: true,
                smallDescription: true
            },
            take:4,
            orderBy:{
                createdAt: 'desc'
            }
        })
    }
    return data
}


export default async function PorductsRow({category}: {category:string}) {
    
  return (
    <section className="mt-12">
        <Suspense fallback={<Skele/>}>
        <LoadRows category={category}/>
        </Suspense>
    </section>
  )
}

async function LoadRows({category}: {category:string}){
    const data = await getData(category)
    return(
        <>
        <div className="md:flex md:items-center md:justify-between">
            <h2 className="text-2xl font-extrabold tracking-tight capitalize">{category}</h2>
            <Link href={`/products/${category}`} className="text-sm hidden font-medium text-primary hover:text-primary/90 md:block">
                All Products <span>&rarr;</span>
            </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 mt-4 gap-10">
            {data.map((product) => {
                return (
                    <ProductCard key={product.id} images={product.images} id={product.id} name={product.name} price={product.price} smallDescription={product.smallDescription}/>
                )
            })}
        </div>
        </>
    )
}

function Skele(){
    return(
        <div>
            <Skeleton className="h-8 w-56"/>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 lg:grid-cols-3 mt-4">
                <LoadingProduct/>
            </div>
        </div>
    )
}
