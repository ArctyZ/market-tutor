import ProductCard from "@/app/components/ProductCard";
import prisma from "@/lib/db"
import { type CategoryTypes } from "@prisma/client";
import { notFound } from "next/navigation";


async function getData(category: string) {
    let input;
    switch (category){
      case 'template':
        input = 'template';
        break;
      case 'uikit':
        input = 'uikit';
        break;
      case 'icon':
        input = 'icon';
        break;
      case 'newest':
        input = undefined;
        break;
      default:
        return notFound();
    }

    const data = await prisma.product.findMany({
      where:{
        category: input as CategoryTypes,
      },
      select:{
        id: true,
        smallDescription:true,
        images: true,
        name:true,
        price: true
      }
    })
    return data
}

export default async function page({params} : {params: {category: string}}) {
  const data = await getData(params.category)

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mt-4 lg:grid-cols-3 ">
          {data.map((product) => {
            return <ProductCard key={product.id} images={product.images} id={product.id} name={product.name} price={product.price} smallDescription={product.smallDescription}/>
          })}
        </div>
    </section>
  )
}
