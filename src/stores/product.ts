import { create } from 'zustand'
import type { ProductType } from '@/types'

type ProductStore = {
  products: ProductType[]
  productInCart: number
  addItem: (item: ProductType) => void
  setItems: (items: ProductType[]) => void
  removeItem: (id: number) => void
  updateProductInCart: (item: number) => void
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  productInCart: 0,
  addItem: (item) =>
    set((state) => ({
      products: [...state.products, item],
    })),
  setItems: (items) =>
    set(() => ({
      products: items,
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
