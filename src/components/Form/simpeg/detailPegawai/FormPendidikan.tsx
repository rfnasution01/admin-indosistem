/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseFormReturn } from 'react-hook-form'
import { FormLabelFile, FormLabelInput } from '@/components/InputComponent'
import { Form } from '../..'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { useCreateFileMutation } from '@/store/slices/referensiAPI'
import { Bounce, toast } from 'react-toastify'

export function FormPendidikan({
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
      form.setValue('lampiran', res?.data?.url)
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
    <Form {...form}>
      <form
        className="scrollbar flex h-full w-full flex-col gap-16 overflow-y-auto"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormLabelInput
          name={`tingkat`}
          form={form}
          label="Tingkat"
          placeholder="Tingkat"
          className="w-full hover:cursor-not-allowed phones:w-full "
          type="text"
          isDisabled={disabled}
          isRow
        />
        <FormLabelInput
          name={`nama_sekolah`}
          form={form}
          label="Nama Sekolah / Perguruan Tinggi"
          placeholder="Nama Sekolah / Perguruan Tinggi"
          className="w-full hover:cursor-not-allowed phones:w-full "
          type="text"
          isDisabled={disabled}
          isRow
        />
        <FormLabelInput
          name={`jurusan`}
          form={form}
          label="Jurusan"
          placeholder="Jurusan"
          className="w-full hover:cursor-not-allowed phones:w-full "
          type="text"
          isDisabled={disabled}
          isRow
        />
        <FormLabelInput
          name={`ijazah`}
          form={form}
          label="No. STTB / Tanda Lulus / Ijazah"
          placeholder="No. STTB / Tanda Lulus / Ijazah"
          className="w-full hover:cursor-not-allowed phones:w-full "
          type="text"
          isDisabled={disabled}
          isRow
        />

        <FormLabelFile
          urls={form.watch('lampiran')}
          setUrls={(urls) => form.setValue('lampiran', urls)}
          form={form}
          isLoading={disabled}
          loadingFile={loadingFile}
          name="lampiran"
          handleUploadFoto={handleUploadFoto}
          isDisabled={!isTambah}
          label="Lampiran Ijazah"
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
