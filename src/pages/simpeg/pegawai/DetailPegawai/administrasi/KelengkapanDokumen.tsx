import { DialogUpdate } from '@/components/Dialog/DialogUpdate'
import { FormDokumen } from '@/components/Form/simpeg/detailPegawai/administrasi'
import { KelengkapanDokumen } from '@/features/simpeg/detailPegawai/administrasi'
import { useSimpegDetailPegawai } from '@/hooks/simpeg'
import { useState } from 'react'

export function DetailKelengkapanDokumen() {
  const { formTambahDokumen } = useSimpegDetailPegawai()

  const [isShow, setIsShow] = useState<boolean>(false)

  return (
    <div className="flex w-full flex-col gap-24">
      <div className="flex items-center justify-between gap-32">
        <p className="font-roboto text-[2.6rem] text-primary-100">
          Kelengkapan Dokumen
        </p>
        <button
          onClick={() => setIsShow(true)}
          className="rounded-2xl border border-primary-100 px-24 py-12 text-primary-100"
        >
          Tambah Data
        </button>
      </div>
      <KelengkapanDokumen />
      <DialogUpdate
        isOpen={isShow}
        setIsOpen={setIsShow}
        children={
          <div className="flex flex-col gap-32 text-[2rem] phones:text-[2.4rem]">
            <FormDokumen
              form={formTambahDokumen}
              isTambah
              setIsShow={setIsShow}
            />
          </div>
        }
        title={`Upload Dokumen`}
      />
    </div>
  )
}
