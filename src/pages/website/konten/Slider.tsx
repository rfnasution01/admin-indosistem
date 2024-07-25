import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Bounce, toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Cookies from 'js-cookie'
import { Meta } from '@/store/api'
import { usePathname } from '@/hooks/usePathname'
import { SliderType } from '@/types/website/konten/sliderType'
import {
  useDeleteSliderMutation,
  useGetSliderQuery,
  useUpdateStatusMutation,
} from '@/store/slices/website/kontenAPI/sliderAPI'
import { Searching } from '@/components/Searching'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { convertSlugToText } from '@/utils/formatText'
import { Pagination } from '@/components/Pagination'
import { TableSlider } from '@/components/Table/TableSlider'
import { columnsListDataSlider } from '@/dummy/table'
import { Loading } from '@/components/Loading'
import { useAkses } from '@/hooks/useAkses'
import { MenubarPerPage } from '@/components/Menubar/MenubarPerPage'

export default function Slider() {
  const navigate = useNavigate()
  const { thirdPathname } = usePathname()
  const { isHakAksesHapus, isHakAksesTambah, isHakAksesUbah } = useAkses()

  const [search, setSearch] = useState<string>('')
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [isShowDelete, setIsShowDelete] = useState<boolean>(false)
  const [isShowStatus, setIsShowStatus] = useState<boolean>(false)

  // --- Data Slider ---
  const [slider, setSlider] = useState<SliderType[]>()
  const [meta, setMeta] = useState<Meta>()

  const {
    data: dataSlider,
    isFetching: isFetchingSlider,
    isLoading: isLoadingSlider,
    isError: isErrorSlider,
    error: errorSlider,
  } = useGetSliderQuery({
    search: search,
    page_number: pageNumber,
    page_size: pageSize,
  })

  const loadingSlider = isLoadingSlider || isFetchingSlider

  useEffect(() => {
    if (dataSlider?.data) {
      setSlider(dataSlider?.data?.data)
      setMeta(dataSlider?.data?.meta)
    }
  }, [dataSlider?.data, pageNumber, pageSize, search])

  useEffect(() => {
    if (isErrorSlider) {
      const errorMsg = errorSlider as { data?: { message?: string } }

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
  }, [isErrorSlider, errorSlider])

  // --- Delete ---
  const [
    deleteSlider,
    {
      isError: isErrorDeleteSlider,
      isLoading: isLoadingDeleteSlider,
      isSuccess: isSuccessDeleteSlider,
      error: errorDeleteSlider,
    },
  ] = useDeleteSliderMutation()

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
      await deleteSlider({ id: id })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (isSuccessDeleteSlider) {
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
  }, [isSuccessDeleteSlider])

  useEffect(() => {
    if (isErrorDeleteSlider) {
      const errorMsg = errorDeleteSlider as { data?: { message?: string } }

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
  }, [isErrorDeleteSlider, errorDeleteSlider])

  // --- Status Slider ---
  const [
    statusSlider,
    {
      isError: isErrorStatusSlider,
      isLoading: isLoadingStatusSlider,
      isSuccess: isSuccessStatusSlider,
      error: errorStatusSlider,
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
      await statusSlider({ body: body })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (isSuccessStatusSlider) {
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
  }, [isSuccessStatusSlider])

  useEffect(() => {
    if (isErrorStatusSlider) {
      const errorMsg = errorStatusSlider as { data?: { message?: string } }

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
  }, [isErrorStatusSlider, errorStatusSlider])

  return (
    <div className="scrollbar flex h-full flex-col gap-32 overflow-y-auto rounded-3x bg-white p-48">
      <div className="scrollbar flex h-full w-full flex-col gap-32 overflow-y-auto">
        <div className="flex items-center justify-between gap-32 phones:items-start">
          <div className="flex w-2/3 items-center gap-32 phones:w-full phones:flex-col phones:items-start">
            <Searching
              setPageNumber={setPageNumber}
              setSearch={setSearch}
              className="w-1/2 phones:w-full"
              search={search}
            />
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
        {loadingSlider ? (
          <Loading />
        ) : (
          <>
            <TableSlider
              data={slider}
              columns={columnsListDataSlider}
              containerClasses="w-full h-full flex-1 overflow-y-auto scrollbar"
              loading={isLoadingSlider}
              pageSize={pageSize}
              currentPage={pageNumber}
              isNumber
              isShowDelete={isShowDelete}
              setIsShowDelete={setIsShowDelete}
              handleSubmitDelete={handleSubmitDelete}
              isLoadingDelete={isLoadingDeleteSlider}
              isSlider
              isDetail
              handleSubmitStatus={handleSubmitStatus}
              isLoadingStatus={isLoadingStatusSlider}
              setIsShowStatus={setIsShowStatus}
              isShowStatus={isShowStatus}
              isHapus={isHakAksesHapus}
              isUbah={isHakAksesUbah}
            />
            <div className="flex justify-end">
              <div className="flex items-center gap-32">
                <MenubarPerPage pageSize={pageSize} setPageSize={setPageSize} />
                {slider?.length > 0 && (
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
