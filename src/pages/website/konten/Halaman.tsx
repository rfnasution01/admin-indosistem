import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Bounce, toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Cookies from 'js-cookie'
import { Meta } from '@/store/api'
import { usePathname } from '@/hooks/usePathname'
import { useUpdateStatusMutation } from '@/store/slices/website/kontenAPI/sliderAPI'
import { Searching } from '@/components/Searching'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { convertSlugToText } from '@/utils/formatText'
import {
  FormListDataPerPage,
  SelectListJenisHalaman,
} from '@/components/Select/website'
import { Pagination } from '@/components/Pagination'
import { Loading } from '@/components/Loading'
import { HalamanType } from '@/types/website/konten/halamanType'
import {
  useDeleteHalamanMutation,
  useGetHalamanQuery,
} from '@/store/slices/website/kontenAPI/halamanAPI'
import { TableSlider } from '@/components/Table/TableSlider'
import { columnsListDataHalaman } from '@/dummy/table'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useForm } from 'react-hook-form'
import { KategoriSchema } from '@/schemas/website/kategoriSchema'
import { Form } from '@/components/Form'

export default function Halaman() {
  const navigate = useNavigate()
  const { thirdPathname } = usePathname()

  const [search, setSearch] = useState<string>('')
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(12)
  const [isShowDelete, setIsShowDelete] = useState<boolean>(false)
  const [isShowStatus, setIsShowStatus] = useState<boolean>(false)
  const [idKategori, setIdKategori] = useState<string>()

  // --- Data Halaman ---
  const [halaman, setHalaman] = useState<HalamanType[]>()
  const [meta, setMeta] = useState<Meta>()

  const {
    data: dataHalaman,
    isFetching: isFetchingHalaman,
    isLoading: isLoadingHalaman,
    isError: isErrorHalaman,
    error: errorHalaman,
  } = useGetHalamanQuery({
    search: search,
    page_number: pageNumber,
    page_size: pageSize,
    id_jenis: idKategori ?? '',
  })

  const loadingHalaman = isLoadingHalaman || isFetchingHalaman

  useEffect(() => {
    if (dataHalaman?.data) {
      setHalaman(dataHalaman?.data?.data)
      setMeta(dataHalaman?.data?.meta)
    }
  }, [dataHalaman?.data, pageNumber, pageSize, search, idKategori])

  useEffect(() => {
    if (isErrorHalaman) {
      const errorMsg = errorHalaman as { data?: { message?: string } }

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
  }, [isErrorHalaman, errorHalaman])

  // --- Delete ---
  const [
    deleteHalaman,
    {
      isError: isErrorDeleteHalaman,
      isLoading: isLoadingDeleteHalaman,
      isSuccess: isSuccessDeleteHalaman,
      error: errorDeleteHalaman,
    },
  ] = useDeleteHalamanMutation()

  const handleSubmitDelete = async (id: string) => {
    try {
      await deleteHalaman({ id: id })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (isSuccessDeleteHalaman) {
      toast.success(`Delete ${thirdPathname} berhasil`, {
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
      setIsShowDelete(false)
    }
  }, [isSuccessDeleteHalaman])

  useEffect(() => {
    if (isErrorDeleteHalaman) {
      const errorMsg = errorDeleteHalaman as { data?: { message?: string } }

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
  }, [isErrorDeleteHalaman, errorDeleteHalaman])

  // --- Status Halaman ---
  const [
    statusHalaman,
    {
      isError: isErrorStatusHalaman,
      isLoading: isLoadingStatusHalaman,
      isSuccess: isSuccessStatusHalaman,
      error: errorStatusHalaman,
    },
  ] = useUpdateStatusMutation()

  const handleSubmitStatus = async (id: string, status: number) => {
    const body = {
      id: id,
      aktif: status === 0 ? 1 : 0,
    }
    try {
      await statusHalaman({ body: body })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (isSuccessStatusHalaman) {
      toast.success(`Update ${thirdPathname} berhasil`, {
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
      setIsShowStatus(false)
    }
  }, [isSuccessStatusHalaman])

  useEffect(() => {
    if (isErrorStatusHalaman) {
      const errorMsg = errorStatusHalaman as { data?: { message?: string } }

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
  }, [isErrorStatusHalaman, errorStatusHalaman])

  const form = useForm<zod.infer<typeof KategoriSchema>>({
    resolver: zodResolver(KategoriSchema),
    defaultValues: {},
  })

  return (
    <div className="scrollbar flex h-full flex-col gap-32 overflow-y-auto rounded-3x bg-white p-48">
      <div className="flex w-full flex-col gap-32">
        <div className="flex items-center justify-between gap-32 phones:items-start">
          <div className="flex w-2/3 items-center gap-32 phones:w-full phones:flex-col phones:items-start">
            <Searching
              setPageNumber={setPageNumber}
              setSearch={setSearch}
              className="w-1/2 phones:w-full"
              search={search}
            />
            <Form {...form}>
              <form>
                <SelectListJenisHalaman
                  useFormReturn={form}
                  name="kategori"
                  placeholder="Pilih Kategori"
                  setIdKategori={setIdKategori}
                  isDisabled={isLoadingHalaman}
                  className="phones:w-full"
                />
              </form>
            </Form>
          </div>
          <Link
            to="tambah"
            className="flex items-center gap-12 rounded-2xl bg-warna-primary px-24 py-16 text-white hover:bg-opacity-80"
          >
            <FontAwesomeIcon icon={faPlus} />
            <p className="phones:hidden">
              Tambah {convertSlugToText(thirdPathname)} Baru
            </p>
          </Link>
        </div>
        {loadingHalaman ? (
          <Loading />
        ) : (
          <>
            <TableSlider
              data={halaman}
              columns={columnsListDataHalaman}
              containerClasses="w-full h-full flex-1 overflow-y-auto scrollbar"
              loading={isLoadingHalaman}
              pageSize={pageSize}
              currentPage={pageNumber}
              isNumber
              isShowDelete={isShowDelete}
              setIsShowDelete={setIsShowDelete}
              handleSubmitDelete={handleSubmitDelete}
              isLoadingDelete={isLoadingDeleteHalaman}
              handleSubmitStatus={handleSubmitStatus}
              isLoadingStatus={isLoadingStatusHalaman}
              setIsShowStatus={setIsShowStatus}
              isShowStatus={isShowStatus}
              isDetail
            />
            <div className="flex justify-end">
              <div className="flex items-center gap-32">
                <FormListDataPerPage setDataPerPage={setPageSize} />
                {halaman?.length > 0 && (
                  <Pagination
                    pageNow={pageNumber ?? 0}
                    lastPage={meta?.last_page ?? 0}
                    setPageNumber={setPageNumber}
                  />
                )}
              </div>
            </div>
          </>
        )}
      </div>

      <ToastContainer />
    </div>
  )
}
