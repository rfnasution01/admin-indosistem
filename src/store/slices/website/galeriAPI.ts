import { api, Meta, Res } from '@/store/api'
import {
  GetAlbumType,
  PostAlbumBody,
  PostGambarType,
  UpdateGambarType,
} from '@/types/website/galeriType'
import { DeleteType, ParamsType } from '@/types/website/menuType'

export const WebsiteAlbumEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getAlbum: builder.query<
      Res<{ data: GetAlbumType[]; meta: Meta }>,
      ParamsType
    >({
      query: ({ page_number, page_size, search }) => ({
        url: `admin/website/galeri`,
        method: 'GET',
        params: {
          page_number: page_number,
          page_size: page_size,
          search: search,
        },
      }),
      providesTags: ['website-album'],
    }),
    getAlbumDetail: builder.query<
      Res<{ data: GetAlbumType; photo: GetAlbumType[]; meta: Meta }>,
      ParamsType
    >({
      query: ({ id, page_number, page_size, search }) => ({
        url: `admin/website/galeri_detail`,
        method: 'GET',
        params: {
          id: id,
          page_number: page_number,
          page_size: page_size,
          search: search,
        },
      }),
      providesTags: ['website-album-detail'],
    }),
    createAlbum: builder.mutation<void, { body: PostAlbumBody; aksi: string }>({
      query: ({ body, aksi }) => ({
        url: `admin/website/galeri_${aksi}`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['website-album', 'website-album-detail'],
    }),

    createGambar: builder.mutation<void, { body: PostGambarType }>({
      query: ({ body }) => ({
        url: `admin/website/galeri_tambah_gambar`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: [
        'website-album',
        'website-album-gambar',
        'website-album-detail',
      ],
    }),
    updateGambar: builder.mutation<void, { body: UpdateGambarType }>({
      query: ({ body }) => ({
        url: `admin/website/galeri_edit_gambar`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: [
        'website-album',
        'website-album-detail',
        'website-album-gambar',
      ],
    }),
    deleteGambar: builder.mutation<void, DeleteType>({
      query: ({ id }) => ({
        url: `admin/website/galeri_hapus_gambar/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [
        'website-album',
        'website-album-detail',
        'website-album-gambar',
      ],
    }),
    deleteAlbum: builder.mutation<void, DeleteType>({
      query: ({ id }) => ({
        url: `admin/website/galeri/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['website-album', 'website-album-detail'],
    }),
  }),
})

export const {
  useGetAlbumQuery,
  useGetAlbumDetailQuery,
  useCreateAlbumMutation,
  useCreateGambarMutation,
  useUpdateGambarMutation,
  useDeleteGambarMutation,
  useDeleteAlbumMutation,
} = WebsiteAlbumEndpoints
