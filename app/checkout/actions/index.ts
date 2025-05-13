"use server";
import { prisma } from "@/lib/db";
import { BASE_URL } from "@/lib/utils";
import axios from "axios";

const JPAY_PRIVATE_KEY = process.env.JPAY_PRIVATE_KEY!;
const JPAY_PUBLIC_KEY = process.env.JPAY_PUBLIC_KEY!;

export async function getPaymentURL(amount: number) {
  const paymentUID = JPAY_PUBLIC_KEY + crypto.randomUUID();
  const response = await axios.post(process.env.PAYMENT_GATEWAY_API_URL!, {
    amount: amount,
    private_key: JPAY_PRIVATE_KEY,
    public_key: JPAY_PUBLIC_KEY,
    paymentUID: paymentUID,
    callback_url: `${BASE_URL}/api/callback`,
    redirect_url: `${BASE_URL}/checkout/success`,
  });
  await prisma.order.create({
    data: {
      amount: amount,
      orderId: crypto.randomUUID(),
      paymentStatus: "PENDING",
      paymentUID: paymentUID,
    },
  });
  return response.data.data.checkout_url;
}
