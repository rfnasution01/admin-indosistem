import { useCreateFileMutation } from '@/store/slices/referensiAPI'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { Bounce, toast } from 'react-toastify'
import { Form } from '../..'
import {
  FormLabelFile,
  FormLabelInput,
  FormLabelTextArea,
} from '@/components/InputComponent'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faSave, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { ValidasiKonfirmasi } from '@/components/Dialog/ValidasiKonfirmasi'
import { SelectListKonten } from '@/components/Select/website'
import { PreviewMenu } from '@/features/website/konten'

export default function FormTambahMenu({
  form,
  isLoading,
  handleSubmit,
  setUrls,
  urls,
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
  setUrls: Dispatch<SetStateAction<string>>
  setIsSubmit: Dispatch<SetStateAction<boolean>>
  setIsShow: Dispatch<SetStateAction<boolean>>
  isShow: boolean
  isSubmit: boolean
  urls: string
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
      toast.error(`Maaf, anda tidak memiliki akses untuk mengubah data ini`, {
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
      setUrls(res?.data?.url)
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

  const jenisMenu = form.watch('jenis_menu')

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
              name={`jenis_menu`}
              form={form}
              label="Jenis Menu"
              placeholder="Masukkan jenis menu"
              className="w-1/2 hover:cursor-not-allowed phones:w-full "
              type="text"
              isDisabled
            />
            <FormLabelInput
              name={`posisi`}
              form={form}
              label="Posisi"
              placeholder="Masukkan posisi"
              className="w-1/2 hover:cursor-not-allowed phones:w-full "
              type="text"
              isDisabled
            />
          </div>

          <div className="flex gap-64 phones:flex-col phones:gap-32">
            <FormLabelInput
              name={`nama_menu`}
              form={form}
              label="Nama Menu"
              placeholder="Masukkan nama menu"
              className="w-1/2 hover:cursor-not-allowed phones:w-full "
              type="text"
              isDisabled={isLoading || disabled}
            />
            <FormLabelInput
              name={`urutan`}
              form={form}
              label="Urutan"
              placeholder="Masukkan urutan"
              className="w-1/2 hover:cursor-not-allowed phones:w-full "
              type="text"
              isNumber
              isDisabled={isLoading || disabled}
            />
          </div>

          {jenisMenu !== 'URL' && (
            <SelectListKonten
              name="id_konten"
              headerLabel="Kategori Menu"
              placeholder="Pilih Kategori"
              useFormReturn={form}
              isDisabled={isLoading || disabled}
              jenis={jenisMenu}
            />
          )}

          <div className="flex gap-64 phones:flex-col phones:gap-32">
            <FormLabelTextArea
              name={`deskripsi_singkat`}
              useFormReturn={form}
              placeholder="Masukkan Deskripsi"
              isDisabled={isLoading || disabled}
              headerLabel="Deskripsi Singkat"
            />
          </div>

          <FormLabelFile
            urls={urls}
            setUrls={setUrls}
            form={form}
            isLoading={isLoading}
            loadingFile={loadingFile}
            name="url_gambar"
            handleUploadFoto={handleUploadFoto}
            isDisabled={disabled}
          />

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
            <PreviewMenu
              gambar={urls}
              jenis_menu={form?.watch('jenis_menu')}
              posisi={form?.watch('posisi')}
              nama_menu={form?.watch('nama_menu')}
              kategori={form?.watch('nama_kategori')}
              deskripsi={form?.watch('deskripsi_singkat')}
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
