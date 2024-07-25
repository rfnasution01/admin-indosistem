import zod from 'zod'

export const SimpegTambahGajiSchema = zod.object({
  tmt_kenaikan: zod.string().optional().nullable().nullish(),
  no_sk: zod.string().optional().nullable().nullish(),
  tanggal_sk: zod.string().optional().nullable().nullish(),
  pejabat_pengesahan: zod.string().optional().nullable().nullish(),
  masa_kerja: zod.string().optional().nullable().nullish(),
  lampiran: zod.string().optional().nullable().nullish(),
})

export const SimpegTambahRiwayatPMKSchema = zod.object({
  no_sk: zod.string().optional().nullable().nullish(),
  tanggal_sk: zod.string().optional().nullable().nullish(),
  pejabat_pengesahan: zod.string().optional().nullable().nullish(),
  masa_kerja: zod.string().optional().nullable().nullish(),
  no_persetujuan: zod.string().optional().nullable().nullish(),
  lampiran: zod.string().optional().nullable().nullish(),
})

export const SimpegTambahRiwayatPenyesuaianIjazahSchema = zod.object({
  no_stlupi: zod.string().optional().nullable().nullish(),
  tanggal_stlupi: zod.string().optional().nullable().nullish(),
  nilai: zod.string().optional().nullable().nullish(),
  tingkat_pendidikan: zod.string().optional().nullable().nullish(),
  program_studi: zod.string().optional().nullable().nullish(),
  penandatangan_sertifikat: zod.string().optional().nullable().nullish(),
  penandatangan_nilai: zod.string().optional().nullable().nullish(),
  lampiran: zod.string().optional().nullable().nullish(),
})
