/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseFormReturn } from 'react-hook-form'
import { FormLabelInput } from '@/components/InputComponent'
import { Form } from '../..'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { SelectListKontenReferensiUmum } from '@/components/Select/simpeg'
import { GetDaftarPegawaDetailType } from '@/types/simpeg/dataPegawai/daftarPegawaiType'

export function FormFisik({
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

      // Set or update the isFisik field to true
      storedStatus.isKarakter = true

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

      form.setValue('tinggi', data?.tinggi_badan)
      form.setValue('berat', data?.berat_badan)
      form.setValue('agama', data?.id_agama)
      form.setValue('suku', data?.id_suku)
      form.setValue('rambut', data?.id_rambut)
      form.setValue('bentuk', data?.id_bentuk_muka)
      form.setValue('warna', data?.id_warna_kulit)
      form.setValue('darah', data?.id_goldarah)
      form.setValue('ciri', data?.ciri_khas)
      form.setValue('cacat', data?.cacat_tubuh)
      form.setValue('hobi', data?.hobi)
      form.setValue('nama_kategori_agama', data?.agama)
      form.setValue('nama_kategori_suku', data?.suku)
      form.setValue('nama_kategori_rambut', data?.rambut)
      form.setValue('nama_kategori_bentuk', data?.bentuk_muka)
      form.setValue('nama_kategori_warna', data?.warna_kulit)
      form.setValue('nama_kategori_darah', data?.goldarah)
    } else if (dataParams && dataParams !== '') {
      const data = JSON.parse(dataParams)

      form.setValue('tinggi', data?.tinggi)
      form.setValue('berat', data?.berat)
      form.setValue('agama', data?.agama)
      form.setValue('agama', data?.agama)
      form.setValue('suku', data?.suku)
      form.setValue('rambut', data?.rambut)
      form.setValue('bentuk', data?.bentuk)
      form.setValue('warna', data?.warna)
      form.setValue('darah', data?.darah)
      form.setValue('ciri', data?.ciri)
      form.setValue('cacat', data?.cacat)
      form.setValue('hobi', data?.hobi)
      form.setValue('nama_kategori_agama', data?.nama_kategori_agama)
      form.setValue('nama_kategori_suku', data?.nama_kategori_suku)
      form.setValue('nama_kategori_rambut', data?.nama_kategori_rambut)
      form.setValue('nama_kategori_bentuk', data?.nama_kategori_bentuk)
      form.setValue('nama_kategori_warna', data?.nama_kategori_warna)
      form.setValue('nama_kategori_darah', data?.nama_kategori_darah)
    }
  }, [dataParams, isEdit, detailPegawai])

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
            <SelectListKontenReferensiUmum
              name="agama"
              headerLabel="Agama"
              placeholder="Pilih"
              useFormReturn={form}
              isDisabled={disabled}
              jenis={'agama'}
              level1
            />
            <SelectListKontenReferensiUmum
              name="suku"
              headerLabel="Suku"
              placeholder="Pilih"
              useFormReturn={form}
              isDisabled={disabled}
              jenis={'suku'}
              level2
            />
          </div>
          <div className="flex items-center gap-32 phones:flex-col phones:gap-24">
            <FormLabelInput
              name={`tinggi`}
              form={form}
              label="Tinggi Badan"
              placeholder="Tinggi Badan (cm)"
              className="w-full hover:cursor-not-allowed phones:w-full "
              type="text"
              isDisabled={disabled}
              isNumber
            />

            <FormLabelInput
              name={`berat`}
              form={form}
              label="Berat Badan"
              placeholder="Berat Badan (cm)"
              className="w-full hover:cursor-not-allowed phones:w-full "
              type="text"
              isDisabled={disabled}
              isNumber
            />
          </div>

          <div className="flex items-center gap-32 phones:flex-col phones:gap-24">
            <SelectListKontenReferensiUmum
              name="rambut"
              headerLabel="Rambut"
              placeholder="Pilih"
              useFormReturn={form}
              isDisabled={disabled}
              jenis={'rambut'}
              level3
            />

            <SelectListKontenReferensiUmum
              name="bentuk"
              headerLabel="Bentuk Muka"
              placeholder="Pilih"
              useFormReturn={form}
              isDisabled={disabled}
              jenis={'muka'}
              level4
            />
          </div>
          <div className="flex items-center gap-32 phones:flex-col phones:gap-24">
            <SelectListKontenReferensiUmum
              name="warna"
              headerLabel="Warna Kulit"
              placeholder="Pilih"
              useFormReturn={form}
              isDisabled={disabled}
              jenis={'kulit'}
              level5
            />
            <SelectListKontenReferensiUmum
              name="darah"
              headerLabel="Golongan Darah"
              placeholder="Pilih"
              useFormReturn={form}
              isDisabled={disabled}
              jenis={'goldarah'}
              level5
              className="phones:hidden"
            />
          </div>
          <div className="flex items-center gap-32 phones:flex-col phones:gap-24">
            <FormLabelInput
              name={`ciri`}
              form={form}
              label="Ciri Khas"
              placeholder="Ciri Khas"
              className="w-full hover:cursor-not-allowed phones:w-full "
              type="text"
              isDisabled={disabled}
            />
            <FormLabelInput
              name={`cacat`}
              form={form}
              label="Cacat tubuh"
              placeholder="Cacat Tubuh"
              className="w-full hover:cursor-not-allowed phones:w-full "
              type="text"
              isDisabled={disabled}
            />
          </div>
          <div className="flex items-center gap-32 phones:flex-col phones:gap-24">
            <FormLabelInput
              name={`hobi`}
              form={form}
              label="Hobi"
              placeholder="Hobi"
              className="w-full hover:cursor-not-allowed phones:w-full "
              type="text"
              isDisabled={disabled}
            />
            <div className="w-full phones:hidden" />
          </div>

          <SelectListKontenReferensiUmum
            name="darah"
            headerLabel="Golongan Darah"
            placeholder="Pilih"
            useFormReturn={form}
            isDisabled={disabled}
            jenis={'goldarah'}
            level5
            className="hidden phones:block"
          />
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
