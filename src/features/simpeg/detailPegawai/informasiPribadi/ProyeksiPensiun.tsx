import { LabelData } from '@/components/LabelComponent/LabelData'
import { GetDaftarPegawaDetailType } from '@/types/simpeg/dataPegawai/daftarPegawaiType'

export function ProyeksiPensiun({
  detailPegawai,
}: {
  detailPegawai: GetDaftarPegawaDetailType
}) {
  return (
    <div className="flex flex-col gap-16">
      <LabelData label="Umur Pensiun" value={detailPegawai?.tinggi_badan} />
      <LabelData label="Tanggal Lahir" value={detailPegawai?.berat_badan} />
      <LabelData label="Tanggal Pensiun" value={detailPegawai?.agama} />
      <LabelData label="Umur Sekarang" value={detailPegawai?.suku} />
      <LabelData label="Sisa Masa Kerja" value={detailPegawai?.rambut} />
    </div>
  )
}
