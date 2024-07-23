import {
  GetAkreditasiType,
  GetDashboardSimpeg,
  ReferensiType,
} from '@/types/referensiType'
import { Res, api } from '../api'
import { ParamsType } from '@/types/website/menuType'

export const ReferensiEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getJenisProfil: builder.query<Res<string[]>, void>({
      query: () => ({
        url: `referensi/jenis_profil`,
        method: 'GET',
      }),
    }),
    getPenyelenggara: builder.query<Res<string[]>, void>({
      query: () => ({
        url: `referensi/penyelenggaraan`,
        method: 'GET',
      }),
    }),
    getAkreditasi: builder.query<Res<GetAkreditasiType[]>, void>({
      query: () => ({
        url: `referensi/akreditasi`,
        method: 'GET',
      }),
    }),
    getPengumumanKategori: builder.query<Res<ReferensiType[]>, void>({
      query: () => ({
        url: `referensi/kategori/pengumuman`,
        method: 'GET',
      }),
    }),
    getBerita: builder.query<Res<ReferensiType[]>, void>({
      query: () => ({
        url: `referensi/kategori/berita`,
        method: 'GET',
      }),
    }),
    getAgenda: builder.query<Res<ReferensiType[]>, void>({
      query: () => ({
        url: `referensi/kategori/agenda`,
        method: 'GET',
      }),
    }),
    getMading: builder.query<Res<ReferensiType[]>, void>({
      query: () => ({
        url: `referensi/kategori/mading`,
        method: 'GET',
      }),
    }),
    getPrestasi: builder.query<Res<ReferensiType[]>, void>({
      query: () => ({
        url: `referensi/kategori/prestasi`,
        method: 'GET',
      }),
    }),
    getTag: builder.query<Res<ReferensiType[]>, void>({
      query: () => ({
        url: `referensi/tags`,
        method: 'GET',
      }),
    }),
    getJenisHalaman: builder.query<Res<ReferensiType[]>, void>({
      query: () => ({
        url: `referensi/jenis_halaman`,
        method: 'GET',
      }),
    }),

    getJenisDownload: builder.query<Res<ReferensiType[]>, ParamsType>({
      query: ({ jenis }) => ({
        url: `referensi/kategori_${jenis}`,
        method: 'GET',
      }),
    }),
    getPosisiMenu: builder.query<Res<string[]>, void>({
      query: () => ({
        url: `referensi/posisi_menu`,
        method: 'GET',
      }),
    }),
    getJenisMenu: builder.query<Res<string[]>, void>({
      query: () => ({
        url: `referensi/jenis_menu`,
        method: 'GET',
      }),
    }),
    getRouteMenu: builder.query<Res<ReferensiType[]>, void>({
      query: () => ({
        url: `referensi/route_menu`,
        method: 'GET',
      }),
    }),
    getSimpegDashboard: builder.query<Res<GetDashboardSimpeg[]>, void>({
      query: () => ({
        url: `referensi/simpeg_dashboard`,
        method: 'GET',
      }),
    }),
    getListKonten: builder.query<Res<ReferensiType[]>, ParamsType>({
      query: ({ jenis }) => ({
        url: `${jenis}`,
        method: 'GET',
      }),
    }),
    getJenisKepegawaian: builder.query<Res<string[]>, void>({
      query: () => ({
        url: `referensi/jenis_kepegawaian`,
        method: 'GET',
      }),
    }),
    getStatusKepegawaian: builder.query<Res<string[]>, void>({
      query: () => ({
        url: `referensi/status_pegawai`,
        method: 'GET',
      }),
    }),
    getReferensiUmum: builder.query<Res<ReferensiType[]>, { jenis: string }>({
      query: ({ jenis }) => ({
        url: `referensi/${jenis}`,
        method: 'GET',
      }),
    }),
    getReferensiString: builder.query<Res<string[]>, { jenis: string }>({
      query: ({ jenis }) => ({
        url: `referensi/${jenis}`,
        method: 'GET',
      }),
    }),
    getProvinsi: builder.query<Res<ReferensiType[]>, void>({
      query: () => ({
        url: `referensi/propinsi`,
        method: 'GET',
      }),
    }),
    getKabupaten: builder.query<Res<ReferensiType[]>, { id_propinsi: string }>({
      query: ({ id_propinsi }) => ({
        url: `referensi/kabupaten`,
        method: 'GET',
        params: {
          id_propinsi: id_propinsi,
        },
      }),
    }),
    getKecamatan: builder.query<Res<ReferensiType[]>, { id_kabupaten: string }>(
      {
        query: ({ id_kabupaten }) => ({
          url: `referensi/kecamatan`,
          method: 'GET',
          params: {
            id_kabupaten: id_kabupaten,
          },
        }),
      },
    ),
    getKelurahan: builder.query<Res<ReferensiType[]>, { id_kecamatan: string }>(
      {
        query: ({ id_kecamatan }) => ({
          url: `referensi/kelurahan`,
          method: 'GET',
          params: {
            id_kecamatan: id_kecamatan,
          },
        }),
      },
    ),
    createFile: builder.mutation<{ url: string }, FormData>({
      query: (foto) => ({
        url: 'admin/upload',
        method: 'POST',
        body: foto,
        formData: true,
      }),
    }),
  }),
})

export const {
  useGetAkreditasiQuery,
  useGetJenisProfilQuery,
  useGetPenyelenggaraQuery,
  useGetJenisKepegawaianQuery,
  useGetStatusKepegawaianQuery,
  useCreateFileMutation,
  useGetAgendaQuery,
  useGetBeritaQuery,
  useGetMadingQuery,
  useGetPengumumanKategoriQuery,
  useGetPrestasiQuery,
  useGetTagQuery,
  useGetJenisHalamanQuery,
  useGetJenisDownloadQuery,
  useGetPosisiMenuQuery,
  useGetJenisMenuQuery,
  useGetRouteMenuQuery,
  useGetListKontenQuery,
  useGetSimpegDashboardQuery,
  useGetReferensiUmumQuery,
  useGetReferensiStringQuery,
  useGetKabupatenQuery,
  useGetKecamatanQuery,
  useGetKelurahanQuery,
  useGetProvinsiQuery,
} = ReferensiEndpoints
