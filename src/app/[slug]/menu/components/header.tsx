"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import { Restaurant } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { redirect } from "next/navigation";

interface RestaunrantHeaderProps {
	restaurant: Pick<Restaurant, "coverImageUrl" | "name">;
}

const RestaunrantHeader = ({ restaurant }: RestaunrantHeaderProps) => {
	const router = useRouter();
	const { slug } = useParams<{ slug: string }>();

	return (
		<div className="relative h-[250px] w-full">
			<Button variant="secondary" size="icon" className="absolute left-4 top-4 z-50 rounded-full" onClick={() => router.back()}>
				<ChevronLeftIcon />
			</Button>

			<Image src={restaurant?.coverImageUrl} alt={restaurant?.name} fill className="object-cover" />

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

export default RestaunrantHeader;
