import { api, Res } from '@/store/api'
import { ProfilSekolahType } from '@/types/website/profil/tentangSekolahType'

export const WebsiteVisiMisiSekolahEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getVisiMisi: builder.query<Res<ProfilSekolahType[]>, void>({
      query: () => ({
        url: `admin/website/profil/visimisi`,
        method: 'GET',
      }),
      providesTags: ['website-profil-visimisi'],
    }),
  }),
})

export const { useGetVisiMisiQuery } = WebsiteVisiMisiSekolahEndpoints
