import { api, Res } from '@/store/api'
import {
  GetHalamanType,
  HalamanType,
  PostHalamanBody,
} from '@/types/website/konten/halamanType'
import { DeleteType, ParamsType } from '@/types/website/menuType'

export const WebsiteHalamanKontenEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getHalaman: builder.query<Res<GetHalamanType>, ParamsType>({
      query: ({ search, page_number, page_size, id_jenis }) => ({
        url: `admin/website/konten/halaman`,
        method: 'GET',
        params: {
          search: search,
          page_number: page_number,
          page_size: page_size,
          id_jenis: id_jenis,
        },
      }),
      providesTags: ['website-konten-halaman'],
    }),
    getDetailHalaman: builder.query<Res<HalamanType>, ParamsType>({
      query: ({ id }) => ({
        url: `admin/website/konten_detail/halaman`,
        method: 'GET',
        params: {
          id: id,
        },
      }),
      providesTags: ['website-konten-halaman'],
    }),
    createHalaman: builder.mutation<void, { body: PostHalamanBody }>({
      query: ({ body }) => ({
        url: `admin/website/konten/halaman`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['website-konten-halaman'],
    }),
    deleteHalaman: builder.mutation<void, DeleteType>({
      query: ({ id }) => ({
        url: `admin/website/konten/halaman/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['website-konten-halaman'],
    }),
  }),
})

export const {
  useGetHalamanQuery,
  useCreateHalamanMutation,
  useDeleteHalamanMutation,
  useGetDetailHalamanQuery,
} = WebsiteHalamanKontenEndpoints
