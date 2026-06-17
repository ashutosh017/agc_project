import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { Product } from "@/types";

/**
 * Handle POST request to update the product listings inside data/products.json
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

    const filePath = path.join(process.cwd(), "data", "products.json");
    
    // Format JSON with 2 space indentation for readability
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");

    return NextResponse.json({ success: true, message: "Catalog listings updated successfully." });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update listings database." },
      { status: 500 }
    );
  }
}
