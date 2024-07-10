import zod from 'zod'

export const KontakSchema = zod.object({
  alamat: zod.string().optional().nullable().nullish(),
  telepon: zod.string().optional().nullable().nullish(),
  kota: zod.string().optional().nullable().nullish(),
  wa: zod.string().optional().nullable().nullish(),
  fb: zod.string().optional().nullable().nullish(),
  tw: zod.string().optional().nullable().nullish(),
  ig: zod.string().optional().nullable().nullish(),
  yt: zod.string().optional().nullable().nullish(),
  telegram: zod.string().optional().nullable().nullish(),
  weekday_cs_mulai: zod.string().optional().nullable().nullish(),
  weekday_cs_selesai: zod.string().optional().nullable().nullish(),
  weekend_cs_mulai: zod.string().optional().nullable().nullish(),
  weekend_cs_selesai: zod.string().optional().nullable().nullish(),
  tiktok: zod.string().optional().nullable().nullish(),
  email: zod.string().optional().nullable().nullish(),
  latitude: zod.string().optional().nullable().nullish(),
  longitude: zod.string().optional().nullable().nullish(),
})
