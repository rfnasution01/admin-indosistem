import { Loading } from '@/components/Loading'
import { Searching } from '@/components/Searching'
import { usePathname } from '@/hooks/usePathname'
import { Meta } from '@/store/api'
import { GetAlbumType } from '@/types/website/galeriType'
import { convertSlugToText } from '@/utils/formatText'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Dispatch, SetStateAction } from 'react'
import { Link } from 'react-router-dom'
import DefaultImg from '@/assets/images/default.jpg'
import { MenubarAction } from '@/components/Menubar/MenubarAction'
import { FormListDataPerPage } from '@/components/Select/website'
import { Pagination } from '@/components/Pagination'

export function GaleriAlbum({
  data,
  isLoadingGaleri,
  isShowDelete,
  meta,
  isLoadingDeleteGaleri,
  handleSubmitDelete,
  setSearch,
  setPageNumber,
  search,
  setIsShowDelete,
  setPageSize,
  pageNumber,
}: {
  data: GetAlbumType[]
  isLoadingGaleri: boolean
  setSearch: Dispatch<SetStateAction<string>>
  setPageNumber: Dispatch<SetStateAction<number>>
  setPageSize: Dispatch<SetStateAction<number>>
  setIsShowDelete: Dispatch<SetStateAction<boolean>>
  isShowDelete: boolean
  pageNumber: number
  meta: Meta
  isLoadingDeleteGaleri: boolean
  handleSubmitDelete: (id: string) => Promise<void>
  search: string
}) {
  const { secondPathname } = usePathname()

  return (
    <div className="flex w-full flex-col gap-32">
      <div className="flex items-center justify-between gap-32">
        <Searching
          setPageNumber={setPageNumber}
          setSearch={setSearch}
          className="w-1/3 phones:w-full"
          search={search}
        />
        <Link
          to="tambah"
          className="flex items-center gap-12 rounded-2xl bg-warna-primary px-24 py-16 text-white hover:bg-opacity-80"
        >
          <FontAwesomeIcon icon={faPlus} />
          <p className="phones:hidden">
            Tambah {convertSlugToText(secondPathname)} Baru
          </p>
        </Link>
      </div>
      {isLoadingGaleri ? (
        <Loading />
      ) : (
        <div className="scrollbar h-full w-full overflow-y-auto">
          <div className="grid grid-cols-4 gap-32">
            {data?.map((item, idx) => (
              <div key={idx} className="col-span-1 phones:col-span-4">
                <div className="flex h-full flex-col gap-16 rounded-2x border border-warna-pale-grey p-16">
                  <div className="relative w-full">
                    <img
                      src={
                        item?.url_gambar === '' || !item?.url_gambar
                          ? DefaultImg
                          : item?.url_gambar
                      }
                      alt={item?.judul}
                      className="h-[20rem] w-full rounded-2xl object-cover filter"
                      loading="lazy"
                    />
                    <div className="absolute left-0 top-0 h-full w-full transform bg-black bg-opacity-40">
                      <div className="flex h-full flex-col">
                        <div className="flex justify-end p-12">
                          <div className="flex rounded-lg bg-white">
                            <MenubarAction
                              data={item}
                              handleSubmitDelete={handleSubmitDelete}
                              setIsShowDelete={setIsShowDelete}
                              isLoadingDelete={isLoadingDeleteGaleri}
                              isShowDelete={isShowDelete}
                            />
                          </div>
                        </div>
                        <div className="flex flex-1 items-center justify-center">
                          <p className="font-sf-pro text-[5rem] tracking-1.5 text-white">
                            {item?.jumlah_photo}+
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="font-sf-pro text-warna-dark">{item?.judul}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-end">
            <div className="flex items-center gap-32">
              <FormListDataPerPage setDataPerPage={setPageSize} />
              {data?.length > 0 && (
                <Pagination
                  pageNow={pageNumber ?? 0}
                  lastPage={meta?.last_page ?? 0}
                  setPageNumber={setPageNumber}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
