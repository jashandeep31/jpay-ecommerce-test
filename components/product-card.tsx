"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import type { Product } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency } from "@/lib/utils"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter()

  const handleCheckout = () => {
    // Store the selected product in localStorage for the checkout page
    localStorage.setItem("checkoutProduct", JSON.stringify(product))
    router.push("/checkout")
  }

  return (
    <Card className="overflow-hidden">
      <div className="aspect-square relative">
        <Image
          src={product.imageUrl || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover"
          unoptimized // Added to ensure placeholder text renders correctly
        />
      </div>
      <CardHeader className="p-4">
        <CardTitle className="line-clamp-1">{product.name}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-muted-foreground line-clamp-2">{product.description}</p>
        <p className="text-lg font-bold mt-2">{formatCurrency(product.price)}</p>
      </CardContent>
      <CardFooter className="p-4">
        <Button onClick={handleCheckout} className="w-full">
          Checkout
        </Button>
      </CardFooter>
    </Card>
  )
}
