/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, SetStateAction, useEffect } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { Bounce, toast } from 'react-toastify'
import { FormLabelInput, Input } from '@/components/InputComponent'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCheck,
  faImage,
  faSave,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons'
import { ValidasiKonfirmasi } from '@/components/Dialog/ValidasiKonfirmasi'
import { Form, FormControl, FormField, FormItem, FormMessage } from '.'
import DefaultImg from '@/assets/images/default.jpg'
import clsx from 'clsx'
import { useUpdatePhotoMutation } from '@/store/slices/profileAPI'
import { LabelList } from '../LabelComponent/LabelList'

export default function FormUpdateProfil({
  form,
  isLoading,
  handleSubmit,
  setIsShow,
  setIsSubmit,
  isSubmit,
  isShow,
  setUrls,
  urls,
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
  ] = useUpdatePhotoMutation()

  const handleUploadFoto = async (file: File) => {
    const formatData = new FormData()
    formatData.append('photo', file)

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
      toast.success('Berhasil ganti photo!', {
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
          className="flex gap-32 phones:flex-col-reverse"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <div className="flex w-1/2 flex-col gap-32  phones:w-full">
            <FormLabelInput
              name={`nama`}
              form={form}
              label="Nama"
              placeholder="Masukkan nama"
              className="w-full hover:cursor-not-allowed phones:w-full "
              type="text"
              isDisabled={isLoading}
            />
            <FormLabelInput
              name={`email`}
              form={form}
              label="Email"
              placeholder="Masukkan email"
              className="w-full hover:cursor-not-allowed phones:w-full "
              type="email"
              isDisabled={isLoading}
            />
            <FormLabelInput
              name={`hp`}
              form={form}
              label="No. Hp"
              placeholder="Masukkan no hp"
              className="w-full hover:cursor-not-allowed phones:w-full "
              type="text"
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
          </div>
          <div className="flex w-1/2 items-center gap-32 phones:w-full phones:flex-col">
            <img
              src={urls ?? DefaultImg}
              alt="profile"
              className="w-1/2 rounded-2x phones:w-full"
              loading="lazy"
            />
            <div className="flex w-1/2 phones:w-full">
              <FormField
                name="berkas"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-12">
                    <FormControl>
                      <div>
                        <Input
                          className="-z-[1] h-[0.1px] w-[0.1px] overflow-hidden opacity-0"
                          {...field}
                          id="berkas"
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
                                handleUploadFoto(e.target.files[0])
                              }
                            }
                          }}
                        />
                        <div className="flex flex-col gap-32 phones:flex-col">
                          <label
                            className="flex flex-col gap-12 font-roboto"
                            htmlFor="berkas"
                          >
                            Berkas
                            <div className="flex">
                              <div
                                className={clsx(
                                  'flex items-center gap-12 rounded-2xl p-12 hover:cursor-pointer hover:bg-opacity-80',
                                  {
                                    'bg-warna-dark text-white': urls,
                                    'border border-warna-dark text-warna-dark':
                                      !urls,
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
                                  {urls === undefined ||
                                  urls === '' ||
                                  urls === null
                                    ? 'Unggah'
                                    : 'Ganti'}
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
            </div>
          </div>
        </form>
      </Form>
      <ValidasiKonfirmasi
        isOpen={isShow}
        setIsOpen={setIsShow}
        children={
          <div className="flex w-full flex-col gap-32 rounded-2x bg-warna-pale-blue p-32 text-[2rem] text-warna-dark phones:text-[2.4rem]">
            <div className="scrollbar flex h-full flex-col gap-12 overflow-y-auto phones:flex-col phones:items-start phones:gap-32">
              <LabelList label="Nama" value={form.watch('nama')} />
              <LabelList label="Email" value={form.watch('email')} />
              <LabelList label="No. Hp" value={form.watch('hp')} />
            </div>
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
