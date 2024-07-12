import { Meta } from '@/store/api'

export type GetHalamanType = {
  data: HalamanType[]
  meta: Meta
}

export type HalamanType = {
  id: string
  judul: string
  isi: string
  url_gambar: string
  hits: string
  jenis: string
  id_jenis: string
}

export type PostHalamanBody = {
  id: string
  judul: string
  isi: string
  url_gambar: string
  id_jenis: string
}
