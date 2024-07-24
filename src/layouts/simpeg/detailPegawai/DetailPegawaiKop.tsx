import { GetDaftarPegawaDetailType } from '@/types/simpeg/dataPegawai/daftarPegawaiType'
import { getInitials } from '@/utils/formatText'
import { faPencil, faPrint } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

export function SimpegDetailPegawaiKop({
  detailPegawai,
}: {
  detailPegawai: GetDaftarPegawaDetailType
}) {
  return (
    <div className="flex gap-32 rounded-2x bg-primary-200 p-32 text-warna-white phones:flex-col">
      {detailPegawai?.photo ? (
        <img
          src={detailPegawai?.photo}
          alt={detailPegawai?.nama}
          className="h-[20rem] w-[20rem] rounded-2xl object-cover"
          loading="lazy"
        />
      ) : (
        <div className="flex h-[20rem] w-[20rem] items-center justify-center rounded-xl bg-warna-white text-[3.2rem] text-primary-200">
          {getInitials(detailPegawai?.nama)}
        </div>
      )}
      <div className="flex flex-col gap-32">
        <div className="flex flex-col gap-8">
          <p className="font-roboto text-[2.8rem]">{detailPegawai?.nama}</p>
          <p>{detailPegawai?.jabatan}</p>
        </div>
        <div className="flex items-center gap-24">
          <Link
            to={'/simpeg/master/pegawai/edit'}
            className="flex items-center gap-12 rounded-2xl bg-warning px-24 py-12 text-primary-100 hover:bg-opacity-80"
          >
            <FontAwesomeIcon icon={faPencil} />
            <p>Edit Informasi Pegawai </p>
          </Link>
          <div className="flex items-center gap-12 rounded-2xl bg-primary-300 px-24 py-12 text-primary-200 hover:cursor-pointer hover:bg-opacity-80">
            <FontAwesomeIcon icon={faPrint} />
          </div>
        </div>
      </div>
    </div>
  )
}
