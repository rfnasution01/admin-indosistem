import { Dispatch, SetStateAction, useEffect } from 'react'
import { useFieldArray, UseFormReturn } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../..'
import {
  FormLabelInput,
  FormLabelRadio,
  FormLabelTipTap,
  Input,
} from '@/components/InputComponent'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCheck,
  faDeleteLeft,
  faImage,
  faSave,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons'
import { ValidasiKonfirmasi } from '@/components/Dialog/ValidasiKonfirmasi'
import {
  SelectListAgenda,
  SelectListBerita,
  SelectListMading,
  SelectListPrestasi,
  SelectListTag,
} from '@/components/Select/website'
import { SelectListPengumuman } from '@/components/Select/website/ListPengumuman'
import { Bounce, toast } from 'react-toastify'
import clsx from 'clsx'
import { useCreateFileMutation } from '@/store/slices/referensiAPI'
import { usePathname } from '@/hooks/usePathname'
import { PreviewKategori } from '@/features/website/kategori'
import DefaultImg from '@/assets/images/default.jpg'

export default function FormTambahKategori({
  form,
  isLoading,
  handleSubmit,
  setIsShow,
  setIsSubmit,
  isSubmit,
  isShow,
  defaultValues,
  isTambah,
  isUbah,
  isEdit,
}: {
  form: UseFormReturn
  isLoading: boolean
  handleSubmit: () => Promise<void>
  setIsSubmit: Dispatch<SetStateAction<boolean>>
  setIsShow: Dispatch<SetStateAction<boolean>>
  isShow: boolean
  isSubmit: boolean
  defaultValues?: { value: string; label: string }[]
  isEdit?: boolean
  isTambah: boolean
  isUbah: boolean
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

  const handleUploadFoto = async (file: File, index: number) => {
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
              className="w-1/2 disabled:cursor-not-allowed phones:w-full "
              type="text"
              isDisabled={isLoading || disabled}
            />
            <FormLabelInput
              name={`tanggal`}
              form={form}
              label="Tanggal"
              placeholder="Masukkan tanggal"
              className="w-1/2 disabled:cursor-not-allowed phones:w-full "
              type="date"
              isDisabled={isLoading || disabled}
            />
          </div>

          <div className="flex gap-64 phones:flex-col phones:gap-32">
            {secondPathname === 'pengumuman' ? (
              <SelectListPengumuman
                name="id_kategori"
                headerLabel="Kategori"
                placeholder="Pilih Kategori"
                useFormReturn={form}
                isDisabled={isLoading || disabled}
                className="disabled:cursor-not-allowed"
              />
            ) : secondPathname === 'mading' ? (
              <SelectListMading
                name="id_kategori"
                headerLabel="Kategori"
                placeholder="Pilih Kategori"
                useFormReturn={form}
                isDisabled={isLoading || disabled}
                className="disabled:cursor-not-allowed"
              />
            ) : secondPathname === 'berita' ? (
              <SelectListBerita
                name="id_kategori"
                headerLabel="Kategori"
                placeholder="Pilih Kategori"
                useFormReturn={form}
                isDisabled={isLoading || disabled}
                className="disabled:cursor-not-allowed"
              />
            ) : secondPathname === 'agenda' ? (
              <SelectListAgenda
                name="id_kategori"
                headerLabel="Kategori"
                placeholder="Pilih Kategori"
                useFormReturn={form}
                isDisabled={isLoading || disabled}
                className="disabled:cursor-not-allowed"
              />
            ) : secondPathname === 'prestasi' ? (
              <SelectListPrestasi
                name="id_kategori"
                headerLabel="Kategori"
                placeholder="Pilih Kategori"
                useFormReturn={form}
                isDisabled={isLoading || disabled}
                className="disabled:cursor-not-allowed"
              />
            ) : (
              <></>
            )}
            {isEdit && defaultValues && (
              <SelectListTag
                name="id_tags"
                headerLabel="Tag"
                placeholder="Pilih Tag"
                useFormReturn={form}
                isDisabled={isLoading || disabled}
                defaultValues={defaultValues}
                className="disabled:cursor-not-allowed"
              />
            )}
            {!isEdit && (
              <SelectListTag
                name="id_tags"
                headerLabel="Tag"
                placeholder="Pilih Tag"
                useFormReturn={form}
                isDisabled={isLoading || disabled}
                defaultValues={defaultValues}
              />
            )}
          </div>

          {(secondPathname.includes('mading') ||
            secondPathname.includes('agenda') ||
            secondPathname.includes('prestasi')) && (
            <div className="flex gap-64 phones:flex-col phones:gap-32">
              <FormLabelInput
                name={`deskripsi_singkat`}
                form={form}
                label="Deskripsi Singkat"
                placeholder="Masukkan deskripsi singkat"
                className="w-full hover:cursor-not-allowed phones:w-full "
                type="text"
                isDisabled={isLoading || disabled}
              />
            </div>
          )}

          <div className="flex gap-64 phones:flex-col phones:gap-32">
            <FormLabelTipTap
              name="isi"
              form={form}
              headerLabel="Isi"
              placeHolder="Masukkan isi paragraf"
              classname="w-full"
            />
          </div>

          <FormLabelRadio
            name="publish"
            form={form}
            label="Umumkan sekarang"
            className="text-sim-dark phones:w-full"
            isDisabled={isLoading || disabled}
          />

          {!isEdit && (
            <div className="flex flex-col gap-32 text-warna-dark">
              <div className="flex flex-col gap-32">
                <p className="font-roboto text-[2rem]">List Gambar</p>
                <div className="grid grid-cols-6 gap-32">
                  {fields.map((item, index) => (
                    <div
                      key={item?.id}
                      className="col-span-1 phones:col-span-3"
                    >
                      <div className="col-span-1 phones:col-span-2">
                        <img
                          src={
                            form.watch(`gambar.${index}.url_gambar`) === '' ||
                            !form.watch(`gambar.${index}.url_gambar`)
                              ? DefaultImg
                              : form.watch(`gambar.${index}.url_gambar`)
                          }
                          alt={`Gambar ${index + 1}`}
                          className="w-full rounded-2xl object-cover"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  ))}
                  <button
                    disabled={isLoading || disabled}
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
                      disabled={isLoading || disabled}
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div>
                              <Input
                                className="-z-[1] h-[0.1px] w-[0.1px] overflow-hidden opacity-0 disabled:cursor-not-allowed"
                                {...field}
                                id={`berkas-${index}`} // Unique id for each input
                                type="file"
                                value={''}
                                disabled={isLoading || loadingFile || disabled}
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
                        isDisabled={isLoading || disabled}
                      />
                    )}
                    {secondPathname === 'galeri' && (
                      <FormLabelInput
                        name={`gambar.${index}.judul`}
                        form={form}
                        placeholder="Masukkan judul"
                        className="flex-1"
                        type="text"
                        isDisabled={isLoading || disabled}
                      />
                    )}
                    <button
                      type="button"
                      disabled={isLoading || disabled}
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
            <PreviewKategori
              judul={form?.watch('judul')}
              isi={form?.watch('isi')}
              tanggal={form?.watch('tanggal')}
              taq={form?.watch('label_tags')}
              kategori={form?.watch('nama_kategori')}
              publish={form?.watch('publish')}
              gambar={form?.watch('gambar')}
              deskripsi_singkat={form?.watch('deskripsi_singkat')}
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
