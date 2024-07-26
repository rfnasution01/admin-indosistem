import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ComingSoonPage } from '@/routes/loadables'
import {
  GuruStaffTab,
  GuruStaffTable,
} from '@/features/website/profil/guruStaff'
import { useWebsiteGuru } from '@/hooks/website/profilSekolah'

export default function WebsiteGuruStaff() {
  const {
    loadingGuruSekolah,
    dataGuru,
    search,
    setSearch,
    pageNumber,
    setPageNumber,
    pageSize,
    setPageSize,
    menu,
    setMenu,
    meta,
  } = useWebsiteGuru()

  return (
    <div className="scrollbar flex h-full flex-col gap-32 overflow-y-auto">
      <div className="flex">
        <GuruStaffTab menu={menu} setMenu={setMenu} />
      </div>
      <div className="scrollbar flex h-full flex-1 overflow-y-auto px-48 pb-48">
        {menu === 'Daftar Guru' ? (
          <GuruStaffTable
            data={dataGuru}
            meta={meta}
            setPageNumber={setPageNumber}
            setPageSize={setPageSize}
            setSearch={setSearch}
            search={search}
            isLoading={loadingGuruSekolah}
            pageNumber={pageNumber}
            pageSize={pageSize}
          />
        ) : (
          <ComingSoonPage />
        )}
      </div>

      <ToastContainer />
    </div>
  )
}
