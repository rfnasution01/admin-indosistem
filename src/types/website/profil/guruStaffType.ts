export type GetGuruStaffType = {
  id_pegawai: string
  gambar: string
  nama: string
  pendidikan_terakhir: string
  hp: string
  email: string
  alamat: string
  status: string
}

export type GuruStaffParamsType = {
  page_size: number
  page_number: number
  search: string
}
