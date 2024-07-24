import { usePathname } from '@/hooks/usePathname'
import { ComingSoonPage } from '@/routes/loadables'
import { DetailBiodataPegawai, StatusKepegawaian } from './informasiPribadi'

export default function DetailPegawai() {
  const { lastPathname } = usePathname()

  const tampilkanKonten = () => {
    switch (lastPathname) {
      case 'detail':
        return <DetailBiodataPegawai />
      case 'biodata':
        return <DetailBiodataPegawai />
      case 'status-kepegawaian':
        return <StatusKepegawaian />
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
