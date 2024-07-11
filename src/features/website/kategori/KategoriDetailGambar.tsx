import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import DefaultImg from '@/assets/images/default.jpg'
import { Dispatch, SetStateAction } from 'react'
import { KategoriGambarType } from '@/types/website/kategoriType'
import { MenubarAction } from '@/components/Menubar/MenubarAction'

export function KategoriDetailGambar({
  gambar,
  handleSubmitDeleteGambar,
  isLoadingDeleteKategori,
  isShowDelete,
  setIsShowDelete,
  editID,
}: {
  gambar: KategoriGambarType[]
  setIsShowDelete: Dispatch<SetStateAction<boolean>>
  handleSubmitDeleteGambar: (id: string) => Promise<void>
  isLoadingDeleteKategori: boolean
  isShowDelete: boolean
  editID?: string
}) {
  return (
    <div className="flex flex-col gap-32">
      <div className="flex items-center justify-between gap-32 phones:flex-col-reverse phones:items-start">
        <p className="font-roboto text-[2.4rrem] text-warna-dark">Gambar</p>
        <div className="flex items-center gap-32 phones:w-full">
          <Link
            to={'tambah-gambar'}
            className="flex items-center justify-center gap-12 rounded-2xl bg-warna-primary px-24 py-12 text-[1.8rem] text-white hover:bg-opacity-80"
          >
            <FontAwesomeIcon icon={faPlus} />
            <p>Tambah Gambar</p>
          </Link>
        </div>
      </div>
      {gambar?.length > 0 ? (
        <div className="grid grid-cols-6 gap-32">
          {gambar?.map((item, idx) => (
            <div key={idx} className="col-span-1 phones:col-span-3">
              <div className="relative w-full">
                <img
                  src={
                    item?.gambar === '' || !item?.gambar
                      ? DefaultImg
                      : item?.gambar
                  }
                  alt={item?.keterangan}
                  className="h-[15rem] w-full rounded-2xl object-cover filter"
                  loading="lazy"
                />
                <div className="absolute left-0 top-0 h-full w-full transform bg-black bg-opacity-0">
                  <div className="flex h-full flex-col">
                    <div className="flex justify-end p-12">
                      <div className="flex rounded-lg bg-white">
                        <MenubarAction
                          data={item}
                          handleSubmitDelete={handleSubmitDeleteGambar}
                          setIsShowDelete={setIsShowDelete}
                          isLoadingDelete={isLoadingDeleteKategori}
                          isShowDelete={isShowDelete}
                          editID={editID}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Belum ada data</p>
      )}
    </div>
  )
}
