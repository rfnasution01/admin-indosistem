import { api, Meta, Res } from '@/store/api'
import { DeleteType, ParamsType } from '@/types/website/menuType'
import {
  GetPengumumanDetailType,
  GetPengumumanType,
  PengumumanGambarType,
  PostGambarParams,
  PostPengumumanParams,
  PostPublishParams,
  UpdateGambarParams,
  UpdatePengumumanParams,
} from '@/types/website/pengumumanType'

export const WebsitePengumumanEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getPengumuman: builder.query<
      Res<{ data: GetPengumumanType[]; meta: Meta }>,
      ParamsType
    >({
      query: ({ page_number, page_size, search, id_kategori, jenis }) => ({
        url: `admin/website/${jenis}`,
        method: 'GET',
        params: {
          page_number: page_number,
          page_size: page_size,
          search: search,
          id_kategori: id_kategori,
        },
      }),
      providesTags: ['website-pengumuman'],
    }),
    getPengumumanDetail: builder.query<
      Res<{ data: GetPengumumanDetailType; gambar: PengumumanGambarType[] }>,
      DeleteType
    >({
      query: ({ id, jenis }) => ({
        url: `admin/website/${jenis}_detail`,
        method: 'GET',
        params: {
          id: id,
        },
      }),
      providesTags: ['website-pengumuman-detail'],
    }),
    createPengumuman: builder.mutation<
      void,
      { body: PostPengumumanParams; jenis: string }
    >({
      query: ({ body, jenis }) => ({
        url: `admin/website/${jenis}_tambah`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['website-pengumuman'],
    }),
    updatePengumuman: builder.mutation<
      void,
      { body: UpdatePengumumanParams; jenis: string }
    >({
      query: ({ body, jenis }) => ({
        url: `admin/website/${jenis}_edit`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['website-pengumuman', 'website-pengumuman-detail'],
    }),
    createGambar: builder.mutation<
      void,
      { body: PostGambarParams; jenis: string }
    >({
      query: ({ body, jenis }) => ({
        url: `admin/website/${jenis}_tambah_gambar`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: [
        'website-pengumuman',
        'website-gambar',
        'website-pengumuman-detail',
      ],
    }),
    updateGambar: builder.mutation<
      void,
      { body: UpdateGambarParams; jenis: string }
    >({
      query: ({ body, jenis }) => ({
        url: `admin/website/${jenis}_edit_gambar`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: [
        'website-pengumuman',
        'website-pengumuman-detail',
        'website-gambar',
      ],
    }),
    deleteGambar: builder.mutation<void, DeleteType>({
      query: ({ id, jenis }) => ({
        url: `admin/website/${jenis}_hapus_gambar/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [
        'website-pengumuman',
        'website-pengumuman-detail',
        'website-gambar',
      ],
    }),
    updatePublish: builder.mutation<
      void,
      { body: PostPublishParams; jenis: string }
    >({
      query: ({ body, jenis }) => ({
        url: `admin/website/${jenis}_status`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['website-pengumuman', 'website-pengumuman-detail'],
    }),
    deletePengumuman: builder.mutation<void, DeleteType>({
      query: ({ id, jenis }) => ({
        url: `admin/website/${jenis}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['website-pengumuman', 'website-pengumuman-detail'],
    }),
  }),
})

export const {
  useGetPengumumanQuery,
  useGetPengumumanDetailQuery,
  useCreatePengumumanMutation,
  useUpdatePengumumanMutation,
  useCreateGambarMutation,
  useUpdateGambarMutation,
  useDeleteGambarMutation,
  useDeletePengumumanMutation,
  useUpdatePublishMutation,
} = WebsitePengumumanEndpoints
