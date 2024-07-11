import { Meta } from '@/store/api'

export type GetKontakType = {
  alamat: string
  telepon: string
  kota: string
  wa: string
  fb: string
  tw: string
  ig: string
  yt: string
  telegram: string
  weekday_cs: string
  weekend_cs: string
  tiktok: string
  email: string
  latitude: string
  longitude: string
}

export type GetKontakMasukType = {
  data: KontakMasuk[]
  meta: Meta
}

export type KontakMasuk = {
  id: string
  kode_tiket: string
  nama_depan: string
  nama_belakang: string
  email: string
  hp: string
  pesan: string
  status: number
  create_at: string
}

export type GetKontakMasukDetailType = {
  data: KontakMasukDetail
  chat: ChatType[]
}

export type KontakMasukDetail = {
  id: string
  kode_tiket: string
  nama_depan: string
  nama_belakang: string
  email: string
  hp: string
  pesan: string
  status: number
  create_at: string
  process_at: string
  process_user: string
  close_at: string
  close_user: string
  lampiran: LampiranType[]
  belum_baca: number
}

export type LampiranType = {
  dokumen?: string
}

export type ChatType = {
  jenis: string
  isi: string
  user: string
  baca: number
  create_at: string
  lampiran: LampiranType[]
}

export type PostPesanBody = {
  isi: string
  lampiran: string[]
}

export type ClosePesanBody = {
  id: string
}
