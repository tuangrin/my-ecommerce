import type { ProductType } from '@/types'

export type CartItem = ProductType & { quantity: number }
