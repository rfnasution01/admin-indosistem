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
}

export type PostMenuBody = {
  id: string
  judul: string
  jenis_file: string
  url_file: string
  id_kategori: string
}
