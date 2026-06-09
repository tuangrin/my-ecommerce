import { useState } from 'react'
import {
  Stepper,
  StepperItem,
  StepperTrigger,
  StepperIndicator,
  StepperSeparator,
  StepperNav,
  StepperTitle,
  StepperPanel,
  StepperContent,
} from '@/components/ui/stepper'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  FileTextIcon,
  EyeIcon,
  CheckCircleIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from 'lucide-react'
import ShoppingCart from '@/components/Cart/ShoppingCart'

const steps = [
  {
    id: 'cart',
    title: 'สินค้าในตะกร้า',
    description: 'Enter the required details for this step',
  },
  {
    id: 'address',
    title: 'ที่อยู่จัดส่ง',
    description: 'Confirm your information and choices',
  },
  {
    id: 'payment',
    title: 'วิธีการชำระเงิน',
    description: 'All set - review completed',
  },
]

export default function Cart() {
  const [current, setCurrent] = useState(steps[0].id)

  const currentIndex = steps.findIndex((s) => s.id === current)
  const goNext = () =>
    setCurrent(steps[Math.min(currentIndex + 1, steps.length - 1)].id)
  const goBack = () => setCurrent(steps[Math.max(currentIndex - 1, 0)].id)

  const [submitted, setSubmitted] = useState(false)

  const handleNext = () => {
    if (currentIndex === steps.length - 1) {
      alert('Stepper submitted')
      setSubmitted(true)
    } else {
      goNext()
    }
  }

  return (
    <div className="min-h-screen p-3">
      <Stepper
        steps={steps}
        value={current}
        onValueChange={(v) => {
          if (!submitted) setCurrent(v)
        }}
        className="mx-auto flex max-w-5xl flex-col gap-6 pt-6"
        orientation="horizontal"
      >
        <StepperNav className="w-full">
          {steps.map((step, index) => (
            <StepperItem
              key={index}
              stepId={step.id}
              completed={submitted}
              className="relative flex-1"
            >
              <StepperTrigger
                disabled
                className={cn(
                  'flex flex-col gap-2.5',
                  submitted ? 'pointer-events-none' : '',
                )}
                aria-disabled={submitted}
              >
                <StepperIndicator
                  className={cn(
                    'data-[state=active]:bg-blue-500 data-[state=active]:text-white group-data-[state=active]/step:ring-blue-500/30',
                    'data-[state=completed]:bg-blue-500 data-[state=completed]:text-white',
                    submitted &&
                      'data-[state=completed]:bg-green-600/20 data-[state=completed]:text-green-600 dark:data-[state=completed]:bg-green-400/20 dark:data-[state=completed]:text-green-400',
                  )}
                >
                  {index + 1}
                </StepperIndicator>
                <StepperTitle
                  className={`${submitted ? 'text-muted-foreground' : ''}`}
                >
                  {step.title}
                </StepperTitle>
              </StepperTrigger>
              {steps.length > index + 1 && (
                <StepperSeparator
                  className={cn(
                    'absolute inset-x-0 top-2 right-[calc(-50%+18px)] left-[calc(50%+18px)]',
                    submitted
                      ? 'group-data-[state=completed]/step:bg-green-600/40 dark:group-data-[state=completed]/step:bg-green-400/40'
                      : '',
                  )}
                />
              )}
            </StepperItem>
          ))}
        </StepperNav>
        <StepperPanel className="w-10/12 mx-auto text-center text-sm">
          <StepperContent value="cart">
            <ShoppingCart onOrderProduct={handleNext} />
          </StepperContent>
        </StepperPanel>
      </Stepper>
    </div>
  )
}
