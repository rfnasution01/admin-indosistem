import { Meta } from '@/store/api'
import {
  useDeleteGambarAlbumMutation,
  useGetAlbumDetailQuery,
} from '@/store/slices/website/galeriAPI'
import { GetAlbumType } from '@/types/website/galeriType'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bounce, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Cookies from 'js-cookie'
import { Breadcrumb } from '@/components/Breadcrumb'
import { Loading } from '@/components/Loading'
import { GaleriDetail } from '@/features/website/galeri'

export default function DetailGaleri() {
  const navigate = useNavigate()

  const idEdit = localStorage.getItem('editID') ?? null

  const [pageNumber, setPageNumber] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(12)
  const [isShowDelete, setIsShowDelete] = useState<boolean>(false)

  // --- Data DetailGaleri ---
  const [detailGaleri, setDetailGaleri] = useState<GetAlbumType>()
  const [photo, setPhoto] = useState<GetAlbumType[]>()
  const [meta, setMeta] = useState<Meta>()

  const {
    data: dataDetailGaleriSekolah,
    isLoading: isLoadingDetailGaleriSekolah,
    isFetching: isFetchingDetailGaleriSekolah,
    isError: isErrorDetailGaleriSekolah,
    error: errorDetailGaleriSekolah,
  } = useGetAlbumDetailQuery(
    {
      id: idEdit,
      page_number: pageNumber,
      page_size: pageSize,
    },
    { skip: !idEdit },
  )

  const loadingDetail =
    isFetchingDetailGaleriSekolah || isLoadingDetailGaleriSekolah

  useEffect(() => {
    if (dataDetailGaleriSekolah?.data) {
      setDetailGaleri(dataDetailGaleriSekolah?.data?.data)
      setMeta(dataDetailGaleriSekolah?.data?.meta)
      setPhoto(dataDetailGaleriSekolah?.data?.photo)
    }
  }, [dataDetailGaleriSekolah?.data, pageNumber, pageSize, idEdit])

  useEffect(() => {
    if (isErrorDetailGaleriSekolah) {
      const errorMsg = errorDetailGaleriSekolah as {
        data?: { message?: string }
      }

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
  }, [isErrorDetailGaleriSekolah, errorDetailGaleriSekolah])

  // --- Delete ---
  const [
    deleteGambar,
    {
      isError: isErrorDeleteGambar,
      isSuccess: isSuccessDeleteGambar,
      error: errorDeleteGambar,
    },
  ] = useDeleteGambarAlbumMutation()

  const handleSubmitDeleteGambar = async (id: string) => {
    try {
      await deleteGambar({ id: id })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (isSuccessDeleteGambar) {
      toast.success('Delete gambar berhasil', {
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
  }, [isSuccessDeleteGambar])

  useEffect(() => {
    if (isErrorDeleteGambar) {
      const errorMsg = errorDeleteGambar as { data?: { message?: string } }

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
  }, [isErrorDeleteGambar, errorDeleteGambar])

  return (
    <div className="scrollbar flex h-full flex-col gap-32 overflow-y-auto rounded-3x bg-white p-48">
      <Breadcrumb />
      <div className="scrollbar flex flex-1 flex-col gap-32 overflow-y-auto">
        {loadingDetail ? (
          <Loading />
        ) : (
          <GaleriDetail
            detail={detailGaleri}
            photo={photo}
            meta={meta}
            setPageNumber={setPageNumber}
            setPageSize={setPageSize}
            setIsShowDelete={setIsShowDelete}
            isShowDelete={isShowDelete}
            isLoadingDeleteGaleri={isLoadingDetailGaleriSekolah}
            handleSubmitDeleteGambar={handleSubmitDeleteGambar}
            pageNumber={pageNumber}
            editID={idEdit}
          />
        )}
      </div>
    </div>
  )
}
