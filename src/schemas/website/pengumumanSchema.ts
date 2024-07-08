import zod from 'zod'

const ListGambar = zod.object({
  url_gambar: zod.string().optional().nullable().nullish(),
  keterangan: zod.string().optional().nullable().nullish(),
})

export const TambahPengumumanSchema = zod.object({
  id_kategori: zod.string({
    required_error: 'Kategori harus di isi',
    invalid_type_error: 'Format kategori tidak valid',
  }),
  nama_kategori: zod.string().optional().nullable().nullish(),
  tanggal: zod.string().optional().nullable().nullish(),
  judul: zod.string({
    required_error: 'Judul harus di isi',
    invalid_type_error: 'Format judul tidak valid',
  }),
  isi: zod.string().optional().nullable().nullish(),
  publish: zod.string().optional().nullable().nullish(),
  gambar: zod.array(ListGambar).optional().nullable(),
  id_tags: zod
    .array(zod.string().optional().nullable().nullish())
    .optional()
    .nullable(),
  label_tags: zod
    .array(zod.string().optional().nullable().nullish())
    .optional()
    .nullable(),
})
