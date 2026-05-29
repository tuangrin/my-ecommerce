import { useState, useEffect } from 'react'
import { useProductStore } from '@/stores/product'
import type { ProductType } from '@/types'
import AppPagination from '@/components/AppPagination/AppPagination'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ShoppingCart } from 'lucide-react'
import { SearchInput } from '@/components/SearchInput/SearchInput'
import { toast } from 'sonner'

export default function ProductList() {
  const products = useProductStore((state) => state.products)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchInput, setSearchInput] = useState('')

  const goToDetailPage = (product: ProductType) => {
    console.log('go to product :>> ', product)
  }

  const addToCart = (item: ProductType) => {
    console.log('add to cart :>> ', item)
    const cartList: (ProductType & { quantity: number })[] = JSON.parse(
      localStorage.getItem('cartList') ?? '[]',
    )

    const existingIndex = cartList.findIndex(
      (cartItem) => cartItem.id === item.id,
    )

    if (existingIndex !== -1) {
      cartList[existingIndex]!.quantity += 1
    } else {
      cartList.push({
        ...item,
        quantity: 1,
      })
    }

    localStorage.setItem('cartList', JSON.stringify(cartList))
    updateCartCount(cartList)

    toast.success('สินค้าถูกเพิ่มในตะกร้าแล้ว', { position: 'top-right' })
  }

  const updateProductInCart = useProductStore(
    (state) => state.updateProductInCart,
  )

  const updateCartCount = (
    cartList: (ProductType & { quantity: number })[],
  ) => {
    const totalItems = cartList.reduce((sum, item) => sum + item.quantity, 0)
    updateProductInCart(totalItems)
  }

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchInput.toLowerCase().trim()),
  )

  const limit = 10

  const visibleProducts = filteredProducts.slice(
    (currentPage - 1) * limit,
    currentPage * limit,
  )

  useEffect(() => {
    console.log('products :>> ', products)
  }, [products])

  return (
    <>
      <div className="bg-white min-h-screen p-4">
        <div className="max-w-6xl mx-auto flex flex-col gap-y-2">
          <div className="flex justify-end">
            <SearchInput
              value={searchInput}
              className="bg-white"
              placeholder="Search"
              onChange={(event) => setSearchInput(event.target.value)}
            />
          </div>

          <div className="grid grid-cols-4 gap-4">
            {visibleProducts.map((product) => {
              return (
                <div
                  key={product.id}
                  className="bg-white hover:shadow-lg rounded-xl p-3 shadow-md flex flex-col h-100"
                >
                  <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={product.photos[0]}
                      className="w-full h-full object-contain cursor-pointer"
                      loading="lazy"
                      alt={product.title}
                      onClick={() => goToDetailPage(product)}
                    />
                  </div>

                  <div className="mt-3 flex flex-col flex-1 overflow-hidden">
                    <p
                      className="font-medium text-base truncate cursor-pointer hover:opacity-70"
                      onClick={() => goToDetailPage(product)}
                    >
                      {product.title}
                    </p>
                    <p className="text-slate-400 text-xs line-clamp-2">
                      {product.description}
                    </p>
                    <div className="mt-auto flex justify-between items-center">
                      <div>
                        <span className="font-semibold">{product.price} ฿</span>
                        <div className="flex text-xs gap-x-2">
                          {product.tags.map((tag) => {
                            return (
                              <>
                                <div className="bg-sky-200 text-sky-800 py-0.5 px-2 rounded-full cursor-pointer hover:opacity-80 transition">
                                  {tag}
                                </div>
                              </>
                            )
                          })}
                        </div>
                      </div>

                      <Button
                        className="cursor-pointer"
                        variant="outline"
                        onClick={() => addToCart(product)}
                      >
                        <ShoppingCart />
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-3">
            <AppPagination
              currentPage={currentPage}
              limit={limit}
              totalRecords={products.length}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </>
  )
}
