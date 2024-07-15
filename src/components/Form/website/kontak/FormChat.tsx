import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/Form'
import { FormLabelInput, Input } from '@/components/InputComponent'
import { KontakMasukDetail } from '@/types/website/profil/kontakType'
import { faPaperclip, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Dispatch, ReactNode, SetStateAction, useEffect } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { Bounce, toast } from 'react-toastify'

export function FormChat({
  data,
  form,
  isLoadingUpload,
  loadingFile,
  setUrls,
  dir,
  handleUploadFoto,
  handleSubmitChat,
  closeButton,
  isUbah,
}: {
  data: KontakMasukDetail
  form: UseFormReturn
  isLoadingUpload: boolean
  loadingFile: boolean
  setUrls: Dispatch<SetStateAction<string[]>>
  dir: string[]
  handleUploadFoto: (file: File) => Promise<void>
  handleSubmitChat: () => Promise<void>
  closeButton: ReactNode
  isUbah: boolean
}) {
  useEffect(() => {
    if (dir && dir.length > 0) {
      setUrls(dir)
    }
  }, [dir])

  useEffect(() => {
    if (dir) {
      form.setValue('berkas', dir)
    }
  }, [dir])

  return (
    <div className="flex w-full items-center gap-32">
      {data?.status !== 2 && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmitChat)}
            className="flex h-full w-full flex-1 gap-24 phones:flex-col"
          >
            <div className="flex h-full flex-1 items-center gap-24">
              <FormField
                name="berkas"
                control={form.control}
                disabled={!isUbah}
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-2">
                    <FormControl>
                      <div>
                        <Input
                          className="-z-[1] h-[0.1px] w-[0.1px] overflow-hidden opacity-0"
                          {...field}
                          id="berkas"
                          type="file"
                          value={''}
                          disabled={isLoadingUpload || loadingFile || !isUbah}
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
                        <div className="flex gap-32 phones:flex-col">
                          <label
                            className="flex items-center gap-12"
                            htmlFor="berkas"
                          >
                            <div className="rounded-2xl bg-[#1B2F69] p-12 text-white hover:cursor-pointer hover:bg-opacity-80">
                              {loadingFile ? (
                                <span className="animate-ping duration-300">
                                  <FontAwesomeIcon icon={faSpinner} />
                                </span>
                              ) : (
                                <FontAwesomeIcon icon={faPaperclip} />
                              )}
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
                form={form}
                name="isi"
                placeholder="Ketikka pesan anda"
                type="text"
                className="w-full"
                isDisabled={!isUbah}
              />
            </div>
            <div className="flex items-center gap-24">
              <button
                disabled={!isUbah}
                type="submit"
                className="rounded-2xl bg-[#1B2F69] px-32 py-16 text-white hover:bg-opacity-80 disabled:cursor-not-allowed phones:w-full"
              >
                Kirim
              </button>
            </div>
            {closeButton}
          </form>
        </Form>
      )}
    </div>
  )
}
