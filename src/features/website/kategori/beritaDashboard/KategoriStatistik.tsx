import { LabelStatistik } from '@/components/LabelComponent/LabelStatistik'

export function KategoriStatistik({
  jlh_berita,
  berita_baru,
  berita_dibaca,
  jumlah_share,
}: {
  jlh_berita: number
  berita_baru: number
  berita_dibaca: string
  jumlah_share: string
}) {
  return (
    <div className="grid grid-cols-2 gap-24">
      <LabelStatistik label="Jumlah Berita" value={jlh_berita} />
      <LabelStatistik label="Berita Baru" value={berita_baru} />
      <LabelStatistik label="Berita Dibaca" value={berita_dibaca} />
      <LabelStatistik label="Jumlah Share" value={jumlah_share} />
    </div>
  )
}
