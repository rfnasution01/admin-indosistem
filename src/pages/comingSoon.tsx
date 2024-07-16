import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

export default function ComingSoon() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gradient-to-tr from-sky-900 to-blue-900 text-white">
      <div className="flex w-[40%] flex-col items-center justify-center gap-64 rounded-3x bg-blue-100 bg-opacity-20 p-64 text-white shadow-md phones:h-full phones:w-full phones:bg-opacity-0 phones:p-32 phones:text-center">
        <p className="font-serif text-[30rem]">404</p>
        <p
          className="text-center font-sf-pro text-[5rem]"
          style={{ lineHeight: '130%' }}
        >
          Halaman Tidak Ditemukan
        </p>
        <p className="text-center text-[2.6rem]" style={{ lineHeight: '130%' }}>
          Halaman yang Anda cari tidak ditemukan. Mungkin halaman tersebut telah
          dipindahkan atau namanya telah diubah.
        </p>
        <Link
          to={'/'}
          className="flex transform items-center gap-12 rounded-2xl bg-gradient-to-tr from-sky-900 to-blue-900 px-32 py-12 text-[2rem] transition-transform duration-300 ease-in-out hover:scale-105"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          Kembali Ke Home
        </Link>
      </div>
    </div>
  )
}
