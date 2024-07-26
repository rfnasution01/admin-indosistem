import { api, Res } from '@/store/api'
import { WebsiteProfilSekolahType } from '@/types/website/profil/tentangSekolahType'

export const WebsiteVisiMisiSekolahEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getVisiMisi: builder.query<Res<WebsiteProfilSekolahType[]>, void>({
      query: () => ({
        url: `admin/website/profil/visimisi`,
        method: 'GET',
      }),
      providesTags: ['website-profil-visimisi'],
    }),
  }),
})

export const { useGetVisiMisiQuery } = WebsiteVisiMisiSekolahEndpoints
