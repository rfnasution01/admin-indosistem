import { Breadcrumb } from '@/components/Breadcrumb'
import { ValidasiDelete } from '@/components/Dialog/ValidasiDelete'
import { Loading } from '@/components/Loading'
import {
  KategoriDetail,
  KategoriDetailGambar,
} from '@/features/website/kategori'
import { usePathname } from '@/hooks/usePathname'
import {
  useDeleteGambarMutation,
  useGetKategoriDetailQuery,
} from '@/store/slices/website/kategoriAPI'
import {
  GetKategoriDetailType,
  KategoriGambarType,
} from '@/types/website/kategoriType'
import { faSpinner, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bounce, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function DetailKategori() {
  const navigate = useNavigate()
  const { secondPathname } = usePathname()

  const id = localStorage.getItem('editID') ?? null
  const [deleteID, setDeleteID] = useState<string>()
  const [isShowDelete, setIsShowDelete] = useState<boolean>(false)

  // --- Data DetailKategori ---
  const [dataDetailKategori, setDataDetailKategori] =
    useState<GetKategoriDetailType>()
  const [dataGambarKategori, setDataGambarKategori] = useState<
    KategoriGambarType[]
  >([])

  const {
    data: dataDetailKategoriSekolah,
    isFetching: isFetchingDetailKategoriSekolah,
    isLoading: isLoadingDetailKategoriSekolah,
    isError: isErrorDetailKategoriSekolah,
    error: errorDetailKategoriSekolah,
  } = useGetKategoriDetailQuery(
    {
      id: id,
      jenis: secondPathname,
    },
    { skip: !id },
  )

  const loadingDetailKategoriSekolah =
    isLoadingDetailKategoriSekolah || isFetchingDetailKategoriSekolah

  useEffect(() => {
    if (dataDetailKategoriSekolah?.data) {
      setDataDetailKategori(dataDetailKategoriSekolah?.data?.data)
      setDataGambarKategori(dataDetailKategoriSekolah?.data?.gambar)
    }
  }, [dataDetailKategoriSekolah?.data])

  useEffect(() => {
    if (isErrorDetailKategoriSekolah) {
      const errorMsg = errorDetailKategoriSekolah as {
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
  }, [isErrorDetailKategoriSekolah, errorDetailKategoriSekolah])

  // --- Delete ---
  const [
    deleteGambar,
    {
      isError: isErrorDeleteGambar,
      isLoading: isLoadingDeleteGambar,
      isSuccess: isSuccessDeleteGambar,
      error: errorDeleteGambar,
    },
  ] = useDeleteGambarMutation()

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
        {loadingDetailKategoriSekolah ? (
          <Loading />
        ) : (
          <>
            <KategoriDetail detail={dataDetailKategori} />
            <KategoriDetailGambar
              gambar={dataGambarKategori}
              setDeleteID={setDeleteID}
              setIsShowID={setIsShowDelete}
              idKategori={id}
            />
          </>
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
