import { IconName } from '@fortawesome/fontawesome-svg-core'

export type GetIdentitasWebsiteType = {
  nama_aplikasi: string
  folder: string
  gambar: string
  urutan: string
  deskripsi: string
  logo: string
  favicon: string
  footer: string
}

export type GetMenuWebsiteType = {
  id: string
  nama_menu: string
  icon: IconName
  link: string
  id_parent: string
  urutan: string
  baca: string
  tulis: string
  ubah: string
  hapus: string
  children: GetMenuWebsiteType[]
}

export type ParamsType = {
  search?: string
  page_number?: number
  page_size?: number
  id_kategori?: string
  jenis?: string
  status?: string
}

export type DeleteType = {
  id: string
  jenis?: string
}
