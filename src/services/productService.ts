import type { ProductType } from '@/types.ts'
import api from './api'

const getProductList = async () => {
  try {
    const response = await api.get<ProductType[]>('/api/products')
    return response.data
  } catch (error: unknown) {
    throw error instanceof Error
      ? error
      : new Error('Failed to fetch product list')
  }
}

const getProductDetail = async (id: string) => {
  try {
    const response = await api.get<ProductType>(`/api/products/${id}`)
    return response.data
  } catch (error: unknown) {
    throw error instanceof Error
      ? error
      : new Error('Failed to fetch product detail')
  }
}

export const productServices = {
  getProductList,
  getProductDetail,
}
