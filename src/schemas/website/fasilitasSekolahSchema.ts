import zod from 'zod'

export const FasilitasSekolahSchema = zod.object({
  keterangan: zod.string().optional().nullable().nullish(),
  nama: zod.string().optional().nullable().nullish(),
  jam_mulai: zod.string().optional().nullable().nullish(),
  jam_selesai: zod.string().optional().nullable().nullish(),
  alamat: zod.string().optional().nullable().nullish(),
  telepon: zod.string().optional().nullable().nullish(),
  photo: zod.string().optional().nullable().nullish(),
})
