import zod from 'zod'

export const SimpegTambahRiwayatJabatanSchema = zod.object({
  jabatan: zod.string().optional().nullable().nullish(),
  nama_instansi: zod.string().optional().nullable().nullish(),
  alamat_instansi: zod.string().optional().nullable().nullish(),
  tmt_jabatan: zod.string().optional().nullable().nullish(),
  pangkat: zod.string().optional().nullable().nullish(),
  pejabat_pengesahan: zod.string().optional().nullable().nullish(),
  nomor_sk: zod.string().optional().nullable().nullish(),
  tanggal_sk: zod.string().optional().nullable().nullish(),
  lampiran: zod.string().optional().nullable().nullish(),
})

export const SimpegTambahRiwayatJabatanFungsionalSchema = zod.object({
  jabatan_fungsional: zod.string().optional().nullable().nullish(),
  nama_instansi: zod.string().optional().nullable().nullish(),
  alamat_instansi: zod.string().optional().nullable().nullish(),
  tmt_jabatan: zod.string().optional().nullable().nullish(),
  pejabat_pengesahan: zod.string().optional().nullable().nullish(),
  nomor_sk: zod.string().optional().nullable().nullish(),
  tanggal_sk: zod.string().optional().nullable().nullish(),
  lampiran: zod.string().optional().nullable().nullish(),
})

export const SimpegTambahRiwayatKepangkatanSchema = zod.object({
  pangkat: zod.string().optional().nullable().nullish(),
  tmk_pengangkatan: zod.string().optional().nullable().nullish(),
  no_bkn: zod.string().optional().nullable().nullish(),
  pejabat_pengesahan: zod.string().optional().nullable().nullish(),
  nomor_sk: zod.string().optional().nullable().nullish(),
  tanggal_sk: zod.string().optional().nullable().nullish(),
  lampiran: zod.string().optional().nullable().nullish(),
})

export const SimpegTambahRiwayatKepangkatanCPNSSchema = zod.object({
  no_nota: zod.string().optional().nullable().nullish(),
  tanggal_nota: zod.string().optional().nullable().nullish(),
  pejabat_pengesahan: zod.string().optional().nullable().nullish(),
  nomor_sk: zod.string().optional().nullable().nullish(),
  tanggal_sk: zod.string().optional().nullable().nullish(),
  pangkat: zod.string().optional().nullable().nullish(),
  tmt_cpns: zod.string().optional().nullable().nullish(),
  lampiran: zod.string().optional().nullable().nullish(),
})
