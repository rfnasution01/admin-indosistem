import { DialogUpdate } from '@/components/Dialog/DialogUpdate'
import { FormRiwayatKepangkatanCPNS } from '@/components/Form/simpeg/detailPegawai'
import { RiwayatKepangkatanCPNS } from '@/features/simpeg/detailPegawai/riwayatKarir'
import { useSimpegDetailPegawai } from '@/hooks/simpeg'
import { useState } from 'react'

export function DetailRiwayatKepangkatanCPNS() {
  const { formTambahRiwayatKepangkatanCPNS } = useSimpegDetailPegawai()

  const [isShow, setIsShow] = useState<boolean>(false)

  return (
    <div className="flex w-full flex-col gap-24">
      <div className="flex items-center justify-between gap-32">
        <p className="font-roboto text-[2.6rem] text-primary-100">
          Data Pengangkatan CPNS
        </p>
        <button
          onClick={() => setIsShow(true)}
          className="rounded-2xl border border-primary-100 px-24 py-12 text-primary-100"
        >
          Tambah Data
        </button>
      </div>
      <RiwayatKepangkatanCPNS />
      <DialogUpdate
        isOpen={isShow}
        setIsOpen={setIsShow}
        children={
          <div className="flex flex-col gap-32 text-[2rem] phones:text-[2.4rem]">
            <FormRiwayatKepangkatanCPNS
              form={formTambahRiwayatKepangkatanCPNS}
              isTambah
              setIsShow={setIsShow}
            />
          </div>
        }
        title={`Tambah Data Riwayat Kepangkatan CPNS`}
      />
    </div>
  )
}
