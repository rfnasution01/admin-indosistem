export type GetWebsiteTentangSekolahType = {
  identitas: IdentitasSekolahType
  profil: ProfilSekolahType[]
}

export type IdentitasSekolahType = {
  kode: string
  nama: string
  sk_pendirian: string
  tgl_sk_pendirian: string
  sk_operasional: string
  tgl_sk_operasional: string
  akreditasi: string
  id_akreditasi: string
  tgl_mulai_akreditasi: string
  tgl_akhir_akreditasi: string
  penyelenggaraan: string
  penyelenggaraan_mulai: string
  penyelenggaraan_akhir: string
  nis: string
  nss: string
  alamat: string
  email: string
  telepon: string
  nama_pimpinan: string
  nip_pimpinan: string
  photo_pimpinan: string
}

export type ProfilSekolahType = {
  id: string
  jenis: string
  keterangan: string
  sub_keterangan: string
  gambar_url: string
  list: ListProfilSekolahType[]
}

export type ListProfilSekolahType = {
  id: string
  keterangan: string
  urutan: string
}

export type PostTentangProfilParams = {
  id?: string
  jenis?: string
  keterangan?: string
  sub_keterangan?: string
  gambar_url?: string
  list: ListProfilSekolahParams[]
}

export type ListProfilSekolahParams = {
  keterangan?: string
  urutan?: string
}

export type PostIdentitasSekolahParams = {
  jenis: string
  sk_pendirian: string
  tgl_sk_pendirian: string
  sk_operasional: string
  tgl_sk_operasional: string
  id_akreditasi: string
  tgl_mulai_akreditasi: string
  tgl_akhir_akreditasi: string
  penyelenggaraan: string
  nis: string
  nss: string
  alamat: string
  email: string
  telepon: string
  nama_pimpinan: string
  nip_pimpinan: string
  photo_pimpinan: string
  penyelenggaraan_mulai: string
  penyelenggaraan_akhir: string
}
