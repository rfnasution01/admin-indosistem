import { Dispatch, SetStateAction, useEffect } from 'react'
import { useFieldArray, UseFormReturn } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../..'
import {
  FormLabelFile,
  FormLabelInput,
  Input,
} from '@/components/InputComponent'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCheck,
  faDeleteLeft,
  faImage,
  faSave,
  faSpinner,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'
import { ValidasiKonfirmasi } from '@/components/Dialog/ValidasiKonfirmasi'
import { Bounce, toast } from 'react-toastify'
import clsx from 'clsx'
import { useCreateFileMutation } from '@/store/slices/referensiAPI'
import { PreviewGaleri } from '@/features/website/galeri'
import DefaultImg from '@/assets/images/default.jpg'
import { usePathname } from '@/hooks/usePathname'

export default function FormTambahGaleri({
  form,
  isLoading,
  handleSubmit,
  setIsShow,
  setIsSubmit,
  isSubmit,
  isShow,
  setUrls,
  urls,
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
  setUrls: Dispatch<SetStateAction<string>>
  urls: string
  isEdit: boolean
  isUbah: boolean
  isTambah: boolean
}) {
  const { secondPathname } = usePathname()
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

  const handleUploadFoto = async (file: File, index?: number) => {
    const formatData = new FormData()
    formatData.append('berkas', file)

    if ((isEdit && !isUbah) || (!isEdit && !isTambah)) {
      toast.error(`Maaf, anda tidak memiliki akses untuk mengubah data`, {
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

      if (index || index === 0) {
        form.setValue(`gambar.${index}.url_gambar`, res?.data?.url)
      } else {
        setUrls(res?.data?.url)
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

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'gambar',
  })

  const disableEdit = !(isEdit && isUbah)
  const disableTambah = !(!isEdit && isTambah)

  const disabled = isEdit ? disableEdit : disableTambah

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
              placeholder="Masukkan judul"
              className="w-1/2 hover:cursor-not-allowed phones:w-full "
              type="text"
              isDisabled={isLoading || disabled}
            />

            <div className="w-1/2 phones:hidden" />
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

          {!isEdit && (
            <div className="flex flex-col gap-32 text-warna-dark">
              <div className="flex flex-col gap-32">
                <p className="font-roboto text-[2rem]">List Galeri</p>
                <div className="grid grid-cols-6 gap-32">
                  {fields.map((item, index) => (
                    <div
                      key={item?.id}
                      className="col-span-1 phones:col-span-3"
                    >
                      <div className="col-span-1 phones:col-span-2">
                        <div className="relative w-full">
                          <div className="relative w-full">
                            <img
                              src={
                                form.watch(`gambar.${index}.url_gambar`) ===
                                  '' ||
                                !form.watch(`gambar.${index}.url_gambar`)
                                  ? DefaultImg
                                  : form.watch(`gambar.${index}.url_gambar`)
                              }
                              alt={`Gambar ${index + 1}`}
                              className="h-[20rem] w-full rounded-2xl object-cover"
                              loading="lazy"
                            />
                            {!(
                              form.watch(`gambar.${index}.url_gambar`) == '' ||
                              !form.watch(`gambar.${index}.url_gambar`)
                            ) && (
                              <button
                                disabled={!isUbah}
                                onClick={(e) => {
                                  e.stopPropagation()
                                  form.setValue(
                                    `gambar.${index}.url_gambar`,
                                    null,
                                  )
                                }}
                                className="absolute right-2 top-2 rounded-lg bg-danger-700 p-4 text-white hover:cursor-pointer hover:bg-danger"
                              >
                                <FontAwesomeIcon icon={faTrash} />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <button
                    disabled={!isUbah}
                    onClick={() => append({ url_gambar: '', keterangan: '' })}
                    className="col-span-1 h-[20rem] phones:col-span-3"
                  >
                    <div className="flex h-full w-full items-center justify-center rounded-2x border border-warna-pale-grey text-warna-dark hover:cursor-pointer hover:bg-warna-dark hover:text-white">
                      <div className="flex flex-col justify-center gap-12">
                        <FontAwesomeIcon icon={faImage} size="xl" />
                        <p>Tambah gambar</p>
                      </div>
                    </div>
                  </button>
                </div>

                {fields.map((_item, index) => (
                  <div
                    key={index}
                    className="scrollbar flex w-full items-center gap-24 overflow-x-auto"
                  >
                    <FormField
                      name={`gambar.${index}.url_gambar`}
                      disabled={!isUbah}
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div>
                              <Input
                                className="-z-[1] h-[0.1px] w-[0.1px] overflow-hidden opacity-0"
                                {...field}
                                id={`berkas-${index}`} // Unique id for each input
                                type="file"
                                value={''}
                                disabled={isLoading || loadingFile || !isUbah}
                                placeholder="Lampiran"
                                onChange={(e) => {
                                  if (e.target.files[0].size > 5 * 1000000) {
                                    return toast.error(
                                      `File terlalu besar. Maksimal 5 MB`,
                                      {
                                        position: 'bottom-right',
                                        autoClose: 5000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                        theme: 'light',
                                        transition: Bounce,
                                      },
                                    )
                                  } else {
                                    if (e.target.files[0] != null) {
                                      handleUploadFoto(e.target.files[0], index)
                                    }
                                  }
                                }}
                              />
                              <div className="flex flex-col gap-32 phones:flex-col">
                                <label
                                  className="flex flex-col gap-12 font-roboto"
                                  htmlFor={`berkas-${index}`} // Unique id for each label
                                >
                                  <div className="flex">
                                    <div
                                      className={clsx(
                                        'flex items-center gap-12 rounded-2xl p-12 hover:cursor-pointer hover:bg-opacity-80',
                                        {
                                          'bg-warna-dark text-white':
                                            form.watch(
                                              `gambar.${index}.url_gambar`,
                                            ),
                                          'border border-warna-dark text-warna-dark':
                                            !form.watch(
                                              `gambar.${index}.url_gambar`,
                                            ),
                                        },
                                      )}
                                    >
                                      {loadingFile ? (
                                        <span className="animate-spin duration-300">
                                          <FontAwesomeIcon icon={faSpinner} />
                                        </span>
                                      ) : (
                                        <FontAwesomeIcon icon={faImage} />
                                      )}
                                      <p className="text-[1.6rem] uppercase tracking-1.25">
                                        Unggah
                                      </p>
                                    </div>
                                  </div>
                                </label>
                              </div>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {secondPathname !== 'galeri' && (
                      <FormLabelInput
                        name={`gambar.${index}.keterangan`}
                        form={form}
                        placeholder="Masukkan keterangan"
                        className="flex-1"
                        type="text"
                        isDisabled={isLoading || !isUbah}
                      />
                    )}
                    {secondPathname === 'galeri' && (
                      <FormLabelInput
                        name={`gambar.${index}.judul`}
                        form={form}
                        placeholder="Masukkan judul"
                        className="flex-1"
                        type="text"
                        isDisabled={isLoading || !isUbah}
                      />
                    )}
                    <button
                      type="button"
                      disabled={isLoading || !isUbah}
                      onClick={() => remove(index)}
                      className="rounded text-[2rem] text-warna-red"
                    >
                      <FontAwesomeIcon icon={faDeleteLeft} size="xl" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

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
            <PreviewGaleri
              judul={form?.watch('judul')}
              gambar={form?.watch('gambar')}
              cover={urls}
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
