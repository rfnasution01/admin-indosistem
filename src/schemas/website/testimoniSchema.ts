import zod from 'zod'

export const TestimoniSchema = zod.object({
  keterangan: zod.string().optional().nullable().nullish(),
  url_photo: zod.string().optional().nullable().nullish(),
  nama: zod.string().optional().nullable().nullish(),
  keterangan_singkat: zod.string().optional().nullable().nullish(),
  isi: zod.string().optional().nullable().nullish(),
})
