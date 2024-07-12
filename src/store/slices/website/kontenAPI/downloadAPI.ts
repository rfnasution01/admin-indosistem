import { api, Res } from '@/store/api'
import {
  DownloadType,
  GetDownloadType,
} from '@/types/website/konten/downloadType'
import { DeleteType, ParamsType } from '@/types/website/menuType'

export const WebsiteDownloadKontenEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getDownload: builder.query<Res<GetDownloadType>, ParamsType>({
      query: ({ search, page_number, page_size, id_kategori }) => ({
        url: `admin/website/konten/download`,
        method: 'GET',
        params: {
          search: search,
          page_number: page_number,
          page_size: page_size,
          id_kategori: id_kategori,
        },
      }),
      providesTags: ['website-konten-download'],
    }),
    getDetailDownload: builder.query<Res<DownloadType>, ParamsType>({
      query: ({ id }) => ({
        url: `admin/website/konten_detail/download`,
        method: 'GET',
        params: {
          id: id,
        },
      }),
      providesTags: ['website-konten-download'],
    }),
    createDownload: builder.mutation<void, { body: DownloadType }>({
      query: ({ body }) => ({
        url: `admin/website/konten/download`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['website-konten-download'],
    }),
    deleteDownload: builder.mutation<void, DeleteType>({
      query: ({ id }) => ({
        url: `admin/website/konten/download/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['website-konten-download'],
    }),
  }),
})

export const {
  useGetDownloadQuery,
  useCreateDownloadMutation,
  useDeleteDownloadMutation,
  useGetDetailDownloadQuery,
} = WebsiteDownloadKontenEndpoints
