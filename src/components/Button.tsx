import React, { ComponentProps } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const button = tv({
  base: [
    'rounded-lg px-4 py-2 text-sm font-semibold outline-none shadow-sm',
    'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-violet-500',
  ],

  variants: {
    variant: {
      primary:
        'bg-violet-600 w-24 text-white dark:disabled:bg-violet-800 hover:bg-violet-700 dark:bg-violet-500 dark:hover:bg-violet-600',
      ghost:
        'rounded-md px-2 hover:bg-zinc-50 dark:hover:bg-white/5 shadow-none text-zinc-500 dark:text-zinc-400',
      outline:
        'border border-zinc-300 text-zinc-700 disabled:bg-zinc-200 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-violet-400 dark:hover:text-white',
    },
  },

  defaultVariants: {
    variant: 'primary',
  },
})

export type ButtonProps = ComponentProps<'button'> & VariantProps<typeof button>

export function Button({ variant, ...props }: ButtonProps) {
  return <button {...props} className={button({ variant })} />
}
