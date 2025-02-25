import { db } from "@/lib/prisma";

export const getProductById = async (id: string) => {
  const product = await db.product.findUnique({ where: { id: id } });
  return product;
}