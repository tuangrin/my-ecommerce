import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useProductStore } from '@/stores/product'
import { ShoppingBag } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function Payment() {
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  const updateProductInCart = useProductStore(
    (state) => state.updateProductInCart,
  )

  const onSetData = () => {
    setTimeout(() => {
      setIsLoading(false)
      updateProductInCart(0)
      localStorage.removeItem('cartList')
    }, 1000)
  }
  useEffect(() => {
    onSetData()
  }, [])

  const backToProductList = () => {}
  return (
    <>
      <div>
        {isLoading ? (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/70 backdrop-blur-sm">
            <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
          </div>
        ) : (
          <div className="flex flex-col items-center p-3 gap-y-2">
            <ShoppingBag className="h-12 w-12 text-blue-900" />
            <h2 className="text-2xl text-blue-900 font-medium my-2">
              ยืนยันคำสั่งซื้อเรียบร้อย หมายเลขออเดอร์ #0001
            </h2>
            <p>ทีมงานจะดำเนินการจัดเตรียมสินค้าและจัดส่งให้โดยเร็วที่สุด</p>
            <p>ขอบคุณที่สั่งซื้อสินค้ากับเรา</p>
            <div>
              <Button
                className="!text-sm !px-3 !py-1 mt-3 bg-blue-600 hover:bg-blue-700 cursor-pointer"
                onClick={() => navigate('/products')}
              >
                กลับสู่หน้ารายการสินค้า
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
