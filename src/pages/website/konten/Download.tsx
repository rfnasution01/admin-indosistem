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
import { Pagination } from '@/components/Pagination'
import { Loading } from '@/components/Loading'
import { TableSlider } from '@/components/Table/TableSlider'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useForm } from 'react-hook-form'
import { KategoriSchema } from '@/schemas/website/kategoriSchema'
import { Form } from '@/components/Form'
import { SelectListDownload } from '@/components/Select/website/SelectListDownload'
import { columnsListDataDownload } from '@/dummy/table'
import { DownloadType } from '@/types/website/konten/downloadType'
import {
  useDeleteDownloadMutation,
  useGetDownloadQuery,
} from '@/store/slices/website/kontenAPI/downloadAPI'
import { useAkses } from '@/hooks/useAkses'
import { MenubarPerPage } from '@/components/Menubar/MenubarPerPage'

export default function Download() {
  const navigate = useNavigate()
  const { thirdPathname } = usePathname()
  const { isHakAksesHapus, isHakAksesTambah, isHakAksesUbah } = useAkses()

  const [search, setSearch] = useState<string>('')
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [isShowDelete, setIsShowDelete] = useState<boolean>(false)
  const [isShowStatus, setIsShowStatus] = useState<boolean>(false)
  const [idKategori, setIdKategori] = useState<string>()

  // --- Data Download ---
  const [Download, setDownload] = useState<DownloadType[]>()
  const [meta, setMeta] = useState<Meta>()

  const {
    data: dataDownload,
    isFetching: isFetchingDownload,
    isLoading: isLoadingDownload,
    isError: isErrorDownload,
    error: errorDownload,
  } = useGetDownloadQuery({
    search: search,
    page_number: pageNumber,
    page_size: pageSize,
    id_kategori: idKategori ?? '',
  })

  const loadingDownload = isLoadingDownload || isFetchingDownload

  useEffect(() => {
    if (dataDownload?.data) {
      setDownload(dataDownload?.data?.data)
      setMeta(dataDownload?.data?.meta)
    }
  }, [dataDownload?.data, pageNumber, pageSize, search, idKategori])

  useEffect(() => {
    if (isErrorDownload) {
      const errorMsg = errorDownload as { data?: { message?: string } }

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
  }, [isErrorDownload, errorDownload])

  // --- Delete ---
  const [
    deleteDownload,
    {
      isError: isErrorDeleteDownload,
      isLoading: isLoadingDeleteDownload,
      isSuccess: isSuccessDeleteDownload,
      error: errorDeleteDownload,
    },
  ] = useDeleteDownloadMutation()

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
      await deleteDownload({ id: id })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (isSuccessDeleteDownload) {
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
  }, [isSuccessDeleteDownload])

  useEffect(() => {
    if (isErrorDeleteDownload) {
      const errorMsg = errorDeleteDownload as { data?: { message?: string } }

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
  }, [isErrorDeleteDownload, errorDeleteDownload])

  // --- Status Download ---
  const [
    statusDownload,
    {
      isError: isErrorStatusDownload,
      isLoading: isLoadingStatusDownload,
      isSuccess: isSuccessStatusDownload,
      error: errorStatusDownload,
    },
  ] = useUpdateStatusMutation()

  const handleSubmitStatus = async (id: string, status: number) => {
    const body = {
      id: id,
      aktif: status === 0 ? 1 : 0,
    }

    if (!isHakAksesUbah) {
      toast.error(`Maaf, anda tidak memiliki akses untuk mengubah data`, {
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
      await statusDownload({ body: body })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (isSuccessStatusDownload) {
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
  }, [isSuccessStatusDownload])

  useEffect(() => {
    if (isErrorStatusDownload) {
      const errorMsg = errorStatusDownload as { data?: { message?: string } }

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
  }, [isErrorStatusDownload, errorStatusDownload])

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
                  isDisabled={isLoadingDownload}
                  className="phones:w-full"
                  jenis="download"
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
        {loadingDownload ? (
          <Loading />
        ) : (
          <>
            <TableSlider
              data={Download}
              columns={columnsListDataDownload}
              containerClasses="w-full h-full flex-1 overflow-y-auto scrollbar"
              loading={isLoadingDownload}
              pageSize={pageSize}
              currentPage={pageNumber}
              isNumber
              isShowDelete={isShowDelete}
              setIsShowDelete={setIsShowDelete}
              handleSubmitDelete={handleSubmitDelete}
              isLoadingDelete={isLoadingDeleteDownload}
              handleSubmitStatus={handleSubmitStatus}
              isLoadingStatus={isLoadingStatusDownload}
              setIsShowStatus={setIsShowStatus}
              isShowStatus={isShowStatus}
              isHapus={isHakAksesHapus}
              isUbah={isHakAksesUbah}
              isDetail
            />
            {Download?.length > 0 && (
              <div className="flex justify-end">
                <div className="flex items-center gap-32">
                  <MenubarPerPage
                    pageSize={pageSize}
                    setPageSize={setPageSize}
                  />
                  <Pagination
                    pageNow={pageNumber ?? 0}
                    lastPage={meta?.last_page ?? 0}
                    setPageNumber={setPageNumber}
                  />
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <ToastContainer />
    </div>
  )
}
