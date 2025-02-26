import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { CartContext } from "../contexts/cart";
import { useContext } from "react";
import CartProductItem from "./cart-product-item";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/helpers/currency";
import FinishOrderButton from "./finish-order-button";

const CartSheet = () => {
	const { isOpen, toggleCart, products, total } = useContext(CartContext);

	return (
		<Sheet open={isOpen} onOpenChange={toggleCart}>
			<SheetContent className="w-[80%]">
				<SheetHeader>
					<SheetTitle className="text-left">Carrinho</SheetTitle>
				</SheetHeader>
				<div className="py-5 flex flex-col h-full">
					<div className="flex-auto">
						{products.map((product) => (
							<CartProductItem key={product.id} product={product} />
						))}
					</div>
					<Card className="mb-6">
						<CardContent className="p-5">
							<div className="fleex justify-between">
								<p className="text-sm text-muted-foreground">Total</p>
								<p className="text-sm font-semibold">{formatCurrency(total)}</p>
							</div>
						</CardContent>
					</Card>
					<FinishOrderButton></FinishOrderButton>
				</div>
			</SheetContent>
		</Sheet>
	);
};

export default CartSheet;
