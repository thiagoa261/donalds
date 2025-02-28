"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { Product } from "@prisma/client";
import { useRouter, useParams } from "next/navigation";
import { redirect } from "next/navigation";

interface ProductHeaderProps {
	product: Pick<Product, "imageUrl" | "name">;
}

const ProductHeader = ({ product }: ProductHeaderProps) => {
	const router = useRouter();
	const { slug } = useParams<{ slug: string }>();

	const handleBackClick = () => router.back();

	return (
		<div className="relative min-h-[300px] w-full">
			<Button variant="secondary" size="icon" className="absolute left-4 top-4 z-50 rounded-full" onClick={handleBackClick}>
				<ChevronLeftIcon />
			</Button>

			<Image src={product.imageUrl} alt={product.name} fill className="object-contain" />

			<Button
				variant="secondary"
				size="icon"
				className="absolute right-4 top-4 z-50 rounded-full"
				onClick={() => redirect(`/${slug}/orders`)}
			>
				<ScrollTextIcon />
			</Button>
		</div>
	);
};

export default ProductHeader;
