import { prisma } from "@/lib/db";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  console.log(`request is heresz`);
  const id = params.id;
  const res = await axios.post(
    `${process.env.PAYMENT_GATEWAY_API_URL!}/${id}`,
    {
      private_key: process.env.JPAY_PRIVATE_KEY!,
      public_key: process.env.JPAY_PUBLIC_KEY!,
    }
  );
  console.log(res);

  if (res.data.status === "success") {
    await prisma.order.update({
      where: {
        paymentUID: id,
      },
      data: {
        paymentStatus: res.data.data.status,
      },
    });
  } else {
    return NextResponse.json({ message: "Payment failed" });
  }
};
