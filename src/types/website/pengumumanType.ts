export type GetPengumumanType = {
  id: string
  tanggal: string
  judul: string
  publish: string
  kategori: string
  hits: string
  jlh_photo: number
  id_kategori: string
}

export type GetPengumumanDetailType = {
  id: string
  tanggal: string
  judul: string
  isi: string
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

export type PengumumanGambarType = {
  id: string
  keterangan: string
  gambar: string
}

export type PostPengumumanParams = {
  id_kategori: string
  id_tags: string[]
  tanggal: string
  judul: string
  isi: string
  publish: string
  gambar: GambarType[]
}

export type GambarType = {
  url_gambar: string
  keterangan: string
}

export type UpdatePengumumanParams = {
  id: string
  id_kategori: string
  id_tags: string[]
  tanggal: string
  judul: string
  isi: string
  publish: string
}

export type PostGambarParams = {
  id_pengumuman: string
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
