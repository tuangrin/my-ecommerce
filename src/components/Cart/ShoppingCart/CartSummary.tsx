import { Button } from '@/components/ui/button'

interface CartSummaryProps {
  totalPrice: number
  shippingPrice: number
  total: number
  isOrderDisabled: boolean
  formatPrice: (num: number) => string
  onOrderProduct: () => void
}

export function CartSummary({
  totalPrice,
  shippingPrice,
  total,
  isOrderDisabled,
  formatPrice,
  onOrderProduct,
}: CartSummaryProps) {
  return (
    <div className="col-span-4 p-4">
      <h2 className="text-lg font-medium text-blue-900">สรุปรายการสั่งซื้อ</h2>
      <hr className="text-slate-200 my-2" />
      <div className="flex justify-between text-sm">
        <span>ราคารวมสินค้า</span>
        <span>{formatPrice(totalPrice)} ฿</span>
      </div>

      <div className="flex justify-between text-sm">
        <span>ค่าส่ง</span>
        <span>{formatPrice(shippingPrice)} ฿</span>
      </div>
      <hr className="text-slate-200 my-2" />
      <div className="flex justify-between text-base text-blue-900 font-semibold">
        <span>ราคาสุทธิ</span>
        <span>{formatPrice(total)} ฿</span>
      </div>

      <div className="mt-2">
        <Button
          disabled={isOrderDisabled}
          className="cursor-pointer px-3! py-1! mt-3 w-full rounded-full! bg-emerald-500! border-emerald-500! hover:bg-emerald-600!"
          onClick={onOrderProduct}
        >
          ดำเนินการสั่งซื้อสินค้า
        </Button>
      </div>
    </div>
  )
}
