import { Column } from '@/components/Table'
import { GetGuruStaffType } from '@/types/website/profil/guruStaffType'
import clsx from 'clsx'
import DefaultImg from '@/assets/images/default.jpg'
import { GetFasilitasType } from '@/types/website/profil/fasilitasType'
import { GetTestimoniType } from '@/types/website/profil/testimoniType'
import { GetKategoriType } from '@/types/website/kategoriType'
import { KontakMasuk } from '@/types/website/profil/kontakType'
import dayjs from 'dayjs'
import { capitalizeFirstLetterFromLowercase } from '@/utils/formatText'

export const columnsListDataGuru: Column<GetGuruStaffType>[] = [
  {
    header: 'Nama',
    key: 'nama',
    width: '!min-w-[12rem]',
    renderCell: (rowData) => {
      return (
        <div className="flex gap-32">
          <img
            src={rowData?.gambar ?? DefaultImg}
            alt={rowData?.nama}
            loading="lazy"
            className="w-[7rem] phones:hidden"
          />
          <div className="flex flex-col gap-8">
            {rowData?.nama && <p className="font-roboto">{rowData?.nama}</p>}
            {rowData?.alamat && (
              <p className="phones:hidden">{rowData?.alamat}</p>
            )}
            {rowData?.email && (
              <p className="italic phones:hidden">{rowData?.email}</p>
            )}
          </div>
        </div>
      )
    },
  },
  {
    header: 'Riwayat Pendidikan',
    key: 'pendidikan_terakhir',
    width: '!min-w-[12rem]',
  },
  { header: 'Kontak', key: 'hp', width: '!min-w-[12rem]' },
  {
    header: 'Status',
    key: 'status',
    width: '!min-w-[12rem]',
    renderCell: (rowData) => {
      return (
        <div
          className={clsx(
            'rounded-2xl py-8 text-center text-[1.8rem] text-white',
            {
              'bg-warna-dark': rowData?.status === 'Aktif',
              'bg-warna-red': rowData?.status !== 'Aktif',
            },
          )}
        >
          {rowData?.status}
        </div>
      )
    },
  },
]

export const columnsListDataFasilitas: Column<GetFasilitasType>[] = [
  {
    header: 'Nama Fasilitas',
    key: 'nama',
    width: '!min-w-[12rem]',
    renderCell: (rowData) => {
      return (
        <div className="flex gap-32">
          <img
            src={
              rowData?.photo || rowData?.photo !== ''
                ? rowData?.photo
                : DefaultImg
            }
            alt={rowData?.nama}
            loading="lazy"
            className="w-[20rem] rounded-2xl phones:hidden"
          />
          <div className="flex flex-col gap-12">
            {rowData?.nama && <p className="font-roboto">{rowData?.nama}</p>}
            {rowData?.keterangan && (
              <div
                dangerouslySetInnerHTML={{ __html: rowData?.keterangan }}
                className="line-clamp-3 phones:hidden"
              />
            )}
          </div>
        </div>
      )
    },
  },
  {
    header: 'Lokasi Fasilitas',
    key: 'alamat',
    width: '!min-w-[12rem]',
  },
  {
    header: 'Jam Operasional',
    key: 'jam_operasional',
    width: '!min-w-[12rem]',
  },
  { header: 'Kontak Person', key: 'telepon', width: '!min-w-[12rem]' },
]

export const columnsListDataTestimoni: Column<GetTestimoniType>[] = [
  {
    header: 'Nama',
    key: 'nama',
    width: 'w-[50%]',
    renderCell: (rowData) => {
      return (
        <div className="flex gap-32">
          <img
            src={
              rowData?.url_photo || rowData?.url_photo !== ''
                ? rowData?.url_photo
                : DefaultImg
            }
            alt={rowData?.nama}
            loading="lazy"
            className="h-[20rem] w-[20rem] rounded-2xl object-cover phones:hidden"
          />
          <div className="flex flex-col gap-12">
            {rowData?.nama && <p className="font-roboto">{rowData?.nama}</p>}
            {rowData?.keterangan_singkat && (
              <p className="line-clamp-4">{rowData?.keterangan_singkat}</p>
            )}
          </div>
        </div>
      )
    },
  },
  {
    header: 'Isi',
    key: 'isi',
    width: '!min-w-[12rem]',
    renderCell: (rowData) => {
      return (
        <div>
          {rowData?.isi && (
            <div
              dangerouslySetInnerHTML={{ __html: rowData?.isi }}
              className="line-clamp-3 phones:hidden"
            />
          )}
        </div>
      )
    },
  },
]

export const columnsListDataKategori: Column<GetKategoriType>[] = [
  {
    header: 'Judul',
    key: 'judul',
    width: 'w-[30%]',
    renderCell: (rowData) => {
      return <div className="line-clamp-5">{rowData?.judul}</div>
    },
  },
  {
    header: 'Tanggal',
    key: 'tanggal',
    width: '!min-w-[12rem]',
  },
  {
    header: 'Kategori',
    key: 'kategori',
    width: '!min-w-[12rem]',
  },
  {
    header: 'Dibaca',
    key: 'hits',
    width: '!min-w-[12rem]',
  },
  {
    header: 'Gambar',
    key: 'jlh_photo',
    width: '!min-w-[12rem]',
  },
]

export const columnsListDataPesan: Column<KontakMasuk>[] = [
  {
    header: 'Tanggal',
    key: 'create_at',
    width: '!min-w-[12rem]',
    renderCell: (rowData) => {
      return (
        <div>{dayjs(rowData?.create_at).locale('id').format('DD/MM/YYYY')}</div>
      )
    },
  },
  {
    header: 'Kode Tiket',
    key: 'kode_tiket',
    width: '!min-w-[12rem]',
  },
  {
    header: 'Nama',
    key: 'nama_depan',
    width: '!min-w-[12rem]',
    renderCell: (rowData) => {
      return (
        <div className="flex flex-col font-roboto text-warna-dark">
          <p>
            {capitalizeFirstLetterFromLowercase(
              rowData?.nama_depan?.toLowerCase(),
            )}{' '}
            {capitalizeFirstLetterFromLowercase(
              rowData?.nama_belakang?.toLowerCase(),
            )}
          </p>
          <p className="text-warna-grey">{rowData?.email}</p>
          <p className="text-warna-grey">{rowData?.hp}</p>
        </div>
      )
    },
  },
  {
    header: 'Pesan',
    key: 'pesan',
    width: 'w-[30%]',
    renderCell: (rowData) => {
      return (
        <div className="line-clamp-5" style={{ lineHeight: '130%' }}>
          {rowData?.pesan}
        </div>
      )
    },
  },
  {
    header: 'Status',
    key: 'status',
    width: '!min-w-[12rem]',
    renderCell: (rowData) => {
      return (
        <div className="flex">
          <div
            className={clsx(
              'rounded-2xl px-24 py-8 text-center text-[1.8rem] text-white',
              {
                'bg-orange-300': rowData?.status === 0,
                'bg-warna-dark': rowData?.status === 1,
                'bg-warna-red': rowData?.status === 2,
              },
            )}
          >
            {rowData?.status === 0
              ? 'Menunggu'
              : rowData?.status === 1
                ? 'Diproses'
                : rowData?.status === 2
                  ? 'Ditutup'
                  : ''}
          </div>
        </div>
      )
    },
  },
]
