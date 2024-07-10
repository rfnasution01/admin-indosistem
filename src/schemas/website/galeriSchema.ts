import zod from 'zod'

export const ListGambarSchema = zod.object({
  url_gambar: zod.string().optional().nullable().nullish(),
  judul: zod.string().optional().nullable().nullish(),
})

export const TambahGaleriSchema = zod.object({
  judul: zod.string({
    required_error: 'Judul harus di isi',
    invalid_type_error: 'Format Judul tidak valid',
  }),
  url_gambar: zod.string().optional().nullable().nullish(),
  gambar: zod.array(ListGambarSchema).optional().nullable(),
})

export const TambahGambarSchema = zod.object({
  gambar: zod.array(ListGambarSchema).optional().nullable(),
})

export const EditGambarSchema = zod.object({
  judul: zod.string().optional().nullable().nullish(),
  url_gambar: zod.string().optional().nullable().nullish(),
})
