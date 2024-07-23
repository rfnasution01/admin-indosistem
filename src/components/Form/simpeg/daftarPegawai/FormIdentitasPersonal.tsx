/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseFormReturn } from 'react-hook-form'
import {
  FormLabelFile,
  FormLabelInput,
  FormLabelRadioJenisKelamin,
} from '@/components/InputComponent'
import { Form } from '../..'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { SelectListKontenReferensiUmum } from '@/components/Select/simpeg'
import { useCreateFileMutation } from '@/store/slices/referensiAPI'
import { Bounce, toast } from 'react-toastify'

export function FormIdentitasPersonal({
  form,
  isLoading,
  currentIdx,
  menuList,
  setCurrentIdx,
  setMenu,
  isTambah,
}: {
  form: UseFormReturn
  isLoading?: boolean
  currentIdx: number
  setCurrentIdx: Dispatch<SetStateAction<number>>
  menuList: string[]
  setMenu: Dispatch<SetStateAction<string>>
  isTambah: boolean
}) {
  const dataParams = localStorage.getItem(menuList?.[currentIdx]) ?? ''

  useEffect(() => {
    if (dataParams && dataParams !== '') {
      const data = JSON.parse(dataParams)

      form.setValue('nik', data?.nik)
      form.setValue('nama', data?.nama)
      form.setValue('tempatLahir', data?.tempatLahir)
      form.setValue('tanggalLahir', data?.tanggalLahir)
      form.setValue('email', data?.email)
      form.setValue('hp', data?.hp)
      form.setValue('npwp', data?.npwp)
      form.setValue('jk', data?.jk)
      form.setValue('pernikahan', data?.pernikahan)
      form.setValue('photo', data?.photo)
      form.setValue('nama_kategori_pernikahan', data?.nama_kategori_pernikahan)
    }
  }, [dataParams])

  const handleSubmit = () => {
    const values = form.getValues()

    // Fetch the existing status from localStorage or initialize an empty object
    const storedStatus = JSON.parse(localStorage.getItem('status')) || {}

    // Set or update the isPersonal field to true
    storedStatus.isPersonal = true

    // Store the updated status object back to localStorage
    localStorage.setItem('status', JSON.stringify(storedStatus))

    localStorage.setItem(menuList?.[currentIdx], JSON.stringify(values))
    setCurrentIdx(currentIdx + 1)
    setMenu(menuList?.[currentIdx + 1])
  }

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

    if (!isTambah) {
      toast.error(`Maaf, anda tidak memiliki akses untuk mengubah data ini`, {
        position: 'bottom-right',
        autoClose: 3000,
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
      form.setValue('photo', res?.data?.url)
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

  const disabled = isLoading || !isTambah

  return (
    <div className="scrollbar flex h-full flex-col gap-32 overflow-y-auto">
      <p className="font-roboto text-[2.4rem]">{menuList?.[currentIdx]}</p>

      <Form {...form}>
        <form
          className="scrollbar flex h-full w-full flex-col gap-32 overflow-y-auto"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <div className="flex items-center gap-32 phones:flex-col phones:gap-24">
            <FormLabelInput
              name={`nik`}
              form={form}
              label="NIK"
              placeholder="NIK"
              className="w-full hover:cursor-not-allowed phones:w-full "
              type="text"
              isDisabled={disabled}
              isNumber
            />
            <FormLabelInput
              name={`nama`}
              form={form}
              label="Nama Lengkap dan Gelar"
              placeholder="Nama Lengkap dan Gelar"
              className="w-full hover:cursor-not-allowed phones:w-full "
              type="text"
              isDisabled={disabled}
            />
          </div>
          <div className="flex items-center gap-32 phones:flex-col phones:gap-24">
            <FormLabelInput
              name={`tempatLahir`}
              form={form}
              label="Tempat Lahir"
              placeholder="Tempat Lahir"
              className="w-full hover:cursor-not-allowed phones:w-full "
              type="text"
              isDisabled={disabled}
            />

            <FormLabelInput
              name={`tanggalLahir`}
              form={form}
              label="Tanggal lahir"
              className="w-full hover:cursor-not-allowed phones:w-full "
              type="date"
              isDisabled={disabled}
            />
          </div>
          <div className="flex items-center gap-32 phones:flex-col phones:gap-24">
            <FormLabelInput
              name={`email`}
              form={form}
              label="Email"
              placeholder="Email"
              className="w-full hover:cursor-not-allowed phones:w-full "
              type="email"
              isDisabled={disabled}
            />

            <FormLabelInput
              name={`hp`}
              form={form}
              label="No. HP"
              placeholder="No. HP"
              className="w-full hover:cursor-not-allowed phones:w-full "
              type="text"
              isDisabled={disabled}
              isNumber
            />
          </div>
          <div className="flex items-center gap-32 phones:flex-col phones:gap-24">
            <FormLabelInput
              name={`npwp`}
              form={form}
              label="NPWP"
              placeholder="NPWP"
              className="w-full hover:cursor-not-allowed phones:w-full "
              type="text"
              isDisabled={disabled}
              isNumber
            />
            <FormLabelRadioJenisKelamin
              name="jk"
              form={form}
              label={'Jenis Kelamin'}
              isDisabled={disabled}
            />
          </div>

          <div className="flex items-center gap-32 phones:flex-col phones:gap-24">
            <SelectListKontenReferensiUmum
              name="pernikahan"
              headerLabel="Pernikahan"
              placeholder="Pernikahan"
              useFormReturn={form}
              isDisabled={disabled}
              jenis={'status_pernikahan'}
              level1
            />
            <div className="w-full phones:hidden" />
          </div>

          <div className="flex flex-col gap-12">
            <FormLabelFile
              urls={form.watch('photo')}
              setUrls={(urls) => form.setValue('photo', urls)}
              form={form}
              isLoading={disabled}
              loadingFile={loadingFile}
              name="url_gambar"
              handleUploadFoto={handleUploadFoto}
              isDisabled={!isTambah}
            />
          </div>

          <div className="flex items-center justify-end gap-32">
            <button
              type="submit"
              className="flex items-center justify-center gap-12 rounded-2xl bg-success px-32 py-12 text-white hover:bg-opacity-80 disabled:cursor-not-allowed"
            >
              Selanjutnya
            </button>
          </div>
        </form>
      </Form>
    </div>
  )
}
