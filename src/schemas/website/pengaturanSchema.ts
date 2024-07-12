import zod from 'zod'

export const UpdateIdentitasSchema = zod.object({
  nama_website: zod.string().optional().nullable().nullish(),
  logo: zod.string().optional().nullable().nullish(),
  favicon: zod.string().optional().nullable().nullish(),
  footer: zod.string().optional().nullable().nullish(),
  deskripsi: zod.string().optional().nullable().nullish(),
  keyword: zod.string().optional().nullable().nullish(),
})

export const UpdatePolicySchema = zod.object({
  policy: zod.string().optional().nullable().nullish(),
})
