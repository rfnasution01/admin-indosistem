import { Breadcrumb } from '@/components/Breadcrumb'
import { ValidasiDelete } from '@/components/Dialog/ValidasiDelete'
import { Loading } from '@/components/Loading'
import {
  PengumumanDetail,
  PengumumanDetailGambar,
} from '@/features/website/pengumuman'
import {
  useDeleteGambarMutation,
  useGetPengumumanDetailQuery,
} from '@/store/slices/website/pengumumanAPI'
import {
  GetPengumumanDetailType,
  PengumumanGambarType,
} from '@/types/website/pengumumanType'
import { faSpinner, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bounce, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function DetailPengumuman() {
  const navigate = useNavigate()

  const id = localStorage.getItem('editID') ?? null
  const [deleteID, setDeleteID] = useState<string>()
  const [isShowDelete, setIsShowDelete] = useState<boolean>(false)

  // --- Data DetailPengumuman ---
  const [dataDetailPengumuman, setDataDetailPengumuman] =
    useState<GetPengumumanDetailType>()
  const [dataGambarPengumuman, setDataGambarPengumuman] = useState<
    PengumumanGambarType[]
  >([])

  const {
    data: dataDetailPengumumanSekolah,
    isFetching: isFetchingDetailPengumumanSekolah,
    isLoading: isLoadingDetailPengumumanSekolah,
    isError: isErrorDetailPengumumanSekolah,
    error: errorDetailPengumumanSekolah,
  } = useGetPengumumanDetailQuery(
    {
      id: id,
    },
    { skip: !id },
  )

  const loadingDetailPengumumanSekolah =
    isLoadingDetailPengumumanSekolah || isFetchingDetailPengumumanSekolah

  useEffect(() => {
    if (dataDetailPengumumanSekolah?.data) {
      setDataDetailPengumuman(dataDetailPengumumanSekolah?.data?.data)
      setDataGambarPengumuman(dataDetailPengumumanSekolah?.data?.gambar)
    }
  }, [dataDetailPengumumanSekolah?.data])

  useEffect(() => {
    if (isErrorDetailPengumumanSekolah) {
      const errorMsg = errorDetailPengumumanSekolah as {
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
  }, [isErrorDetailPengumumanSekolah, errorDetailPengumumanSekolah])

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
        {loadingDetailPengumumanSekolah ? (
          <Loading />
        ) : (
          <>
            <PengumumanDetail detail={dataDetailPengumuman} />
            <PengumumanDetailGambar
              gambar={dataGambarPengumuman}
              setDeleteID={setDeleteID}
              setIsShowID={setIsShowDelete}
              idPengumuman={id}
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
