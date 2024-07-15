import { Dispatch, SetStateAction } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { Form } from '../..'
import { FormLabelInput, FormLabelTipTap } from '@/components/InputComponent'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faSave, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { ValidasiKonfirmasi } from '@/components/Dialog/ValidasiKonfirmasi'
import { PreviewFAQ } from '@/features/website/konten'
import { SelectListDownload } from '@/components/Select/website/SelectListDownload'

export default function FormTambahFAQ({
  form,
  isLoading,
  handleSubmit,
  setIsShow,
  setIsSubmit,
  isSubmit,
  isShow,
  isTambah,
  isUbah,
  isEdit,
}: {
  form: UseFormReturn
  isLoading: boolean
  handleSubmit: () => Promise<void>
  setIsSubmit: Dispatch<SetStateAction<boolean>>
  setIsShow: Dispatch<SetStateAction<boolean>>
  isShow: boolean
  isSubmit: boolean
  isEdit?: boolean
  isUbah: boolean
  isTambah: boolean
}) {
  const disableEdit = !(isEdit && isUbah)
  const disableTambah = !(!isEdit && isTambah)

  const disabled = isEdit ? disableEdit : disableTambah

  return (
    <div>
      <Form {...form}>
        <form
          className="flex flex-col gap-32"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <div className="flex gap-64 phones:flex-col phones:gap-32">
            <SelectListDownload
              name="id_kategori"
              headerLabel="Kategori"
              placeholder="Pilih Jenis Kategori"
              useFormReturn={form}
              isDisabled={isLoading || disabled}
              className="w-1/2"
              jenis="faq"
            />
            <div className="w-1/2 phones:hidden" />
          </div>

          <div className="flex gap-64 phones:flex-col phones:gap-32">
            <FormLabelInput
              name={`pertanyaan`}
              form={form}
              label="Pertanyaan"
              placeholder="Masukkan pertanyaan"
              className="w-full hover:cursor-not-allowed phones:w-full "
              type="text"
              isDisabled={isLoading || disabled}
            />
          </div>

          <div className="flex gap-64 phones:flex-col phones:gap-32">
            <FormLabelTipTap
              name="jawaban"
              form={form}
              headerLabel="Isi"
              placeHolder="Masukkan isi paragraf"
              classname="w-full"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading || disabled}
              onClick={async () => {
                const isValid = await form.trigger()

                if (isValid) {
                  setIsShow(true)
                }
              }}
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
        </form>
      </Form>
      <ValidasiKonfirmasi
        isOpen={isShow}
        setIsOpen={setIsShow}
        children={
          <div className="flex w-full flex-col gap-32 rounded-2x bg-warna-pale-blue p-32 text-[2rem] text-warna-dark phones:text-[2.4rem]">
            <PreviewFAQ
              pertanyaan={form?.watch('pertanyaan')}
              jawaban={form?.watch('jawaban')}
              name_jenis={form?.watch('nama_kategori')}
            />
          </div>
        }
        childrenButton={
          <button
            type="submit"
            onClick={() => {
              setIsSubmit(true)
              handleSubmit()
            }}
            disabled={isLoading}
            className="flex items-center gap-12 rounded-2xl bg-warna-dark px-24 py-12 text-white hover:bg-opacity-80 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="animate-spin duration-300">
                <FontAwesomeIcon icon={faSpinner} />
              </div>
            ) : isSubmit ? (
              <FontAwesomeIcon icon={faSave} />
            ) : (
              <FontAwesomeIcon icon={faCheck} />
            )}
            {isSubmit ? 'Simpan' : 'Sudah Benar'}
          </button>
        }
      />
    </div>
  )
}
