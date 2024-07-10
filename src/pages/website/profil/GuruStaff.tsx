import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { Bounce, toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ComingSoonPage } from '@/routes/loadables'
import {
  GuruStaffTab,
  GuruStaffTable,
} from '@/features/website/profil/guruStaff'
import { useGetGuruStaffQuery } from '@/store/slices/website/profilAPI/guruStaffAPI'
import { GetGuruStaffType } from '@/types/website/profil/guruStaffType'
import { Meta } from '@/store/api'

export default function VisiMisi() {
  const navigate = useNavigate()

  const [menu, setMenu] = useState<string>('Daftar Guru')
  const [search, setSearch] = useState<string>('')
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(12)

  // --- Data Guru ---
  const [dataGuru, setDataGuru] = useState<GetGuruStaffType[]>()
  const [meta, setMeta] = useState<Meta>()

  const {
    data: dataGuruSekolah,
    isFetching: isFetchingGuruSekolah,
    isLoading: isLoadingGuruSekolah,
    isError: isErrorGuruSekolah,
    error: errorGuruSekolah,
  } = useGetGuruStaffQuery({
    page_number: pageNumber,
    page_size: pageSize,
    search: search ?? '',
  })

  const loadingGuruSekolah = isLoadingGuruSekolah || isFetchingGuruSekolah

  useEffect(() => {
    if (dataGuruSekolah?.data) {
      setDataGuru(dataGuruSekolah?.data?.data)
      setMeta(dataGuruSekolah?.data?.meta)
    }
  }, [dataGuruSekolah?.data])

  useEffect(() => {
    if (isErrorGuruSekolah) {
      const errorMsg = errorGuruSekolah as { data?: { message?: string } }

      toast.error(`${errorMsg?.data?.message ?? 'Terjadi Kesalahan'}`, {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      })

      if (errorMsg?.data?.message?.includes('Token')) {
        setTimeout(() => {
          Cookies.remove('token')
          navigate(`/`)
        }, 3000)
      }
    }
  }, [isErrorGuruSekolah, errorGuruSekolah])

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
