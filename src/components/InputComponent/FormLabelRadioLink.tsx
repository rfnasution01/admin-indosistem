/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseFormReturn } from 'react-hook-form'
import { FormField, FormItem, FormLabel, FormMessage } from '@/components/Form'
import { Input } from '.'
import { ReactNode } from 'react'

export function FormLabelRadioLink({
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
          <div className="flex items-center gap-x-8">
            <label className="flex items-center gap-x-4">
              <Input
                type="radio"
                value="Link"
                checked={field.value === 'Link'}
                onChange={() => field.onChange('Link')}
                disabled={isDisabled}
              />
              Link
            </label>
            <label className="flex items-center gap-x-4">
              <Input
                type="radio"
                value="Upload"
                checked={field.value === 'Upload'}
                onChange={() => field.onChange('Upload')}
                disabled={isDisabled}
              />
              Upload
            </label>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
