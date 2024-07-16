import { api, Res } from '@/store/api'
import {
  GetIdentitasWebsiteType,
  GetMenuWebsiteType,
} from '@/types/website/menuType'

export const RootSimpegEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getSimpegIdentitas: builder.query<Res<GetIdentitasWebsiteType>, void>({
      query: () => ({
        url: `admin/simpeg/identitas`,
        method: 'GET',
      }),
    }),
    getSimpegMenu: builder.query<Res<GetMenuWebsiteType[]>, void>({
      query: () => ({
        url: `admin/simpeg/menu`,
        method: 'GET',
      }),
    }),
  }),
})

export const { useGetSimpegIdentitasQuery, useGetSimpegMenuQuery } =
  RootSimpegEndpoints
