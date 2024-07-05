import {
  GetLoginType,
  LoginParamsType,
  LoginResponseType,
} from '@/types/loginType'
import { Res, api } from '../api'

export const LoginEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getLogin: builder.query<Res<GetLoginType>, void>({
      query: () => ({
        url: `auth/login`,
        method: 'GET',
      }),
    }),
    postLogin: builder.mutation<
      Res<LoginResponseType>,
      { data: LoginParamsType }
    >({
      query: ({ data }) => ({
        url: `auth/login`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['website-profil-tentang', 'website-profil-visimisi'],
    }),
  }),
})

export const { useGetLoginQuery, usePostLoginMutation } = LoginEndpoints
