import Link from "next/link";
import NavLinks from "./NavLinks";
import { Button } from "@/components/ui/button";
import MobileMenu from "./MobileMenu";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import UserNav from "./UserNav";
export default async function Navbar() {
    const {getUser} = getKindeServerSession()
    const user = await getUser();
  return (
    <nav className="relative max-w-7xl w-full flex md:grid md:grid-cols-12 px-4 md:px-8 mx-auto py-7 items-center">
        <div className="md:col-span-3">
            <Link href="/">
                <h1 className="text-2xl font-semibold">Haris<span className="text-primary">UI</span></h1>
            </Link>
        </div>
        <NavLinks/>

        <div className="flex items-center gap-x-2 ms-auto md:col-span-3">
            {user ? (
                
                <UserNav email={user.email as string} name={user.given_name as string} userImage={user.picture ?? `https://avatar.vercel.sh/${user.given_name}`}/>
            ):
            (
                <div className="flex items-center gap-x-2">
                    <Button asChild><LoginLink>Log In</LoginLink></Button>
                    <Button asChild variant='secondary'><RegisterLink>Register</RegisterLink></Button>
                </div>
            )}
            
            <div className="md:hidden">
                <MobileMenu/>
            </div>
        </div>
    </nav>
  )
}
