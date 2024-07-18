import { Meta } from '@/store/api'

export type GetDaftarPegawaiType = {
  data: DaftarPegawai[]
  meta: Meta
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
