import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SelectCategory from "../components/SelectCategory";
import { Textarea } from "@/components/ui/textarea";

export default function SellRoute() {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8">
        <Card>
            <form>
                <CardHeader>
                    <CardTitle>Sell your product with ease</CardTitle>
                    <CardDescription>Please describe your product in details</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-y-10">
                    <div className="flex flex-col gap-y-2">
                        <Label>Name</Label>
                        <Input type="text" placeholder="Name of your product"/>
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <Label>Category</Label>
                        <SelectCategory/>
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <Label>Price</Label>
                        <Input placeholder="$0" type="number"/>
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <Label>Summary</Label>
                        <Textarea placeholder="Please describe your product here..."/>
                    </div>
                </CardContent>
            </form>
        </Card>
    </section>
  )
}
