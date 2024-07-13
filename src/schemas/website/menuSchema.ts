import zod from 'zod'

export const MenuSchema = zod.object({
  nama_menu: zod.string().optional().nullable().nullish(),
  posisi: zod.string().optional().nullable().nullish(),
  jenis_menu: zod.string().optional().nullable().nullish(),
  deskrispsi_singkat: zod.string().optional().nullable().nullish(),
  url_gambar: zod.string().optional().nullable().nullish(),
})
