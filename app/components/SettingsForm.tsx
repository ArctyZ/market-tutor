'use client';

import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import SubmitButton from "./SubmitButton";
import { useFormState } from "react-dom";
import { State, updateUserSettings } from "../actions";
import { useEffect } from "react";
import { toast } from "sonner";

interface iAppProps {
    firstName: string;
    lastName: string;
    email: string;
}

export default function SettingsForm({email,firstName,lastName} : iAppProps) {
    const initialState: State = {
        message: '',
        status: undefined
    }
    const [state, formAction] = useFormState(updateUserSettings, initialState)

    useEffect(() => {
        if(state?.status === "success") {
            toast.success(state?.message)
        } else if(state?.status === "error") {
            toast.error(state?.message)
        }
    },[state])
    
  return (
    <form action={formAction}>
        <CardHeader>
            <CardTitle>Settings</CardTitle>
            <CardDescription>Settings regarding your account</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-y-5">
            <div className="flex flex-col gap-y-2">
                <Label>First Name</Label>
                <Input type="text" name="firstName" defaultValue={firstName}/>
            </div>
            <div className="flex flex-col gap-y-2">
                <Label>Last Name</Label>
                <Input type="text" name="lastName" defaultValue={lastName}/>
            </div>
            <div className="flex flex-col gap-y-2">
                <Label>Email</Label>
                <Input type="email" name="email" disabled defaultValue={email}/>
            </div>
        </CardContent>
        <CardFooter><SubmitButton text="Save"/></CardFooter>
    </form>
  )
}
