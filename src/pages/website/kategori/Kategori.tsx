import { ComingSoonPage } from '@/routes/loadables'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bounce, toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Cookies from 'js-cookie'
import { Meta } from '@/store/api'
import { Loading } from '@/components/Loading'
import {
  KategoriTab,
  KategoriTable,
  KategoriPublish,
} from '@/features/website/kategori'
import { usePathname } from '@/hooks/usePathname'
import { GetKategoriType } from '@/types/website/kategoriType'
import {
  useDeleteKategoriMutation,
  useGetKategoriQuery,
  useUpdatePublishMutation,
} from '@/store/slices/website/kategoriAPI'
import { convertSlugToText } from '@/utils/formatText'

export default function Kategori() {
  const navigate = useNavigate()
  const { secondPathname } = usePathname()

  const [menu, setMenu] = useState<string>()

  const [search, setSearch] = useState<string>('')
  const [id_kategori, setIdKategori] = useState<string>('')
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(5)
  const [isShowDelete, setIsShowDelete] = useState<boolean>(false)
  const [isShowPublish, setIsShowPublish] = useState<boolean>(false)

  // --- Data Kategori ---
  const [kategori, setKategori] = useState<GetKategoriType[]>()
  const [meta, setMeta] = useState<Meta>()

  const {
    data: dataKategori,
    isFetching: isFetchingKategori,
    isLoading: isLoadingKategori,
    isError: isErrorKategori,
    error: errorKategori,
  } = useGetKategoriQuery({
    id_kategori: id_kategori,
    search: search,
    page_number: pageNumber,
    page_size: pageSize,
    jenis: secondPathname,
    status: menu === 'Publish' ? '1' : menu === 'Draft' ? '0' : '',
  })

  const loadingKategori = isLoadingKategori || isFetchingKategori

  useEffect(() => {
    if (dataKategori?.data) {
      setKategori(dataKategori?.data?.data)
      setMeta(dataKategori?.data?.meta)
    }
  }, [dataKategori?.data, pageNumber, pageSize, search, id_kategori, menu])

  useEffect(() => {
    if (isErrorKategori) {
      const errorMsg = errorKategori as { data?: { message?: string } }

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
  }, [isErrorKategori, errorKategori])

  // --- Delete ---
  const [
    deleteKategori,
    {
      isError: isErrorDeleteKategori,
      isLoading: isLoadingDeleteKategori,
      isSuccess: isSuccessDeleteKategori,
      error: errorDeleteKategori,
    },
  ] = useDeleteKategoriMutation()

  const handleSubmitDelete = async (id: string) => {
    try {
      await deleteKategori({ id: id, jenis: secondPathname })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (isSuccessDeleteKategori) {
      toast.success(`Delete ${secondPathname} berhasil`, {
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
  }, [isSuccessDeleteKategori])

  useEffect(() => {
    if (isErrorDeleteKategori) {
      const errorMsg = errorDeleteKategori as { data?: { message?: string } }

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
  }, [isErrorDeleteKategori, errorDeleteKategori])

  // --- Publish Kategori ---
  const [
    publishKategori,
    {
      isError: isErrorPublishKategori,
      isLoading: isLoadingPublishKategori,
      isSuccess: isSuccessPublishKategori,
      error: errorPublishKategori,
    },
  ] = useUpdatePublishMutation()

  const handleSubmitPublish = async (id: string, publish: string) => {
    const body = {
      id: id,
      publish: publish,
    }
    try {
      await publishKategori({ body: body, jenis: secondPathname })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (isSuccessPublishKategori) {
      toast.success(`Update ${secondPathname} berhasil`, {
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
  }, [isSuccessPublishKategori])

  useEffect(() => {
    if (isErrorPublishKategori) {
      const errorMsg = errorPublishKategori as { data?: { message?: string } }

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
  }, [isErrorPublishKategori, errorPublishKategori])

  return (
    <div className="scrollbar flex h-full flex-col gap-32 overflow-y-auto rounded-3x bg-white">
      {loadingKategori ? (
        <Loading />
      ) : (
        <>
          <div className="flex">
            <KategoriTab menu={menu} setMenu={setMenu} />
          </div>

          <div className="scrollbar flex h-full flex-1 overflow-y-auto px-48 pb-48">
            {menu === `Semua ${convertSlugToText(secondPathname)}` ? (
              <KategoriTable
                data={kategori}
                meta={meta}
                setPageNumber={setPageNumber}
                setPageSize={setPageSize}
                setSearch={setSearch}
                setIdKategori={setIdKategori}
                search={search}
                isLoading={loadingKategori}
                pageNumber={pageNumber}
                pageSize={pageSize}
                isShowDelete={isShowDelete}
                setIsShowDelete={setIsShowDelete}
                handleSubmitDelete={handleSubmitDelete}
                isLoadingDelete={isLoadingDeleteKategori}
                isLoadingPublish={isLoadingPublishKategori}
                setIsShowPublish={setIsShowPublish}
                isShowPublish={isShowPublish}
                handleSubmitPublish={handleSubmitPublish}
              />
            ) : menu === 'Publish' ? (
              <KategoriPublish
                isPublish
                loadingKategori={loadingKategori}
                kategori={kategori}
                search={search}
                setPageNumber={setPageNumber}
                setSearch={setSearch}
                handleSubmitDelete={handleSubmitDelete}
                handleSubmitPublish={handleSubmitPublish}
                isShowDelete={isShowDelete}
                isShowPublish={isShowPublish}
                setIsShowDelete={setIsShowDelete}
                setIsShowPublish={setIsShowPublish}
                isLoadingDelete={isLoadingDeleteKategori}
                isLoadingPublish={isLoadingPublishKategori}
              />
            ) : menu === 'Draft' ? (
              <KategoriPublish
                loadingKategori={loadingKategori}
                kategori={kategori}
                search={search}
                setPageNumber={setPageNumber}
                setSearch={setSearch}
                handleSubmitDelete={handleSubmitDelete}
                handleSubmitPublish={handleSubmitPublish}
                isShowDelete={isShowDelete}
                isShowPublish={isShowPublish}
                setIsShowDelete={setIsShowDelete}
                setIsShowPublish={setIsShowPublish}
                isLoadingDelete={isLoadingDeleteKategori}
                isLoadingPublish={isLoadingPublishKategori}
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
