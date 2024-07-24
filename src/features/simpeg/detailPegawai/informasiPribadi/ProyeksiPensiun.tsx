import { LabelData } from '@/components/LabelComponent/LabelData'
import { GetDaftarPegawaDetailType } from '@/types/simpeg/dataPegawai/daftarPegawaiType'

export function ProyeksiPensiun({
  detailPegawai,
}: {
  detailPegawai: GetDaftarPegawaDetailType
}) {
  return (
    <div className="flex flex-col gap-16">
      <LabelData
        label="Tinggi Badan (cm)"
        value={detailPegawai?.tinggi_badan}
      />
      <LabelData label="Berat Badan (kg)" value={detailPegawai?.berat_badan} />
      <LabelData label="Agama" value={detailPegawai?.agama} />
      <LabelData label="Suku" value={detailPegawai?.suku} />
      <LabelData label="Rambut" value={detailPegawai?.rambut} />
      <LabelData label="Bentuk Muka" value={detailPegawai?.bentuk_muka} />
      <LabelData label="Warna Kulit" value={detailPegawai?.warna_kulit} />
      <LabelData label="Ciri Khas" value={detailPegawai?.ciri_khas} />
      <LabelData label="Cacat Tubuh" value={detailPegawai?.cacat_tubuh} />
      <LabelData label="Golongan Darah" value={detailPegawai?.goldarah} />
      <LabelData label="hobi" value={detailPegawai?.hobi} />
    </div>
  )
}
