import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'

export function SaudaraKandung() {
  return (
    <div className="scrollbar flex flex-col gap-16 overflow-y-auto rounded-3xl border">
      <table className="scrollbar flex-1 border-collapse overflow-y-auto text-[2rem]">
        <thead className="relative z-10 align-top leading-medium text-white">
          <tr className="border-b-[1.6rem] border-transparent">
            <th className="text-sim-primary sticky top-0 border-b-2 bg-primary-100 px-24 py-24 text-left align-middle">
              #
            </th>
            <th className="text-sim-primary sticky top-0 border-b-2 bg-primary-100 px-24 py-24 text-left align-middle">
              Nama
            </th>
            <th className="text-sim-primary sticky top-0 border-b-2 bg-primary-100 px-24 py-24 text-left align-middle">
              JK
            </th>
            <th className="text-sim-primary text-cent sticky top-0 border-b-2 bg-primary-100 px-24 py-24 text-left align-middle">
              Umur
            </th>
            <th className="text-sim-primary text-cent sticky top-0 border-b-2 bg-primary-100 px-24 py-24 text-left align-middle">
              Pekerjaan
            </th>
            <th className="text-sim-primary sticky top-0 border-b-2 bg-primary-100 px-24 py-24 text-left align-middle">
              Keterangan
            </th>
            <th className="text-sim-primary sticky top-0 border-b-2 bg-primary-100 px-24 py-24 text-left align-middle">
              Aksi
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
              <td className="px-24 py-12 align-middle leading-medium">
                Sudirman
              </td>
              <td className="px-24 py-12 align-middle leading-medium">L</td>
              <td className="px-24 py-12 align-middle leading-medium">
                40 Tahun
              </td>
              <td className="px-24 py-12 align-middle leading-medium">Guru</td>
              <td className="px-24 py-12 align-middle leading-medium">Hidup</td>

              <td className="px-24 py-12 align-middle leading-medium">
                <div className="flex items-center gap-12">
                  <Link
                    to={''}
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                    }}
                    className="rounded-2xl bg-warning p-8 text-white hover:bg-opacity-80"
                  >
                    <FontAwesomeIcon icon={faPencil} />
                  </Link>
                  <Link
                    to={''}
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                    }}
                    className="rounded-2xl bg-danger p-8 text-white hover:bg-opacity-80"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </Link>
                </div>
              </td>
            </tr>
          </Fragment>
        </tbody>
      </table>
    </div>
  )
}
