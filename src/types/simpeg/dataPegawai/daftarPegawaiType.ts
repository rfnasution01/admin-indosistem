import { Meta } from '@/store/api'

export type GetDaftarPegawaiType = {
  data: DaftarPegawai[]
  meta: Meta
}

export type GetDaftarPegawaDetailType = {
  id_pegawai: string
  nik: string // 16 karakter
  nip: string
  nama: string
  jk: 'Laki-laki' | 'Perempuan'
  email: string
  hp: string
  npwp: string
  id_golongan: string
  golongan: string
  jabatan: string
  jenis_kepegawaian: string
  photo: string
  status_pegawai: string
  nomor_urut: string
  latitude: string
  longitude: string
  tempat_lahir: string
  tgl_lahir: string // ISO date format (YYYY-MM-DD)
  validasi: '0' | '1'
  id_status_menikah: string
  status_menikah: string
  alamat: string
  id_propinsi: string
  propinsi: string
  id_kabupaten: string
  kabupaten: string
  id_kecamatan: string
  kecamatan: string
  id_kel: string
  kel: string
  kodepos: string
  tinggi_badan: string
  berat_badan: string
  id_agama: string
  agama: string
  id_suku: string
  suku: string
  id_rambut: string
  rambut: string
  id_bentuk_muka: string
  bentuk_muka: string
  id_warna_kulit: string
  warna_kulit: string
  id_goldarah: string
  goldarah: string
  id_asal_pegawai: string
  asal_pegawai: string
  id_jenis_ptk: string
  jenis_ptk: string
  nuptk: string
  id_kategori_pegawai: string
  kategori_pegawai: string
  karpeg: string
  tgl_mulai_kerja: string
  dok_sk: string
  cacat_tubuh: string
  ciri_khas: string
  hobi: string
}

export type DaftarPegawai = {
  id_pegawai: string
  nip: string
  nik: string
  nama: string
  jk: string
  jabatan: string
  hp: string
  golongan: string
}

export type GetDaftarPegawaiParams = {
  page_size: number
  page_number: number
  jenis_kepegawaian: string
  status_pegawai: string
  validasi: string
  tahun: string
  bulan: string
  search: string
}

export type PostResetPasswordBody = {
  id_pegawai: string
  password: string
}

export type PostTambahPegawaiBody = {
  id_pegawai?: string
  nip: string
  nama: string
  jk: string
  email: string
  hp: string
  npwp: string
  id_golongan: string
  jabatan: string
  jenis_kepegawaian: string
  status_pegawai: string
  tanggal_mulai_kerja: string
  nomor_urut: string
  tempat_lahir: string
  tgl_lahir: string
  latitude: string
  longitude: string
  nik: string
  status_menikah: string
  alamat: string
  prop: string
  kab: string
  kec: string
  kel: string
  kodepos: string
  tinggi_badan: string
  berat_badan: string
  agama: string
  rambut: string
  bentuk_muka: string
  warna_kulit: string
  ciri_khas: string
  cacat_tubuh: string
  gol_darah: string
  hobi: string
  suku: string
  asal_usul_kepegawaian: string
  kategori_kepegawaian: string
  id_jenisptk: string
  nuptk: string
  karpeg: string
  gambar: string
}
