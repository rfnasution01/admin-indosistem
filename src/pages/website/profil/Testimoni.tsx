import { Searching } from '@/components/Searching'
import { Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Pagination } from '@/components/Pagination'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { TableFasilitas } from '@/components/Table/TableFasilitas'
import { columnsListDataTestimoni } from '@/dummy/table'
import { MenubarPerPage } from '@/components/Menubar/MenubarPerPage'
import { useWebsiteTestimoni } from '@/hooks/website/profilSekolah'

export default function WebsiteTestimoniSekolah() {
  const {
    isHakAksesHapus,
    isHakAksesTambah,
    isHakAksesUbah,
    isShowDelete,
    setIsShowDelete,
    search,
    setSearch,
    pageNumber,
    setPageNumber,
    pageSize,
    setPageSize,
    dataTestimoni,
    meta,
    loadingTestimoni,
    handleSubmitDelete,
    isLoadingDeleteTestimoni,
  } = useWebsiteTestimoni()

  return (
    <div className="scrollbar flex h-full flex-col gap-32 overflow-y-auto p-48">
      <div className="flex items-center justify-between gap-32 phones:flex-col phones:items-start">
        <Searching
          setPageNumber={setPageNumber}
          setSearch={setSearch}
          className="w-1/2 phones:w-full"
          search={search}
        />
        <div className="flex items-center gap-32 phones:w-full">
          {isHakAksesTambah && (
            <Link
              to="tambah"
              className="flex items-center justify-center gap-12 rounded-2xl bg-warna-primary px-24 py-12 text-white phones:w-1/3"
            >
              <FontAwesomeIcon icon={faPlusCircle} />
              <p className="phones:hidden">Tambah Testimoni</p>
            </Link>
          )}
        </div>
      </div>
      <TableFasilitas
        data={dataTestimoni}
        columns={columnsListDataTestimoni}
        containerClasses="w-full h-full flex-1 overflow-y-auto scrollbar"
        loading={loadingTestimoni}
        pageSize={pageSize}
        currentPage={pageNumber}
        isNumber
        isFasilitas
        handleSubmitDelete={handleSubmitDelete}
        isLoadingDelete={isLoadingDeleteTestimoni}
        setIsShow={setIsShowDelete}
        isShow={isShowDelete}
        isHapus={isHakAksesHapus}
        isUbah={isHakAksesUbah}
      />
      {dataTestimoni?.length > 0 && (
        <div className="flex items-center justify-end gap-32 phones:w-2/3">
          <MenubarPerPage pageSize={pageSize} setPageSize={setPageSize} />
          <Pagination
            pageNow={pageNumber ?? 0}
            lastPage={meta?.last_page ?? 0}
            setPageNumber={setPageNumber}
          />
        </div>
      )}

      <ToastContainer />
    </div>
  )
}
