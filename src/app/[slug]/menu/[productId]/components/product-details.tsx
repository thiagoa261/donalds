"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatCurrency } from "@/helpers/currency";
import { Product, Restaurant } from "@prisma/client";
import { ChefHatIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ProductDetailsProps {
    product: Product
    restaurant: Pick<Restaurant, 'name' | 'avatarImageUrl'>
}

const ProductDetails = ({ restaurant, product }: ProductDetailsProps) => {
    const [quantity, setQuantity] = useState<number>(1);

    const handleDecreaseQuantity = () => {
        setQuantity(prev => {
            if (prev === 1) {
                return 1;
            }
            return prev - 1;
        });
    };

    const handleIncreaseQuantity = () => {
        setQuantity(prev => prev + 1);
    };

    return (
        <div className="relative z-50 rounded-tl-3xl p-5 mt-[-1.5rem] flex flex-col flex-auto overflow-hidden">
            <div className="flex-auto overflow-hidden">
                <div className="flex items-center gap-1.5">
                    <Image src={restaurant.avatarImageUrl} alt={restaurant.name} width={16} height={16} className="rounded-full" />
                    <p className="text-xs text-muted-foreground ">{restaurant.name}</p>
                </div>

                <h2 className="mt-1 text-2xl font-semibold"> {product.name} </h2>

                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">
                        {formatCurrency(product.price)}
                    </h3>

                    <div className="flex items-center gap-3 text-center">
                        <Button onClick={handleDecreaseQuantity} variant="outline" className="h-8 w-8 rounded-xl"><ChevronLeftIcon /></Button>
                        <p className="w-4">{quantity}</p>
                        <Button onClick={handleIncreaseQuantity} variant="destructive" className="h-8 w-8 rounded-xl"><ChevronRightIcon /></Button>
                    </div>
                </div>

                <ScrollArea className="h-full">
                    <div className="mt-6 space-y-3">
                        <h4 className="font-semibold">Sobre</h4>
                        <p className="text-sm text-muted-foreground">{product.description}</p>
                    </div>

                    <div className="mt-6 space-y-3">
                        <div className="flex items-center gap-1.5">
                            <ChefHatIcon size={18} />
                            <h4 className="font-semibold">Ingredientes</h4>
                        </div>
                        <p className="text-sm text-muted-foreground">{product.ingredients}</p>
                        <ul className="list-disc px-5 text-sm text-muted-foreground">
                            {product.ingredients.map(ingredient => ( 
                                <li key={ingredient}>{ingredient}</li> 
                            ))}
                        </ul>
                    </div>
                </ScrollArea>
            </div>

            <Button className="rounded-full w-full mt-6">
                Adicionar à sacola
            </Button>
        </div>
    );
}

export default ProductDetails;