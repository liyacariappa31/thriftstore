import { promises as fs } from "fs";
import path from "path";
import { NextRequest } from "next/server";

const IMAGES_DIR = path.join(process.cwd(), "images");

function getContentType(fileName: string) {
  const extension = path.extname(fileName).toLowerCase();

  if (extension === ".png") {
    return "image/png";
  }

  if (extension === ".webp") {
    return "image/webp";
  }

  if (extension === ".gif") {
    return "image/gif";
  }

  return "image/jpeg";
}

export async function GET(request: NextRequest) {
  const fileName = request.nextUrl.searchParams.get("name");

  if (!fileName) {
    return new Response("Missing file name", { status: 400 });
  }

  const normalizedName = path.basename(fileName);
  const filePath = path.join(IMAGES_DIR, normalizedName);

  try {
    const fileBuffer = await fs.readFile(filePath);

    return new Response(fileBuffer, {
      headers: {
        "Content-Type": getContentType(normalizedName),
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new Response("Image not found", { status: 404 });
  }
}
