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
import { FormListDataPerPage } from '@/components/Select/website'
import { Pagination } from '@/components/Pagination'
import { Loading } from '@/components/Loading'
import { TableSlider } from '@/components/Table/TableSlider'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useForm } from 'react-hook-form'
import { KategoriSchema } from '@/schemas/website/kategoriSchema'
import { Form } from '@/components/Form'
import { FAQType } from '@/types/website/konten/faqType'
import {
  useDeleteFAQMutation,
  useGetFAQQuery,
} from '@/store/slices/website/kontenAPI/faqAPI'
import { SelectListDownload } from '@/components/Select/website/SelectListDownload'
import { columnsListDataFAQ } from '@/dummy/table'
import { useAkses } from '@/hooks/useAkses'

export default function Faq() {
  const navigate = useNavigate()
  const { thirdPathname } = usePathname()
  const { isHakAksesHapus, isHakAksesTambah, isHakAksesUbah } = useAkses()

  const [search, setSearch] = useState<string>('')
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(12)
  const [isShowDelete, setIsShowDelete] = useState<boolean>(false)
  const [isShowStatus, setIsShowStatus] = useState<boolean>(false)
  const [idKategori, setIdKategori] = useState<string>()

  // --- Data FAQ ---
  const [FAQ, setFAQ] = useState<FAQType[]>()
  const [meta, setMeta] = useState<Meta>()

  const {
    data: dataFAQ,
    isFetching: isFetchingFAQ,
    isLoading: isLoadingFAQ,
    isError: isErrorFAQ,
    error: errorFAQ,
  } = useGetFAQQuery({
    search: search,
    page_number: pageNumber,
    page_size: pageSize,
    id_kategori: idKategori ?? '',
  })

  const loadingFAQ = isLoadingFAQ || isFetchingFAQ

  useEffect(() => {
    if (dataFAQ?.data) {
      setFAQ(dataFAQ?.data?.data)
      setMeta(dataFAQ?.data?.meta)
    }
  }, [dataFAQ?.data, pageNumber, pageSize, search, idKategori])

  useEffect(() => {
    if (isErrorFAQ) {
      const errorMsg = errorFAQ as { data?: { message?: string } }

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
  }, [isErrorFAQ, errorFAQ])

  // --- Delete ---
  const [
    deleteFAQ,
    {
      isError: isErrorDeleteFAQ,
      isLoading: isLoadingDeleteFAQ,
      isSuccess: isSuccessDeleteFAQ,
      error: errorDeleteFAQ,
    },
  ] = useDeleteFAQMutation()

  const handleSubmitDelete = async (id: string) => {
    if (!isHakAksesHapus) {
      toast.error(`Maaf, anda tidak memiliki akses untuk menghapus data`, {
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

    try {
      await deleteFAQ({ id: id })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (isSuccessDeleteFAQ) {
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
  }, [isSuccessDeleteFAQ])

  useEffect(() => {
    if (isErrorDeleteFAQ) {
      const errorMsg = errorDeleteFAQ as { data?: { message?: string } }

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
  }, [isErrorDeleteFAQ, errorDeleteFAQ])

  // --- Status FAQ ---
  const [
    statusFAQ,
    {
      isError: isErrorStatusFAQ,
      isLoading: isLoadingStatusFAQ,
      isSuccess: isSuccessStatusFAQ,
      error: errorStatusFAQ,
    },
  ] = useUpdateStatusMutation()

  const handleSubmitStatus = async (id: string, status: number) => {
    const body = {
      id: id,
      aktif: status === 0 ? 1 : 0,
    }

    if (!isHakAksesUbah) {
      toast.error(`Maaf, anda tidak memiliki akses untuk mengupdate data`, {
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

    try {
      await statusFAQ({ body: body })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (isSuccessStatusFAQ) {
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
  }, [isSuccessStatusFAQ])

  useEffect(() => {
    if (isErrorStatusFAQ) {
      const errorMsg = errorStatusFAQ as { data?: { message?: string } }

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
  }, [isErrorStatusFAQ, errorStatusFAQ])

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
                <SelectListDownload
                  useFormReturn={form}
                  name="kategori"
                  placeholder="Pilih Kategori"
                  setIdKategori={setIdKategori}
                  isDisabled={isLoadingFAQ}
                  className="phones:w-full"
                  jenis="faq"
                />
              </form>
            </Form>
          </div>
          {isHakAksesTambah && (
            <Link
              to="tambah"
              className="flex items-center gap-12 rounded-2xl bg-warna-primary px-24 py-16 text-white hover:bg-opacity-80"
            >
              <FontAwesomeIcon icon={faPlus} />
              <p className="phones:hidden">
                Tambah {convertSlugToText(thirdPathname)} Baru
              </p>
            </Link>
          )}
        </div>
        {loadingFAQ ? (
          <Loading />
        ) : (
          <>
            <TableSlider
              data={FAQ}
              columns={columnsListDataFAQ}
              containerClasses="w-full h-full flex-1 overflow-y-auto scrollbar"
              loading={isLoadingFAQ}
              pageSize={pageSize}
              currentPage={pageNumber}
              isNumber
              isShowDelete={isShowDelete}
              setIsShowDelete={setIsShowDelete}
              handleSubmitDelete={handleSubmitDelete}
              isLoadingDelete={isLoadingDeleteFAQ}
              handleSubmitStatus={handleSubmitStatus}
              isLoadingStatus={isLoadingStatusFAQ}
              setIsShowStatus={setIsShowStatus}
              isShowStatus={isShowStatus}
              isDetail
              isHapus={isHakAksesHapus}
              isUbah={isHakAksesUbah}
            />
            <div className="flex justify-end">
              <div className="flex items-center gap-32">
                <FormListDataPerPage setDataPerPage={setPageSize} />
                {FAQ?.length > 0 && (
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
