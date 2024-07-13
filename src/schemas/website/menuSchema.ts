import zod from 'zod'

export const TambahMenuSchema = zod.object({
  nama_menu: zod.string().optional().nullable().nullish(),
  posisi: zod.string().optional().nullable().nullish(),
  jenis_menu: zod.string().optional().nullable().nullish(),
  deskripsi_singkat: zod.string().optional().nullable().nullish(),
  url_gambar: zod.string().optional().nullable().nullish(),
  id_parent: zod.string().optional().nullable().nullish(),
  parent: zod.string().optional().nullable().nullish(),
  id_konten: zod.string().optional().nullable().nullish(),
  konten: zod.string().optional().nullable().nullish(),
  urutan: zod.string().optional().nullable().nullish(),
})
