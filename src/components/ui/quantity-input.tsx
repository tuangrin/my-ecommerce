import { Minus, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type QuantityInputProps = {
  value: number
  min?: number
  step?: number
  onChange: (value: number) => void
}

export function QuantityInput({
  value,
  min = 1,
  step = 1,
  onChange,
}: QuantityInputProps) {
  const decrease = () => {
    onChange(Math.max(min, value - step))
  }

  const increase = () => {
    onChange(value + step)
  }

  return (
    <div className="inline-flex items-center rounded-md border border-input">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="size-8 rounded-r-none"
        onClick={decrease}
        disabled={value <= min}
      >
        <Minus className="size-3" />
      </Button>

      <Input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        value={value}
        onChange={(event) => {
          const nextValue = Number(event.target.value)
          onChange(Number.isNaN(nextValue) ? min : Math.max(min, nextValue))
        }}
        className="h-8 w-12 rounded-none border-0 px-0 text-center text-sm shadow-none focus-visible:ring-0"
      />

      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="size-8 rounded-l-none"
        onClick={increase}
      >
        <Plus className="size-3" />
      </Button>
    </div>
  )
}
