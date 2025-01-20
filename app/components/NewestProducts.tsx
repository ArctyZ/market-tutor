import prisma from "@/lib/db"
import Link from "next/link";
import ProductCard from "./ProductCard";

async function getData(){
    const data = await prisma.product.findMany({
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
    return data;
}

export default async function NewestProducts() {
    const data = await getData();
  return (
    <section className="mt-12">
        <div className="md:flex md:items-center md:justify-between">
            <h2 className="text-2xl font-extrabold tracking-tight">Newest Products</h2>
            <Link href="#" className="text-sm hidden font-medium text-primary hover:text-primary/90 md:block">
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
    </section>
  )
}
