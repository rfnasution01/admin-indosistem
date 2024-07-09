/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCreateFileMutation } from '@/store/slices/referensiAPI'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { useFieldArray, UseFormReturn } from 'react-hook-form'
import { Bounce, toast } from 'react-toastify'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../..'
import { FormLabelInput, Input } from '@/components/InputComponent'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCheck,
  faDeleteLeft,
  faImage,
  faPlusCircle,
  faSave,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons'
import { ValidasiKonfirmasi } from '@/components/Dialog/ValidasiKonfirmasi'
import clsx from 'clsx'
import { PreviewTambahGambar } from '@/features/website/pengumuman'

export default function FormTambahGambar({
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

  const handleUploadFoto = async (file: File, index: number) => {
    const formatData = new FormData()
    formatData.append('berkas', file)

    try {
      const res = await uploadFileMutation(formatData)
      form.setValue(`gambar.${index}.url_gambar`, res?.data?.url)
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

  console.log(form.watch())

  return (
    <div>
      <Form {...form}>
        <form
          className="flex flex-col gap-32"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <div className="flex flex-col gap-32 text-warna-dark">
            <div className="flex flex-col gap-12">
              <p className="font-roboto text-[2rem]">List Gambar</p>
              {fields.map((item, index) => (
                <div key={item.id} className="flex flex-col gap-24">
                  <div className="flex items-center gap-24">
                    <FormField
                      name={`gambar.${index}.url_gambar`}
                      control={form.control}
                      render={({ field }) => (
                        <FormItem className="flex flex-col gap-12">
                          <FormControl>
                            <div>
                              <Input
                                className="-z-[1] h-[0.1px] w-[0.1px] overflow-hidden opacity-0"
                                {...field}
                                id={`berkas-${index}`} // Unique id for each input
                                type="file"
                                value={''}
                                disabled={isLoading || loadingFile}
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
                    <FormLabelInput
                      name={`gambar.${index}.keterangan`}
                      form={form}
                      placeholder="Masukkan keterangan"
                      className="flex-1"
                      type="text"
                      isDisabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="rounded text-[2rem] text-warna-red"
                    >
                      <FontAwesomeIcon icon={faDeleteLeft} size="xl" />
                    </button>
                  </div>
                  <div className="phones: grid grid-cols-4">
                    {form.watch(`gambar.${index}.url_gambar`) && (
                      <div className="phones:col-span2 col-span-1">
                        <img
                          src={form.watch(`gambar.${index}.url_gambar`)}
                          alt={`Gambar ${index + 1}`}
                          className="h-auto w-full"
                          loading="lazy"
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => append({ url_gambar: '', keterangan: '' })}
              className="flex items-center justify-center gap-12 rounded-lg border border-warna-dark px-24 py-12 text-warna-dark hover:bg-warna-dark hover:bg-opacity-80 hover:text-white"
            >
              <FontAwesomeIcon icon={faPlusCircle} />
              <p>Tambah</p>
            </button>
          </div>
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
            <PreviewTambahGambar gambar={form.watch('gambar')} />
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
