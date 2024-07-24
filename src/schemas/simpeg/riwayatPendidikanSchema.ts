import zod from 'zod'

export const SimpegTambahRiwayatPendidikanSchema = zod.object({
  tingkat: zod.string().optional().nullable().nullish(),
  nama_sekolah: zod.string().optional().nullable().nullish(),
  jurusan: zod.string().optional().nullable().nullish(),
  ijazah: zod.string().optional().nullable().nullish(),
  lampiran: zod.string().optional().nullable().nullish(),
})

export const SimpegTambahRiwayatPelatihanSchema = zod.object({
  nama_pelatihan: zod.string().optional().nullable().nullish(),
  tahun: zod.string().optional().nullable().nullish(),
  jam: zod.string().optional().nullable().nullish(),
  lampiran: zod.string().optional().nullable().nullish(),
})

export const SimpegTambahRiwayatSertifikasiSchema = zod.object({
  jenis_sertifikasi: zod.string().optional().nullable().nullish(),
  tahun: zod.string().optional().nullable().nullish(),
  no_sertifikasi: zod.string().optional().nullable().nullish(),
  tangal_sertifikasi: zod.string().optional().nullable().nullish(),
  judul_sertifikasi: zod.string().optional().nullable().nullish(),
  lampiran: zod.string().optional().nullable().nullish(),
})

export const SimpegTambahRiwayatKeahlianSchema = zod.object({
  jenis_keahlian: zod.string().optional().nullable().nullish(),
  nama_keahlian: zod.string().optional().nullable().nullish(),
  tahun: zod.string().optional().nullable().nullish(),
  instansi_pembuat: zod.string().optional().nullable().nullish(),
  no_sk: zod.string().optional().nullable().nullish(),
  keterangan: zod.string().optional().nullable().nullish(),
  lampiran: zod.string().optional().nullable().nullish(),
})
