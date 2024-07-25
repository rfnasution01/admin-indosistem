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
import {
  DetailKeahlian,
  DetailPelatihan,
  DetailPendidikan,
  DetailSertifikasi,
} from './riwayatPendidikan'
import {
  DetailAbsensiHarian,
  DetailRiwayatGajiBerkala,
  DetailRiwayatPenyesuaianIjazah,
  DetailRiwayatPMK,
} from './riwayatGaji'
import {
  DetailKelengkapanDokumen,
  DetailRiwayatHukumanDisiplin,
  DetailRiwayatTandaJasa,
  DetailRiwayatVaksinasi,
} from './administrasi'

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
      case 'riwayat-pendidikan':
        return <DetailPendidikan />
      case 'data-pelatihan':
        return <DetailPelatihan />
      case 'data-sertifikasi':
        return <DetailSertifikasi />
      case 'data-keahlian':
        return <DetailKeahlian />
      case 'rekap-absensi-bulanan':
        return <DetailAbsensiHarian />
      case 'riwayat-gaji-berkala':
        return <DetailRiwayatGajiBerkala />
      case 'riwayat-pmk':
        return <DetailRiwayatPMK />
      case 'riwayat-penyesuaian-ijazah':
        return <DetailRiwayatPenyesuaianIjazah />
      case 'kelengkapan-dokumen':
        return <DetailKelengkapanDokumen />
      case 'riwayat-hukuman-disiplin':
        return <DetailRiwayatHukumanDisiplin />
      case 'tanda-jasa':
        return <DetailRiwayatTandaJasa />
      case 'vaksinasi':
        return <DetailRiwayatVaksinasi />
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
