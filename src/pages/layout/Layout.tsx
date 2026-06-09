import Navmenu from '@/components/Navmenu/Navmenu'
import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import { productServices } from '@/services/productService'
import { useProductStore } from '@/stores/product'
import { Toaster } from '@/components/ui/sonner'

export default function Layout() {
  const setProducts = useProductStore((state) => state.setItems)
  const setIsLoadingProducts = useProductStore(
    (state) => state.setIsLoadingProducts,
  )
  const setProductError = useProductStore((state) => state.setProductError)

  useEffect(() => {
    const onGetProducts = async () => {
      setIsLoadingProducts(true)
      setProductError(null)

      try {
        const res = await productServices.getProductList()
        console.log('res :>> ', res)
        setProducts(res)
      } catch (err) {
        console.error(err)
        setProductError('โหลดรายการสินค้าไม่สำเร็จ')
      } finally {
        setIsLoadingProducts(false)
      }
    }

    onGetProducts()
  }, [setProducts, setIsLoadingProducts, setProductError])

  return (
    <div>
      <Toaster />
      <Navmenu />
      <Outlet />
    </div>
  )
}
