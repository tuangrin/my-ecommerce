import Navmenu from '@/components/Navmenu/Navmenu'
import { Outlet } from 'react-router-dom'
import { useEffect, useCallback } from 'react'
import { productServices } from '@/services/productService'
import { useProductStore } from '@/stores/product'
import { Toaster } from '@/components/ui/sonner'

export default function Layout() {
  const setProducts = useProductStore((state) => state.setItems)

  useEffect(() => {
    const onGetProducts = async () => {
      try {
        const res = await productServices.getProductList()
        console.log('res :>> ', res)
        setProducts(res)
      } catch (err) {
        console.error(err)
      }
    }

    onGetProducts()
  }, [setProducts])

  return (
    <div>
      <Toaster />
      <Navmenu />
      <Outlet />
    </div>
  )
}
