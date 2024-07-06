import { UseFormReturn } from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../Form'
import { Textarea } from './TextArea'

export const FormLabelTextArea = ({
  name,
  placeholder,
  headerLabel,
  isDisabled,
  useFormReturn,
}: {
  name: string
  placeholder?: string
  headerLabel?: string
  isDisabled?: boolean
  useFormReturn: UseFormReturn
}) => {
  return (
    <FormField
      name={name}
      control={useFormReturn.control}
      render={({ field }) => {
        return (
          <FormItem className="flex w-full flex-col gap-12 text-warna-dark">
            {headerLabel != null ? (
              <FormLabel className="font-roboto">{headerLabel}</FormLabel>
            ) : (
              <></>
            )}
            <FormControl>
              <Textarea
                disabled={isDisabled}
                placeholder={placeholder}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}
