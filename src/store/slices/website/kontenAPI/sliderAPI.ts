import { api, Res } from '@/store/api'
import {
  GetSliderType,
  PostSliderBody,
  PostUbahStatusBody,
} from '@/types/website/konten/sliderType'
import { DeleteType, ParamsType } from '@/types/website/menuType'

export const WebsiteSliderKontenEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getSlider: builder.query<Res<GetSliderType>, ParamsType>({
      query: ({ search, page_number, page_size }) => ({
        url: `admin/website/konten/slider`,
        method: 'GET',
        params: {
          search: search,
          page_number: page_number,
          page_size: page_size,
        },
      }),
      providesTags: ['website-konten-slider'],
    }),
    createSlider: builder.mutation<void, { body: PostSliderBody }>({
      query: ({ body }) => ({
        url: `admin/website/konten/slider`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['website-konten-slider'],
    }),
    updateStatus: builder.mutation<void, { body: PostUbahStatusBody }>({
      query: ({ body }) => ({
        url: `admin/website/konten_status/slider`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['website-konten-slider'],
    }),
    deleteSlider: builder.mutation<void, DeleteType>({
      query: ({ id }) => ({
        url: `admin/website/konten/slider/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['website-konten-slider'],
    }),
  }),
})

export const {
  useGetSliderQuery,
  useCreateSliderMutation,
  useUpdateStatusMutation,
  useDeleteSliderMutation,
} = WebsiteSliderKontenEndpoints
