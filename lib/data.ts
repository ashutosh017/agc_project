import { Product } from "@/types";
import { prisma } from "@/lib/prisma";

export async function getProducts(): Promise<Product[]> {
  try {
    const dbProducts = await prisma.product.findMany({
      orderBy: {
        order: "asc"
      }
    });

    return dbProducts.map((p) => ({
      id: p.id,
      slug: p.slug,
      name: p.name,
      brand: p.brand,
      price: p.price,
      category: p.category,
      featured: p.featured,
      images: p.images,
      shortDescription: p.shortDescription,
      description: p.description,
      specs: p.specs as Record<string, string>,
      features: p.features,
      variants: p.variants as Product["variants"]
    }));
  } catch (error) {
    console.error("Failed to load products from database:", error);
    return [];
  }
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  try {
    const p = await prisma.product.findUnique({
      where: { slug }
    });

    if (!p) return undefined;

    return {
      id: p.id,
      slug: p.slug,
      name: p.name,
      brand: p.brand,
      price: p.price,
      category: p.category,
      featured: p.featured,
      images: p.images,
      shortDescription: p.shortDescription,
      description: p.description,
      specs: p.specs as Record<string, string>,
      features: p.features,
      variants: p.variants as Product["variants"]
    };
  } catch (error) {
    console.error(`Failed to load product ${slug} from database:`, error);
    return undefined;
  }
}
