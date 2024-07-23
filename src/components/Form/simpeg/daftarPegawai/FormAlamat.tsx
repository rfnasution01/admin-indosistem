/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseFormReturn } from 'react-hook-form'
import { FormLabelInput } from '@/components/InputComponent'
import { Form } from '../..'
import { Dispatch, SetStateAction, useEffect } from 'react'
import {
  SelectListKabupaten,
  SelectListKecamatan,
  SelectListKelurahan,
  SelectListProvinsi,
} from '@/components/Select/simpeg'
import { GetDaftarPegawaDetailType } from '@/types/simpeg/dataPegawai/daftarPegawaiType'

export function FormAlamat({
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

      // Set or update the isAlamat field to true
      storedStatus.isAlamat = true

      // Store the updated status object back to localStorage
      localStorage.setItem('status', JSON.stringify(storedStatus))

      localStorage.setItem(menuList?.[currentIdx], JSON.stringify(values))
    }
    setCurrentIdx(currentIdx + 1)
    setMenu(menuList?.[currentIdx + 1])
  }

  const provinsi = form.watch('provinsi')
  const kabupaten = form.watch('kabupaten')
  const kecamatan = form.watch('kecamatan')
  const kelurahan = form.watch('kelurahan')

  const disabled = isLoading || !isTambah

  useEffect(() => {
    if (isEdit && detailPegawai) {
      const data = detailPegawai

      form.setValue('alamat_lengkap', data?.alamat)
      form.setValue('provinsi', data?.id_propinsi)
      form.setValue('nama_provinsi', data?.propinsi)
      form.setValue('kabupaten', data?.id_kabupaten)
      form.setValue('nama_kabupaten', data?.kabupaten)
      form.setValue('kecamatan', data?.id_kecamatan)
      form.setValue('nama_kecamatan', data?.kecamatan)
      form.setValue('kelurahan', data?.id_kel)
      form.setValue('nama_kelurahan', data?.kel)
      form.setValue('kodepos', data?.kodepos)
      form.setValue('longitude', data?.longitude)
      form.setValue('latitude', data?.latitude)
    } else if (dataParams && dataParams !== '') {
      const data = JSON.parse(dataParams)

      form.setValue('alamat_lengkap', data?.alamat_lengkap)
      form.setValue('provinsi', data?.provinsi)
      form.setValue('nama_provinsi', data?.nama_provinsi)
      form.setValue('kabupaten', data?.kabupaten)
      form.setValue('nama_kabupaten', data?.nama_kabupaten)
      form.setValue('kecamatan', data?.kecamatan)
      form.setValue('nama_kecamatan', data?.nama_kecamatan)
      form.setValue('kelurahan', data?.kelurahan)
      form.setValue('nama_kelurahan', data?.nama_kelurahan)
      form.setValue('kodepos', data?.kodepos)
      form.setValue('longitude', data?.longitude)
      form.setValue('latitude', data?.latitude)
    }
  }, [dataParams, isEdit, detailPegawai])

  return (
    <div className="scrollbar flex h-full w-full flex-col gap-32 overflow-y-auto">
      <p className="font-roboto text-[2.4rem]">{menuList?.[currentIdx]}</p>

      <Form {...form}>
        <form
          className="scrollbar flex h-full w-full flex-col gap-32 overflow-y-auto"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <div className="flex items-center gap-32 phones:flex-col phones:gap-24">
            <FormLabelInput
              name={`alamat_lengkap`}
              form={form}
              label="Alamat Lengkap"
              placeholder="Alamat"
              className="w-full hover:cursor-not-allowed phones:w-full "
              type="text"
              isDisabled={disabled}
            />

            <div className="w-full phones:hidden" />
          </div>
          <div className="flex items-center gap-32 phones:flex-col phones:gap-24">
            <SelectListProvinsi
              key={`provinsi-${provinsi}`}
              name="provinsi"
              useFormReturn={form}
              headerLabel="Provinsi"
              placeholder="Pilih"
              isDisabled={disabled}
              className="w-full"
              level1
            />

            <SelectListKabupaten
              key={`kabupaten-${provinsi}-${kabupaten}`}
              name="kabupaten"
              useFormReturn={form}
              headerLabel="Kabupaten"
              placeholder="Pilih"
              isDisabled={!provinsi || isLoading || disabled}
              className="w-full"
              level2
            />
          </div>
          <div className="flex items-center gap-32 phones:flex-col phones:gap-24">
            <SelectListKecamatan
              key={`kecamatan-${provinsi}-${kabupaten}-${kecamatan}`}
              name="kecamatan"
              useFormReturn={form}
              headerLabel="Kecamatan"
              placeholder="Pilih"
              isDisabled={!provinsi || !kabupaten || isLoading || disabled}
              level3
            />

            <SelectListKelurahan
              key={`kelurahan-${provinsi}-${kabupaten}-${kecamatan}-${kelurahan}`}
              name="kelurahan"
              useFormReturn={form}
              headerLabel="Kelurahan"
              placeholder="Pilih"
              isDisabled={
                !provinsi || !kabupaten || !kecamatan || isLoading || disabled
              }
              level4
            />
          </div>
          <div className="flex items-center gap-32 phones:flex-col phones:gap-24">
            <FormLabelInput
              name={`kodepos`}
              form={form}
              label="Kode Pos"
              placeholder="Kode Pos"
              className="w-full hover:cursor-not-allowed phones:w-full "
              type="text"
              isDisabled={disabled}
              isNumber
            />

            <div className="w-full phones:hidden" />
          </div>
          <p className="font-roboto">Lokasi Rumah</p>
          <div className="flex items-center gap-32 phones:flex-col phones:gap-24">
            <FormLabelInput
              name={`longitude`}
              form={form}
              label="Longitude"
              placeholder="Longitude"
              className="w-full hover:cursor-not-allowed phones:w-full "
              type="text"
              isDisabled={disabled}
              isFloat
            />
            <FormLabelInput
              name={`latitude`}
              form={form}
              label="Latitude"
              placeholder="Latitude"
              className="w-full hover:cursor-not-allowed phones:w-full "
              type="text"
              isDisabled={disabled}
              isFloat
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
              Simpan & Selanjutnya
            </button>
          </div>
        </form>
      </Form>
    </div>
  )
}
