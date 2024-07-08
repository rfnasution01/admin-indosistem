import { Dispatch, SetStateAction } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { Form } from '../..'
import {
  FormLabelInput,
  FormLabelRadio,
  FormLabelTipTap,
} from '@/components/InputComponent'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faSave, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { ValidasiKonfirmasi } from '@/components/Dialog/ValidasiKonfirmasi'
import { SelectListTag } from '@/components/Select/website'
import { SelectListPengumuman } from '@/components/Select/website/ListPengumuman'
import { PreviewPengumuman } from '@/features/website/pengumuman'

export default function FormTambahPengumuman({
  form,
  isLoading,
  handleSubmit,
  setIsShow,
  setIsSubmit,
  isSubmit,
  isShow,
}: {
  form: UseFormReturn
  isLoading: boolean
  handleSubmit: () => Promise<void>
  setIsSubmit: Dispatch<SetStateAction<boolean>>
  setIsShow: Dispatch<SetStateAction<boolean>>
  isShow: boolean
  isSubmit: boolean
}) {
  return (
    <div className="w-full">
      <Form {...form}>
        <form
          className="flex w-full flex-col gap-32"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <div className="flex gap-64 phones:flex-col phones:gap-32">
            <FormLabelInput
              name={`judul`}
              form={form}
              label="Judul"
              placeholder="Masukkan judul pengumuman"
              className="w-1/2 hover:cursor-not-allowed phones:w-full "
              type="text"
              isDisabled={isLoading}
            />
            <FormLabelInput
              name={`tanggal`}
              form={form}
              label="Tanggal"
              placeholder="Masukkan tanggal pengumuman"
              className="w-1/2 hover:cursor-not-allowed phones:w-full "
              type="date"
              isDisabled={isLoading}
            />
          </div>

          <div className="flex gap-64 phones:flex-col phones:gap-32">
            <SelectListPengumuman
              name="id_kategori"
              headerLabel="Kategori"
              placeholder="Pilih Kategori"
              useFormReturn={form}
              isDisabled={isLoading}
            />
            <SelectListTag
              name="id_tags"
              headerLabel="Tag"
              placeholder="Pilih Tag"
              useFormReturn={form}
              isDisabled={isLoading}
            />
          </div>

          <div className="flex gap-64 phones:flex-col phones:gap-32">
            <FormLabelTipTap
              name="isi"
              form={form}
              headerLabel="Isi"
              placeHolder="Masukkan isi paragraf"
              classname="w-full"
            />
          </div>

          <FormLabelRadio
            name="publish"
            form={form}
            label="Umumkan sekarang"
            className="text-sim-dark phones:w-full"
            isDisabled={isLoading}
          />

          <div className="flex justify-end">
            <button
              type="submit"
              onClick={async () => {
                const isValid = await form.trigger()

                if (isValid) {
                  setIsShow(true)
                }
              }}
              className="flex items-center justify-center gap-12 rounded-2xl bg-warna-primary px-32 py-12 text-white"
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
            <PreviewPengumuman
              judul={form?.watch('judul')}
              isi={form?.watch('isi')}
              tanggal={form?.watch('tanggal')}
              taq={form?.watch('label_tags')}
              kategori={form?.watch('nama_kategori')}
              publish={form?.watch('publish')}
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
