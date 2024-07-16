import { usePathname } from '@/hooks/usePathname'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { GetIdentitasType } from '@/types/website/pengaturanType'
import { useGetPengaturanIdentitasQuery } from '@/store/slices/website/pengaturanAPI'
import { Bounce, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import { convertSlugToText } from '@/utils/formatText'
import { IdentitasLogo } from '@/features/website/pengaturan'
import { LabelList } from '@/components/LabelComponent/LabelList'
import { Loading } from '@/components/Loading'
import { useAkses } from '@/hooks/useAkses'

export default function PengaturanIdentitas() {
  const navigate = useNavigate()
  const { thirdPathname } = usePathname()
  const { isHakAksesUbah } = useAkses()

  // --- Data Identitas ---
  const [identitas, setIdentitas] = useState<GetIdentitasType>()

  const {
    data: dataIdentitas,
    isFetching: isFetchingIdentitas,
    isLoading: isLoadingIdentitas,
    isError: isErrorIdentitas,
    error: errorIdentitas,
  } = useGetPengaturanIdentitasQuery()

  const loadingIdentitas = isLoadingIdentitas || isFetchingIdentitas

  useEffect(() => {
    if (dataIdentitas?.data) {
      setIdentitas(dataIdentitas?.data)
    }
  }, [dataIdentitas?.data])

  useEffect(() => {
    if (isErrorIdentitas) {
      const errorMsg = errorIdentitas as { data?: { message?: string } }

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
  }, [isErrorIdentitas, errorIdentitas])

  return (
    <div className="scrollbar flex h-full flex-col gap-32 overflow-y-auto rounded-3x bg-white p-48">
      <div className="flex items-center justify-between gap-32">
        <p className="font-roboto text-[2.4rem] text-warna-dark">
          Identitas Website
        </p>
        {isHakAksesUbah && (
          <Link
            to="edit"
            onClick={() => {
              localStorage.setItem('editData', JSON.stringify(identitas))
            }}
            className="flex items-center gap-12 rounded-2xl bg-warna-primary px-24 py-16 text-white hover:bg-opacity-80"
          >
            <FontAwesomeIcon icon={faPencil} />
            <p className="phones:hidden">
              Perbaharui {convertSlugToText(thirdPathname)}
            </p>
          </Link>
        )}
      </div>
      <div className="scrollbar flex h-full w-full gap-32 overflow-y-auto phones:flex-col phones:gap-48">
        {loadingIdentitas ? (
          <Loading />
        ) : (
          <>
            <div className="flex w-1/2 flex-col gap-12 phones:w-full">
              <LabelList
                label="Nama Website"
                value={identitas?.nama_website ?? '-'}
                isSetting
              />
              <LabelList
                isSetting
                label="Footer"
                value={identitas?.footer ?? '-'}
              />
              <LabelList
                isSetting
                label="Deskripsi"
                value={identitas?.deskripsi ?? '-'}
              />
              <LabelList
                isSetting
                label="Keyword"
                value={identitas?.keyword ?? '-'}
              />
            </div>
            <IdentitasLogo
              logo={identitas?.logo}
              favicon={identitas?.favicon}
            />
          </>
        )}
      </div>
    </div>
  )
}
