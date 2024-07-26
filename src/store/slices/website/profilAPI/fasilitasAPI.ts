import { api, Meta, Res } from '@/store/api'
import { DeleteType, ParamsType } from '@/types/website/menuType'
import { GetWebsiteFasilitasType } from '@/types/website/profil/fasilitasType'

export const WebsiteFasilitasSekolahEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getFasilitas: builder.query<
      Res<{ data: GetWebsiteFasilitasType[]; meta: Meta }>,
      ParamsType
    >({
      query: ({ page_number, page_size, search }) => ({
        url: `admin/website/profil/fasilitas`,
        method: 'GET',
        params: {
          page_number: page_number,
          page_size: page_size,
          search: search,
        },
      }),
      providesTags: ['website-profil-fasilitas'],
    }),
    createFasilitas: builder.mutation<void, { body: GetWebsiteFasilitasType }>({
      query: ({ body }) => ({
        url: `admin/website/profil/fasilitas`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['website-profil-fasilitas'],
    }),
    deleteFasilitas: builder.mutation<void, DeleteType>({
      query: ({ id }) => ({
        url: `admin/website/profil/fasilitas/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['website-profil-fasilitas'],
    }),
  }),
})

export const {
  useGetFasilitasQuery,
  useCreateFasilitasMutation,
  useDeleteFasilitasMutation,
} = WebsiteFasilitasSekolahEndpoints
