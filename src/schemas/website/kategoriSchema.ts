import zod from 'zod'

export const ListGambarSchema = zod.object({
  url_gambar: zod.string().optional().nullable().nullish(),
  keterangan: zod.string().optional().nullable().nullish(),
})

export const TambahKategoriSchema = zod.object({
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
  gambar: zod.array(ListGambarSchema).optional().nullable(),
  id_tags: zod
    .array(zod.string().optional().nullable().nullish())
    .optional()
    .nullable(),
  label_tags: zod
    .array(zod.string().optional().nullable().nullish())
    .optional()
    .nullable(),
})

export const TambahGambarSchema = zod.object({
  id_pengumuman: zod.string().optional().nullable().nullish(),
  gambar: zod.array(ListGambarSchema).optional().nullable(),
})

export const EditGambarSchema = zod.object({
  keterangan: zod.string().optional().nullable().nullish(),
  url_gambar: zod.string().optional().nullable().nullish(),
})

export const KategoriSchema = zod.object({
  kategori: zod.string().optional().nullable().nullish(),
})
