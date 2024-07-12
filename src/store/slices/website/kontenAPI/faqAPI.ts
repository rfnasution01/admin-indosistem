import { api, Res } from '@/store/api'
import { FAQType, GetFAQType } from '@/types/website/konten/faqType'
import { DeleteType, ParamsType } from '@/types/website/menuType'

export const WebsiteFAQKontenEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getFAQ: builder.query<Res<GetFAQType>, ParamsType>({
      query: ({ search, page_number, page_size, id_kategori }) => ({
        url: `admin/website/konten/faq`,
        method: 'GET',
        params: {
          search: search,
          page_number: page_number,
          page_size: page_size,
          id_kategori: id_kategori,
        },
      }),
      providesTags: ['website-konten-faq'],
    }),
    getDetailFAQ: builder.query<Res<FAQType>, ParamsType>({
      query: ({ id }) => ({
        url: `admin/website/konten_detail/faq`,
        method: 'GET',
        params: {
          id: id,
        },
      }),
      providesTags: ['website-konten-faq'],
    }),
    createFAQ: builder.mutation<void, { body: FAQType }>({
      query: ({ body }) => ({
        url: `admin/website/konten/faq`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['website-konten-faq'],
    }),
    deleteFAQ: builder.mutation<void, DeleteType>({
      query: ({ id }) => ({
        url: `admin/website/konten/faq/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['website-konten-faq'],
    }),
  }),
})

export const {
  useGetFAQQuery,
  useCreateFAQMutation,
  useDeleteFAQMutation,
  useGetDetailFAQQuery,
} = WebsiteFAQKontenEndpoints
