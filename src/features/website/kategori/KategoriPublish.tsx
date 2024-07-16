import { Searching } from '@/components/Searching'
import { usePathname } from '@/hooks/usePathname'
import {
  faBinoculars,
  faClipboard,
  faEye,
  faEyeSlash,
  faNewspaper,
  faPencil,
  faPlus,
  faSpinner,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Dispatch, SetStateAction, useState } from 'react'
import { Link } from 'react-router-dom'
import { convertSlugToText } from '@/utils/formatText'
import { Loading } from '@/components/Loading'
import DefaultImg from '@/assets/images/default.jpg'
import { GetKategoriType } from '@/types/website/kategoriType'
import { ValidasiDelete } from '@/components/Dialog/ValidasiDelete'
import clsx from 'clsx'
import { ValidasiIsCheck } from '@/components/Dialog/ValidasiIsCheck'
import { FormListDataPerPage } from '@/components/Select/website'
import { Pagination } from '@/components/Pagination'
import { Meta } from '@/store/api'

export function KategoriPublish({
  isPublish,
  loadingKategori,
  kategori,
  search,
  setPageNumber,
  setSearch,
  handleSubmitDelete,
  handleSubmitPublish,
  isShowDelete,
  isShowPublish,
  setIsShowDelete,
  setIsShowPublish,
  isLoadingDelete,
  isLoadingPublish,
  setPageSize,
  pageNumber,
  meta,
  isHapus,
  isTambah,
  isUbah,
}: {
  isPublish?: boolean
  loadingKategori: boolean
  kategori: GetKategoriType[]
  setPageNumber: Dispatch<SetStateAction<number>>
  setPageSize: Dispatch<SetStateAction<number>>
  pageNumber: number
  setSearch: Dispatch<SetStateAction<string>>
  search: string
  handleSubmitDelete: (id: string) => Promise<void>
  setIsShowDelete: Dispatch<SetStateAction<boolean>>
  isShowDelete: boolean
  isLoadingDelete: boolean
  handleSubmitPublish: (id: string, publish: string) => Promise<void>
  setIsShowPublish: Dispatch<SetStateAction<boolean>>
  isShowPublish: boolean
  isLoadingPublish: boolean
  meta: Meta
  isTambah: boolean
  isUbah: boolean
  isHapus: boolean
}) {
  const { secondPathname } = usePathname()
  const [ID, setID] = useState<string>()
  const [publish, setPublish] = useState<string>()

  return (
    <div className="flex w-full flex-col gap-32">
      <div className="flex items-center justify-between gap-32">
        <Searching
          setPageNumber={setPageNumber}
          setSearch={setSearch}
          className="w-1/3 phones:w-full"
          search={search}
        />
        {isTambah && (
          <Link
            to="tambah"
            className="flex items-center gap-12 rounded-2xl bg-warna-primary px-24 py-16 text-white hover:bg-opacity-80"
          >
            <FontAwesomeIcon icon={faPlus} />
            <p className="phones:hidden">
              Tambah {convertSlugToText(secondPathname)} Baru
            </p>
          </Link>
        )}
      </div>
      {loadingKategori ? (
        <Loading />
      ) : (
        <div className="scrollbar flex h-full flex-col gap-32 overflow-y-auto">
          {kategori?.length === 0 ? (
            <p>Tidak ada data</p>
          ) : (
            kategori?.map((item, idx) => (
              <div
                key={idx}
                className="flex gap-32 rounded-2x border border-warna-pale-grey p-32 text-warna-dark shadow phones:flex-col"
              >
                <img
                  src={
                    item?.gambar?.length > 0
                      ? item?.gambar?.[0]?.gambar
                      : DefaultImg
                  }
                  alt={
                    item?.gambar?.length > 0
                      ? item?.gambar?.[0]?.keterangan
                      : item?.judul
                  }
                  className="w-1/4 rounded-2xl filter phones:w-full"
                  loading="lazy"
                />
                <div className="flex w-3/4 flex-col gap-12 phones:w-full">
                  <div className="flex w-full gap-32 phones:flex-col-reverse">
                    <div className="flex w-full flex-col gap-8">
                      <p className="font-roboto text-[2.4rem]">{item?.judul}</p>
                      {item?.create_user && <p>{item?.create_user}</p>}
                    </div>
                    <div className="flex items-start">
                      <div className="flex items-center gap-12">
                        <Link
                          to="detail"
                          onClick={() => {
                            localStorage.setItem('editID', item?.id)
                          }}
                          className="flex items-center gap-12 text-nowrap rounded-2xl border border-warna-primary px-24 py-12 text-warna-primary hover:bg-warna-primary  hover:text-white"
                        >
                          <FontAwesomeIcon icon={faBinoculars} />
                          <p className="phones:hidden">
                            Detail {convertSlugToText(secondPathname)}
                          </p>
                        </Link>
                        {isUbah && (
                          <Link
                            to="edit"
                            onClick={() => {
                              localStorage.setItem('editID', item?.id)
                            }}
                            className="flex items-center gap-12 text-nowrap rounded-2xl border border-warna-dark px-24 py-12 hover:bg-warna-dark hover:text-white"
                          >
                            <FontAwesomeIcon icon={faPencil} />
                            <p className="phones:hidden">
                              Edit {convertSlugToText(secondPathname)}
                            </p>
                          </Link>
                        )}
                        {isUbah && (
                          <button
                            disabled={!isUbah}
                            className={clsx(
                              'flex items-center gap-12 text-nowrap rounded-2xl px-24 py-12 text-white hover:bg-opacity-80 hover:text-white disabled:cursor-not-allowed',
                              {
                                'bg-warna-dark': item?.publish === '0',
                                'bg-warna-grey': item?.publish === '1',
                              },
                            )}
                            type="button"
                            onClick={() => {
                              setIsShowPublish(true)
                              setPublish(item?.publish)
                              setID(item?.id)
                            }}
                          >
                            <FontAwesomeIcon
                              icon={
                                item?.publish === '1'
                                  ? faClipboard
                                  : faNewspaper
                              }
                            />
                            <p className="phones:hidden">
                              {item?.publish === '1' ? 'Draft' : 'Publish'}
                            </p>
                          </button>
                        )}
                        {isHapus && (
                          <button
                            disabled={!isHapus}
                            className={clsx(
                              'flex items-center gap-12 text-nowrap rounded-2xl bg-warna-red px-24 py-12 text-white hover:bg-opacity-80 hover:text-white disabled:cursor-not-allowed',
                              {
                                hidden: isPublish,
                              },
                            )}
                            type="button"
                            onClick={() => {
                              setIsShowDelete(true)
                              setID(item?.id)
                            }}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                            <p className="phones:hidden">Hapus</p>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                  {item?.isi && (
                    <div
                      dangerouslySetInnerHTML={{ __html: item?.isi }}
                      className="article-content line-clamp-4"
                      style={{ lineHeight: '130%' }}
                    />
                  )}
                </div>
              </div>
            ))
          )}

          <div className="flex justify-end">
            <div className="flex items-center gap-32">
              <FormListDataPerPage setDataPerPage={setPageSize} />
              {kategori?.length > 0 && (
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
      <ValidasiDelete
        isOpen={isShowDelete}
        setIsOpen={setIsShowDelete}
        child={
          <button
            type="button"
            disabled={isLoadingDelete}
            onClick={() => handleSubmitDelete(ID)}
            className="flex items-center gap-12 rounded-2xl bg-warna-red px-24 py-12 text-white hover:bg-opacity-80"
          >
            {isLoadingDelete ? (
              <span className="animate-spin duration-300">
                <FontAwesomeIcon icon={faSpinner} />
              </span>
            ) : (
              <FontAwesomeIcon icon={faTrash} />
            )}
            <p className="font-sf-pro">Hapus</p>
          </button>
        }
      />
      <ValidasiIsCheck
        isOpen={isShowPublish}
        setIsOpen={setIsShowPublish}
        publish={publish}
        child={
          <button
            type="button"
            disabled={isLoadingPublish}
            onClick={() => handleSubmitPublish(ID, publish === '1' ? '0' : '1')}
            className={clsx(
              'flex items-center gap-12 rounded-2xl px-24 py-12 text-white hover:bg-opacity-80',
              {
                'bg-warna-red': publish === '1',
                'bg-warna-primary': publish !== '1',
              },
            )}
          >
            {isLoadingPublish ? (
              <span className="animate-spin duration-300">
                <FontAwesomeIcon icon={faSpinner} />
              </span>
            ) : publish === '1' ? (
              <FontAwesomeIcon icon={faEyeSlash} />
            ) : (
              <FontAwesomeIcon icon={faEye} />
            )}
            <p className="font-sf-pro">
              {publish === '1' ? 'Draft' : 'Publish'}
            </p>
          </button>
        }
      />
    </div>
  )
}
