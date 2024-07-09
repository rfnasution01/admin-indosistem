import { ComingSoonPage } from '@/routes/loadables'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bounce, toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Cookies from 'js-cookie'
import { Meta } from '@/store/api'
import { Loading } from '@/components/Loading'
import { KategoriTab, KategoriTable } from '@/features/website/kategori'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useForm } from 'react-hook-form'
import FormTambahKategori from '@/components/Form/website/kategori/FormTambahKategori'
import { usePathname } from '@/hooks/usePathname'
import { GetKategoriType } from '@/types/website/kategoriType'
import { TambahKategoriSchema } from '@/schemas/website/kategoriSchema'
import {
  useCreateKategoriMutation,
  useDeleteKategoriMutation,
  useGetKategoriQuery,
  useUpdatePublishMutation,
} from '@/store/slices/website/kategoriAPI'
import { convertSlugToText } from '@/utils/formatText'

export default function Kategori() {
  const navigate = useNavigate()
  const { secondPathname } = usePathname()

  const [menu, setMenu] = useState<string>(
    `Riwayat ${convertSlugToText(secondPathname)}`,
  )
  const [search, setSearch] = useState<string>('')
  const [id_kategori, setIdKategori] = useState<string>('')
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(5)
  const [isShow, setIsShow] = useState<boolean>(false)
  const [isShowPublish, setIsShowPublish] = useState<boolean>(false)

  // --- Data Kategori ---
  const [dataKategori, setDataKategori] = useState<GetKategoriType[]>()
  const [meta, setMeta] = useState<Meta>()

  const [isSubmit, setIsSubmit] = useState<boolean>(false)
  const [isShowCrate, setIsShowCreate] = useState<boolean>(false)

  const form = useForm<zod.infer<typeof TambahKategoriSchema>>({
    resolver: zodResolver(TambahKategoriSchema),
    defaultValues: {},
  })

  const {
    data: dataKategoriSekolah,
    isFetching: isFetchingKategoriSekolah,
    isLoading: isLoadingKategoriSekolah,
    isError: isErrorKategoriSekolah,
    error: errorKategoriSekolah,
  } = useGetKategoriQuery({
    id_kategori: id_kategori,
    search: search,
    page_number: pageNumber,
    page_size: pageSize,
    jenis: secondPathname,
  })

  const loadingKategoriSekolah =
    isLoadingKategoriSekolah || isFetchingKategoriSekolah

  useEffect(() => {
    if (dataKategoriSekolah?.data) {
      setDataKategori(dataKategoriSekolah?.data?.data)
      setMeta(dataKategoriSekolah?.data?.meta)
    }
  }, [dataKategoriSekolah?.data, pageNumber, pageSize, search, id_kategori])

  useEffect(() => {
    if (isErrorKategoriSekolah) {
      const errorMsg = errorKategoriSekolah as { data?: { message?: string } }

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
  }, [isErrorKategoriSekolah, errorKategoriSekolah])

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
      setIsShow(false)
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

  // --- Create Tambah Kategori ---
  const [
    createTambahKategori,
    {
      isError: isErrorTambahKategori,
      error: errorTambahKategori,
      isLoading: isLoadingTambahKategori,
      isSuccess: isSuccessTambahKategori,
    },
  ] = useCreateKategoriMutation()

  const handleSubmit = async () => {
    const values = form.getValues()

    const body = {
      id_kategori: values?.id_kategori,
      id_tags: values?.id_tags ?? [],
      tanggal: values?.tanggal ?? '',
      judul: values?.judul ?? '',
      isi: values?.isi ?? '',
      publish: values?.publish ?? '1',
      gambar: values?.gambar ?? [],
    }

    if (isSubmit && isShowCrate) {
      try {
        await createTambahKategori({ body: body, jenis: secondPathname })
      } catch (error) {
        console.error(error)
      }
    }
  }

  useEffect(() => {
    if (isSuccessTambahKategori) {
      toast.success(`Tambah ${secondPathname} berhasil`, {
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
      setTimeout(() => {
        setIsShowCreate(false)
        setIsSubmit(false)
        setMenu(`Riwayat ${convertSlugToText(secondPathname)}`)
        form.reset()
      }, 3000)
    }
  }, [isSuccessTambahKategori])

  useEffect(() => {
    if (isErrorTambahKategori) {
      const errorMsg = errorTambahKategori as { data?: { message?: string } }

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
  }, [isErrorTambahKategori, errorTambahKategori])

  return (
    <div className="scrollbar flex h-full flex-col gap-32 overflow-y-auto rounded-3x bg-white">
      {loadingKategoriSekolah ? (
        <Loading />
      ) : (
        <>
          <div className="flex">
            <KategoriTab menu={menu} setMenu={setMenu} />
          </div>
          <div className="scrollbar flex h-full flex-1 overflow-y-auto px-48 pb-48">
            {menu === `Riwayat ${convertSlugToText(secondPathname)}` ? (
              <KategoriTable
                data={dataKategori}
                meta={meta}
                setPageNumber={setPageNumber}
                setPageSize={setPageSize}
                setSearch={setSearch}
                setIdKategori={setIdKategori}
                search={search}
                isLoading={loadingKategoriSekolah}
                pageNumber={pageNumber}
                pageSize={pageSize}
                isShow={isShow}
                setIsShow={setIsShow}
                handleSubmitDelete={handleSubmitDelete}
                isLoadingDelete={isLoadingDeleteKategori}
                isLoadingPublish={isLoadingPublishKategori}
                setIsShowPublish={setIsShowPublish}
                isShowPublish={isShowPublish}
                handleSubmitPublish={handleSubmitPublish}
              />
            ) : menu === `Buat ${convertSlugToText(secondPathname)}` ? (
              <FormTambahKategori
                form={form}
                isLoading={isLoadingTambahKategori}
                handleSubmit={handleSubmit}
                setIsShow={setIsShowCreate}
                setIsSubmit={setIsSubmit}
                isShow={isShowCrate}
                isSubmit={isSubmit}
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
