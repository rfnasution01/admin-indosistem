import zod from 'zod'

export const SimpegTambahDokumenSchema = zod.object({
  jenis_dokumen: zod.string().optional().nullable().nullish(),
  lampiran: zod.string().optional().nullable().nullish(),
})

export const SimpegTambahHukumanDisiplinSchema = zod.object({
  tingkat_hukuman: zod.string().optional().nullable().nullish(),
  jenis_hukuman: zod.string().optional().nullable().nullish(),
  no_sk: zod.string().optional().nullable().nullish(),
  tanggal_sk: zod.string().optional().nullable().nullish(),
  tmt_hukuman: zod.string().optional().nullable().nullish(),
  tanggal_berakhir: zod.string().optional().nullable().nullish(),
  lampiran: zod.string().optional().nullable().nullish(),
})

export const SimpegTambahTandajasaSchema = zod.object({
  nama_bintang: zod.string().optional().nullable().nullish(),
  tahun: zod.string().optional().nullable().nullish(),
  negara: zod.string().optional().nullable().nullish(),
  lampiran: zod.string().optional().nullable().nullish(),
})

export const SimpegTambahVaksinasiSchema = zod.object({
  dosis: zod.string().optional().nullable().nullish(),
  jenis_vaksi: zod.string().optional().nullable().nullish(),
  tanggal_vaksin: zod.string().optional().nullable().nullish(),
  id: zod.string().optional().nullable().nullish(),
  sertifikat_vaksin: zod.string().optional().nullable().nullish(),
  status: zod.string().optional().nullable().nullish(),
})
