import clsx from 'clsx'
import { Fragment } from 'react'

export function RiwayatTugasLuar() {
  return (
    <div className="scrollbar flex flex-col gap-16 overflow-y-auto rounded-3xl border">
      <table className="scrollbar flex-1 border-collapse overflow-y-auto text-[2rem]">
        <thead className="relative z-10 align-top leading-medium text-white">
          <tr className="border-b-[1.6rem] border-transparent">
            <th className="text-sim-primary sticky top-0 border-b-2 bg-primary-100 px-24 py-24 text-left align-middle">
              #
            </th>
            <th className="text-sim-primary sticky top-0 border-b-2 bg-primary-100 px-24 py-24 text-left align-middle">
              Nomor Surat
            </th>
            <th className="text-sim-primary text-cent sticky top-0 border-b-2 bg-primary-100 px-24 py-24 text-left align-middle">
              Tanggal
            </th>
            <th className="text-sim-primary sticky top-0 border-b-2 bg-primary-100 px-24 py-24 text-left align-middle">
              Uraian
            </th>
            <th className="text-sim-primary sticky top-0 border-b-2 bg-primary-100 px-24 py-24 text-left align-middle">
              Pelaksanaan
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
              <td className="px-24 py-12 align-middle leading-medium">1</td>
              <td className="px-24 py-12 align-middle leading-medium">Siti</td>
              <td className="px-24 py-12 align-middle leading-medium">
                Medan, 12/03/1982
              </td>
              <td className="px-24 py-12 align-middle leading-medium">
                12/01/2001
              </td>

              <td className="px-24 py-12 align-middle leading-medium">Guru</td>
            </tr>
          </Fragment>
        </tbody>
      </table>
    </div>
  )
}
