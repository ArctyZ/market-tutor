"use server";
import prisma from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { CategoryTypes } from "@prisma/client";
import { redirect } from "next/navigation";
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

const userSettingsSchema = z.object({
  firstName: z.string().min(3, {message: "First name must be at least 3 characters long"}).or(z.literal("")).optional(),
  lastName: z.string().min(3, {message: "Last name must be at least 3 characters long"}).or(z.literal("")).optional(),
})

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function updateUserSettings(prevState: any,formData: FormData){
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if(!user){
    throw new Error("something went wrong")
  }

  const validateFields = userSettingsSchema.safeParse({
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName')
  })

  if(!validateFields.success){
    const state: State = {
      status: "error",
      errors: validateFields.error.flatten().fieldErrors,
      message: "Something went wrong"
    }
    return state
  }
  
  await prisma.user.update({
    where: {
      id: user.id
    },
    data:{
      firstName: validateFields.data.firstName,
      lastName: validateFields.data.lastName,
    }
  })

  const state:State = {
    status: "success",
    message: "User has been updated successfully"
  }
  return state
}

export async function buyProduct(formData: FormData) {
  const id = formData.get("id") as string;
  const data = await prisma.product.findUnique({
    where:{
      id:id
    },
    select:{
      price:true,
      name:true,
      smallDescription:true,
      images:true
    }
  })

  const session = await stripe.checkout.sessions.create({
    mode:'payment',
    line_items:[{
      price_data:{
        currency:'usd',
        unit_amount:Math.round(data?.price as number * 100),
        product_data:{
          name:data?.name as string,
          description:data?.smallDescription,
          images:data?.images
        }
      },
      quantity:1,
    }],
    success_url: "http://localhost:3000/payment/success",
    cancel_url:"http://localhost:3000/payment/cancel",
  })

  return redirect(session.url as string)
}
