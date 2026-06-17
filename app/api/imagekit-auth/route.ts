import { NextResponse } from "next/server";
import ImageKit from "@imagekit/nodejs";

/**
 * GET handler to return ImageKit authentication parameters for client-side uploads.
 */
export async function GET() {
  try {
    const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY;
    const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
    const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;

    if (!publicKey || !privateKey || !urlEndpoint) {
      return NextResponse.json(
        { 
          success: false, 
          error: "ImageKit environment variables are not fully configured. Please define NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY, IMAGEKIT_PRIVATE_KEY, and NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT." 
        },
        { status: 500 }
      );
    }

    const imagekit = new ImageKit({
      privateKey,
    });

    const authenticationParameters = imagekit.helper.getAuthenticationParameters();
    return NextResponse.json(authenticationParameters);
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to generate ImageKit authentication parameters." },
      { status: 500 }
    );
  }
}
