import { LabelData } from '@/components/LabelComponent/LabelData'
import { GetDaftarPegawaDetailType } from '@/types/simpeg/dataPegawai/daftarPegawaiType'

export function AlamatLengkap({
  detailPegawai,
}: {
  detailPegawai: GetDaftarPegawaDetailType
}) {
  return (
    <div className="flex flex-col gap-16">
      <LabelData label="Alamat Lengkap" value={detailPegawai?.alamat} />
      <LabelData label="Provinsi" value={detailPegawai?.propinsi} />
      <LabelData label="Kabupaten / Kota" value={detailPegawai?.kabupaten} />
      <LabelData label="Kecamatan" value={detailPegawai?.kecamatan} />
      <LabelData label="Kelurahan" value={detailPegawai?.kel} />
      <LabelData label="Kode Pos" value={detailPegawai?.kodepos} />
      <p className="font-roboto">Lokasi Rumah</p>
      <LabelData label="Longitude" value={detailPegawai?.longitude} />
      <LabelData label="Latitude" value={detailPegawai?.latitude} />
    </div>
  )
}
