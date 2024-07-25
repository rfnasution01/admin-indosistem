import zod from 'zod'

export const SimpegTambahRiwayatOrganisasiSchema = zod.object({
  nama: zod.string().optional().nullable().nullish(),
  jabatan: zod.string().optional().nullable().nullish(),
  tahun_mulai: zod.string().optional().nullable().nullish(),
  tahun_akhir: zod.string().optional().nullable().nullish(),
  pimpinan: zod.string().optional().nullable().nullish(),
})

export const SimpegTambahRiwayatPenelitianSchema = zod.object({
  judul: zod.string().optional().nullable().nullish(),
  tahun: zod.string().optional().nullable().nullish(),
  peran: zod.string().optional().nullable().nullish(),
  biaya: zod.string().optional().nullable().nullish(),
  dana: zod.string().optional().nullable().nullish(),
})
