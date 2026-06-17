import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import * as fs from "fs";
import * as path from "path";
import "dotenv/config";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("DATABASE_URL is not defined in the environment.");
  process.exit(1);
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const productsFilePath = path.join(__dirname, "../data/products.json");
  const productsData = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

  console.log(`Loaded ${productsData.length} products from products.json. Seeding database...`);

  for (let idx = 0; idx < productsData.length; idx++) {
    const product = productsData[idx];
    // Check if product already exists
    const existingProduct = await prisma.product.findUnique({
      where: { id: product.id },
    });

    const productPayload = {
      slug: product.slug,
      name: product.name,
      brand: product.brand,
      price: product.price,
      category: product.category,
      featured: product.featured,
      images: product.images,
      shortDescription: product.shortDescription,
      description: product.description,
      specs: product.specs,
      features: product.features,
      variants: product.variants || null,
      order: idx,
    };

    if (existingProduct) {
      console.log(`Product ${product.name} (ID: ${product.id}) already exists, updating...`);
      await prisma.product.update({
        where: { id: product.id },
        data: productPayload,
      });
    } else {
      console.log(`Creating product ${product.name} (ID: ${product.id})...`);
      await prisma.product.create({
        data: {
          id: product.id,
          ...productPayload,
        },
      });
    }
  }

  console.log("Seeding completed successfully.");
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
