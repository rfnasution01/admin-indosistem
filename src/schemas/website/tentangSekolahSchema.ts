import zod from 'zod'

const ListSchema = zod.object({
  keterangan: zod.string().optional().nullable().nullish(),
  urutan: zod.string().optional().nullable().nullish(),
})

export const TentangSekolahSchema = zod.object({
  jenis: zod.string({
    required_error: 'Jenis harus di isi',
    invalid_type_error: 'Format jenis tidak valid',
  }),
  keterangan: zod.string().optional().nullable().nullish(),
  sub_keterangan: zod.string().optional().nullable().nullish(),
  gambar_url: zod.string().optional().nullable().nullish(),
  list: zod.array(ListSchema).optional().nullable(),
})
