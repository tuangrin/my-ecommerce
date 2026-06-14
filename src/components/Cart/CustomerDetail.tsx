import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

type Customer = {
  name: string
  phone: string
  addressLine: string
  subdistrict: string
  district: string
  province: string
  postalCode: string
}

type CustomerErrors = Record<keyof Customer, string>

interface AddressProps {
  onOrderProduct: () => void
  onBackStep: () => void
}

const validateCustomer = (customer: Customer): CustomerErrors => ({
  name: customer.name.trim() ? '' : 'กรุณากรอกชื่อ',
  phone: /^0\d{9}$/.test(customer.phone)
    ? ''
    : 'กรุณากรอกเบอร์โทรศัพท์ 10 หลัก',
  addressLine: customer.addressLine.trim() ? '' : 'กรุณากรอกที่อยู่',
  subdistrict: customer.subdistrict.trim() ? '' : 'กรุณากรอกตำบล/แขวง',
  district: customer.district.trim() ? '' : 'กรุณากรอกอำเภอ/เขต',
  province: customer.province.trim() ? '' : 'กรุณากรอกจังหวัด',
  postalCode: /^\d{5}$/.test(customer.postalCode)
    ? ''
    : 'กรุณากรอกรหัสไปรษณีย์ 5 หลัก',
})

const onlyDigits = (value: string, maxLength: number) =>
  value.replace(/\D/g, '').slice(0, maxLength)

export default function CustomerDetail({
  onOrderProduct,
  onBackStep,
}: AddressProps) {
  const [customer, setCustomer] = useState<Customer>({
    name: '',
    phone: '',
    addressLine: '',
    subdistrict: '',
    district: '',
    province: '',
    postalCode: '',
  })
  const [hasSubmitted, setHasSubmitted] = useState(false)

  const updateCustomer = <K extends keyof Customer>(
    key: K,
    value: Customer[K],
  ) => {
    setCustomer((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const errors = validateCustomer(customer)
  const isCustomerFormValid = Object.values(errors).every((error) => !error)
  const showError = (key: keyof Customer) => hasSubmitted && errors[key]

  const onNextStep = () => {
    setHasSubmitted(true)

    if (!isCustomerFormValid) return

    onOrderProduct()
  }

  return (
    <div className="text-left">
      <div className="grid grid-cols-1 gap-2">
        <div className="grid grid-cols-2 gap-x-2">
          <div className="col-span-1">
            <p>
              ชื่อ <small className="text-red-500">*</small>
            </p>
            <Input
              type="text"
              value={customer.name}
              onChange={(e) => updateCustomer('name', e.target.value)}
              className="h-8 w-full"
              aria-invalid={!!showError('name')}
            />
            {showError('name') && (
              <p className="mt-1 text-xs text-red-500">{errors.name}</p>
            )}
          </div>
          <div className="col-span-1">
            <p>
              เบอร์โทรศัพท์ <small className="text-red-500">*</small>
            </p>
            <Input
              type="tel"
              inputMode="numeric"
              value={customer.phone}
              onChange={(e) =>
                updateCustomer('phone', onlyDigits(e.target.value, 10))
              }
              className="h-8 w-full"
              aria-invalid={!!showError('phone')}
            />
            {showError('phone') && (
              <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-2">
          <div>
            <p>
              บ้านเลขที่/อาคาร/ถนน <small className="text-red-500">*</small>
            </p>
            <Input
              type="text"
              value={customer.addressLine}
              onChange={(e) => updateCustomer('addressLine', e.target.value)}
              className="h-8 w-full"
              aria-invalid={!!showError('addressLine')}
            />
            {showError('addressLine') && (
              <p className="mt-1 text-xs text-red-500">{errors.addressLine}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-12 gap-x-2">
          <div className="col-span-3">
            <p>
              ตำบล/แขวง <small className="text-red-500">*</small>
            </p>
            <Input
              type="text"
              value={customer.subdistrict}
              onChange={(e) => updateCustomer('subdistrict', e.target.value)}
              className="h-8 w-full"
              aria-invalid={!!showError('subdistrict')}
            />
            {showError('subdistrict') && (
              <p className="mt-1 text-xs text-red-500">{errors.subdistrict}</p>
            )}
          </div>
          <div className="col-span-3">
            <p>
              อำเภอ/เขต <small className="text-red-500">*</small>
            </p>
            <Input
              type="text"
              value={customer.district}
              onChange={(e) => updateCustomer('district', e.target.value)}
              className="h-8 w-full"
              aria-invalid={!!showError('district')}
            />
            {showError('district') && (
              <p className="mt-1 text-xs text-red-500">{errors.district}</p>
            )}
          </div>
          <div className="col-span-3">
            <p>
              จังหวัด <small className="text-red-500">*</small>
            </p>
            <Input
              type="text"
              value={customer.province}
              onChange={(e) => updateCustomer('province', e.target.value)}
              className="h-8 w-full"
              aria-invalid={!!showError('province')}
            />
            {showError('province') && (
              <p className="mt-1 text-xs text-red-500">{errors.province}</p>
            )}
          </div>
          <div className="col-span-3">
            <p>
              รหัสไปรษณีย์ <small className="text-red-500">*</small>
            </p>
            <Input
              type="text"
              inputMode="numeric"
              value={customer.postalCode}
              onChange={(e) =>
                updateCustomer('postalCode', onlyDigits(e.target.value, 5))
              }
              className="h-8 w-full"
              aria-invalid={!!showError('postalCode')}
            />
            {showError('postalCode') && (
              <p className="mt-1 text-xs text-red-500">{errors.postalCode}</p>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <Button
          className="!px-5 !py-1 mt-3 !rounded-full !bg-amber-500 !border-amber-500 hover:!bg-amber-600"
          onClick={onBackStep}
        >
          ย้อนกลับ
        </Button>
        <Button
          className="!px-5 !py-1 mt-3 !rounded-full !bg-emerald-500 !border-emerald-500 hover:!bg-emerald-600"
          onClick={onNextStep}
        >
          ถัดไป
        </Button>
      </div>
    </div>
  )
}
