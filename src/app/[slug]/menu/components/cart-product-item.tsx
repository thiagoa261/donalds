import Image from "next/image";
import { CartContext, ICartProduct } from "../contexts/cart";
import { formatCurrency } from "@/helpers/currency";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import { useContext } from "react";

interface CartItemProps {
	product: ICartProduct;
}

const CartProductItem = ({ product }: CartItemProps) => {
	const { decreaseProductQuantity, increaseProductQuantity, removeProduct } = useContext(CartContext);

	return (
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-3">
				<div className="relative h-20 w-20 bg-gray-100 rounded-xl">
					<Image src={product.imageUrl} alt={product.name} fill />
				</div>

				<div className="space-y-1">
					<p className="text-xs max-w-[90%] truncate text-ellipsis">{product.name}</p>
					<p className="text-sm font-semibold">{formatCurrency(product.price)}</p>
					<div className="flex items-center gap-1 text-center">
						<Button className="w-7 h-7 rounded-lg" variant="outline" onClick={() => decreaseProductQuantity(product.id)}>
							<ChevronLeftIcon />
						</Button>
						<p className="w-7 text-xs">{product.quantity}</p>
						<Button className="w-7 h-7 rounded-lg" variant="destructive" onClick={() => increaseProductQuantity(product.id)}>
							<ChevronRightIcon />
						</Button>
					</div>
				</div>
			</div>

			<Button className="h-7 w-7 rounded-lg" variant="outline" onClick={() => removeProduct(product.id)}>
				<TrashIcon />
			</Button>
		</div>
	);
};

export default CartProductItem;
