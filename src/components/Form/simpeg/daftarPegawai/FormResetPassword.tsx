/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseFormReturn } from 'react-hook-form'
import { FormLabelInput } from '@/components/InputComponent'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowLeft,
  faEye,
  faEyeSlash,
  faSave,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons'
import { Form } from '../..'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { DaftarPegawai } from '@/components/Table/TableDaftarPegawai'

export function FormResetPassword({
  form,
  isLoading,
  handleSubmit,
  setIsOpen,
  item,
}: {
  form: UseFormReturn
  item?: DaftarPegawai
  isLoading: boolean
  handleSubmit: () => Promise<void>
  setIsOpen: Dispatch<SetStateAction<boolean>>
}) {
  const [isShow, setIsShow] = useState<boolean>(false)

  useEffect(() => {
    if (item) {
      form.setValue('nama', item?.nama)
      form.setValue('nip', item?.nip)
    }
  }, [item])

  return (
    <div>
      <Form {...form}>
        <form
          className="flex w-[50rem] flex-col  gap-32"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <FormLabelInput
            name={`nip`}
            form={form}
            label="NIP"
            placeholder="Masukkan nip"
            className="w-full hover:cursor-not-allowed phones:w-full "
            type="text"
            isDisabled
          />
          <FormLabelInput
            name={`nama`}
            form={form}
            label="Nama"
            placeholder="Masukkan Nama"
            className="w-full hover:cursor-not-allowed phones:w-full "
            type="text"
            isDisabled
          />
          <FormLabelInput
            name="password"
            form={form}
            label="Password"
            placeholder="Masukkan password"
            className="text-sim-dark"
            isDisabled={isLoading}
            suffix={
              <span
                onClick={() => {
                  setIsShow(!isShow)
                }}
              >
                {isShow ? (
                  <FontAwesomeIcon icon={faEye} />
                ) : (
                  <FontAwesomeIcon icon={faEyeSlash} />
                )}
              </span>
            }
            type={isShow ? 'text' : 'password'}
          />

          <div className="flex justify-end">
            <div className="flex items-center gap-12">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-12 rounded-2xl border border-warna-dark px-24 py-12 text-warna-dark hover:bg-warna-dark hover:text-white disabled:cursor-not-allowed"
              >
                <FontAwesomeIcon icon={faArrowLeft} />
                Kembali
              </button>
              <button
                type="submit"
                className="flex items-center justify-center gap-12 rounded-2xl bg-warna-primary px-32 py-12 text-white disabled:cursor-not-allowed"
              >
                <p>Simpan</p>
                {isLoading ? (
                  <span className="animate-spin duration-300">
                    <FontAwesomeIcon icon={faSpinner} />
                  </span>
                ) : (
                  <FontAwesomeIcon icon={faSave} />
                )}
              </button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}
