import { api, Res } from '@/store/api'
import {
  GetUserIdentitasType,
  GetUserLevelType,
} from '@/types/user/identitasType'
import { GetMenuWebsiteType } from '@/types/website/menuType'

export const RootUserEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getUserIdentitas: builder.query<Res<GetUserIdentitasType>, void>({
      query: () => ({
        url: `admin/user/identitas`,
        method: 'GET',
      }),
    }),
    getUserMenu: builder.query<Res<GetMenuWebsiteType[]>, void>({
      query: () => ({
        url: `admin/user/menu`,
        method: 'GET',
      }),
    }),
    getUserLevel: builder.query<Res<GetUserLevelType[]>, void>({
      query: () => ({
        url: `admin/user/level`,
        method: 'GET',
      }),
    }),
  }),
})

export const {
  useGetUserLevelQuery,
  useGetUserMenuQuery,
  useGetUserIdentitasQuery,
} = RootUserEndpoints
