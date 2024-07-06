import { Form } from '../../../Form'
import { FormLabelFile, FormLabelInput } from '../../../InputComponent'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faSave, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { Bounce, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { UseFormReturn } from 'react-hook-form'
import { useCreateFileMutation } from '@/store/slices/referensiAPI'
import {
  SelectListAkreditasi,
  SelectListPenyelenggaraan,
} from '@/components/Select/website'
import { ValidasiKonfirmasi } from '@/components/Dialog/ValidasiKonfirmasi'
import { PreviewIdentitas } from '@/features/website/profil/tentangSekolah'

export default function FormUpdateIdentitas({
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

  return (
    <div>
      <Form {...form}>
        <form
          className="scrollbar flex w-full flex-col gap-32 overflow-y-auto"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <div className="flex gap-64 phones:flex-col phones:gap-32">
            <FormLabelInput
              name="sk_pendirian"
              form={form}
              label="SK Pendirian"
              placeholder="Masukkan SK Pendirian"
              className="text-sim-dark"
              type="text"
              isDisabled={isLoading}
            />

            <FormLabelInput
              name="tgl_sk_pendirian"
              form={form}
              label="Tanggal SK Pendirian"
              className="text-sim-dark"
              type="date"
              isDisabled={isLoading}
            />
          </div>

          <div className="flex gap-64 phones:flex-col phones:gap-32">
            <FormLabelInput
              name="sk_operasional"
              form={form}
              label="SK Operasional"
              placeholder="Masukkan SK Operasional"
              className="text-sim-dark"
              type="text"
              isDisabled={isLoading}
            />

            <FormLabelInput
              name="tgl_sk_operasional"
              form={form}
              label="Tanggal SK Operasional"
              className="text-sim-dark"
              type="date"
              isDisabled={isLoading}
            />
          </div>

          <hr className="border phones:hidden" />

          <div className="flex gap-64 phones:flex-col phones:gap-32">
            <SelectListAkreditasi
              useFormReturn={form}
              headerLabel="Akreditasi"
              placeholder="Pilih Akreditasi"
              name="id_akreditasi"
              className="w-1/2 hover:cursor-not-allowed phones:w-full"
              isDisabled={isLoading}
            />
            <SelectListPenyelenggaraan
              useFormReturn={form}
              headerLabel="Penyelenggaraan"
              placeholder="Pilih Penyelenggaraan"
              name="penyelenggaraan"
              className="w-1/2 hover:cursor-not-allowed phones:w-full"
              isDisabled={isLoading}
            />
          </div>

          <div className="flex gap-64 phones:flex-col phones:gap-32">
            <FormLabelInput
              name="penyelenggaraan_mulai"
              form={form}
              label="Tanggal Mulai Penyelenggaraan"
              placeholder="Masukkan Tanggal Mulai Penyelenggaraan"
              className="text-sim-dark"
              type="time"
              isDisabled={isLoading}
            />

            <FormLabelInput
              name="penyelenggaraan_akhir"
              form={form}
              label="Tanggal Akhir Penyelenggaraan"
              placeholder="Masukkan Tanggal Akhir Penyelenggaraan"
              className="text-sim-dark"
              type="time"
              isDisabled={isLoading}
            />
          </div>

          <div className="flex gap-64 phones:flex-col phones:gap-32">
            <FormLabelInput
              name="tgl_mulai_akreditasi"
              form={form}
              label="Tanggal Mulai Akreditasi"
              placeholder="Masukkan Tanggal Mulai Akreditasi"
              className="text-sim-dark"
              type="date"
              isDisabled={isLoading}
            />

            <FormLabelInput
              name="tgl_akhir_akreditasi"
              form={form}
              label="Tanggal Akhir Akreditasi"
              placeholder="Masukkan Tanggal Akhir Akreditasi"
              className="text-sim-dark"
              type="date"
              isDisabled={isLoading}
            />
          </div>

          <div className="flex gap-64 phones:flex-col phones:gap-32">
            <FormLabelInput
              name="nis"
              form={form}
              label="NIS"
              placeholder="NIS"
              className="text-sim-dark"
              type="text"
              isDisabled={isLoading}
            />

            <FormLabelInput
              name="nss"
              form={form}
              label="NSS"
              placeholder="NSS"
              className="text-sim-dark"
              type="text"
              isDisabled={isLoading}
            />
          </div>

          <div className="flex gap-64 phones:flex-col phones:gap-32">
            <FormLabelInput
              name="alamat"
              form={form}
              label="Alamat"
              placeholder="Alamat"
              className="text-sim-dark"
              type="text"
              isDisabled={isLoading}
            />

            <FormLabelInput
              name="email"
              form={form}
              label="Email"
              placeholder="Email"
              className="text-sim-dark"
              type="email"
              isDisabled={isLoading}
            />
          </div>

          <div className="flex gap-64 phones:flex-col phones:gap-32">
            <FormLabelInput
              name="telepon"
              form={form}
              label="Telepon"
              placeholder="Telepon"
              className="text-sim-dark w-1/2"
              type="text"
              isNumber
              isDisabled={isLoading}
            />

            <div className="w-1/2 phones:w-full" />
          </div>

          <hr className="border phones:hidden" />

          <div className="flex gap-64 phones:flex-col phones:gap-32">
            <FormLabelInput
              name="nama_pimpinan"
              form={form}
              label="Nama Pimpinan"
              placeholder="Nama Pimpinan"
              className="text-sim-dark"
              type="text"
              isDisabled={isLoading}
            />

            <FormLabelInput
              name="nip_pimpinan"
              form={form}
              label="NIP Pimpinan"
              placeholder="NIP Pimpinan"
              className="text-sim-dark"
              type="text"
              isNumber
              isDisabled={isLoading}
            />
          </div>

          <FormLabelFile
            urls={urls}
            setUrls={setUrls}
            form={form}
            isLoading={isLoading}
            loadingFile={loadingFile}
            name="photo_pimpinan"
            handleUploadFoto={handleUploadFoto}
            label="Photo Pimpinan"
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
            <PreviewIdentitas
              sk_pendirian={form.watch('sk_pendirian')}
              tgl_sk_pendirian={form.watch('tgl_sk_pendirian')}
              sk_operasional={form.watch('sk_operasional')}
              tgl_sk_operasional={form.watch('tgl_sk_operasional')}
              tgl_akhir_akreditasi={form.watch('tgl_akhir_akreditasi')}
              tgl_mulai_akreditasi={form.watch('tgl_mulai_akreditasi')}
              akreditasi={form.watch('akreditasi')}
              alamat={form.watch('alamat')}
              nama_pimpinan={form.watch('nama_pimpinan')}
              nip_pimpinan={form.watch('nip_pimpinan')}
              nis={form.watch('nis')}
              nss={form.watch('nss')}
              email={form.watch('email')}
              telepon={form.watch('telepon')}
              penyelenggaraan={form.watch('penyelenggaraan')}
              penyelenggaraan_akhir={form.watch('penyelenggaraan_akhir')}
              penyelenggaraan_mulai={form.watch('penyelenggaraan_mulai')}
              photo_pimpinan={urls}
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
