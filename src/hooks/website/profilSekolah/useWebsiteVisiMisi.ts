import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { useGetVisiMisiQuery } from '@/store/slices/website/profilAPI/visiMisiAPI'
import { Bounce, toast } from 'react-toastify'
import { WebsiteProfilSekolahType } from '@/types/website/profil/tentangSekolahType'

export function useWebsiteVisiMisi() {
  const navigate = useNavigate()

  // --- Data VisiMisi ---
  const [dataVisiMisi, setDataVisiMisi] = useState<WebsiteProfilSekolahType[]>()

  const {
    data: dataVisiMisiSekolah,
    isFetching: isFetchingVisiMisiSekolah,
    isLoading: isLoadingVisiMisiSekolah,
    isError: isErrorVisiMisiSekolah,
    error: errorVisiMisiSekolah,
  } = useGetVisiMisiQuery()

  const loadingVisiMisiSekolah =
    isLoadingVisiMisiSekolah || isFetchingVisiMisiSekolah

  useEffect(() => {
    if (dataVisiMisiSekolah?.data) {
      setDataVisiMisi(dataVisiMisiSekolah?.data)
    }
  }, [dataVisiMisiSekolah?.data])

  useEffect(() => {
    if (isErrorVisiMisiSekolah) {
      const errorMsg = errorVisiMisiSekolah as { data?: { message?: string } }

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
  }, [isErrorVisiMisiSekolah, errorVisiMisiSekolah])

  const visiSekolah = dataVisiMisi?.find((item) => item?.jenis === 'Visi')
  const misiSekolah = dataVisiMisi?.find((item) => item?.jenis === 'Misi')

  return {
    dataVisiMisi,
    loadingVisiMisiSekolah,
    visiSekolah,
    misiSekolah,
  }
}
