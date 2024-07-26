import { useNavigate } from 'react-router-dom'
import { useWebsiteAkses } from '../websiteAkses'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { GetWebsiteGuruStaffType } from '@/types/website/profil/guruStaffType'
import { useGetGuruStaffQuery } from '@/store/slices/website/profilAPI/guruStaffAPI'
import { Meta } from '@/store/api'
import { Bounce, toast } from 'react-toastify'

export function useWebsiteGuru() {
  const navigate = useNavigate()
  const { isHakAksesHapus, isHakAksesTambah, isHakAksesUbah } =
    useWebsiteAkses()

  const [menu, setMenu] = useState<string>('Daftar Guru')
  const [search, setSearch] = useState<string>('')
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)

  // --- Data Guru ---
  const [dataGuru, setDataGuru] = useState<GetWebsiteGuruStaffType[]>()
  const [meta, setMeta] = useState<Meta>()

  const {
    data: dataGuruSekolah,
    isFetching: isFetchingGuruSekolah,
    isLoading: isLoadingGuruSekolah,
    isError: isErrorGuruSekolah,
    error: errorGuruSekolah,
  } = useGetGuruStaffQuery({
    page_number: pageNumber,
    page_size: pageSize,
    search: search ?? '',
  })

  const loadingGuruSekolah = isLoadingGuruSekolah || isFetchingGuruSekolah

  useEffect(() => {
    if (dataGuruSekolah?.data) {
      setDataGuru(dataGuruSekolah?.data?.data)
      setMeta(dataGuruSekolah?.data?.meta)
    }
  }, [dataGuruSekolah?.data])

  useEffect(() => {
    if (isErrorGuruSekolah) {
      const errorMsg = errorGuruSekolah as { data?: { message?: string } }

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
  }, [isErrorGuruSekolah, errorGuruSekolah])

  return {
    isHakAksesHapus,
    isHakAksesTambah,
    isHakAksesUbah,
    loadingGuruSekolah,
    dataGuru,
    search,
    setSearch,
    pageNumber,
    setPageNumber,
    pageSize,
    setPageSize,
    menu,
    setMenu,
    meta,
  }
}
