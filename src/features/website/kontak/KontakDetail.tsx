import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { GetKontakType } from '@/types/website/profil/kontakType'
import { useGetKontakQuery } from '@/store/slices/website/kontakAPI'
import { Bounce, toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { convertSlugToText } from '@/utils/formatText'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import { usePathname } from '@/hooks/usePathname'
import { Loading } from '@/components/Loading'
import { KontakData } from './KontakData'

export function KontakDetail() {
  const navigate = useNavigate()
  const { secondPathname } = usePathname()

  // --- Data kontak ---
  const [kontak, setKontak] = useState<GetKontakType>()

  const {
    data: dataKontak,
    isFetching: isFetchingKontak,
    isLoading: isLoadingKontak,
    isError: isErrorKontak,
    error: errorKontak,
  } = useGetKontakQuery()

  const loadingKontak = isLoadingKontak || isFetchingKontak

  useEffect(() => {
    if (dataKontak?.data) {
      setKontak(dataKontak?.data)
    }
  }, [dataKontak?.data])

  useEffect(() => {
    if (isErrorKontak) {
      const errorMsg = errorKontak as { data?: { message?: string } }

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
  }, [isErrorKontak, errorKontak])

  return (
    <div className="flex w-full flex-col gap-32">
      <div className="flex w-full items-center justify-end gap-32">
        <Link
          to="edit"
          className="flex items-center gap-12 rounded-2xl bg-warna-primary px-24 py-16 text-white hover:bg-opacity-80"
        >
          <FontAwesomeIcon icon={faPencil} />
          <p className="phones:hidden">
            Perbaharui Data {convertSlugToText(secondPathname)}
          </p>
        </Link>
      </div>
      {loadingKontak ? (
        <Loading />
      ) : (
        <KontakData
          alamat={kontak?.alamat}
          telepon={kontak?.telepon}
          kota={kontak?.kota}
          wa={kontak?.wa}
          fb={kontak?.fb}
          tw={kontak?.tw}
          ig={kontak?.ig}
          yt={kontak?.yt}
          telegram={kontak?.telegram}
          weekday_cs={kontak?.weekday_cs}
          weekend_cs={kontak?.weekend_cs}
          tiktok={kontak?.tiktok}
          email={kontak?.email}
          latitude={kontak?.latitude}
          longitude={kontak?.longitude}
        />
      )}
    </div>
  )
}
