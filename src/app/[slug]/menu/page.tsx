import { notFound } from "next/navigation";
import RestaunrantHeader from "./components/header";
import RestaurantCategories from "./components/categories";
import { db } from "@/lib/prisma";

interface RestaunrantMenuPageProps {
	params: Promise<{ slug: string }>;
	searchParams: Promise<{ consumptionMethod: string }>;
}

const isConsumptionMethodValid = (consumptionMethod: string) => {
	return ["DINE_IN", "TAKEAWAY"].includes(consumptionMethod.toUpperCase());
};

const RestaunrantMenuPage = async ({ params, searchParams }: RestaunrantMenuPageProps) => {
	const { slug } = await params;

	const { consumptionMethod } = await searchParams;

	if (!isConsumptionMethodValid(consumptionMethod)) {
		return notFound();
	}

	const restaurant = await db.restaurant.findUnique({
		where: { slug },
		include: { menuCategories: { include: { products: true } } },
	});

	if (!restaurant) {
		return notFound();
	}

	return (
		<div>
			<RestaunrantHeader restaurant={restaurant} />

			<RestaurantCategories restaurant={restaurant} />
		</div>
	);
};

export default RestaunrantMenuPage;
