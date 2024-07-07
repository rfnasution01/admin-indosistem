import zod from 'zod'

export const ProgramSchema = zod.object({
  judul: zod.string().optional().nullable().nullish(),
  icon: zod.string().optional().nullable().nullish(),
  photo: zod.string().optional().nullable().nullish(),
  isi_singkat: zod.string().optional().nullable().nullish(),
  isi_lengkap: zod.string().optional().nullable().nullish(),
  aktif: zod.string().optional().nullable().nullish(),
})

export const LayananSchema = zod.object({
  nama_layanan: zod.string().optional().nullable().nullish(),
  icon: zod.string().optional().nullable().nullish(),
  url: zod.string().optional().nullable().nullish(),
  keterangan: zod.string().optional().nullable().nullish(),
})
