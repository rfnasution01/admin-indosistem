import { faFileExcel, faPlus, faPrint } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function DaftarPegawai() {
  const listData = [
    'Pegawai Tanpa Satker',
    'Pegawai NIP Ganda',
    'Pegawai NIP Ganda',
    'Rekap Validasi Data',
  ]

  const manajemenData = ['Cetak', 'Import Data Excel', 'Tambah Data']

  return (
    <div className="scrollbar flex h-full w-full overflow-y-auto px-64 py-32 phones:p-32">
      <div className="flex w-full flex-col gap-32 rounded-3x bg-white p-32">
        <p className="font-roboto text-[2.8rem] text-primary-100">
          Daftar Pegawai
        </p>

        <div className="flex flex-col gap-12">
          <p className="font-roboto text-[2.6rem] text-primary-100">
            List Data
          </p>
          <div className="flex items-center gap-32">
            {listData?.map((item, idx) => (
              <div
                className="rounded-2xl border border-primary-100 px-24 py-12 text-primary-100 hover:cursor-pointer hover:bg-primary-100 hover:text-white"
                key={idx}
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-12">
          <p className="font-roboto text-[2.6rem] text-primary-100">
            Manajemen Data
          </p>
          <div className="flex items-center gap-32">
            {manajemenData?.map((item, idx) => (
              <div
                className="flex items-center justify-center gap-12 rounded-2xl border border-primary-100 px-24 py-12 text-primary-100 hover:cursor-pointer hover:bg-primary-100 hover:text-white"
                key={idx}
              >
                <FontAwesomeIcon
                  icon={
                    item?.includes('Cetak')
                      ? faPrint
                      : item?.includes('Excel')
                        ? faFileExcel
                        : faPlus
                  }
                />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
