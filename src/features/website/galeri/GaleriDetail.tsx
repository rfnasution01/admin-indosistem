import 'dayjs/locale/id'
import { GetAlbumType } from '@/types/website/galeriType'
import { Meta } from '@/store/api'
import { Link } from 'react-router-dom'
import { usePathname } from '@/hooks/usePathname'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCalendarDay,
  faPencil,
  faPlus,
  faUser,
} from '@fortawesome/free-solid-svg-icons'
import { IconComponent } from '@/components/LabelComponent/IconComponent'
import dayjs from 'dayjs'
import DefaultImg from '@/assets/images/default.jpg'
import { convertSlugToText } from '@/utils/formatText'
import { Dispatch, SetStateAction } from 'react'
import { MenubarAction } from '@/components/Menubar/MenubarAction'
import { FormListDataPerPage } from '@/components/Select/website'
import { Pagination } from '@/components/Pagination'

export function GaleriDetail({
  detail,
  photo,
  meta,
  setPageNumber,
  setPageSize,
  handleSubmitDeleteGambar,
  setIsShowDelete,
  isLoadingDeleteGaleri,
  isShowDelete,
  pageNumber,
  editID,
}: {
  detail: GetAlbumType
  photo: GetAlbumType[]
  meta: Meta
  setPageNumber: Dispatch<SetStateAction<number>>
  setPageSize: Dispatch<SetStateAction<number>>
  setIsShowDelete: Dispatch<SetStateAction<boolean>>
  handleSubmitDeleteGambar: (id: string) => Promise<void>
  isLoadingDeleteGaleri: boolean
  isShowDelete: boolean
  pageNumber: number
  editID?: string
}) {
  const { secondPathname } = usePathname()

  return (
    <div className="flex flex-col gap-32">
      <div className="flex items-center gap-32">
        <p className="font-roboto text-[2.4rem] text-warna-dark">
          {detail?.judul}
        </p>
        <Link
          to={`/website/${secondPathname}/edit`}
          onClick={() => {
            localStorage.setItem('editID', detail?.id)
            localStorage.setItem('editData', JSON.stringify(detail))
          }}
          className="flex items-center gap-12 rounded-2xl bg-warna-dark px-24 py-12 text-[1.8rem] text-white"
        >
          <FontAwesomeIcon icon={faPencil} />
          <p>Perbaharui Data</p>
        </Link>
      </div>
      <div className="flex flex-wrap items-center gap-32">
        <IconComponent
          icon={<FontAwesomeIcon icon={faCalendarDay} />}
          label={dayjs(detail?.create_at).locale('id').format('DD MMMM YYYY')}
        />
        <IconComponent
          icon={<FontAwesomeIcon icon={faUser} />}
          label={detail?.create_user}
        />
      </div>
      <img
        src={
          detail?.url_gambar === '' || !detail?.url_gambar
            ? DefaultImg
            : detail?.url_gambar
        }
        alt={detail?.judul}
        className="h-[50rem] w-full object-cover filter phones:h-[30rem]"
        loading="lazy"
      />
      <div className="flex items-center justify-between gap-32 phones:flex-col-reverse phones:items-start">
        <p className="font-roboto text-[2.4rrem] text-warna-dark">Galeri</p>
        <div className="flex items-center gap-32 phones:w-full">
          <Link
            to="tambah-gambar"
            className="flex items-center gap-12 rounded-2xl bg-warna-primary px-24 py-16 text-white hover:bg-opacity-80"
          >
            <FontAwesomeIcon icon={faPlus} />
            <p className="text-nowrap phones:hidden">
              Tambah {convertSlugToText(secondPathname)} Baru
            </p>
          </Link>
        </div>
      </div>
      {photo?.length > 0 ? (
        <div className="grid grid-cols-4 gap-32">
          {photo?.map((item, idx) => (
            <div key={idx} className="col-span-1 phones:col-span-2">
              <div className="relative w-full">
                <img
                  src={
                    item?.url_gambar === '' || !item?.url_gambar
                      ? DefaultImg
                      : item?.url_gambar
                  }
                  alt={item?.judul}
                  className="h-[20rem] w-full rounded-2xl object-cover filter phones:h-[12rem]"
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
                          isLoadingDelete={isLoadingDeleteGaleri}
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
      {photo?.length > 0 && (
        <div className="flex justify-end">
          <div className="flex items-center gap-32">
            <FormListDataPerPage setDataPerPage={setPageSize} />
            {photo?.length > 0 && (
              <Pagination
                pageNow={pageNumber ?? 0}
                lastPage={meta?.last_page ?? 0}
                setPageNumber={setPageNumber}
              />
            )}
          </div>
        </div>
      )}
    </div>
  )
}
