import ProductGrid from "@/components/product-grid"
import { products } from "@/lib/products"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">QuickShop</h1>
        <p className="text-muted-foreground">Shop our curated selection of products</p>
      </header>

      <main>
        <ProductGrid products={products} />
      </main>
    </div>
  )
}
