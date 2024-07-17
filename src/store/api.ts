import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Cookies from 'js-cookie'

export type Meta = {
  page?: number
  limit?: number
  count?: number
  total?: number
  last_page?: number
}

export type Res<T, M = undefined> = {
  status: boolean
  message: string
  data: T
  related: T
  meta: Meta
  mapped?: M
}

const baseURL = import.meta.env.VITE_BASE_URL

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers) => {
      const token = Cookies.get('token')
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }

      return headers
    },
  }),
  tagTypes: [
    'website-profil-tentang',
    'website-profil-visimisi',
    'website-profil-fasilitas',
    'website-profil-testimoni',
    'website-profil-program',
    'website-profil-layanan',
    'website-kategori',
    'website-kategori-detail',
    'website-gambar',
    'website-album',
    'website-album-detail',
    'website-album-gambar',
    'website-kontak',
    'website-pesan',
    'website-konten-slider',
    'website-konten-halaman',
    'website-konten-faq',
    'website-konten-menu',
    'website-konten-download',
    'website-pengaturan-identitas',
    'website-pengaturan-policy',
    'profile',
  ],
  // * it's okay to disable eslint here, because the warning is unnecessary. Each endpoint will be injected from an api slice.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  endpoints: (_builder) => ({}),
})
