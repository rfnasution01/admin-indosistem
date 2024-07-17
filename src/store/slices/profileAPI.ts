import { Res, api } from '../api'
import { GetProfileType, PostProfileBody } from '@/types/profileType'

export const ProfilEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getProfil: builder.query<Res<GetProfileType>, void>({
      query: () => ({
        url: `admin/profil`,
        method: 'GET',
      }),
      providesTags: ['profile'],
    }),
    updateProfile: builder.mutation<void, { data: PostProfileBody }>({
      query: ({ data }) => ({
        url: `admin/profil`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['profile'],
    }),
    updatePhoto: builder.mutation<{ url: string }, FormData>({
      query: (foto) => ({
        url: 'admin/profil_photo',
        method: 'POST',
        body: foto,
        formData: true,
      }),
      invalidatesTags: ['profile'],
    }),
  }),
})

export const {
  useGetProfilQuery,
  useUpdateProfileMutation,
  useUpdatePhotoMutation,
} = ProfilEndpoints
