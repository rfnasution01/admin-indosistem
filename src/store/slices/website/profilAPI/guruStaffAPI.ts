import { api, Meta, Res } from '@/store/api'
import { ParamsType } from '@/types/website/menuType'
import { GetWebsiteGuruStaffType } from '@/types/website/profil/guruStaffType'

export const WebsiteGuruStaffSekolahEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getGuruStaff: builder.query<
      Res<{ data: GetWebsiteGuruStaffType[]; meta: Meta }>,
      ParamsType
    >({
      query: ({ page_number, page_size, search }) => ({
        url: `admin/website/profil/guru`,
        method: 'GET',
        params: {
          page_number: page_number,
          page_size: page_size,
          search: search,
        },
      }),
    }),
  }),
})

export const { useGetGuruStaffQuery } = WebsiteGuruStaffSekolahEndpoints
