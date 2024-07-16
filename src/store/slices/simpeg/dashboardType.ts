import { api, Res } from '@/store/api'
import { GetDashboardType } from '@/types/simpeg/dashboardType'

export const SimpegDashboardEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getSimpegDashborad: builder.query<Res<GetDashboardType>, { jenis: string }>(
      {
        query: ({ jenis }) => ({
          url: `admin/simpeg/dashboard/${jenis}`,
          method: 'GET',
        }),
      },
    ),
  }),
})

export const { useGetSimpegDashboradQuery } = SimpegDashboardEndpoints
