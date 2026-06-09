import { Button } from '@/components/ui/button'
import { useEffect, useState, useMemo } from 'react'
import { toast } from 'sonner'
import { CartItemsTable } from './ShoppingCart/CartItemsTable'
import { CartSummary } from './ShoppingCart/CartSummary'
import type { CartItem } from './types'
import { useNavigate } from 'react-router-dom'
import { useProductStore } from '@/stores/product'

interface CartSummaryProps {
  onOrderProduct: () => void
}

export default function ShoppingCart({ onOrderProduct }: CartSummaryProps) {
  const navigate = useNavigate()
  const [cartLists, setCartLists] = useState<CartItem[]>([])
  const updateProductInCart = useProductStore(
    (state) => state.updateProductInCart,
  )

  const clearCart = () => {
    updateCartLists([])
    toast.success('ลบสินค้าออกจากตะกร้าเรียบร้อย', {
      position: 'top-right',
    })
  }
  const deleteItem = (itemId: number) => {
    const nextCartLists = cartLists.filter((item) => item.id !== itemId)
    console.log('nextCartLists :>> ', nextCartLists)
    updateCartLists(nextCartLists)
  }

  const formatPrice = (num: number) => {
    return num.toLocaleString('th-TH', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }

  const updateCartLists = (nextCartLists: CartItem[]) => {
    const totalItems = nextCartLists.reduce(
      (sum, item) => sum + item.quantity,
      0,
    )
    updateProductInCart(totalItems)
    setCartLists(nextCartLists)
    localStorage.setItem('cartList', JSON.stringify(nextCartLists))
  }

  const updateQuantity = (itemId: number, quantity: number) => {
    const nextCartLists = cartLists.map((item) =>
      item.id === itemId ? { ...item, quantity } : item,
    )

    updateCartLists(nextCartLists)
  }

  const totalPrice = useMemo(
    () =>
      cartLists.reduce(
        (sum, item) => sum + item.price * (item.quantity ?? 1),
        0,
      ),
    [cartLists],
  )
  const shippingPrice = 40

  const total = useMemo(() => totalPrice + shippingPrice, [totalPrice])

  useEffect(() => {
    const storedCartList = JSON.parse(
      localStorage.getItem('cartList') ?? '[]',
    ) as CartItem[]
    setCartLists(storedCartList)
  }, [])

  return (
    <>
      <div className="w-full p-3">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-8 border-r border-slate-300 p-3 flex flex-col">
            <CartItemsTable
              items={cartLists}
              formatPrice={formatPrice}
              onClearCart={clearCart}
              onDeleteItem={deleteItem}
              onQuantityChange={updateQuantity}
            />
            <div className="flex justify-start">
              <Button
                className="cursor-pointer text-sm! px-3! py-1! mt-3 bg-blue-600 hover:bg-blue-700"
                onClick={() => navigate('/products')}
              >
                เลือกดูสินค้าต่อ
              </Button>
            </div>
          </div>
          <CartSummary
            totalPrice={totalPrice}
            shippingPrice={shippingPrice}
            total={total}
            isOrderDisabled={cartLists.length === 0}
            formatPrice={formatPrice}
            onOrderProduct={onOrderProduct}
          />
        </div>
      </div>
    </>
  )
}
