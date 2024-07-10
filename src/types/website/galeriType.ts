export type GetAlbumType = {
  id: string
  judul: string
  url_gambar: string
  create_at: string
  create_user: string
  jumlah_photo: number
}

export type PostAlbumBody = {
  id?: string
  judul: string
  url_gambar?: string
  photo?: PostAlbumPhotoType[]
}

export type PostAlbumPhotoType = {
  url_gambar?: string
  judul?: string
}

export type PostGambarType = {
  id_galeri: string
  gambar: {
    url_gambar: string
    keterangan: string
  }[]
}

export type UpdateGambarType = {
  judul: string
  url_gambar: string
  photo: PostAlbumPhotoType[]
}
