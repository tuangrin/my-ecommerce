import { create } from 'zustand'
import type { ProductType } from '@/types'

type ProductStore = {
  products: ProductType[]
  productInCart: number
  isLoadingProducts: boolean
  productError: string | null
  addItem: (item: ProductType) => void
  setItems: (items: ProductType[]) => void
  setIsLoadingProducts: (isLoading: boolean) => void
  setProductError: (error: string | null) => void
  removeItem: (id: number) => void
  updateProductInCart: (item: number) => void
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  productInCart: 0,
  isLoadingProducts: true,
  productError: null,
  addItem: (item) =>
    set((state) => ({
      products: [...state.products, item],
    })),
  setItems: (items) =>
    set(() => ({
      products: items,
    })),
  setIsLoadingProducts: (isLoading) =>
    set(() => ({
      isLoadingProducts: isLoading,
    })),
  setProductError: (error) =>
    set(() => ({
      productError: error,
    })),
  removeItem: (id) =>
    set((state) => ({
      products: state.products.filter((item) => item.id !== id),
    })),
  updateProductInCart: (item: number) =>
    set(() => ({
      productInCart: item,
    })),
}))
