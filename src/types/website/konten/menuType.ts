export type GetMenuType = {
  id: string
  nama_menu: string
  jenis_menu: string
  slug: string
  id_konten: string
  deskripsi_singkat: string
  url_gambar: string
  id_parent: string
  aktif: string
  urutan: string
  children: GetMenuType[]
}

export type PostMenuBody = {
  id: string
  nama_menu: string
  posisi: string
  jenis_menu: string
  id_konten: string
  deskripsi_singkat: string
  url_gambar: string
  id_parent: string
  urutan: string
}

export type UpdateStatusBody = {
  id: string
  aktif: number
}
