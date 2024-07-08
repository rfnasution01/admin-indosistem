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
      query: ({ page_number, page_size, search, id_kategori }) => ({
        url: `admin/website/pengumuman`,
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
      Res<{ data: GetPengumumanDetailType; gambar: PengumumanGambarType }>,
      DeleteType
    >({
      query: ({ id }) => ({
        url: `admin/website/pengumuman_detail/${id}`,
        method: 'GET',
      }),
      providesTags: ['website-pengumuman-detail'],
    }),
    createPengumuman: builder.mutation<void, { body: PostPengumumanParams }>({
      query: ({ body }) => ({
        url: `admin/website/pengumuman_tambah`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['website-pengumuman'],
    }),
    updatePengumuman: builder.mutation<void, { body: UpdatePengumumanParams }>({
      query: ({ body }) => ({
        url: `admin/website/pengumuman_edit`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['website-pengumuman', 'website-pengumuman-detail'],
    }),
    createGambar: builder.mutation<void, { body: PostGambarParams }>({
      query: ({ body }) => ({
        url: `admin/website/pengumuman_tambah_gambar`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['website-pengumuman', 'website-gambar'],
    }),
    updateGambar: builder.mutation<void, { body: UpdateGambarParams }>({
      query: ({ body }) => ({
        url: `admin/website/pengumuman_edit_gambar`,
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
      query: ({ id }) => ({
        url: `admin/website/pengumuman_hapus_gambar/${id}`,
        method: 'POST',
      }),
      invalidatesTags: [
        'website-pengumuman',
        'website-pengumuman-detail',
        'website-gambar',
      ],
    }),
    updatePublish: builder.mutation<void, { body: PostPublishParams }>({
      query: ({ body }) => ({
        url: `admin/website/pengumuman_status`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['website-pengumuman', 'website-pengumuman-detail'],
    }),
    deletePengumuman: builder.mutation<void, DeleteType>({
      query: ({ id }) => ({
        url: `admin/website/pengumuman/${id}`,
        method: 'POST',
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
} = WebsitePengumumanEndpoints
