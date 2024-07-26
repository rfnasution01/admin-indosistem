export type GetWebsiteKategoriType = {
  id: string
  tanggal: string
  judul: string
  publish: string
  kategori: string
  hits: string
  jlh_photo: number
  id_kategori: string
  create_user: string
  gambar: KategoriGambarType[]
  isi: string
}

export type GetWebsiteKategoriDetailType = {
  id: string
  tanggal: string
  judul: string
  isi: string
  deskripsi_singkat: string
  publish: string
  kategori: string
  id_kategori: string
  tags: TagsType[]
  hits: string
  create_at: string
  mod_at: string
  create_user: string
  mod_user: string
}

export type TagsType = {
  id: string
  nama: string
}

export type KategoriGambarType = {
  id: string
  keterangan: string
  gambar: string
}

export type PostKategoriParams = {
  id: string
  id_kategori: string
  id_tags: string[]
  tanggal: string
  deskripsi_singkat?: string
  judul: string
  isi: string
  publish: string
  gambar: GambarType[]
}

export type GambarType = {
  url_gambar?: string
  keterangan?: string
}

export type PostGambarParams = {
  id_pengumuman?: string
  gambar: GambarType[]
}

export type UpdateGambarParams = {
  id_pengumuman: string
  id_gambar: string
  keterangan: string
  url_gambar: string
}

export type PostPublishParams = {
  id: string
  publish: string
}

export type GetWebsiteDashboardBerita = {
  jlh_berita: number
  berita_baru: number
  berita_dibaca: string
  jumlah_share: string
  kategori: KategoriType[]
  terbaru: NewsType[]
  populer: NewsType[]
}

export type KategoriType = {
  nama: string
  jlh: string
}

export type NewsType = {
  id: string
  seo: string
  judul: string
  tanggal: string
  hits: string
  nama: string
  gambar: {
    keterangan: string
    gambar: string
  }
}
