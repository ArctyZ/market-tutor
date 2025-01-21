'use client'
import { cn } from "@/lib/utils";
import Link from "next/link"
import { usePathname } from "next/navigation"


export const navbarLinks =[
    {
        id:0,
        name:"Home",
        href:"/"
    },
    {
        id:1,
        name:"Templates",
        href:"/products/template"
    },
    {
        id:2,
        name:"UI Kits",
        href:"/products/uikits"
    },
    {
        id:3,
        name:"Icons",
        href:"/products/icon"
    },
]

export default function NavLinks() {
    const location = usePathname();
  return (
    <div className="hidden md:flex justify-center items-center col-span-6 gap-x-2">
        {navbarLinks.map((link) => (
            <Link key={link.id} href={link.href} className={cn(location === link.href ? 'bg-muted' : 'hover:bg-muted hover:bg-opacity-75', 'group flex items-center px-2 py-2 rounded-md font-medium')}>{link.name}</Link>
        ))}
    </div>
  )
}
