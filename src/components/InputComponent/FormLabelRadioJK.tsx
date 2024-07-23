/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseFormReturn } from 'react-hook-form'
import { FormField, FormItem, FormLabel, FormMessage } from '@/components/Form'
import { Input } from '.'
import { ReactNode } from 'react'

export function FormLabelRadioJenisKelamin({
  form,
  label,
  name,
  className,
  isDisabled,
}: {
  form: UseFormReturn | undefined | any
  label?: string | ReactNode
  name: string
  className?: string
  isDisabled?: boolean
}) {
  return (
    <FormField
      control={form?.control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={`flex w-full flex-col gap-y-8 text-[2rem] text-warna-dark ${className}`}
        >
          <FormLabel className="font-roboto">{label}</FormLabel>
          <div className="flex w-full items-center gap-x-8">
            <label className="flex items-center gap-x-4">
              <Input
                type="radio"
                value="Laki-laki"
                checked={field.value === 'Laki-laki'}
                onChange={() => field.onChange('Laki-laki')}
                disabled={isDisabled}
              />
              <p className="text-nowrap">Laki-laki</p>
            </label>
            <label className="flex items-center gap-x-4">
              <Input
                type="radio"
                value="Perempuan"
                checked={field.value === 'Perempuan'}
                onChange={() => field.onChange('Perempuan')}
                disabled={isDisabled}
              />
              <p className="text-nowrap">Perempuan</p>
            </label>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
