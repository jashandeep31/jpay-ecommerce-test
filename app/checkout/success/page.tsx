import { redirect } from "next/navigation";
import { getPaymentStatus } from "./_actions";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ paymentId: string }>;
}) => {
  const { paymentId } = await searchParams;
  const paymentStatus = await getPaymentStatus(paymentId);
  console.log(paymentStatus);
  if (paymentStatus === "success") {
    redirect("/orders");
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Please wait</h1>
    </div>
  );
};

export default page;
