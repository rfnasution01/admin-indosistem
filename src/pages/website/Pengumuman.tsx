import { ComingSoonPage } from '@/routes/loadables'
import { GetPengumumanType } from '@/types/website/pengumumanType'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bounce, toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Cookies from 'js-cookie'
import {
  useDeletePengumumanMutation,
  useGetPengumumanQuery,
  useUpdatePublishMutation,
} from '@/store/slices/website/pengumumanAPI'
import { Meta } from '@/store/api'
import { Loading } from '@/components/Loading'
import { PengumumanTab, PengumumanTable } from '@/features/website/pengumuman'

export default function Pengumuman() {
  const navigate = useNavigate()

  const [menu, setMenu] = useState<string>('Riwayat Pengumuman')
  const [search, setSearch] = useState<string>('')
  const [id_kategori, setIdKategori] = useState<string>('')
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(5)
  const [isShow, setIsShow] = useState<boolean>(false)
  const [isShowPublish, setIsShowPublish] = useState<boolean>(false)

  // --- Data Pengumuman ---
  const [dataPengumuman, setDataPengumuman] = useState<GetPengumumanType[]>()
  const [meta, setMeta] = useState<Meta>()

  const {
    data: dataPengumumanSekolah,
    isFetching: isFetchingPengumumanSekolah,
    isLoading: isLoadingPengumumanSekolah,
    isError: isErrorPengumumanSekolah,
    error: errorPengumumanSekolah,
  } = useGetPengumumanQuery({
    id_kategori: id_kategori,
    search: search,
    page_number: pageNumber,
    page_size: pageSize,
  })

  const loadingPengumumanSekolah =
    isLoadingPengumumanSekolah || isFetchingPengumumanSekolah

  useEffect(() => {
    if (dataPengumumanSekolah?.data) {
      setDataPengumuman(dataPengumumanSekolah?.data?.data)
      setMeta(dataPengumumanSekolah?.data?.meta)
    }
  }, [dataPengumumanSekolah?.data, pageNumber, pageSize, search, id_kategori])

  useEffect(() => {
    if (isErrorPengumumanSekolah) {
      const errorMsg = errorPengumumanSekolah as { data?: { message?: string } }

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
  }, [isErrorPengumumanSekolah, errorPengumumanSekolah])

  // --- Delete ---
  const [
    deletePengumuman,
    {
      isError: isErrorDeletePengumuman,
      isLoading: isLoadingDeletePengumuman,
      isSuccess: isSuccessDeletePengumuman,
      error: errorDeletePengumuman,
    },
  ] = useDeletePengumumanMutation()

  const handleSubmitDelete = async (id: string) => {
    try {
      await deletePengumuman({ id: id })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (isSuccessDeletePengumuman) {
      toast.success('Delete Pengumuman berhasil', {
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
  }, [isSuccessDeletePengumuman])

  useEffect(() => {
    if (isErrorDeletePengumuman) {
      const errorMsg = errorDeletePengumuman as { data?: { message?: string } }

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
  }, [isErrorDeletePengumuman, errorDeletePengumuman])

  // --- Publish Pengumuman ---
  const [
    publishPengumuman,
    {
      isError: isErrorPublishPengumuman,
      isLoading: isLoadingPublishPengumuman,
      isSuccess: isSuccessPublishPengumuman,
      error: errorPublishPengumuman,
    },
  ] = useUpdatePublishMutation()

  const handleSubmitPublish = async (id: string, publish: string) => {
    const body = {
      id: id,
      publish: publish,
    }
    try {
      await publishPengumuman({ body: body })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (isSuccessPublishPengumuman) {
      toast.success('Update pengumuman berhasil', {
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
      setIsShowPublish(false)
    }
  }, [isSuccessPublishPengumuman])

  useEffect(() => {
    if (isErrorPublishPengumuman) {
      const errorMsg = errorPublishPengumuman as { data?: { message?: string } }

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
  }, [isErrorPublishPengumuman, errorPublishPengumuman])

  return (
    <div className="scrollbar flex h-full flex-col gap-32 overflow-y-auto rounded-3x bg-white">
      {loadingPengumumanSekolah ? (
        <Loading />
      ) : (
        <>
          <div className="flex">
            <PengumumanTab menu={menu} setMenu={setMenu} />
          </div>
          <div className="scrollbar flex h-full flex-1 overflow-y-auto px-48 pb-48">
            {menu === 'Riwayat Pengumuman' ? (
              <PengumumanTable
                data={dataPengumuman}
                meta={meta}
                setPageNumber={setPageNumber}
                setPageSize={setPageSize}
                setSearch={setSearch}
                setIdKategori={setIdKategori}
                search={search}
                isLoading={loadingPengumumanSekolah}
                pageNumber={pageNumber}
                pageSize={pageSize}
                isShow={isShow}
                setIsShow={setIsShow}
                handleSubmitDelete={handleSubmitDelete}
                isLoadingDelete={isLoadingDeletePengumuman}
                isLoadingPublish={isLoadingPublishPengumuman}
                setIsShowPublish={setIsShowPublish}
                isShowPublish={isShowPublish}
                handleSubmitPublish={handleSubmitPublish}
              />
            ) : (
              <ComingSoonPage />
            )}
          </div>
        </>
      )}
      <ToastContainer />
    </div>
  )
}
