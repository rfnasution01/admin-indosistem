import { usePathname } from '@/hooks/usePathname'
import { useCreateFileMutation } from '@/store/slices/referensiAPI'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { useFieldArray, UseFormReturn } from 'react-hook-form'
import { Bounce, toast } from 'react-toastify'
import { Form } from '../..'
import {
  FormLabelFile,
  FormLabelInput,
  FormLabelTextArea,
} from '@/components/InputComponent'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAlignJustify,
  faCheck,
  faDeleteLeft,
  faPlusCircle,
  faSave,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons'
import { SelectListJenisTentangSekolah } from '@/components/Select/website'
import { ValidasiKonfirmasi } from '@/components/Dialog/ValidasiKonfirmasi'
import { PreviewProfil } from '@/features/website/profil/tentangSekolah/PreviewProfil'

export default function FormTambahProfil({
  form,
  isLoading,
  handleSubmit,
  setUrls,
  urls,
  setIsShow,
  setIsSubmit,
  isSubmit,
  isShow,
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
}) {
  const { lastPathname } = usePathname()

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

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'list',
  })

  return (
    <div>
      <Form {...form}>
        <form
          className="flex flex-col gap-32"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <div className="flex gap-64 phones:flex-col phones:gap-32">
            <SelectListJenisTentangSekolah
              useFormReturn={form}
              name="jenis"
              headerLabel="Judul Bagian"
              placeholder="Pilih judul"
              className="w-1/2 hover:cursor-not-allowed phones:w-full "
              isDisabled={isLoading || lastPathname === 'edit'}
            />
            <div className="w-1/2 phones:hidden" />
          </div>

          <div className="flex gap-64 phones:flex-col phones:gap-32">
            <FormLabelTextArea
              name="keterangan"
              useFormReturn={form}
              headerLabel="Isi Paragraf"
              placeholder="Masukkan isi paragraf"
            />
          </div>

          <div className="flex flex-col gap-32 text-warna-dark">
            <div className="flex flex-col gap-12">
              <p className="font-roboto text-[2rem]">List</p>
              {fields.map((item, index) => (
                <div key={item.id} className="flex items-center gap-24">
                  <button
                    type="button"
                    className="rounded rounded-lg text-[2rem] text-warna-dark"
                  >
                    <FontAwesomeIcon icon={faAlignJustify} size="lg" />
                  </button>
                  <FormLabelInput
                    name={`list.${index}.keterangan`}
                    form={form}
                    placeholder="Masukkan keterangan"
                    className="flex-1"
                    type="text"
                    isDisabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="rounded rounded-lg text-[2rem] text-warna-red"
                  >
                    <FontAwesomeIcon icon={faDeleteLeft} size="xl" />
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => append({ nama: '', urutan: '' })}
              className="rounded flex items-center justify-center gap-12 rounded-lg border border-warna-dark px-24 py-12 text-warna-dark hover:bg-warna-dark hover:bg-opacity-80 hover:text-white"
            >
              <FontAwesomeIcon icon={faPlusCircle} />
              <p>Tambah</p>
            </button>
          </div>

          <FormLabelFile
            urls={urls}
            setUrls={setUrls}
            form={form}
            isLoading={isLoading}
            loadingFile={loadingFile}
            handleUploadFoto={handleUploadFoto}
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
            <PreviewProfil
              gambar_url={urls}
              keterangan={form.watch('keterangan')}
              list={form.watch('list')}
              jenis={form.watch('jenis')}
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
