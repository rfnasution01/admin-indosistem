import { Searching } from '@/components/Searching'
import { FormListDataPerPage } from '@/components/Select/website'
import { Meta } from '@/store/api'
import { useGetFasilitasQuery } from '@/store/slices/website/profilAPI/fasilitasAPI'
import { GetFasilitasType } from '@/types/website/profil/fasilitasType'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Bounce, toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Cookies from 'js-cookie'
import { Pagination } from '@/components/Pagination'
import { columnsListDataFasilitas } from '@/dummy/table'
import { TableFasilitas } from '@/components/Table/TableFasilitas'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'

export default function FasilitasSekolah() {
  const navigate = useNavigate()

  const [search, setSearch] = useState<string>('')
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(5)

  const [fasilitas, setFasilitas] = useState<GetFasilitasType[]>([])
  const [meta, setMeta] = useState<Meta>()

  const {
    data: dataFasilitas,
    isLoading: isLoadingFasilitas,
    isFetching: isFetchingFasilitas,
    isError: isErrorFasilitas,
    error: errorFasilitas,
  } = useGetFasilitasQuery({
    search: search ?? '',
    page_number: pageNumber,
    page_size: pageSize,
  })

  const loadingFasilitas = isLoadingFasilitas || isFetchingFasilitas

  useEffect(() => {
    if (dataFasilitas?.data) {
      setFasilitas(dataFasilitas?.data?.data)
      setMeta(dataFasilitas?.data?.meta)
    }
  }, [dataFasilitas?.data])

  useEffect(() => {
    if (isErrorFasilitas) {
      const errorMsg = errorFasilitas as { data?: { message?: string } }

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
  }, [isErrorFasilitas, errorFasilitas])

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
          <div className="flex items-center gap-32 phones:w-2/3">
            <FormListDataPerPage setDataPerPage={setPageSize} />
            {fasilitas?.length > 0 && (
              <Pagination
                pageNow={pageNumber ?? 0}
                lastPage={meta?.last_page ?? 0}
                setPageNumber={setPageNumber}
              />
            )}
          </div>
          <Link
            to="tambah"
            className="flex items-center justify-center gap-12 rounded-2xl bg-warna-primary px-24 py-12 text-white phones:w-1/3"
          >
            <FontAwesomeIcon icon={faPlusCircle} />
            <p className="phones:hidden">Tambah Fasilitas</p>
          </Link>
        </div>
      </div>
      <TableFasilitas
        data={fasilitas}
        columns={columnsListDataFasilitas}
        containerClasses="w-full h-full flex-1 overflow-y-auto scrollbar"
        loading={loadingFasilitas}
        pageSize={pageSize}
        currentPage={pageNumber}
        isNumber
        isFasilitas
      />
      <ToastContainer />
    </div>
  )
}
