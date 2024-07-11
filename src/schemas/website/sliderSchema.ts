import zod from 'zod'

export const TambahSliderSchema = zod.object({
  judul: zod.string().optional().nullable().nullish(),
  gambar: zod.string().optional().nullable().nullish(),
  url: zod.string().optional().nullable().nullish(),
})
