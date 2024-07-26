import { api, Meta, Res } from '@/store/api'
import { DeleteType, ParamsType } from '@/types/website/menuType'
import { GetWebsiteTestimoniType } from '@/types/website/profil/testimoniType'

export const WebsiteTestimoniSekolahEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getTestimoni: builder.query<
      Res<{ data: GetWebsiteTestimoniType[]; meta: Meta }>,
      ParamsType
    >({
      query: ({ page_number, page_size, search }) => ({
        url: `admin/website/profil/testimonial`,
        method: 'GET',
        params: {
          page_number: page_number,
          page_size: page_size,
          search: search,
        },
      }),
      providesTags: ['website-profil-testimoni'],
    }),
    createTestimoni: builder.mutation<void, { body: GetWebsiteTestimoniType }>({
      query: ({ body }) => ({
        url: `admin/website/profil/testimonial`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['website-profil-testimoni'],
    }),
    deleteTestimoni: builder.mutation<void, DeleteType>({
      query: ({ id }) => ({
        url: `admin/website/profil/testimonial/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['website-profil-testimoni'],
    }),
  }),
})

export const {
  useGetTestimoniQuery,
  useCreateTestimoniMutation,
  useDeleteTestimoniMutation,
} = WebsiteTestimoniSekolahEndpoints
