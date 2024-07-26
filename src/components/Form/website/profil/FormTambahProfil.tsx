/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { PreviewProfil } from '@/features/website/profil/tentangSekolah'
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd'

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
  isEdit,
  menu,
  isUbah,
  isTambah,
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
  menu?: string
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

  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: 'list',
  })

  const disableEdit = !(isEdit && isUbah)
  const disableTambah = !(!isEdit && isTambah)

  const disabled = isEdit ? disableEdit : disableTambah

  const onDragEnd = (result: DropResult) => {
    // dropped outside the list
    if (!result.destination) {
      return
    }

    move(result.source.index, result.destination.index)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            <Form {...form}>
              <form
                className="flex flex-col gap-32"
                onSubmit={form.handleSubmit(handleSubmit)}
              >
                {menu !== 'Visi' && menu !== 'Misi' && (
                  <div className="flex gap-64 phones:flex-col phones:gap-32">
                    <SelectListJenisTentangSekolah
                      useFormReturn={form}
                      name="jenis"
                      headerLabel="Judul Bagian"
                      placeholder="Pilih judul"
                      className="w-1/2 hover:cursor-not-allowed phones:w-full "
                      isDisabled={isLoading || (isEdit ? true : disableTambah)}
                      isEdit={isEdit}
                    />
                    <div className="w-1/2 phones:hidden" />
                  </div>
                )}

                <div className="flex gap-64 phones:flex-col phones:gap-32">
                  <FormLabelTextArea
                    name="keterangan"
                    useFormReturn={form}
                    headerLabel={menu === 'Visi' ? 'Visi' : 'Isi Paragraf'}
                    placeholder="Masukkan isi paragraf"
                    isDisabled={isLoading || disabled}
                  />
                </div>

                {menu === 'Visi' && (
                  <div className="flex gap-64 phones:flex-col phones:gap-32">
                    <FormLabelTextArea
                      name="sub_keterangan"
                      useFormReturn={form}
                      headerLabel="Sub Misi"
                      placeholder="Masukkan isi paragraf"
                      isDisabled={isLoading || disabled}
                    />
                  </div>
                )}

                {menu !== 'Visi' && (
                  <div className="flex flex-col gap-32 text-warna-dark">
                    <div className="flex flex-col gap-12">
                      <p className="font-roboto text-[2rem]">List</p>
                      {fields.map((item, index) => (
                        <Draggable
                          key={item.id}
                          draggableId={item.id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              className="flex items-center gap-24"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <button
                                type="button"
                                disabled={isLoading || disabled}
                                className="rounded rounded-lg text-[2rem] text-warna-dark disabled:cursor-not-allowed"
                              >
                                <FontAwesomeIcon
                                  icon={faAlignJustify}
                                  size="lg"
                                />
                              </button>
                              <FormLabelInput
                                name={`list.${index}.keterangan`}
                                form={form}
                                placeholder="Masukkan keterangan"
                                className="flex-1"
                                type="text"
                                isDisabled={isLoading || disabled}
                              />
                              <button
                                type="button"
                                onClick={() => remove(index)}
                                disabled={isLoading || disabled}
                                className="rounded rounded-lg text-[2rem] text-warna-red disabled:cursor-not-allowed"
                              >
                                <FontAwesomeIcon
                                  icon={faDeleteLeft}
                                  size="xl"
                                />
                              </button>
                            </div>
                          )}
                        </Draggable>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => append({ nama: '', urutan: '' })}
                      disabled={isLoading || disabled}
                      className="rounded flex items-center justify-center gap-12 rounded-lg border border-warna-dark px-24 py-12 text-warna-dark hover:bg-warna-dark hover:bg-opacity-80 hover:text-white disabled:cursor-not-allowed"
                    >
                      <FontAwesomeIcon icon={faPlusCircle} />
                      <p>Tambah</p>
                    </button>
                  </div>
                )}

                <div className="flex flex-col gap-12">
                  <FormLabelFile
                    urls={urls}
                    setUrls={setUrls}
                    form={form}
                    isLoading={isLoading}
                    loadingFile={loadingFile}
                    name="berkas"
                    handleUploadFoto={handleUploadFoto}
                    isDisabled={disabled}
                  />

                  <p className="text-warna-dark">
                    Disarankan menunggah gambar dengan aspek rasio{' '}
                    <span className="text-warna-red">Potrait 3:4</span>
                  </p>
                </div>

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
                  <PreviewProfil
                    gambar_url={urls}
                    keterangan={form.watch('keterangan')}
                    list={form.watch('list')}
                    jenis={form.watch('jenis')}
                    sub_keterangan={form.watch('sub_keterangan')}
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
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}
