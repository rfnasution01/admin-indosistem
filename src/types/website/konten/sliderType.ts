import { Meta } from '@/store/api'

export type GetSliderType = {
  data: SliderType[]
  meta: Meta
}

export type SliderType = {
  id: string
  judul: string
  gambar: string
  url: string
  aktif: number
  urutan: number
  create_at: string
  create_user: string
}

export type PostSliderBody = {
  id?: string
  judul: string
  gambar: string
  url: string
  aktif: number
  urutan: number
}

export type PostUbahStatusBody = {
  id: string
  aktif: number
}
