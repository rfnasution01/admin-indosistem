import { TabDetailPegawai } from '@/features/simpeg/detailPegawai'
import {
  AlamatLengkap,
  IdentitasPersonal,
  KarakteristikFisik,
} from '@/features/simpeg/detailPegawai/informasiPribadi'
import { useSimpegTambahPegawai } from '@/hooks/simpeg'
import { ComingSoonPage } from '@/routes/loadables'
import { useState } from 'react'

export function DetailBiodataPegawai() {
  const { detailPegawai } = useSimpegTambahPegawai()

  const listMenu = [
    'Identitas Personal',
    'Alamat Lengkap',
    'Karakteristik Fisik',
  ]
  const [menu, setMenu] = useState<string>(listMenu?.[0])

  const tampilkanKonten = () => {
    switch (menu) {
      case 'Identitas Personal':
        return <IdentitasPersonal detailPegawai={detailPegawai} />
      case 'Alamat Lengkap':
        return <AlamatLengkap detailPegawai={detailPegawai} />
      case 'Karakteristik Fisik':
        return <KarakteristikFisik detailPegawai={detailPegawai} />

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
