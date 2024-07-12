import { api, Res } from '@/store/api'
import { GetIdentitasType, GetPolicyType } from '@/types/website/pengaturanType'

export const WebsitePengaturanEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getPengaturanIdentitas: builder.query<Res<GetIdentitasType>, void>({
      query: () => ({
        url: `admin/website/pengaturan/identitas`,
        method: 'GET',
      }),

      providesTags: ['website-pengaturan-identitas'],
    }),
    updatePengaturanIdentitas: builder.mutation<
      void,
      { body: GetIdentitasType }
    >({
      query: ({ body }) => ({
        url: `admin/website/pengaturan/identitas`,
        method: 'POST',
        body: body,
      }),

      invalidatesTags: ['website-pengaturan-identitas'],
    }),
    getPengaturanPolicy: builder.query<Res<GetPolicyType>, void>({
      query: () => ({
        url: `admin/website/pengaturan/policy`,
        method: 'GET',
      }),
      providesTags: ['website-pengaturan-policy'],
    }),
    updatePengaturanPolicy: builder.mutation<void, { body: GetPolicyType }>({
      query: () => ({
        url: `admin/website/pengaturan/policy`,
        method: 'POST',
      }),
      invalidatesTags: ['website-pengaturan-policy'],
    }),
  }),
})

export const {
  useGetPengaturanIdentitasQuery,
  useGetPengaturanPolicyQuery,
  useUpdatePengaturanIdentitasMutation,
  useUpdatePengaturanPolicyMutation,
} = WebsitePengaturanEndpoints
