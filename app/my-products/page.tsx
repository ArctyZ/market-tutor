import prisma from "@/lib/db"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import ProductCard from "../components/ProductCard";

async function getData(id: string){
    const data = await prisma.product.findMany({
        where: {
            userId: id
        },
        select: {
            id: true,
            name: true,
            price: true,
            images: true,
            category: true,
            smallDescription: true
        }
    })
    return data;
}

export default async function page() {
    const {getUser} = getKindeServerSession()
    const user = await getUser()
    if(!user){
        throw new Error('Not Authorized')
    }

    const data = await getData(user.id as string)
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8">
        <h1 className="text-2xl font-bold">My Products</h1>
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
