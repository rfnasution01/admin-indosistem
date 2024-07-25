import { ComingSoonPage } from '@/routes/loadables'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bounce, toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Cookies from 'js-cookie'
import { Meta } from '@/store/api'
import { usePathname } from '@/hooks/usePathname'

import { GetAlbumType } from '@/types/website/galeriType'
import {
  useDeleteAlbumMutation,
  useGetAlbumQuery,
} from '@/store/slices/website/galeriAPI'
import { GaleriAlbum, GaleriTab } from '@/features/website/galeri'
import { useAkses } from '@/hooks/useAkses'

export default function Galeri() {
  const navigate = useNavigate()
  const { secondPathname } = usePathname()
  const { isHakAksesHapus, isHakAksesTambah, isHakAksesUbah } = useAkses()

  const [menu, setMenu] = useState<string>('Album')

  const [search, setSearch] = useState<string>('')
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(12)
  const [isShowDelete, setIsShowDelete] = useState<boolean>(false)

  // --- Data Galeri ---
  const [galeri, setGaleri] = useState<GetAlbumType[]>()
  const [meta, setMeta] = useState<Meta>()

  const {
    data: dataGaleri,
    isFetching: isFetchingGaleri,
    isLoading: isLoadingGaleri,
    isError: isErrorGaleri,
    error: errorGaleri,
  } = useGetAlbumQuery({
    page_number: pageNumber,
    page_size: pageSize,
    search: search,
  })

  const loadingGaleri = isLoadingGaleri || isFetchingGaleri

  useEffect(() => {
    if (dataGaleri?.data) {
      setGaleri(dataGaleri?.data?.data)
      setMeta(dataGaleri?.data?.meta)
    }
  }, [dataGaleri?.data, pageNumber, pageSize, search, menu])

  useEffect(() => {
    if (isErrorGaleri) {
      const errorMsg = errorGaleri as { data?: { message?: string } }

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
  }, [isErrorGaleri, errorGaleri])

  // --- Delete ---
  const [
    deleteGaleri,
    {
      isError: isErrorDeleteGaleri,
      isLoading: isLoadingDeleteGaleri,
      isSuccess: isSuccessDeleteGaleri,
      error: errorDeleteGaleri,
    },
  ] = useDeleteAlbumMutation()

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
      await deleteGaleri({ id: id, jenis: secondPathname })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (isSuccessDeleteGaleri) {
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
  }, [isSuccessDeleteGaleri])

  useEffect(() => {
    if (isErrorDeleteGaleri) {
      const errorMsg = errorDeleteGaleri as { data?: { message?: string } }

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
  }, [isErrorDeleteGaleri, errorDeleteGaleri])

  return (
    <div className="scrollbar flex h-full flex-col gap-32 overflow-y-auto rounded-3x bg-white">
      <div className="flex">
        <GaleriTab
          menu={menu}
          setMenu={setMenu}
          setPageNumber={setPageNumber}
          setPageSize={setPageSize}
          setSearch={setSearch}
        />
      </div>

      <div className="scrollbar flex h-full flex-1 overflow-y-auto px-48">
        {menu === `Album` ? (
          <GaleriAlbum
            data={galeri}
            isLoadingGaleri={loadingGaleri}
            isLoadingDeleteGaleri={isLoadingDeleteGaleri}
            handleSubmitDelete={handleSubmitDelete}
            meta={meta}
            isShowDelete={isShowDelete}
            setPageNumber={setPageNumber}
            setSearch={setSearch}
            search={search}
            setIsShowDelete={setIsShowDelete}
            setPageSize={setPageSize}
            pageNumber={pageNumber}
            isHapus={isHakAksesHapus}
            isTambah={isHakAksesTambah}
            isUbah={isHakAksesUbah}
            pageSize={pageSize}
          />
        ) : (
          <ComingSoonPage />
        )}
      </div>

      <ToastContainer />
    </div>
  )
}
