import { LabelData } from '@/components/LabelComponent/LabelData'
import { GetDaftarPegawaDetailType } from '@/types/simpeg/dataPegawai/daftarPegawaiType'

export function IdentitasPersonal({
  detailPegawai,
}: {
  detailPegawai: GetDaftarPegawaDetailType
}) {
  return (
    <div className="flex flex-col gap-16">
      <LabelData label="NIK" value={detailPegawai?.nik} />
      <LabelData label="Nama Lengkap dan Gelar" value={detailPegawai?.nama} />
      <LabelData label="Jenis Kelamin" value={detailPegawai?.jk} />
      <LabelData label="Tempat Lahir" value={detailPegawai?.tempat_lahir} />
      <LabelData label="Tanggal Lahir" value={detailPegawai?.tgl_lahir} />
      <LabelData label="Email" value={detailPegawai?.email} />
      <LabelData label="No. Hp" value={detailPegawai?.hp} />
      <LabelData label="NPWP" value={detailPegawai?.npwp} />
      <LabelData
        label="Status Pernikahan"
        value={detailPegawai?.status_menikah}
      />
    </div>
  )
}
