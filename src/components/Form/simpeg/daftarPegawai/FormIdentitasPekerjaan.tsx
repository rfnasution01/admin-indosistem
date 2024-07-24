/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseFormReturn } from 'react-hook-form'
import { FormLabelFile, FormLabelInput } from '@/components/InputComponent'
import { Form } from '../..'
import { Dispatch, SetStateAction, useEffect } from 'react'
import {
  SelectListKontenReferensiString,
  SelectListKontenReferensiUmum,
} from '@/components/Select/simpeg'
import { useCreateFileMutation } from '@/store/slices/referensiAPI'
import { Bounce, toast } from 'react-toastify'
import { GetDaftarPegawaDetailType } from '@/types/simpeg/dataPegawai/daftarPegawaiType'

export function FormIdentitasPekerjaan({
  form,
  isLoading,
  currentIdx,
  menuList,
  setCurrentIdx,
  setMenu,
  isTambah,
  detailPegawai,
  isEdit,
}: {
  form: UseFormReturn
  isLoading?: boolean
  currentIdx: number
  setCurrentIdx: Dispatch<SetStateAction<number>>
  menuList: string[]
  setMenu: Dispatch<SetStateAction<string>>
  isTambah: boolean
  detailPegawai: GetDaftarPegawaDetailType
  isEdit: boolean
}) {
  const dataParams = localStorage.getItem(menuList?.[currentIdx]) ?? ''

  const handleSubmit = () => {
    if (!isEdit) {
      const values = form.getValues()

      // Fetch the existing status from localStorage or initialize an empty object
      const storedStatus = JSON.parse(localStorage.getItem('status')) || {}

      // Set or update the isPekerjaan field to true
      storedStatus.isPekerjaan = true

      // Store the updated status object back to localStorage
      localStorage.setItem('status', JSON.stringify(storedStatus))

      localStorage.setItem(menuList?.[currentIdx], JSON.stringify(values))
    }
    setCurrentIdx(currentIdx + 1)
    setMenu(menuList?.[currentIdx + 1])
  }

  useEffect(() => {
    if (isEdit && detailPegawai) {
      const data = detailPegawai

      form.setValue('nip', data?.nip)
      form.setValue('jabatan', data?.jabatan)
      form.setValue('asal_pegawai', data?.id_asal_pegawai)
      form.setValue('nama_kategori_asal_pegawai', data?.asal_pegawai)
      form.setValue('golongan', data?.id_golongan)
      form.setValue('nama_kategori_golongan', data?.golongan)
      form.setValue('jenis_ptk', data?.id_jenis_ptk)
      form.setValue('nama_kategori_jenis_ptk', data?.jenis_ptk)
      form.setValue('nuptk', data?.nuptk)

      form.setValue('kategori_pegawai', data?.kategori_pegawai)
      form.setValue('nama_kategori_kategori_pegawai', data?.id_kategori_pegawai)
      form.setValue('jenis_pegawai', data?.jenis_kepegawaian)
      form.setValue('status', data?.status_pegawai)
      form.setValue('nama_kategori_jenis_pegawai', data?.jenis_kepegawaian)
      form.setValue('nama_kategori_status', data?.status_pegawai)
      form.setValue('no_karpeg', data?.karpeg)
      form.setValue('tanggal_mulai', data?.tgl_mulai_kerja)
      form.setValue('no_urut', data?.nomor_urut)
      form.setValue('sk', data?.dok_sk)
    } else if (dataParams && dataParams !== '') {
      const data = JSON.parse(dataParams)

      form.setValue('nip', data?.nip)
      form.setValue('jabatan', data?.jabatan)
      form.setValue('asal_pegawai', data?.asal_pegawai)
      form.setValue(
        'nama_kategori_asal_pegawai',
        data?.nama_kategori_asal_pegawai,
      )
      form.setValue('golongan', data?.golongan)
      form.setValue('nama_kategori_golongan', data?.nama_kategori_golongan)
      form.setValue('jenis_ptk', data?.jenis_ptk)
      form.setValue('nuptk', data?.nuptk)
      form.setValue('nama_kategori_jenis_ptk', data?.nama_kategori_jenis_ptk)
      form.setValue('kategori_pegawai', data?.kategori_pegawai)
      form.setValue(
        'nama_kategori_kategori_pegawai',
        data?.nama_kategori_kategori_pegawai,
      )
      form.setValue('jenis_pegawai', data?.jenis_pegawai)
      form.setValue('status', data?.status)
      form.setValue(
        'nama_kategori_jenis_pegawai',
        data?.nama_kategori_jenis_pegawai,
      )
      form.setValue('nama_kategori_status', data?.nama_kategori_status)
      form.setValue('no_karpeg', data?.no_karpeg)
      form.setValue('tanggal_mulai', data?.tanggal_mulai)
      form.setValue('no_urut', data?.no_urut)
      form.setValue('sk', data?.sk)
    }
  }, [dataParams, isEdit, detailPegawai])

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

    if (!isTambah) {
      toast.error(`Maaf, anda tidak memiliki akses untuk mengubah data ini`, {
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
      form.setValue('sk', res?.data?.url)
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

  const jenis_pegawai = form.watch('kategori_pegawai')

  const disabled = isLoading || !isTambah

  return (
    <div className="scrollbar flex h-full flex-col gap-32 overflow-y-auto">
      <p className="font-roboto text-[2.4rem]">{menuList?.[currentIdx]}</p>
      <Form {...form}>
        <form
          className="scrollbar flex h-full w-full flex-col gap-32 overflow-y-auto"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <div className="flex items-center gap-32 phones:flex-col phones:gap-24">
            <FormLabelInput
              name={`nip`}
              form={form}
              label="NIP"
              placeholder="NIP"
              className="w-full hover:cursor-not-allowed phones:w-full "
              type="text"
              isDisabled={disabled}
              isNumber
            />

            <FormLabelInput
              name={`jabatan`}
              form={form}
              label="Jabatan"
              placeholder="Jabatan  "
              className="w-full hover:cursor-not-allowed phones:w-full "
              type="text"
              isDisabled={disabled}
            />
          </div>
          <div className="flex items-center gap-32 phones:flex-col phones:gap-24">
            <SelectListKontenReferensiUmum
              name="asal_pegawai"
              headerLabel="Asal Usul Kepegawaian"
              placeholder="Pilih"
              useFormReturn={form}
              isDisabled={disabled}
              jenis={'asal_pegawai'}
              level1
            />
            <SelectListKontenReferensiUmum
              name="golongan"
              headerLabel="Pangkat / Golongan"
              placeholder="Pilih"
              useFormReturn={form}
              isDisabled={disabled}
              jenis={'golongan_pegawai'}
              level2
            />
          </div>
          <div className="flex items-center gap-32 phones:flex-col phones:gap-24">
            <SelectListKontenReferensiString
              name="jenis_pegawai"
              headerLabel="Jenis Pegawai"
              placeholder="Pilih"
              useFormReturn={form}
              isDisabled={disabled}
              jenis={'jenis_kepegawaian'}
              level3
            />
            <SelectListKontenReferensiString
              name="status"
              headerLabel="Status Aktif"
              placeholder="Pilih"
              useFormReturn={form}
              isDisabled={disabled}
              jenis={'status_pegawai'}
              level3
              className="phones:hidden"
            />
          </div>

          <div className="flex items-center gap-32 phones:flex-col phones:gap-24">
            <SelectListKontenReferensiUmum
              name="kategori_pegawai"
              headerLabel="Kategori Kepegawaian"
              placeholder="Pilih"
              useFormReturn={form}
              isDisabled={disabled}
              jenis={'kategori_pegawai'}
              level4
            />

            {jenis_pegawai === '1' ? (
              <SelectListKontenReferensiUmum
                name="jenis_ptk"
                headerLabel="Jenis PTK"
                placeholder="Pilih"
                useFormReturn={form}
                isDisabled={disabled}
                jenis={'jenis_ptk'}
                level5
              />
            ) : (
              <div className="w-full phones:hidden" />
            )}
          </div>

          <div className="flex items-center gap-32 phones:flex-col phones:gap-24">
            <FormLabelInput
              name={`no_karpeg`}
              form={form}
              label="No. Karpeg"
              placeholder="No. Karpeg"
              className="w-full hover:cursor-not-allowed phones:w-full "
              type="text"
              isDisabled={disabled}
              isNumber
            />
            {jenis_pegawai === '1' ? (
              <FormLabelInput
                name={`nuptk`}
                form={form}
                label="NUPTK"
                placeholder="NUPTK"
                className="w-full hover:cursor-not-allowed phones:w-full "
                type="text"
                isDisabled={disabled}
                isNumber
              />
            ) : (
              <div className="w-full phones:hidden" />
            )}
          </div>

          <div className="flex items-center gap-32 phones:flex-col phones:gap-24">
            <FormLabelInput
              name={`tanggal_mulai`}
              form={form}
              label="Tanggal Mulai"
              className="w-full hover:cursor-not-allowed phones:w-full "
              type="date"
              isDisabled={disabled}
            />
            <FormLabelInput
              name={`no_urut`}
              form={form}
              label="No. Urut"
              placeholder="No. Urut"
              className="w-full hover:cursor-not-allowed phones:w-full "
              type="text"
              isDisabled={disabled}
              isNumber
            />
          </div>

          <SelectListKontenReferensiString
            name="status"
            headerLabel="Status Aktif"
            placeholder="Pilih"
            useFormReturn={form}
            isDisabled={disabled}
            jenis={'status_pegawai'}
            level1
            className="hidden phones:block"
          />

          <div className="flex flex-col gap-12">
            <FormLabelFile
              urls={form.watch('sk')}
              setUrls={(urls) => form.setValue('sk', urls)}
              form={form}
              isLoading={disabled}
              loadingFile={loadingFile}
              name="url_gambar"
              handleUploadFoto={handleUploadFoto}
              isDisabled={!isTambah}
            />
          </div>

          <div className="flex items-center justify-between gap-32">
            <button
              type="button"
              onClick={() => {
                setMenu(menuList?.[currentIdx - 1])
                setCurrentIdx(currentIdx - 1)
              }}
              className="flex items-center gap-12 rounded-2xl border bg-danger px-24 py-12 text-white hover:bg-warna-dark hover:bg-opacity-80 disabled:cursor-not-allowed"
            >
              Kembali
            </button>
            <button
              type="submit"
              className="flex items-center justify-center gap-12 rounded-2xl bg-success px-32 py-12 text-white hover:bg-opacity-80 disabled:cursor-not-allowed"
            >
              Simpan & Lanjutkan
            </button>
          </div>
        </form>
      </Form>
    </div>
  )
}
