import { DialogUpdate } from '@/components/Dialog/DialogUpdate'
import { FormSertifikasi } from '@/components/Form/simpeg/detailPegawai'
import { RiwayatSertifikasi } from '@/features/simpeg/detailPegawai/informasiPribadi'
import { useSimpegDetailPegawai } from '@/hooks/simpeg'
import { useState } from 'react'

export function DetailSertifikasi() {
  const { formTambahRiwayatSertifikasi } = useSimpegDetailPegawai()

  const [isShow, setIsShow] = useState<boolean>(false)

  return (
    <div className="flex w-full flex-col gap-24">
      <div className="flex items-center justify-between gap-32">
        <p className="font-roboto text-[2.6rem] text-primary-100">
          Data Sertifikasi
        </p>
        <button
          onClick={() => setIsShow(true)}
          className="rounded-2xl border border-primary-100 px-24 py-12 text-primary-100"
        >
          Tambah Data
        </button>
      </div>
      <RiwayatSertifikasi />
      <DialogUpdate
        isOpen={isShow}
        setIsOpen={setIsShow}
        children={
          <div className="flex flex-col gap-32 text-[2rem] phones:text-[2.4rem]">
            <FormSertifikasi
              form={formTambahRiwayatSertifikasi}
              isTambah
              setIsShow={setIsShow}
            />
          </div>
        }
        title={`Tambah Data Riwayat Sertifikasi`}
      />
    </div>
  )
}
