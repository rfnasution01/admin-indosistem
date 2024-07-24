import { useGetSimpegIdentitasQuery } from '@/store/slices/simpeg/identitasType'
import { GetIdentitasWebsiteType } from '@/types/website/menuType'
import { useEffect, useState } from 'react'
import { Bounce, toast } from 'react-toastify'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

export function useSimpegIdentitas() {
  const navigate = useNavigate()

  const [simpegIdentitas, setSimpegIdentitas] =
    useState<GetIdentitasWebsiteType>()

  const {
    data: dataIdentitasWebsite,
    isFetching: isFetchingIdentitasWebsite,
    isLoading: isLoadingIdentitasWebsite,
    isError: isErrorIdentitasWebsite,
    error: errorIdentitasWebsite,
  } = useGetSimpegIdentitasQuery()

  const loadingIdentitasWebsite =
    isFetchingIdentitasWebsite || isLoadingIdentitasWebsite

  useEffect(() => {
    if (dataIdentitasWebsite?.data) {
      setSimpegIdentitas(dataIdentitasWebsite?.data)
    }
  }, [dataIdentitasWebsite])

  useEffect(() => {
    if (isErrorIdentitasWebsite) {
      const errorMsg = errorIdentitasWebsite as { data?: { message?: string } }

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
  }, [isErrorIdentitasWebsite, errorIdentitasWebsite])

  return {
    simpegIdentitas,
    loadingIdentitasWebsite,
  }
}
