import { api, Res } from '@/store/api'
import { GetMenuType, PostMenuBody } from '@/types/website/konten/menuType'
import { PostUbahStatusBody } from '@/types/website/konten/sliderType'
import { DeleteType } from '@/types/website/menuType'

export const WebsiteMenuKontenEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getMenuKonten: builder.query<Res<GetMenuType[]>, { posisi: string }>({
      query: ({ posisi }) => ({
        url: `admin/website/konten/menu`,
        method: 'GET',
        params: {
          posisi: posisi,
        },
      }),
      providesTags: ['website-konten-menu'],
    }),
    getMenuDetailKonten: builder.query<Res<GetMenuType>, { id: string }>({
      query: ({ id }) => ({
        url: `admin/website/konten_detail/menu`,
        method: 'GET',
        params: {
          id: id,
        },
      }),
      providesTags: ['website-konten-menu'],
    }),
    createMenuKonten: builder.mutation<void, { body: PostMenuBody }>({
      query: ({ body }) => ({
        url: `admin/website/konten/menu`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['website-konten-menu'],
    }),
    createStatusKonten: builder.mutation<void, { body: PostUbahStatusBody }>({
      query: ({ body }) => ({
        url: `admin/website/konten_status/menu`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['website-konten-menu'],
    }),
    DeleteMenuKonten: builder.mutation<void, DeleteType>({
      query: ({ id }) => ({
        url: `admin/website/konten/menu/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['website-konten-menu'],
    }),
  }),
})

export const {
  useGetMenuDetailKontenQuery,
  useGetMenuKontenQuery,
  useCreateMenuKontenMutation,
  useCreateStatusKontenMutation,
  useDeleteMenuKontenMutation,
} = WebsiteMenuKontenEndpoints
