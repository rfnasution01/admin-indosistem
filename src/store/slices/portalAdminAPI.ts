import { GetAplikasiType, GetIdentiasAdminType } from '@/types/portalAdminType'
import { Res, api } from '../api'

export const RootEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getAdminIdentitas: builder.query<Res<GetIdentiasAdminType>, void>({
      query: () => ({
        url: `admin/identitas`,
        method: 'GET',
      }),
    }),
    getAplikasi: builder.query<Res<GetAplikasiType[]>, void>({
      query: () => ({
        url: `admin/aplikasi`,
        method: 'GET',
      }),
    }),
  }),
})

export const { useGetAdminIdentitasQuery, useGetAplikasiQuery } = RootEndpoints
