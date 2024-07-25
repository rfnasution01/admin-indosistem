import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'

export function RiwayatPelatihan() {
  return (
    <div className="scrollbar flex flex-col gap-16 overflow-y-auto rounded-3xl border">
      <table className="scrollbar flex-1 border-collapse overflow-y-auto text-[2rem]">
        <thead className="relative z-10 align-top leading-medium text-white">
          <tr className="border-b-[1.6rem] border-transparent">
            <th className="text-sim-primary sticky top-0 border-b-2 bg-primary-100 px-24 py-24 text-left align-middle">
              #
            </th>
            <th className="text-sim-primary sticky top-0 border-b-2 bg-primary-100 px-24 py-24 text-left align-middle">
              Nama Pelatihan
            </th>
            <th className="text-sim-primary sticky top-0 border-b-2 bg-primary-100 px-24 py-24 text-left align-middle">
              Tahun
            </th>
            <th className="text-sim-primary text-cent sticky top-0 border-b-2 bg-primary-100 px-24 py-24 text-left align-middle">
              Jumlah Jam
            </th>

            <th className="text-sim-primary sticky top-0 border-b-2 bg-primary-100 px-24 py-24 text-left align-middle">
              Lampiran Sertifikasi
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
                Staf pada SETWILDASU
              </td>
              <td className="px-24 py-12 align-middle leading-medium">
                11/01/2001
              </td>
              <td className="px-24 py-12 align-middle leading-medium">
                Sekretariat Wilayah Daerah Sumatera Utara
              </td>
              <td className="px-24 py-12 align-middle leading-medium">
                <Link
                  to={''}
                  target="_blank"
                  className="text-primary-active underline"
                >
                  Buka
                </Link>
              </td>

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
