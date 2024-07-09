import { faPencil, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import DefaultImg from '@/assets/images/default.jpg'
import { Dispatch, SetStateAction } from 'react'
import { usePathname } from '@/hooks/usePathname'
import { KategoriGambarType } from '@/types/website/kategoriType'

export function KategoriDetailGambar({
  gambar,
  setDeleteID,
  setIsShowID,
  idKategori,
}: {
  gambar: KategoriGambarType[]
  setIsShowID: Dispatch<SetStateAction<boolean>>
  setDeleteID: Dispatch<SetStateAction<string>>
  idKategori: string
}) {
  const { secondPathname } = usePathname()

  return (
    <div className="flex flex-col gap-32">
      <div className="flex items-center gap-32">
        <p className="font-roboto text-[2.4rem] text-warna-dark">Gambar</p>
      </div>
      {gambar?.length > 0 ? (
        <div className="grid grid-cols-4 gap-32">
          {gambar?.map((item, idx) => (
            <div
              key={idx}
              className="col-span-1 flex flex-col overflow-hidden rounded-2xl shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:cursor-pointer phones:col-span-2"
            >
              <img
                src={
                  item?.gambar === '' || !item?.gambar
                    ? DefaultImg
                    : item?.gambar
                }
                alt={item?.keterangan}
                className="h-[20rem] w-full rounded-tl-2xl rounded-tr-2xl object-cover filter transition-transform duration-300 ease-in-out"
                loading="lazy"
              />
              <p className="line-clamp-1 p-24">{item?.keterangan}</p>
              <div className="flex w-full items-center">
                <Link
                  to={`/website/${secondPathname}/detail/edit-gambar`}
                  onClick={() => {
                    localStorage.setItem('ID', idKategori)
                    localStorage.setItem('editID', item?.id)
                    localStorage.setItem('editData', JSON.stringify(item))
                  }}
                  className="flex w-full items-center justify-center gap-12 bg-warna-dark py-12 text-white"
                >
                  <FontAwesomeIcon icon={faPencil} />
                  <p className="phones:hidden">Edit</p>
                </Link>
                <button
                  onClick={() => {
                    setIsShowID(true)
                    setDeleteID(item?.id)
                  }}
                  className="flex w-full items-center justify-center gap-12 bg-warna-red py-12 text-white"
                >
                  <FontAwesomeIcon icon={faTrash} />
                  <p className="phones:hidden">Hapus</p>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Belum ada data</p>
      )}
      <Link
        to={'tambah-gambar'}
        className="flex items-center justify-center gap-12 rounded-2xl bg-warna-primary px-24 py-12 text-[1.8rem] text-white hover:bg-opacity-80"
      >
        <FontAwesomeIcon icon={faPlus} />
        <p>Tambah Gambar</p>
      </Link>
    </div>
  )
}
