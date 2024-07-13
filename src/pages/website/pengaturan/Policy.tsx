import { usePathname } from '@/hooks/usePathname'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { GetPolicyType } from '@/types/website/pengaturanType'
import { useGetPengaturanPolicyQuery } from '@/store/slices/website/pengaturanAPI'
import { Bounce, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import { convertSlugToText } from '@/utils/formatText'
import { Loading } from '@/components/Loading'

export default function PengaturanPolicy() {
  const navigate = useNavigate()
  const { thirdPathname } = usePathname()

  // --- Data Policy ---
  const [policy, setPolicy] = useState<GetPolicyType>()

  const {
    data: dataPolicy,
    isFetching: isFetchingPolicy,
    isLoading: isLoadingPolicy,
    isError: isErrorPolicy,
    error: errorPolicy,
  } = useGetPengaturanPolicyQuery()

  const loadingPolicy = isLoadingPolicy || isFetchingPolicy

  useEffect(() => {
    if (dataPolicy?.data) {
      setPolicy(dataPolicy?.data)
    }
  }, [dataPolicy?.data])

  useEffect(() => {
    if (isErrorPolicy) {
      const errorMsg = errorPolicy as { data?: { message?: string } }

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
  }, [isErrorPolicy, errorPolicy])

  return (
    <div className="scrollbar flex h-full flex-col gap-32 overflow-y-auto rounded-3x bg-white p-48">
      <div className="flex items-center justify-between gap-32">
        <p className="font-roboto text-[2.4rem] text-warna-dark">
          Policy Website
        </p>
        <Link
          to="edit"
          onClick={() => {
            localStorage.setItem('editData', JSON.stringify(policy))
          }}
          className="flex items-center gap-12 rounded-2xl bg-warna-primary px-24 py-16 text-white hover:bg-opacity-80"
        >
          <FontAwesomeIcon icon={faPencil} />
          <p className="phones:hidden">
            Perbaharui {convertSlugToText(thirdPathname)}
          </p>
        </Link>
      </div>
      <div className="scrollbar flex h-full gap-32 overflow-y-auto phones:flex-col">
        {loadingPolicy ? (
          <Loading />
        ) : (
          <div
            className="article-content"
            style={{ lineHeight: '130%' }}
            dangerouslySetInnerHTML={{ __html: policy?.policy }}
          />
        )}
      </div>
    </div>
  )
}
