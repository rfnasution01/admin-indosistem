import { Meta } from '@/store/api'

export type GetFAQType = {
  data: FAQType[]
  meta: Meta
}

export type FAQType = {
  id: string
  pertanyaan: string
  jawaban: string
  urutan: string
  kategori?: string
  id_kategori: string
}
