import { ComingSoonPage } from '@/routes/loadables'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bounce, toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Cookies from 'js-cookie'
import { Meta } from '@/store/api'
import {
  KategoriTab,
  KategoriTable,
  KategoriPublish,
  BeritaDashboard,
} from '@/features/website/kategori'
import { usePathname } from '@/hooks/usePathname'
import { GetKategoriType } from '@/types/website/kategoriType'
import {
  useDeleteKategoriMutation,
  useGetKategoriQuery,
  useUpdatePublishMutation,
} from '@/store/slices/website/kategoriAPI'
import { convertSlugToText } from '@/utils/formatText'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useForm } from 'react-hook-form'
import { KategoriSchema } from '@/schemas/website/kategoriSchema'
import { useAkses } from '@/hooks/useAkses'

export default function Kategori() {
  const navigate = useNavigate()
  const { secondPathname } = usePathname()
  const { isHakAksesHapus, isHakAksesTambah, isHakAksesUbah } = useAkses()

  const [menu, setMenu] = useState<string>('')

  const defaultMenus = {
    pengumuman: 'Publish',
    mading: 'Publish',
    berita: 'Dashboard',
    agenda: 'Publish',
    prestasi: 'Publish',
  }

  useEffect(() => {
    if (secondPathname) {
      setMenu(defaultMenus[secondPathname] || '')
    }
  }, [secondPathname, setMenu])

  const [search, setSearch] = useState<string>('')
  const [id_kategori, setIdKategori] = useState<string>('')
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(12)
  const [isShowDelete, setIsShowDelete] = useState<boolean>(false)
  const [isShowPublish, setIsShowPublish] = useState<boolean>(false)

  const form = useForm<zod.infer<typeof KategoriSchema>>({
    resolver: zodResolver(KategoriSchema),
    defaultValues: {},
  })

  // --- Data Kategori ---
  const [kategori, setKategori] = useState<GetKategoriType[]>()
  const [meta, setMeta] = useState<Meta>()

  const {
    data: dataKategori,
    isFetching: isFetchingKategori,
    isLoading: isLoadingKategori,
    isError: isErrorKategori,
    error: errorKategori,
    isSuccess: isSuccessKategori,
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
    if (isSuccessKategori) {
      form.reset()
      setIdKategori('')
    }
  }, [isSuccessKategori])

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
    if (!isHakAksesHapus) {
      toast.error(`Maaf, anda tidak memiliki akses untuk menghapus data ini`, {
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

    if (!isHakAksesUbah) {
      toast.error(`Maaf, anda tidak memiliki akses untuk mengubah data ini`, {
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
      <div className="flex">
        <KategoriTab
          menu={menu}
          setMenu={setMenu}
          setPageNumber={setPageNumber}
          setPageSize={setPageSize}
          setSearch={setSearch}
        />
      </div>

      <div className="scrollbar flex h-full flex-1 overflow-y-auto px-48">
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
            form={form}
            isUbah={isHakAksesUbah}
            isHapus={isHakAksesHapus}
            isTambah={isHakAksesTambah}
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
            pageNumber={pageNumber}
            setPageSize={setPageSize}
            meta={meta}
            isHapus={isHakAksesHapus}
            isTambah={isHakAksesTambah}
            isUbah={isHakAksesUbah}
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
            pageNumber={pageNumber}
            setPageSize={setPageSize}
            meta={meta}
            isHapus={isHakAksesHapus}
            isTambah={isHakAksesTambah}
            isUbah={isHakAksesUbah}
          />
        ) : menu === 'Dashboard' ? (
          <BeritaDashboard />
        ) : (
          <ComingSoonPage />
        )}
      </div>

      <ToastContainer />
    </div>
  )
}
