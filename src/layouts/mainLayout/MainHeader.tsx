import { Skeleton } from '@/components/Skeleton'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bounce, toast } from 'react-toastify'
import Cookies from 'js-cookie'
import Helmet from 'react-helmet'
import { GetLoginType } from '@/types/loginType'
import { useGetLoginQuery } from '@/store/slices/loginAPI'
import { GetIdentiasAdminType } from '@/types/portalAdminType'
import { useGetAdminIdentitasQuery } from '@/store/slices/portalAdminAPI'
import { MainHeaderTitle } from './MainHeaderTitle'
import { MainHeaderLogo } from './MainHeaderLogo'
import { MainHeaderButtonGroup } from './MainHeaderButtonGroup'

export function MainHeader() {
  const navigate = useNavigate()

  // --- Identitas ---
  const [identitas, setIdentitas] = useState<GetLoginType>()

  const {
    data: dataIdentitas,
    isFetching: isFetchingIdentitas,
    isLoading: isLoadingIdentitas,
  } = useGetLoginQuery()

  const loadingIdentitas = isFetchingIdentitas || isLoadingIdentitas

  useEffect(() => {
    if (dataIdentitas?.data) {
      setIdentitas(dataIdentitas?.data)
    }
  }, [dataIdentitas?.data])

  // --- Identitas Admin ---
  const [identitasAdmin, setIdentitasAdmin] = useState<GetIdentiasAdminType>()

  const {
    data: dataIdentitasAdmin,
    isFetching: isFetchingIdentitasAdmin,
    isLoading: isLoadingIdentitasAdmin,
    isError: isErrorIdentitasAdmin,
    error: errorIdentitasAdmin,
  } = useGetAdminIdentitasQuery()

  const loadingIdentitasAdmin =
    isFetchingIdentitasAdmin || isLoadingIdentitasAdmin

  useEffect(() => {
    if (dataIdentitasAdmin?.data) {
      setIdentitasAdmin(dataIdentitasAdmin?.data)
    }
  }, [dataIdentitasAdmin?.data])

  useEffect(() => {
    if (isErrorIdentitasAdmin) {
      const errorMsg = errorIdentitasAdmin as { data?: { message?: string } }

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
  }, [isErrorIdentitasAdmin, errorIdentitasAdmin])

  return (
    <div className="flex items-center gap-32 phones:flex-col">
      {loadingIdentitasAdmin || loadingIdentitas ? (
        <div className="flex gap-32">
          <Skeleton height="h-[10rem]" width="w-[10rem]" />
          <div className="flex flex-col gap-8">
            <Skeleton height="h-[2.4rem]" width="w-[30rem]" />
            <Skeleton height="h-[3.2rem]" width="w-[50rem]" />
            <Skeleton height="h-[3.2rem]" width="w-[50rem]" />
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-1 items-center gap-32">
            {/* --- Logo --- */}
            <MainHeaderLogo
              identitas={identitas}
              identitasAdmin={identitasAdmin}
            />
            {/* --- Title --- */}
            <MainHeaderTitle
              identitas={identitas}
              identitasAdmin={identitasAdmin}
            />
          </div>
          {/* --- Logout --- */}
          <MainHeaderButtonGroup />
        </>
      )}
      <Helmet>
        <meta charSet="utf-8" />
        <title>{identitasAdmin?.nama}</title>
        <link rel="canonical" href="https://demolaman1.avnet.id/" />
      </Helmet>
    </div>
  )
}
