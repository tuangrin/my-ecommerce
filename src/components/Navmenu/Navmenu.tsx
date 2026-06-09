import { ShoppingCart } from 'lucide-react'
import { useProductStore } from '@/stores/product'
import { useNavigate } from 'react-router-dom'

export default function Navmenu() {
  const navigate = useNavigate()
  const cartCount = useProductStore((state) => state.productInCart)

  return (
    <>
      <div className="py-2 px-4 bg-blue-800 flex justify-between items-center">
        <div
          className="font-medium cursor-pointer hover:opacity-85"
          onClick={() => navigate('/products')}
        >
          <span className="text-sky-300 mr-0.5">MY</span>
          <span className="text-white">shop</span>
        </div>

        <div className="relative">
          <div className="bg-red-500 text-white rounded-full text-center text-[10px] absolute -top-1 -right-1 px-1">
            {cartCount > 0 && <div>{cartCount}</div>}
          </div>
          <ShoppingCart
            className="pi pi-cart-plus cursor-pointer text-white hover:opacity-70 pr-2"
            onClick={() => navigate('/cart')}
          />
        </div>
      </div>
    </>
  )
}
