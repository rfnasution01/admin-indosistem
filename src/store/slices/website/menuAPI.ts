import { api, Res } from '@/store/api'
import {
  GetIdentitasWebsiteType,
  GetMenuWebsiteType,
} from '@/types/website/menuType'

export const RootWebsiteEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getWebsiteIdentitas: builder.query<Res<GetIdentitasWebsiteType>, void>({
      query: () => ({
        url: `admin/website/identitas`,
        method: 'GET',
      }),
    }),
    getMenuWebsite: builder.query<Res<GetMenuWebsiteType[]>, void>({
      query: () => ({
        url: `admin/website/menu`,
        method: 'GET',
      }),
    }),
  }),
})

export const { useGetMenuWebsiteQuery, useGetWebsiteIdentitasQuery } =
  RootWebsiteEndpoints
