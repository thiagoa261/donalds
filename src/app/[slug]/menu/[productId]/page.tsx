import { getProductById } from "@/data/get-product-by-id";
import { getRestaurantBySlug } from "@/data/get-restaurant-by-slug";
import { notFound } from "next/navigation";
import ProductHeader from "./components/product-header";
import ProductDetails from "./components/product-details";

interface ProductPageProps {
	params: Promise<{ slug: string; productId: string }>;
}

const ProductPage = async ({ params }: ProductPageProps) => {
	const { slug, productId } = await params;

	const product = await getProductById(productId);

	const restaurant = await getRestaurantBySlug(slug);

	if (!product || !restaurant) {
		return notFound();
	}

	if (restaurant.id !== product.restaurantId) {
		return notFound();
	}

	return (
		<div className="flex h-full flex-col">
			<ProductHeader product={product} />

			<ProductDetails restaurant={restaurant} product={product} />
		</div>
	);
};

export default ProductPage;
