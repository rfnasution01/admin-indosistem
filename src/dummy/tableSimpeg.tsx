import { Column } from '@/components/Table'
import { DaftarPegawai } from '@/types/simpeg/dataPegawai/daftarPegawaiType'

export const columnsListDaftarPegawai: Column<DaftarPegawai>[] = [
  {
    header: 'NIP',
    key: 'nip',
    width: '!min-w-[12rem]',
  },
  {
    header: 'Nama',
    key: 'nama',
    width: '!min-w-[12rem]',
  },
  { header: 'JK', key: 'jk', width: '!min-w-[12rem]' },
  {
    header: 'Jabatan',
    key: 'jabatan',
    width: '!min-w-[12rem]',
  },
  {
    header: 'Gol',
    key: 'golongan',
    width: '!min-w-[12rem]',
  },
  {
    header: 'HP',
    key: 'hp',
    width: '!min-w-[12rem]',
  },
]
