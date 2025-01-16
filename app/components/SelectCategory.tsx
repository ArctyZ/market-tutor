"use client";
import { Card, CardHeader } from "@/components/ui/card";
import { categoryItems } from "@/lib/categoryItems";
import { useState } from "react";

export default function SelectCategory() {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {categoryItems.map((category) => {
        return (
          <div key={category.id} className="cursor-pointer">
            <Card className={selectedCategory === category.name ? "border-primary border-2" : "border-2 border-primary/10"} onClick={() => {setSelectedCategory(category.name)}}>
              <CardHeader>
                {category.image}{" "}
                <h3 className="font-medium">{category.title}</h3>
              </CardHeader>
            </Card>
          </div>
        );
      })}
    </div>
  );
}
