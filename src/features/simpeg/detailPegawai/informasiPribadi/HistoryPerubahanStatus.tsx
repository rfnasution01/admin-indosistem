import { GetDaftarPegawaDetailType } from '@/types/simpeg/dataPegawai/daftarPegawaiType'
import clsx from 'clsx'
import { Fragment } from 'react'

export function HistoryPerubahanStatus({
  detailPegawai,
}: {
  detailPegawai: GetDaftarPegawaDetailType
}) {
  console.log({ detailPegawai })

  return (
    <div className="scrollbar flex flex-col gap-16 overflow-y-auto rounded-3xl border">
      <table className="scrollbar flex-1 border-collapse overflow-y-auto text-[2rem]">
        <thead className="relative z-10 align-top leading-medium text-white">
          <tr className="border-b-[1.6rem] border-transparent">
            <th className="text-sim-primary sticky top-0 border-b-2 bg-primary-100 px-24 py-24 text-left align-middle">
              #
            </th>
            <th className="text-sim-primary sticky top-0 border-b-2 bg-primary-100 px-24 py-24 text-left align-middle">
              Jenis Kepegawaian
            </th>
            <th className="text-sim-primary sticky top-0 border-b-2 bg-primary-100 px-24 py-24 text-left align-middle">
              Status
            </th>
            <th className="text-sim-primary text-cent sticky top-0 border-b-2 bg-primary-100 px-24 py-24 text-left align-middle">
              Tanggal Perubahan
            </th>
            <th className="text-sim-primary sticky top-0 border-b-2 bg-primary-100 px-24 py-24 text-left align-middle">
              Instansi
            </th>
          </tr>
        </thead>
        <tbody>
          <Fragment>
            <tr
              className={clsx(
                'border-b-[1.6rem] border-transparent text-warna-dark transition-all ease-in odd:bg-surface-disabled hover:cursor-pointer hover:bg-warna-pale-grey',
              )}
            >
              <td className="border px-24 py-12 align-middle leading-medium">
                1
              </td>
              <td className="px-24 py-12 align-middle leading-medium">PNS</td>
              <td className="px-24 py-12 align-middle leading-medium">Aktif</td>
              <td className="px-24 py-12 align-middle leading-medium">
                11/01/2003
              </td>
              <td className="px-24 py-12 align-middle leading-medium">
                BADAN PERENCANAAN PEMBANGUNAN DAN PENELITIAN PENGEMBANGAN DAERAH
              </td>
            </tr>
            <tr
              className={clsx(
                'border-b-[1.6rem] border-transparent text-warna-dark transition-all ease-in odd:bg-surface-disabled hover:cursor-pointer hover:bg-warna-pale-grey',
              )}
            >
              <td className="px-24 py-12 align-middle leading-medium">2</td>
              <td className="px-24 py-12 align-middle leading-medium">PNS</td>
              <td className="px-24 py-12 align-middle leading-medium">Aktif</td>
              <td className="px-24 py-12 align-middle leading-medium">
                11/01/2003
              </td>
              <td className="px-24 py-12 align-middle leading-medium">
                BADAN PERENCANAAN PEMBANGUNAN DAN PENELITIAN PENGEMBANGAN DAERAH
              </td>
            </tr>
          </Fragment>
        </tbody>
      </table>
    </div>
  )
}
