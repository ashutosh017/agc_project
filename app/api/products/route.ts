import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { Product } from "@/types";

/**
 * Handle GET request to fetch product listings from PostgreSQL
 */
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        order: "asc"
      }
    });
    return NextResponse.json(products);
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch products from database." },
      { status: 500 }
    );
  }
}

/**
 * Handle POST request to update the product listings inside PostgreSQL
 */
export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    if (!Array.isArray(data)) {
      return NextResponse.json(
        { success: false, error: "Invalid product data structure. Expected an array." },
        { status: 400 }
      );
    }

    // Sync in a database transaction to ensure atomicity
    await prisma.$transaction([
      prisma.product.deleteMany(),
      prisma.product.createMany({
        data: data.map((product: Product, idx: number) => ({
          id: product.id.toString(),
          slug: product.slug,
          name: product.name,
          brand: product.brand,
          price: Number(product.price),
          category: product.category,
          featured: Boolean(product.featured),
          images: product.images,
          shortDescription: product.shortDescription,
          description: product.description,
          specs: product.specs as any,
          features: product.features,
          variants: (product.variants || undefined) as any,
          order: idx,
        }))
      })
    ]);

    return NextResponse.json({ success: true, message: "Catalog listings updated successfully in database." });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update database listings." },
      { status: 500 }
    );
  }
}
