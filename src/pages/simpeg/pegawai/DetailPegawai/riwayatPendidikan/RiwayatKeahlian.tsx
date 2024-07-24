import { DialogUpdate } from '@/components/Dialog/DialogUpdate'
import { FormKeahlian } from '@/components/Form/simpeg/detailPegawai'
import { RiwayatKeahlian } from '@/features/simpeg/detailPegawai/informasiPribadi'
import { useSimpegDetailPegawai } from '@/hooks/simpeg'
import { useState } from 'react'

export function DetailKeahlian() {
  const { formTambahRiwayatKeahlian } = useSimpegDetailPegawai()

  const [isShow, setIsShow] = useState<boolean>(false)

  return (
    <div className="flex w-full flex-col gap-24">
      <div className="flex items-center justify-between gap-32">
        <p className="font-roboto text-[2.6rem] text-primary-100">
          Data Keahlian
        </p>
        <button
          onClick={() => setIsShow(true)}
          className="rounded-2xl border border-primary-100 px-24 py-12 text-primary-100"
        >
          Tambah Data
        </button>
      </div>
      <RiwayatKeahlian />
      <DialogUpdate
        isOpen={isShow}
        setIsOpen={setIsShow}
        children={
          <div className="flex flex-col gap-32 text-[2rem] phones:text-[2.4rem]">
            <FormKeahlian
              form={formTambahRiwayatKeahlian}
              isTambah
              setIsShow={setIsShow}
            />
          </div>
        }
        title={`Tambah Data Keahlian`}
      />
    </div>
  )
}
