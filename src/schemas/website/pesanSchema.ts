import zod from 'zod'

export const ChatSchema = zod.object({
  id: zod.string().nullable().nullish().optional(),

  isi: zod.string({
    required_error: 'Pesan harus di isi',
    invalid_type_error: 'Format pesan tidak valid',
  }),
  berkas: zod
    .array(zod.string().optional().nullable().nullish())
    .optional()
    .nullable()
    .nullish(),
})

export const CloseSchema = zod.object({
  id: zod.string().nullable().nullish().optional(),
})
