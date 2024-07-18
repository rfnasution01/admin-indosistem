import zod from 'zod'

export const FilterSchema = zod.object({
  jenis_kepegawaian: zod.string().optional().nullable().nullish(),
  status_pegawai: zod.string().optional().nullable().nullish(),
  validasi: zod.string().optional().nullable().nullish(),
  tahun: zod.string().optional().nullable().nullish(),
  bulan: zod.string().optional().nullable().nullish(),
})

export const ResetSchema = zod.object({
  nip: zod.string().optional().nullable().nullish(),
  nama: zod.string().optional().nullable().nullish(),
  password: zod.string({
    required_error: 'Password harus di isi',
    invalid_type_error: 'Format password tidak valid',
  }),
})
