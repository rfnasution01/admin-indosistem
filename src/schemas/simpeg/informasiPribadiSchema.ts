import zod from 'zod'

export const SimpegTambahIstriSchema = zod.object({
  nama: zod.string().optional().nullable().nullish(),
  tempat_lahir: zod.string().optional().nullable().nullish(),
  tanggal_lahir: zod.string().optional().nullable().nullish(),
  tanggal_nikah: zod.string().optional().nullable().nullish(),
  pekerjaan: zod.string().optional().nullable().nullish(),
  lampiran: zod.string().optional().nullable().nullish(),
})

export const SimpegTambahAnakSchema = zod.object({
  nama: zod.string().optional().nullable().nullish(),
  tempat_lahir: zod.string().optional().nullable().nullish(),
  tanggal_lahir: zod.string().optional().nullable().nullish(),
  pekerjaan: zod.string().optional().nullable().nullish(),
  lampiran: zod.string().optional().nullable().nullish(),
})

export const SimpegTambahOrangTuaSchema = zod.object({
  nama: zod.string().optional().nullable().nullish(),
  umur: zod.string().optional().nullable().nullish(),
  hubungan_keluarga: zod.string().optional().nullable().nullish(),
  keterangan: zod.string().optional().nullable().nullish(),
})

export const SimpegTambahSaudaraSchema = zod.object({
  nama: zod.string().optional().nullable().nullish(),
  jk: zod.string().optional().nullable().nullish(),
  umur: zod.string().optional().nullable().nullish(),
  pekerjaan: zod.string().optional().nullable().nullish(),
  keterangan: zod.string().optional().nullable().nullish(),
})

export const SimpegTambahRekeningBankSchema = zod.object({
  nama_bank: zod.string().optional().nullable().nullish(),
  nomor_rekening: zod.string().optional().nullable().nullish(),
  lampiran: zod.string().optional().nullable().nullish(),
})
