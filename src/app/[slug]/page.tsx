import { getRestaurantBySlug } from "@/data/get-restaurant-by-slug";
import Image from "next/image";
import { notFound } from "next/navigation";
import ConsumptionMethodOption from "./components/consumption-method-options";

interface RestaunrantPageProps {
	params: Promise<{ slug: string }>;
}

const RestaunrantPage = async ({ params }: RestaunrantPageProps) => {
	const { slug } = await params;

	const restaurant = await getRestaurantBySlug(slug);

	if (!restaurant) {
		return notFound();
	}

	return (
		<div className="flex h-screen flex-col items-center justify-center px-6 pt-24">
			<div className="flex flex-col items-center gap-2">
				<Image src={restaurant?.avatarImageUrl} alt={restaurant?.name} width={82} height={82} />
				<h2 className="font-semibold">{restaurant?.name}</h2>
			</div>

			<div className="space-y-2 pt-24 text-center">
				<h3 className="text-2xl font-semibold">Seja bem-vindo!</h3>
				<p className="opacity-55">
					Escolha como prefere aproveitar sua refeição. Estamos aqui para oferecer praticidade e sabor em cada detalhe!
				</p>
			</div>

			<div className="grid grid-cols-2 gap-4 pt-14">
				<ConsumptionMethodOption
					buttonText="Para comer aqui"
					option="DINE_IN"
					slug={restaurant?.slug}
					imageUrl="/images/dine_in.png"
					alt="Comer aqui"
				/>
				<ConsumptionMethodOption
					buttonText="Para levar"
					option="TAKEAWAY"
					slug={restaurant?.slug}
					imageUrl="/images/takeaway.png"
					alt="Para levar"
				/>
			</div>
		</div>
	);
};

export default RestaunrantPage;
