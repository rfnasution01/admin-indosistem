import { Searching } from '@/components/Searching'
import { FormListDataPerPage } from '@/components/Select/website'
import { Meta } from '@/store/api'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Bounce, toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Cookies from 'js-cookie'
import { Pagination } from '@/components/Pagination'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { GetTestimoniType } from '@/types/website/profil/testimoniType'
import {
  useDeleteTestimoniMutation,
  useGetTestimoniQuery,
} from '@/store/slices/website/profilAPI/testimoniAPI'
import { TableFasilitas } from '@/components/Table/TableFasilitas'
import { columnsListDataTestimoni } from '@/dummy/table'

export default function TestimoniSekolah() {
  const navigate = useNavigate()

  const [search, setSearch] = useState<string>('')
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(5)
  const [isShow, setIsShow] = useState<boolean>(false)

  const [Testimoni, setTestimoni] = useState<GetTestimoniType[]>([])
  const [meta, setMeta] = useState<Meta>()

  const {
    data: dataTestimoni,
    isLoading: isLoadingTestimoni,
    isFetching: isFetchingTestimoni,
    isError: isErrorTestimoni,
    error: errorTestimoni,
  } = useGetTestimoniQuery({
    search: search ?? '',
    page_number: pageNumber,
    page_size: pageSize,
  })

  const loadingTestimoni = isLoadingTestimoni || isFetchingTestimoni

  useEffect(() => {
    if (dataTestimoni?.data) {
      setTestimoni(dataTestimoni?.data?.data)
      setMeta(dataTestimoni?.data?.meta)
    }
  }, [dataTestimoni?.data])

  useEffect(() => {
    if (isErrorTestimoni) {
      const errorMsg = errorTestimoni as { data?: { message?: string } }

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
  }, [isErrorTestimoni, errorTestimoni])

  // --- Delete ---
  const [
    deleteTestimoni,
    {
      isError: isErrorDeleteTestimoni,
      isLoading: isLoadingDeleteTestimoni,
      isSuccess: isSuccessDeleteTestimoni,
      error: errorDeleteTestimoni,
    },
  ] = useDeleteTestimoniMutation()

  const handleSubmitDelete = async (id: string) => {
    try {
      await deleteTestimoni({ id: id })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (isSuccessDeleteTestimoni) {
      toast.success('Delete Testimoni berhasil', {
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
      setIsShow(false)
    }
  }, [isSuccessDeleteTestimoni])

  useEffect(() => {
    if (isErrorDeleteTestimoni) {
      const errorMsg = errorDeleteTestimoni as { data?: { message?: string } }

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
    }
  }, [isErrorDeleteTestimoni, errorDeleteTestimoni])

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
            {Testimoni?.length > 0 && (
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
            <p className="phones:hidden">Tambah Testimoni</p>
          </Link>
        </div>
      </div>
      <TableFasilitas
        data={Testimoni}
        columns={columnsListDataTestimoni}
        containerClasses="w-full h-full flex-1 overflow-y-auto scrollbar"
        loading={loadingTestimoni}
        pageSize={pageSize}
        currentPage={pageNumber}
        isNumber
        isFasilitas
        handleSubmitDelete={handleSubmitDelete}
        isLoadingDelete={isLoadingDeleteTestimoni}
        setIsShow={setIsShow}
        isShow={isShow}
      />
      <ToastContainer />
    </div>
  )
}
