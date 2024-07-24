/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseFormReturn } from 'react-hook-form'
import { FormLabelInput } from '@/components/InputComponent'
import { Form } from '../..'
import { Dispatch, SetStateAction } from 'react'

export function FormSaudara({
  form,
  isLoading,
  isTambah,
  setIsShow,
}: {
  form: UseFormReturn
  isLoading?: boolean
  isTambah: boolean
  isEdit?: boolean
  setIsShow: Dispatch<SetStateAction<boolean>>
}) {
  const handleSubmit = () => {
    const values = form.watch('')

    console.log({ values })
  }

  const disabled = isLoading || !isTambah

  return (
    <Form {...form}>
      <form
        className="scrollbar flex h-full w-full flex-col gap-16 overflow-y-auto"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormLabelInput
          name={`nama`}
          form={form}
          label="Nama"
          placeholder="Nama"
          className="w-full hover:cursor-not-allowed phones:w-full "
          type="text"
          isDisabled={disabled}
          isRow
        />
        <FormLabelInput
          name={`jk`}
          form={form}
          label="Jenis Kelamin"
          placeholder="Jenis Kelamin"
          className="w-full hover:cursor-not-allowed phones:w-full "
          type="text"
          isDisabled={disabled}
          isRow
        />
        <FormLabelInput
          name={`umur`}
          form={form}
          label="Umur"
          placeholder="Umur"
          className="w-full hover:cursor-not-allowed phones:w-full "
          type="date"
          isDisabled={disabled}
          isNumber
          isRow
        />
        <FormLabelInput
          name={`pekerjaan`}
          form={form}
          label="Pekerjaan"
          placeholder="Pekerjaan"
          className="w-full hover:cursor-not-allowed phones:w-full "
          type="text"
          isDisabled={disabled}
          isRow
        />

        <FormLabelInput
          name={`keterangan`}
          form={form}
          label="Keterangan"
          placeholder="Keterangan"
          className="w-full hover:cursor-not-allowed phones:w-full "
          type="text"
          isDisabled={disabled}
          isRow
        />

        <div className="flex items-center justify-center gap-32">
          <button
            type="button"
            onClick={() => {
              setIsShow(false)
            }}
            className="flex items-center justify-center gap-12 rounded-2xl bg-danger px-32 py-12 text-white hover:bg-opacity-80 disabled:cursor-not-allowed"
          >
            Batal
          </button>
          <button
            type="submit"
            className="flex items-center justify-center gap-12 rounded-2xl bg-success px-32 py-12 text-white hover:bg-opacity-80 disabled:cursor-not-allowed"
          >
            Tambah
          </button>
        </div>
      </form>
    </Form>
  )
}
