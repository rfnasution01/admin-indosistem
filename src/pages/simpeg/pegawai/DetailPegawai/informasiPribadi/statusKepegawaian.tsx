import { TabDetailPegawai } from '@/features/simpeg/detailPegawai'
import {
  HistoryPerubahanStatus,
  ProyeksiPensiun,
  StatusKepegawaianDetail,
} from '@/features/simpeg/detailPegawai/informasiPribadi'
import { useSimpegTambahPegawai } from '@/hooks/simpeg'
import { ComingSoonPage } from '@/routes/loadables'
import { useState } from 'react'

export function StatusKepegawaian() {
  const { detailPegawai } = useSimpegTambahPegawai()

  const listMenu = [
    'Status Kepegawaian',
    'Histori Perubahan Status Kepegawaian',
    'Proyeksi Pensiun',
  ]
  const [menu, setMenu] = useState<string>(listMenu?.[0])

  const tampilkanKonten = () => {
    switch (menu) {
      case 'Status Kepegawaian':
        return <StatusKepegawaianDetail detailPegawai={detailPegawai} />
      case 'Histori Perubahan Status Kepegawaian':
        return <HistoryPerubahanStatus detailPegawai={detailPegawai} />
      case 'Proyeksi Pensiun':
        return <ProyeksiPensiun detailPegawai={detailPegawai} />

      default:
        return <ComingSoonPage />
    }
  }

  return (
    <div className="flex w-full flex-col gap-24">
      <TabDetailPegawai listMenu={listMenu} setMenu={setMenu} menu={menu} />
      <p className="font-roboto text-[2.6rem] text-primary-100">{menu}</p>
      {tampilkanKonten()}
    </div>
  )
}
