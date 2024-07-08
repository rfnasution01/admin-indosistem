import zod from 'zod'

export const KategoriSchema = zod.object({
  kategori: zod.string().optional().nullable().nullish(),
})
