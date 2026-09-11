import ProductInteraction from "@/components/ProductInteraction";
import { ProductType } from "@/types";
import type { Metadata } from "next";
import Image from "next/image";

const product: ProductType = {
  id: 1,
  name: "Adidas CoreFit T-Shirt",
  shortDescription:
    "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
  description:
    "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
  price: 59.9,
  sizes: ["xs", "s", "m", "l", "xl"],
  colors: ["gray", "purple", "green"],
  images: {
    gray: "/products/1g.png",
    purple: "/products/1p.png",
    green: "/products/1gr.png",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  // TODO: fetch product using id
  console.log(id);

  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    color?: string;
    size?: string;
  }>;
}) {
  const { id } = await params;
  const { size, color } = await searchParams;

  // TODO: fetch product using id
  console.log(id);

  const selectedSize = size || product.sizes[0];
  const selectedColor = color || product.colors[0];

  return (
    <div className="mt-12 flex flex-col gap-4 md:gap-12 lg:flex-row">
      <div className="relative aspect-[2/3] w-full lg:w-5/12">
        <Image
          src={product.images[selectedColor]}
          alt={product.name}
          fill
          className="rounded-md object-contain"
        />
      </div>

      <div className="flex w-full flex-col gap-4 lg:w-7/12">
        <h1 className="text-2xl font-medium">{product.name}</h1>
        <p className="text-gray-500">{product.description}</p>
        <h2 className="text-2xl font-semibold">
          ${product.price.toFixed(2)}
        </h2>

        <ProductInteraction
          product={product}
          selectedSize={selectedSize}
          selectedColor={selectedColor}
        />
      </div>
    </div>
  );
}