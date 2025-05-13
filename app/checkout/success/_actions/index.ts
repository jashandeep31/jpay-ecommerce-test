import { prisma } from "@/lib/db";
import axios from "axios";

export const getPaymentStatus = async (paymentId: string) => {
  try {
    const res = await axios.post(
      `${process.env.PAYMENT_GATEWAY_API_URL!}/${paymentId}`,
      {
        private_key: process.env.JPAY_PRIVATE_KEY!,
        public_key: process.env.JPAY_PUBLIC_KEY!,
      }
    );
    if (res.data.data.status === "PAID") {
      await prisma.order.update({
        where: {
          paymentUID: paymentId,
        },
        data: {
          paymentStatus: "PAID",
        },
      });
      return "success";
    }
    return "failed";
  } catch (error) {
    return "failed";
  }
};
