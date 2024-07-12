import zod from 'zod'

export const TambahDownloadSchema = zod.object({
  judul: zod.string().optional().nullable().nullish(),
  jenis_file: zod.string().optional().nullable().nullish(),
  url_file: zod.string().optional().nullable().nullish(),
  id_kategori: zod.string().optional().nullable().nullish(),
  nama_kategori: zod.string().optional().nullable().nullish(),
})
