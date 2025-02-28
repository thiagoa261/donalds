"use server";

import { removeCpfPunctuation } from "@/helpers/cpf";
import { db } from "@/lib/prisma";
import { eConsumptionMethod, eOrderStatus } from "@prisma/client";
import { redirect } from "next/navigation";

interface CreateOrderInput {
    customerName: string;
    customerCpf: string;
    products: Array<{
        id: string;
        quantity: number;
    }>;
    consumptionMethod: eConsumptionMethod;
    slug: string;
}

export const createOrder = async (input: CreateOrderInput) => {
    const restaurant = await db.restaurant.findUnique({
        where: {
            slug: input.slug,
        }
    });

    if (!restaurant) {
        throw new Error("Restaurant not found");
    }

    const productsWithPrices = await db.product.findMany({
        where: {
            id: {
                in: input.products.map(product => product.id)
            }
        }
    });

    const productsWithPricesAndQuantities = input.products.map(product => ({
        productId: product.id,
        quantity: product.quantity,
        price: productsWithPrices.find(p => p.id === product.id)!.price
    }));

    await db.order.create({
        data: {
            status: eOrderStatus.PENDING,
            customerName: input.customerName,
            customerCPF: removeCpfPunctuation(input.customerCpf),
            orderProducts: {
                createMany: {
                    data: productsWithPricesAndQuantities,
                }
            },
            total: productsWithPricesAndQuantities.reduce((acc, product) => acc + product.price * product.quantity, 0),
            consumptionMethod: input.consumptionMethod,
            restaurantId: restaurant.id,
        }
    });

    redirect(`/${input.slug}/orders?cpf=${input.customerCpf}`);
}