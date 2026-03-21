import { InputHTMLAttributes } from 'react'
import clsx from 'clsx'

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  children?: React.ReactNode
  align?: 'center' | 'start'
}

export function Checkbox({ children, align = 'center', className, ...props }: CheckboxProps) {
  return (
    <label
      className={clsx(
        'flex cursor-pointer gap-2.5',
        align === 'start' ? 'items-start' : 'items-center',
      )}
    >
      <input
        type="checkbox"
        className={clsx('rounded w-4 h-4 shrink-0 accent-amber-700', align === 'start' && 'mt-0.5', className)}
        {...props}
      />
      {children}
    </label>
  )
}
