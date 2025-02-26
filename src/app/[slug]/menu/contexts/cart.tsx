"use client";

import { Product } from "@prisma/client";
import { useState, createContext, ReactNode } from "react";

export interface ICartContext {
	isOpen: boolean;
	products: ICartProduct[];
	toggleCart: () => void;
	addProduct: (product: ICartProduct) => void;
}

interface ICartProduct extends Pick<Product, "id" | "name" | "price" | "imageUrl"> {
	quantity: number;
}

export const CartContext = createContext<ICartContext>({
	isOpen: false,
	products: [],
	toggleCart: () => {},
	addProduct: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
	const [products, setProducts] = useState<ICartProduct[]>([]);
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const toggleCart = () => {
		setIsOpen((prev) => !prev);
	};

	const addProduct = (product: ICartProduct) => {
		const productIsAlreadyInCart = products.some((p) => p.id === product.id);
		if (!productIsAlreadyInCart) {
			return setProducts((prevProducts) => [...prevProducts, product]);
		}

		setProducts((prevProducts) => {
			return prevProducts.map((p) => {
				if (p.id === product.id) {
					return { ...p, quantity: p.quantity + product.quantity };
				} else {
					return p;
				}
			});
		});
	};

	return <CartContext.Provider value={{ isOpen, products, toggleCart, addProduct }}>{children}</CartContext.Provider>;
};
