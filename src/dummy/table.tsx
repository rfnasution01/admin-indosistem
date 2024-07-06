import { Column } from '@/components/Table'
import { GetGuruStaffType } from '@/types/website/profil/guruStaffType'
import clsx from 'clsx'
import DefaultImg from '@/assets/images/default.jpg'
import { GetFasilitasType } from '@/types/website/profil/fasilitasType'

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
            src={rowData?.photo ?? DefaultImg}
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
