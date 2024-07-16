import zod from 'zod'

export const TambahFAQSchema = zod.object({
  pertanyaan: zod.string().optional().nullable().nullish(),
  jawaban: zod.string().optional().nullable().nullish(),
  id_kategori: zod.string().optional().nullable().nullish(),
  nama_kategori: zod.string().optional().nullable().nullish(),
})
