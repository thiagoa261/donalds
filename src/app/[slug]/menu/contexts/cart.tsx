"use client";

import { Product } from "@prisma/client";
import { useState, createContext, ReactNode } from "react";

export interface ICartContext {
	isOpen: boolean;
	products: ICartProduct[];
	toggleCart: () => void;
	addProduct: (product: ICartProduct) => void;
	decreaseProductQuantity: (productId: string) => void;
	increaseProductQuantity: (productId: string) => void;
	removeProduct: (productId: string) => void;
	total: number;
	totalQuantity: number;
}

export interface ICartProduct extends Pick<Product, "id" | "name" | "price" | "imageUrl"> {
	quantity: number;
}

export const CartContext = createContext<ICartContext>({
	isOpen: false,
	products: [],
	toggleCart: () => {},
	addProduct: () => {},
	decreaseProductQuantity: () => {},
	increaseProductQuantity: () => {},
	removeProduct: () => {},
	total: 0,
	totalQuantity: 0,
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
	const [products, setProducts] = useState<ICartProduct[]>([]);
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const toggleCart = () => {
		setIsOpen((prev) => !prev);
	};

	const total = products.reduce((acc, product) => {
		return acc + product.price * product.quantity;
	}, 0);

	const totalQuantity = products.reduce((acc, product) => {
		return acc + product.quantity;
	}, 0);

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

	const decreaseProductQuantity = (productId: string) => {
		setProducts((prevProducts) => {
			return prevProducts.map((p) => {
				if (p.id !== productId) {
					return p;
				}
				if (p.quantity === 1) {
					return p;
				}
				return { ...p, quantity: p.quantity - 1 };
			});
		});
	};

	const increaseProductQuantity = (productId: string) => {
		setProducts((prevProducts) => {
			return prevProducts.map((p) => {
				if (p.id !== productId) {
					return p;
				}
				return { ...p, quantity: p.quantity + 1 };
			});
		});
	};

	const removeProduct = (productId: string) => {
		setProducts((prevProducts) => {
			return prevProducts.filter((p) => p.id !== productId);
		});
	};

	return (
		<CartContext.Provider
			value={{
				isOpen,
				products,
				toggleCart,
				addProduct,
				decreaseProductQuantity,
				increaseProductQuantity,
				removeProduct,
				total,
				totalQuantity,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};
