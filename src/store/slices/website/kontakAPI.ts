import { api, Res } from '@/store/api'
import { ParamsType } from '@/types/website/menuType'
import {
  GetKontakMasukDetailType,
  GetKontakMasukType,
  GetKontakType,
} from '@/types/website/profil/kontakType'

export const WebsiteKontakEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getKontak: builder.query<Res<GetKontakType>, void>({
      query: () => ({
        url: `admin/website/kontak`,
        method: 'GET',
      }),
      providesTags: ['website-kontak'],
    }),
    getKontakMasuk: builder.query<Res<GetKontakMasukType>, ParamsType>({
      query: ({ page_number, page_size, search }) => ({
        url: `admin/website/kontak_pesan`,
        method: 'GET',
        params: {
          page_number: page_number,
          page_size: page_size,
          search: search,
        },
      }),
    }),
    getKontakMasukDetail: builder.query<
      Res<GetKontakMasukDetailType>,
      ParamsType
    >({
      query: ({ id }) => ({
        url: `admin/website/kontak_pesan_detail`,
        method: 'GET',
        params: {
          id: id,
        },
      }),
    }),
    createKontak: builder.mutation<void, { body: GetKontakType }>({
      query: ({ body }) => ({
        url: `admin/website/kontak`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['website-kontak'],
    }),
  }),
})

export const {
  useGetKontakMasukDetailQuery,
  useGetKontakMasukQuery,
  useGetKontakQuery,
  useCreateKontakMutation,
} = WebsiteKontakEndpoints
