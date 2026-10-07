import type { ButtonHTMLAttributes, ReactNode, Ref } from 'react'

import { cn } from '@/lib/utils'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost'
  ref?: Ref<HTMLButtonElement>
  children: ReactNode
}

export default function Button({
  variant = 'primary',
  className,
  children,
  ref,
  ...props
}: ButtonProps) {
  return (
    <button
      ref={ref}
      className={cn(
        'focus-visible:ring-love-400 inline-flex items-center justify-center rounded-full px-7 py-3.5 text-base font-semibold transition focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
        variant === 'primary' &&
          'bg-love-500 hover:bg-love-600 text-white shadow-[0_12px_28px_-12px_rgba(222,60,103,0.8)]',
        variant === 'ghost' && 'border-love-200 text-love-700 border bg-white/80 hover:bg-white',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
