import { Card } from "@/components/ui/card";
import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import SettingsForm from "../components/SettingsForm";

async function getData(userId: string) {
    const data = await prisma.user.findUnique({
        where: {
            id:userId
        },
        select: {
            firstName: true,
            lastName: true,
            email: true
        }
    })
    return data
}


export default async function SettingsPage() {
    const {getUser} = getKindeServerSession()
    const user = await getUser()
    if(!user) {
        throw new Error('Not Authorized')
    }
    const data = await getData(user.id)

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8">
        <Card>
            <SettingsForm email={data?.email as string} firstName={data?.firstName as string} lastName={data?.lastName as string}/>
        </Card>
    </div>
  )
}
