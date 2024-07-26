import { api, Res } from '@/store/api'
import { DeleteType } from '@/types/website/menuType'
import {
  GetWebsiteLayananType,
  GetWebsiteProgramType,
} from '@/types/website/profil/programLayananType'

export const WebsiteProgramLayananEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getProgram: builder.query<Res<GetWebsiteProgramType[]>, void>({
      query: () => ({
        url: `admin/website/profil/program`,
        method: 'GET',
      }),
      providesTags: ['website-profil-program'],
    }),
    createProgram: builder.mutation<void, { body: GetWebsiteProgramType }>({
      query: ({ body }) => ({
        url: `admin/website/profil/program`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['website-profil-program'],
    }),
    deleteProgram: builder.mutation<void, DeleteType>({
      query: ({ id }) => ({
        url: `admin/website/profil/program/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['website-profil-program'],
    }),
    getLayanan: builder.query<Res<GetWebsiteLayananType[]>, void>({
      query: () => ({
        url: `admin/website/profil/layanan`,
        method: 'GET',
      }),
      providesTags: ['website-profil-layanan'],
    }),
    createLayanan: builder.mutation<void, { body: GetWebsiteLayananType }>({
      query: ({ body }) => ({
        url: `admin/website/profil/layanan`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['website-profil-layanan'],
    }),
    deleteLayanan: builder.mutation<void, DeleteType>({
      query: ({ id }) => ({
        url: `admin/website/profil/layanan/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['website-profil-layanan'],
    }),
  }),
})

export const {
  useGetLayananQuery,
  useGetProgramQuery,
  useCreateLayananMutation,
  useCreateProgramMutation,
  useDeleteLayananMutation,
  useDeleteProgramMutation,
} = WebsiteProgramLayananEndpoints
