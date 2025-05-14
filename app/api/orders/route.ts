import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const orders = await prisma.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
  });
  return NextResponse.json(orders);
}
