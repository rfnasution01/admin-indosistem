import { Meta } from '@/store/api'

export type GetDownloadType = {
  data: DownloadType[]
  meta: Meta
}

export type DownloadType = {
  id: string
  judul: string
  jenis_file: string
  url_file: string
  hits?: string
  kategori?: string
  id_kategori: string
}
