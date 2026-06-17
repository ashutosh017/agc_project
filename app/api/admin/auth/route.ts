import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * POST /api/admin/auth
 * Validate the admin passcode against the database.
 */
export async function POST(req: Request) {
  try {
    const { passcode } = await req.json();

    if (!passcode) {
      return NextResponse.json({ success: false, error: "Passcode is required." }, { status: 400 });
    }

    // Retrieve the stored password from AdminConfig
    let config = await prisma.adminConfig.findUnique({
      where: { key: "admin_password" },
    });

    // If not set in the database, initialize with default "admin123"
    if (!config) {
      config = await prisma.adminConfig.create({
        data: {
          key: "admin_password",
          value: "admin123",
        },
      });
    }

    if (config.value === passcode) {
      return NextResponse.json({ success: true });
    } else {
      // Note: "do not show the exact password in hint"
      return NextResponse.json({ success: false, error: "Invalid passcode. Please try again." }, { status: 401 });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || "Authentication error." }, { status: 500 });
  }
}

/**
 * PUT /api/admin/auth
 * Change the admin passcode in the database after validating the current password.
 */
export async function PUT(req: Request) {
  try {
    const { currentPasscode, newPasscode } = await req.json();

    if (!currentPasscode || !newPasscode) {
      return NextResponse.json({ success: false, error: "Both current and new passcodes are required." }, { status: 400 });
    }

    if (newPasscode.trim().length < 4) {
      return NextResponse.json({ success: false, error: "New passcode must be at least 4 characters long." }, { status: 400 });
    }

    // Retrieve current stored password
    let config = await prisma.adminConfig.findUnique({
      where: { key: "admin_password" },
    });

    const currentStoredValue = config ? config.value : "admin123";

    if (currentStoredValue !== currentPasscode) {
      return NextResponse.json({ success: false, error: "Current passcode is incorrect." }, { status: 401 });
    }

    // Update or create in the database
    await prisma.adminConfig.upsert({
      where: { key: "admin_password" },
      update: { value: newPasscode },
      create: { key: "admin_password", value: newPasscode },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || "Failed to update passcode." }, { status: 500 });
  }
}
