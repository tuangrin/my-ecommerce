import { QuantityInput } from '@/components/ui/quantity-input'
import { CircleX } from 'lucide-react'
import type { CartItem } from '../types'

interface CartItemsTableProps {
  items: CartItem[]
  formatPrice: (num: number) => string
  onClearCart: () => void
  onDeleteItem: (itemId: number) => void
  onQuantityChange: (itemId: number, quantity: number) => void
}

export function CartItemsTable({
  items,
  formatPrice,
  onClearCart,
  onDeleteItem,
  onQuantityChange,
}: CartItemsTableProps) {
  if (items.length === 0) {
    return (
      <div className="w-full min-h-36 rounded-lg bg-sky-100 flex items-center justify-center">
        <p className="text-blue-900">ไม่มีรายการสินค้า</p>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-medium text-blue-900">ตะกร้าสินค้า</h2>
        <span
          className="cursor-pointer text-red-600 font-bold"
          onClick={onClearCart}
        >
          ลบทั้งหมด
        </span>
      </div>
      <table className="w-full">
        <thead>
          <tr className="text-lg">
            <th></th>
            <th>สินค้า</th>
            <th>ราคา</th>
            <th>จำนวน</th>
            <th>รวม</th>
          </tr>
        </thead>
        <tbody className="text-center divide-y divide-slate-200">
          {items.map((item) => (
            <tr key={item.id} className="hover:bg-sky-50 text-sm">
              <td className="w-px whitespace-nowrap px-2">
                <CircleX
                  className="hover:opacity-80 cursor-pointer w-4 h-4"
                  onClick={() => onDeleteItem(item.id)}
                />
              </td>
              <td className="flex items-center justify-center">
                <img
                  src={item.photos?.[0] || 'https://via.placeholder.com/60'}
                  alt="product"
                  className="w-18 h-18 object-cover rounded-lg"
                />

                <span className="truncate">{item.title}</span>
              </td>
              <td>{formatPrice(item.price)}</td>
              <td>
                <QuantityInput
                  value={item.quantity}
                  min={1}
                  step={1}
                  onChange={(quantity) => onQuantityChange(item.id, quantity)}
                />
              </td>
              <td>{formatPrice(item.price * (item.quantity ?? 1))}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
