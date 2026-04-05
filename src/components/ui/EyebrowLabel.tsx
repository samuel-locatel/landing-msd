import { cn } from '@/lib/utils'

interface Props {
  children: string
  className?: string
  variant?: 'default' | 'light'
}

export function EyebrowLabel({ children, className, variant = 'default' }: Props) {
  return (
    <span
      className={cn(
        'inline-block px-3 py-1 rounded text-xs font-semibold uppercase tracking-widest',
        variant === 'default' && 'bg-vinho-light text-vinho-dark',
        variant === 'light' && 'bg-white/10 text-white/80',
        className
      )}
    >
      {children}
    </span>
  )
}
