import { usePathname } from '@/hooks/usePathname'
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
import { ValidasiDelete } from '@/components/Dialog/ValidasiDelete'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner, faTrash } from '@fortawesome/free-solid-svg-icons'
import { GaleriDetail } from '@/features/website/galeri'

export default function DetailGaleri() {
  const navigate = useNavigate()
  const { secondPathname } = usePathname()

  const idEdit = localStorage.getItem('editID') ?? null

  const [search, setSearch] = useState<string>('')
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(5)
  const [deleteID, setDeleteID] = useState<string>()
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
      search: search,
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
  }, [dataDetailGaleriSekolah?.data, pageNumber, pageSize, search, idEdit])

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
      isLoading: isLoadingDeleteGambar,
      isSuccess: isSuccessDeleteGambar,
      error: errorDeleteGambar,
    },
  ] = useDeleteGambarAlbumMutation()

  const handleSubmitDeleteGambar = async (id: string) => {
    try {
      await deleteGambar({ id: id, jenis: secondPathname })
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
      setDeleteID(null)
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
            search={search}
            setPageNumber={setPageNumber}
            setPageSize={setPageSize}
            setSearch={setSearch}
            setIsShowDelete={setIsShowDelete}
            isShowDelete={isShowDelete}
            isLoadingDeleteGaleri={isLoadingDetailGaleriSekolah}
            handleSubmitDeleteGambar={handleSubmitDeleteGambar}
            pageNumber={pageNumber}
            editID={idEdit}
          />
        )}
      </div>
      <ValidasiDelete
        isOpen={isShowDelete}
        setIsOpen={setIsShowDelete}
        child={
          <button
            type="button"
            disabled={isLoadingDeleteGambar}
            onClick={() => {
              handleSubmitDeleteGambar(deleteID)
            }}
            className="flex items-center gap-12 rounded-2xl bg-warna-red px-24 py-12 text-white hover:bg-opacity-80"
          >
            {isLoadingDeleteGambar ? (
              <span className="animate-spin duration-300">
                <FontAwesomeIcon icon={faSpinner} />
              </span>
            ) : (
              <FontAwesomeIcon icon={faTrash} />
            )}
            <p className="font-sf-pro">Hapus</p>
          </button>
        }
      />
    </div>
  )
}
