"use server";
import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { CategoryTypes } from "@prisma/client";
import { z } from "zod";

export type State = {
  status: undefined | "success" | "error";
  errors?: {
    [key: string]: string[];
  };
  message?: string | null;
};

const productSchema = z.object({
  name: z
    .string()
    .min(3, { message: "The name must be at least 3 characters long" }),
  price: z.number().min(1, { message: "The price has to be bigger than 0" }),
  images: z.array(z.string(), { message: "Image is required" }),
  smallDescription: z
    .string()
    .min(10, { message: "Please summerize yout product more" }),
  description: z.string().min(10, { message: "Description is required" }),
  category: z.string().min(1, { message: "Category is required" }),
  productFile: z.string().min(1, { message: "Product file is required" }),
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function SellProduct(prevState: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    throw new Error("Please authenticate");
  }

  const validateFields = productSchema.safeParse({
    name: formData.get("name"),
    category: formData.get("category"),
    price: Number(formData.get("price")),
    images: JSON.parse(formData.getAll("images") as unknown as string),
    smallDescription: formData.get("smallDescription"),
    description: formData.get("description"),
    productFile: formData.get("productFile"),
  });

  if (!validateFields.success) {
    const state: State = {
      status: "error",
      errors: validateFields.error.flatten().fieldErrors,
      message: "Something went wrong",
    };
    return state;
  }

  await prisma.product.create({
    data: {
      name: validateFields.data.name,
      category: validateFields.data.category as CategoryTypes,
      price: validateFields.data.price,
      images: validateFields.data.images,
      smallDescription: validateFields.data.smallDescription,
      productFile: validateFields.data.productFile,
      userId: user.id,
      description: JSON.parse(validateFields.data.description),
    },
  });

  const state: State = {
    status: "success",
    message: "Product has been created successfully",
  };
  return state;
}
