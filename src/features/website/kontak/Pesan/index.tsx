import { Pagination } from '@/components/Pagination'
import { Searching } from '@/components/Searching'
import { TablePesan } from '@/components/Table/TablePesan'
import { Meta } from '@/store/api'
import { useGetKontakMasukQuery } from '@/store/slices/website/kontakAPI'
import { KontakMasuk } from '@/types/website/profil/kontakType'
import { useEffect, useState } from 'react'
import { Bounce, toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { columnsListDataPesan } from '@/dummy/table'
import { MenubarPerPage } from '@/components/Menubar/MenubarPerPage'

export function PesanMasukTable() {
  const navigate = useNavigate()

  const [pageNumber, setPageNumber] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [search, setSearch] = useState<string>('')

  const [pesan, setPesan] = useState<KontakMasuk[]>()
  const [meta, setMeta] = useState<Meta>()

  const {
    isFetching: isFetchingPesan,
    isLoading: isLoadingPesan,
    isError: isErrorPesan,
    error: errorPesan,
    data: dataPesan,
  } = useGetKontakMasukQuery({
    search: search,
    page_number: pageNumber,
    page_size: pageSize,
  })

  const isLoading = isFetchingPesan || isLoadingPesan

  useEffect(() => {
    if (dataPesan?.data) {
      setPesan(dataPesan?.data?.data)
      setMeta(dataPesan?.data?.meta)
    }
  }, [dataPesan])

  useEffect(() => {
    if (isErrorPesan) {
      const errorMsg = errorPesan as { data?: { message?: string } }

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
  }, [isErrorPesan, errorPesan])

  return (
    <div className="scrollbar flex h-full w-full flex-col gap-32 overflow-y-auto">
      <div className="flex items-center justify-between gap-32 phones:flex-col phones:items-start">
        <div className="flex w-2/3 items-center gap-32 phones:w-full phones:flex-col phones:items-start">
          <Searching
            setPageNumber={setPageNumber}
            setSearch={setSearch}
            className="w-1/2 phones:w-full"
            search={search}
          />
        </div>
        <div className="flex items-center gap-32">
          <MenubarPerPage
            pageSize={pageSize}
            setPageSize={setPageSize}
            position="bottom"
          />
          {pesan?.length > 0 && (
            <Pagination
              pageNow={pageNumber ?? 0}
              lastPage={meta?.last_page ?? 0}
              setPageNumber={setPageNumber}
            />
          )}
        </div>
      </div>
      <div className="scrollbar flex h-full flex-col gap-32 overflow-y-auto">
        <TablePesan
          data={pesan}
          columns={columnsListDataPesan}
          containerClasses="w-full h-full flex-1 overflow-y-auto scrollbar"
          loading={isLoading}
          pageSize={pageSize}
          currentPage={pageNumber}
          isNumber
        />
      </div>
      <ToastContainer />
    </div>
  )
}
