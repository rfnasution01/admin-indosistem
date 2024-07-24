import { LabelData } from '@/components/LabelComponent/LabelData'
import { GetDaftarPegawaDetailType } from '@/types/simpeg/dataPegawai/daftarPegawaiType'

export function StatusKepegawaianDetail({
  detailPegawai,
}: {
  detailPegawai: GetDaftarPegawaDetailType
}) {
  return (
    <div className="flex flex-col gap-16">
      <LabelData
        label="Asal Usul Kepegawaian"
        value={detailPegawai?.asal_pegawai ?? '-'}
      />
      <LabelData label="NIP" value={detailPegawai?.nip ?? '-'} />
      <LabelData label="Karpeg" value={detailPegawai?.karpeg ?? '-'} />
      <LabelData
        label="Pangkat / Golongan"
        value={detailPegawai?.golongan ?? '-'}
      />
      {detailPegawai?.jenis_ptk && (
        <LabelData label="Jenis PTK" value={detailPegawai?.jenis_ptk} />
      )}
      {detailPegawai?.nuptk && (
        <LabelData label="NUPTK" value={detailPegawai?.nuptk} />
      )}
      <LabelData
        label="Jabatan TPP"
        value={detailPegawai?.bentuk_muka ?? '-'}
      />
      <LabelData label="Jabatan" value={detailPegawai?.jabatan ?? '-'} />
      <LabelData
        label="Kategori Kepegawaian"
        value={detailPegawai?.kategori_pegawai ?? '-'}
      />
      <LabelData
        label="Jenis Kepegawaian"
        value={detailPegawai?.jenis_kepegawaian ?? '-'}
      />
      <LabelData
        label="Status Aktif"
        value={detailPegawai?.status_pegawai ?? '-'}
      />
      <LabelData
        label="Tanggal Mulai Kerja"
        value={detailPegawai?.tgl_mulai_kerja ?? '-'}
      />
      <LabelData label="Dokumen" value={detailPegawai?.dok_sk ?? '-'} />
      <LabelData label="No Urut" value={detailPegawai?.nomor_urut ?? '-'} />
    </div>
  )
}
