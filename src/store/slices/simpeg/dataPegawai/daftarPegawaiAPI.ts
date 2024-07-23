import { api, Res } from '@/store/api'
import {
  GetDaftarPegawaiParams,
  GetDaftarPegawaiType,
  PostResetPasswordBody,
  PostTambahPegawaiBody,
} from '@/types/simpeg/dataPegawai/daftarPegawaiType'

export const SimpegDaftarPegawaiEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getDaftarPegawai: builder.query<
      Res<GetDaftarPegawaiType>,
      GetDaftarPegawaiParams
    >({
      query: ({
        page_number,
        page_size,
        jenis_kepegawaian,
        status_pegawai,
        validasi,
        tahun,
        bulan,
        search,
      }) => ({
        url: `admin/simpeg/pegawai/data`,
        method: 'GET',
        params: {
          jenis_kepegawaian: jenis_kepegawaian,
          status_pegawai: status_pegawai,
          validasi: validasi,
          bulan: bulan,
          tahun: tahun,
          page_number: page_number,
          page_size: page_size,
          search: search,
        },
      }),
      providesTags: ['simpeg-daftar-pegawai'],
    }),
    deleteDaftarPegawai: builder.mutation<void, { id_pegawai: string }>({
      query: ({ id_pegawai }) => ({
        url: `admin/simpeg/pegawai/${id_pegawai}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['simpeg-daftar-pegawai'],
    }),
    resetPassword: builder.mutation<void, { body: PostResetPasswordBody }>({
      query: ({ body }) => ({
        url: `admin/simpeg/pegawai/password`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['simpeg-daftar-pegawai'],
    }),
    tambahDataPegawai: builder.mutation<void, { body: PostTambahPegawaiBody }>({
      query: ({ body }) => ({
        url: `admin/simpeg/pegawai/data`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['simpeg-daftar-pegawai'],
    }),
  }),
})

export const {
  useGetDaftarPegawaiQuery,
  useDeleteDaftarPegawaiMutation,
  useResetPasswordMutation,
  useTambahDataPegawaiMutation,
} = SimpegDaftarPegawaiEndpoints
