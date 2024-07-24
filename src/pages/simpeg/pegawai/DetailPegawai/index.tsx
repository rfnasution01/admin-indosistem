import { usePathname } from '@/hooks/usePathname'
import { ComingSoonPage } from '@/routes/loadables'
import {
  DetailBiodataPegawai,
  DetailKeluargaPegawai,
  DetailNomorRekening,
  DetailStatusKepegawaian,
} from './informasiPribadi'
import {
  DetailRiwayatJabatan,
  DetailRiwayatJabatanFungsional,
  DetailRiwayatKepangkatan,
  DetailRiwayatKepangkatanCPNS,
} from './riwayatKarir'

export default function DetailPegawai() {
  const { lastPathname } = usePathname()

  const tampilkanKonten = () => {
    switch (lastPathname) {
      case 'detail':
        return <DetailBiodataPegawai />
      case 'biodata':
        return <DetailBiodataPegawai />
      case 'status-kepegawaian':
        return <DetailStatusKepegawaian />
      case 'data-keluarga':
        return <DetailKeluargaPegawai />
      case 'rekening-bank':
        return <DetailNomorRekening />
      case 'riwayat-jabatan':
        return <DetailRiwayatJabatan />
      case 'riwayat-jabatan-fungsional':
        return <DetailRiwayatJabatanFungsional />
      case 'riwayat-kepangkatan':
        return <DetailRiwayatKepangkatan />
      case 'data-pengangkatan':
        return <DetailRiwayatKepangkatanCPNS />
      default:
        return <ComingSoonPage />
    }
  }

  return (
    <div className="scrollbar flex h-full w-full overflow-y-auto">
      {tampilkanKonten()}
    </div>
  )
}
