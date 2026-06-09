import { Loader2 } from 'lucide-react'

export function ProductListLoading() {
  return (
    <div className="flex h-64 flex-col items-center justify-center gap-3 text-slate-500">
      <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
      <p className="text-lg">กำลังโหลดสินค้า...</p>
    </div>
  )
}
