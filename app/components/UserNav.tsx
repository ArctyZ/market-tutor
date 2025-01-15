import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function UserNav() {
  return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant={'ghost'} className="relative h-10 w-10 rounded-full">
                <Avatar className="w-10 h-10">
                <AvatarFallback>
                    Haris
                </AvatarFallback>
                </Avatar>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-10" align="end" forceMount>
            <DropdownMenuLabel>
            <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">haris</p>
                <p className="text-xs leading-none text-muted-foreground">haris@rmail.com</p>
            </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator/>
            
        </DropdownMenuContent>
        

    </DropdownMenu>
  )
}
