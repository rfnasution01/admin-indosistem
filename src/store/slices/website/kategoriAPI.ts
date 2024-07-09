import { api, Meta, Res } from '@/store/api'
import {
  GetKategoriDetailType,
  GetKategoriType,
  KategoriGambarType,
  PostGambarParams,
  PostKategoriParams,
  PostPublishParams,
  UpdateGambarParams,
  UpdateKategoriParams,
} from '@/types/website/kategoriType'
import { DeleteType, ParamsType } from '@/types/website/menuType'

export const WebsiteKategoriEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getKategori: builder.query<
      Res<{ data: GetKategoriType[]; meta: Meta }>,
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
      providesTags: ['website-kategori'],
    }),
    getKategoriDetail: builder.query<
      Res<{ data: GetKategoriDetailType; gambar: KategoriGambarType[] }>,
      DeleteType
    >({
      query: ({ id, jenis }) => ({
        url: `admin/website/${jenis}_detail`,
        method: 'GET',
        params: {
          id: id,
        },
      }),
      providesTags: ['website-kategori-detail'],
    }),
    createKategori: builder.mutation<
      void,
      { body: PostKategoriParams; jenis: string }
    >({
      query: ({ body, jenis }) => ({
        url: `admin/website/${jenis}_tambah`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['website-kategori'],
    }),
    updateKategori: builder.mutation<
      void,
      { body: UpdateKategoriParams; jenis: string }
    >({
      query: ({ body, jenis }) => ({
        url: `admin/website/${jenis}_edit`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['website-kategori', 'website-kategori-detail'],
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
        'website-kategori',
        'website-gambar',
        'website-kategori-detail',
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
        'website-kategori',
        'website-kategori-detail',
        'website-gambar',
      ],
    }),
    deleteGambar: builder.mutation<void, DeleteType>({
      query: ({ id, jenis }) => ({
        url: `admin/website/${jenis}_hapus_gambar/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [
        'website-kategori',
        'website-kategori-detail',
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
      invalidatesTags: ['website-kategori', 'website-kategori-detail'],
    }),
    deleteKategori: builder.mutation<void, DeleteType>({
      query: ({ id, jenis }) => ({
        url: `admin/website/${jenis}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['website-kategori', 'website-kategori-detail'],
    }),
  }),
})

export const {
  useGetKategoriQuery,
  useGetKategoriDetailQuery,
  useCreateKategoriMutation,
  useUpdateKategoriMutation,
  useCreateGambarMutation,
  useUpdateGambarMutation,
  useDeleteGambarMutation,
  useDeleteKategoriMutation,
  useUpdatePublishMutation,
} = WebsiteKategoriEndpoints
