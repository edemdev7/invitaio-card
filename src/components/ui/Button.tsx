import type { ButtonHTMLAttributes, ReactNode } from 'react'

import { cn } from '@/lib/utils'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost'
  children: ReactNode
}

export default function Button({
  variant = 'primary',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:outline-none disabled:opacity-50',
        variant === 'primary' && 'bg-ink-900 text-ink-50 hover:bg-ink-700',
        variant === 'ghost' && 'text-ink-700 hover:bg-ink-200/50 border border-ink-200',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
