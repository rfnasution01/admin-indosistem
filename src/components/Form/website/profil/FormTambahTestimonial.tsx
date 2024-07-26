import { useCreateFileMutation } from '@/store/slices/referensiAPI'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { Bounce, toast } from 'react-toastify'
import { Form } from '../..'
import {
  FormLabelFile,
  FormLabelInput,
  FormLabelTextArea,
  FormLabelTipTap,
} from '@/components/InputComponent'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faSave, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { ValidasiKonfirmasi } from '@/components/Dialog/ValidasiKonfirmasi'
import { PreviewTestimonial } from '@/features/website/profil/testimonial'

export default function FormTambahTestimoni({
  form,
  isLoading,
  handleSubmit,
  setIsShow,
  setIsSubmit,
  isSubmit,
  isShow,
  isEdit,
  isTambah,
  isUbah,
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
  // --- Upload File ---
  const [
    uploadFileMutation,
    {
      isSuccess: successFile,
      isError: isErrorFile,
      error: errorFile,
      isLoading: loadingFile,
    },
  ] = useCreateFileMutation()

  const handleUploadFoto = async (file: File) => {
    const formatData = new FormData()
    formatData.append('berkas', file)

    if ((isEdit && !isUbah) || (!isEdit && !isTambah)) {
      toast.error(`Maaf anda tidak memiliki akses untuk menambah data`, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      })
    }

    try {
      const res = await uploadFileMutation(formatData)
      form.setValue('url_photo', res?.data?.url)
    } catch (e) {
      console.error(e)
      toast.error(`Data gagal disimpan`, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      })
    }
  }

  useEffect(() => {
    if (successFile) {
      toast.success('Berhasil unggah photo!', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      })
    }
  }, [successFile])

  useEffect(() => {
    if (isErrorFile) {
      const errorMsg = errorFile as { data?: { message?: string } }

      toast.error(`${errorMsg?.data?.message ?? 'Terjadi Kesalahan'}`, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      })
    }
  }, [isErrorFile, errorFile])

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
            <FormLabelInput
              name={`nama`}
              form={form}
              label="Nama Lengkap"
              placeholder="Masukkan nama lengkap"
              className="w-1/2 hover:cursor-not-allowed phones:w-full "
              type="text"
              isDisabled={isLoading || disabled}
            />
            <div className="w-1/2 phones:hidden" />
          </div>

          <div className="flex gap-64 phones:flex-col phones:gap-32">
            <FormLabelTextArea
              name="keterangan_singkat"
              useFormReturn={form}
              headerLabel="Keterangan Singkat"
              placeholder="Masukkan keterangan singkat"
              isDisabled={isLoading || disabled}
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

          <div className="flex flex-col gap-12">
            <FormLabelFile
              urls={form.watch('url_photo')}
              setUrls={(urls) => form.watch('url_photo', urls)}
              form={form}
              isLoading={isLoading}
              loadingFile={loadingFile}
              name="url_photo"
              handleUploadFoto={handleUploadFoto}
              isDisabled={disabled}
            />
            <p className="text-warna-dark">
              Disarankan menunggah gambar dengan aspek rasio{' '}
              <span className="text-warna-red">Potrait 3:4</span>
            </p>
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
            <PreviewTestimonial
              nama={form.watch('nama')}
              keterangan={form.watch('keterangan_singkat')}
              photo={form.watch('url_photo')}
              isi={form.watch('isi')}
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
