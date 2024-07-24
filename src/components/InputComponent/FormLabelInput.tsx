/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseFormReturn } from 'react-hook-form'
import { FormField, FormItem, FormLabel, FormMessage } from '@/components/Form'
import { Input } from '.'
import { ReactNode } from 'react'
import clsx from 'clsx'

export function FormLabelInput({
  form,
  label,
  placeholder = '',
  name,
  prefix,
  suffix,
  type,
  handlerClick,
  className,
  isDisabled,
  isNumber,
  isFloat,
  isRow,
}: {
  form: UseFormReturn | undefined | any
  label?: string | ReactNode
  placeholder?: string
  name: string
  isRow?: boolean
  prefix?: JSX.Element
  suffix?: JSX.Element
  type?:
    | 'text'
    | 'number'
    | 'password'
    | 'date'
    | 'file'
    | 'time'
    | 'email'
    | 'url'
  handlerClick?: () => void
  className?: string
  isDisabled?: boolean
  isNumber?: boolean
  isFloat?: boolean
}) {
  return (
    <FormField
      control={form?.control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={clsx(
            `flex w-full text-[2rem] text-warna-dark ${className}`,
            {
              'flex-row items-center gap-32 phones:flex-col phones:items-start phones:gap-12':
                isRow,
              'flex-col gap-12 ': !isRow,
            },
          )}
        >
          {label && (
            <FormLabel
              className={clsx('font-roboto', { 'w-1/3 phones:w-full': isRow })}
            >
              {label}
            </FormLabel>
          )}
          <Input
            {...field}
            className={clsx('bg-white', { 'w-2/3 phones:w-full': isRow })}
            type={type}
            placeholder={placeholder}
            value={field.value}
            prefix={prefix}
            suffix={suffix}
            handlerClick={handlerClick}
            disabled={isDisabled}
            onInput={(e) => {
              if (isNumber && type === 'text') {
                const inputValue = (e.target as HTMLInputElement).value
                ;(e.target as HTMLInputElement).value = inputValue.replace(
                  /[^\d]/g,
                  '',
                )
                field.onChange((e.target as HTMLInputElement).value)
              }
              if (isFloat && type === 'text') {
                const inputValue = (e.target as HTMLInputElement).value
                const formattedValue = inputValue
                  .replace(/[^\d.]/g, '') // Remove non-digit and non-period characters
                  .replace(/(\..*?)\..*/g, '$1') // Allow only one period

                ;(e.target as HTMLInputElement).value = formattedValue
                field.onChange(formattedValue)
              }
            }}
          />
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
