import { useCreateFileMutation } from '@/store/slices/referensiAPI'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { Bounce, toast } from 'react-toastify'
import { Form } from '../..'
import { FormLabelFileLogo, FormLabelInput } from '@/components/InputComponent'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faSave, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { ValidasiKonfirmasi } from '@/components/Dialog/ValidasiKonfirmasi'
import { PreviewIdentitas } from '@/features/website/pengaturan'

export default function FormUpddateIdentitas({
  form,
  isLoading,
  handleSubmit,
  setIsShow,
  setIsSubmit,
  isSubmit,
  isShow,
  logo,
  favicon,
  setFavicon,
  setLogo,
  isUbah,
}: {
  form: UseFormReturn
  isLoading: boolean
  handleSubmit: () => Promise<void>
  setLogo: Dispatch<SetStateAction<string>>
  setFavicon: Dispatch<SetStateAction<string>>
  setIsSubmit: Dispatch<SetStateAction<boolean>>
  setIsShow: Dispatch<SetStateAction<boolean>>
  isShow: boolean
  isSubmit: boolean
  logo: string
  favicon: string
  isUbah: boolean
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

  const handleUploadFoto = async (file: File, isLogo: boolean) => {
    const formatData = new FormData()
    formatData.append('berkas', file)

    if (!isUbah) {
      toast.error(`Maaf, anda tidak memiliki akses untuk mengubah data`, {
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
      if (isLogo) {
        setLogo(res?.data?.url)
      } else {
        setFavicon(res?.data?.url)
      }
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

  return (
    <div>
      <Form {...form}>
        <form
          className="flex flex-col gap-32"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <div className="flex gap-64 phones:flex-col phones:gap-32">
            <FormLabelInput
              name={`nama_website`}
              form={form}
              label="Nama Website"
              placeholder="Masukkan nama website"
              className="w-1/2 hover:cursor-not-allowed phones:w-full "
              type="text"
              isDisabled={isLoading || !isUbah}
            />
            <div className="w-1/2 phones:hidden" />
          </div>

          <FormLabelInput
            name={`footer`}
            form={form}
            label="Footer"
            placeholder="Masukkan footer"
            className="w-full hover:cursor-not-allowed phones:w-full "
            type="text"
            isDisabled={isLoading || !isUbah}
          />

          <FormLabelInput
            name={`deskripsi`}
            form={form}
            label="Deskripsi"
            placeholder="Masukkan deskripsi"
            className="w-full hover:cursor-not-allowed phones:w-full "
            type="text"
            isDisabled={isLoading || !isUbah}
          />

          <FormLabelInput
            name={`keyword`}
            form={form}
            label="Keyword"
            placeholder="Masukkan keyword"
            className="w-full hover:cursor-not-allowed phones:w-full "
            type="text"
            isDisabled={!isUbah}
          />

          <div className="flex flex-col gap-12">
            <FormLabelFileLogo
              urls={logo}
              setUrls={setLogo}
              form={form}
              isLoading={isLoading}
              loadingFile={loadingFile}
              name="logo"
              handleUploadFoto={handleUploadFoto}
              isLogo
              isDisabled={!isUbah}
            />

            <p className="text-warna-dark">
              Disarankan menunggah gambar dengan aspek rasio{' '}
              <span className="text-warna-red">Square 1:1</span>
            </p>
          </div>

          <div className="flex flex-col gap-12">
            <FormLabelFileLogo
              urls={favicon}
              setUrls={setFavicon}
              form={form}
              isLoading={isLoading}
              loadingFile={loadingFile}
              name="favicon"
              handleUploadFoto={handleUploadFoto}
            />

            <p className="text-warna-dark">
              Disarankan menunggah gambar dengan aspek rasio{' '}
              <span className="text-warna-red">Square 1:1</span>
            </p>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading || !isUbah}
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
            <PreviewIdentitas
              nama_website={form?.watch('nama_website')}
              footer={form?.watch('footer')}
              deskripsi={form?.watch('deskripsi')}
              keyword={form?.watch('keyword')}
              logo={logo}
              favicon={favicon}
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
