import prisma from "@/lib/db"


async function getData(category: string) {
    const data = await prisma.product.findMany
}

export default function page() {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mt-4 lg:grid-cols-3 ">

        </div>
    </section>
  )
}
