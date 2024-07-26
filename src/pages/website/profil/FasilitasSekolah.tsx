import { Searching } from '@/components/Searching'
import { Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Pagination } from '@/components/Pagination'
import { columnsListDataFasilitas } from '@/dummy/table'
import { TableFasilitas } from '@/components/Table/TableFasilitas'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { MenubarPerPage } from '@/components/Menubar/MenubarPerPage'
import { useWebsiteFasilitas } from '@/hooks/website/profilSekolah'

export default function WebsiteFasilitasSekolah() {
  const {
    isHakAksesHapus,
    isHakAksesTambah,
    isHakAksesUbah,
    search,
    setSearch,
    pageNumber,
    setPageNumber,
    pageSize,
    setPageSize,
    isShow,
    setIsShow,
    dataFasilitas,
    meta,
    loadingFasilitas,
    handleSubmitDeleteFasilitas,
    isLoadingDeleteFasilitas,
  } = useWebsiteFasilitas()

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
              <p className="phones:hidden">Tambah Fasilitas</p>
            </Link>
          )}
        </div>
      </div>
      <TableFasilitas
        data={dataFasilitas}
        columns={columnsListDataFasilitas}
        containerClasses="w-full h-full flex-1 overflow-y-auto scrollbar"
        loading={loadingFasilitas}
        pageSize={pageSize}
        currentPage={pageNumber}
        isNumber
        isFasilitas
        handleSubmitDelete={handleSubmitDeleteFasilitas}
        isLoadingDelete={isLoadingDeleteFasilitas}
        setIsShow={setIsShow}
        isShow={isShow}
        isUbah={isHakAksesUbah}
        isHapus={isHakAksesHapus}
      />
      {dataFasilitas?.length > 0 && (
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
