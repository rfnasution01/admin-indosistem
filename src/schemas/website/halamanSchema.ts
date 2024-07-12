import zod from 'zod'

export const TambahHalamanSchema = zod.object({
  judul: zod.string().optional().nullable().nullish(),
  id_jenis: zod.string().optional().nullable().nullish(),
  nama_jenis: zod.string().optional().nullable().nullish(),
  isi: zod.string().optional().nullable().nullish(),
  url_gambar: zod.string().optional().nullable().nullish(),
})
