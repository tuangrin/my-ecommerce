import { Search } from 'lucide-react'

import { Input } from '@/components/ui/input'

type SearchInputProps = React.ComponentProps<'input'>

export function SearchInput({ className, ...props }: SearchInputProps) {
  return (
    <div className="relative">
      <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        className={className ? `pl-8 ${className}` : 'pl-8'}
        {...props}
      />
    </div>
  )
}
