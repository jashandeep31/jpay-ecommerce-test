import { Order } from "@/generated/prisma";
import { prisma } from "@/lib/db";
import React from "react";
import { getOrders } from "../checkout/actions";

// Add dynamic configuration
export const dynamic = "force-dynamic";
export const revalidate = 0;

const page = async () => {
  const orders = await getOrders();
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Orders</h1>
        <p className="text-muted-foreground">
          Shop our curated selection of products
        </p>
      </header>

      <main>
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <th className="border border-gray-200">S.no</th>
            <th className="border border-gray-200">Order ID</th>
            <th className="border border-gray-200">Amount</th>
            <th className="border border-gray-200">Created At</th>
            <th className="border border-gray-200">Status</th>
          </thead>
          <tbody>
            {orders.map((order: Order) => (
              <tr key={order.id}>
                <td className="border border-gray-200">{order.id}</td>
                <td className="border border-gray-200">{order.orderId}</td>
                <td className="border border-gray-200">{order.amount}</td>
                <td className="border border-gray-200">
                  {order.paymentStatus}
                </td>
                <td className="border border-gray-200">
                  {order.createdAt.toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default page;
