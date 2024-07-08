import { UseFormReturn } from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../Form'
import Tiptap from '../Tiptap'

export function FormLabelTipTap({
  form,
  name,
  classname,
  headerLabel,
  placeHolder,
}: {
  form: UseFormReturn
  name: string
  classname?: string
  headerLabel?: string
  placeHolder?: string
}) {
  return (
    <FormField
      control={form?.control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={`${classname} flex flex-col gap-y-8 text-[2rem] text-black`}
        >
          {headerLabel && <FormLabel>{headerLabel}</FormLabel>}
          <FormControl>
            <Tiptap
              content={field.value}
              placeholder={placeHolder}
              update={field.onChange}
              toolbarClassName="gap-4 p-4"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
