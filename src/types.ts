export interface ProductType {
  id: number
  title: string
  description: string
  photos: string[]
  price: number
  tags: string[]
  quantity?: number
}

export interface CustomerForm {
  name: string
  phone: number | null
  addressLine: string
  subdistrict: string
  district: string
  province: string
  postalCode: number | null
}
