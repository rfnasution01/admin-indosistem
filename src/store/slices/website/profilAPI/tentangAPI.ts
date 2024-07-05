import { api, Res } from '@/store/api'
import {
  GetTentangSekolahType,
  PostIdentitasSekolahParams,
  PostTentangProfilParams,
} from '@/types/website/profil/tentangSekolahType'

export const WebsiteTentangSekolahEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getTentangSekolah: builder.query<Res<GetTentangSekolahType>, void>({
      query: () => ({
        url: `admin/website/profil/tentang`,
        method: 'GET',
      }),
      providesTags: ['website-profil-tentang'],
    }),
    createTentangSekolah: builder.mutation<
      void,
      { body: PostTentangProfilParams }
    >({
      query: ({ body }) => ({
        url: `admin/website/profil/tentang`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['website-profil-tentang', 'website-profil-visimisi'],
    }),
    updateProfilSekolah: builder.mutation<
      void,
      { body: PostIdentitasSekolahParams }
    >({
      query: ({ body }) => ({
        url: `admin/website/profil/tentang`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['website-profil-tentang'],
    }),
    deleteTentangSekolah: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `admin/website/profil/tentang/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['website-profil-tentang'],
    }),
  }),
})

export const {
  useGetTentangSekolahQuery,
  useCreateTentangSekolahMutation,
  useDeleteTentangSekolahMutation,
  useUpdateProfilSekolahMutation,
} = WebsiteTentangSekolahEndpoints
