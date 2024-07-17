import zod from 'zod'

export const ProfilSchema = zod.object({
  email: zod.string({
    required_error: 'Email harus di isi',
    invalid_type_error: 'Format email tidak valid',
  }),
  nama: zod.string({
    required_error: 'Nama harus di isi',
    invalid_type_error: 'Format nama tidak valid',
  }),
  hp: zod.string().optional().nullable().nullish(),
})
