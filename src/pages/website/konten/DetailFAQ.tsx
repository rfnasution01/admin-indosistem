import { Breadcrumb } from '@/components/Breadcrumb'
import { Loading } from '@/components/Loading'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Bounce, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FAQType } from '@/types/website/konten/faqType'
import { useGetDetailFAQQuery } from '@/store/slices/website/kontenAPI/faqAPI'
import { usePathname } from '@/hooks/usePathname'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function DetailFAQ() {
  const navigate = useNavigate()
  const { secondPathname } = usePathname()

  const id = localStorage.getItem('editID') ?? null

  // --- Data DetailFAQ ---
  const [dataDetailFAQ, setDataDetailFAQ] = useState<FAQType>()

  const {
    data: dataDetailFAQSekolah,
    isFetching: isFetchingDetailFAQSekolah,
    isLoading: isLoadingDetailFAQSekolah,
    isError: isErrorDetailFAQSekolah,
    error: errorDetailFAQSekolah,
  } = useGetDetailFAQQuery(
    {
      id: id,
    },
    { skip: !id },
  )

  const loadingDetailFAQSekolah =
    isLoadingDetailFAQSekolah || isFetchingDetailFAQSekolah

  useEffect(() => {
    if (dataDetailFAQSekolah?.data) {
      setDataDetailFAQ(dataDetailFAQSekolah?.data)
    }
  }, [dataDetailFAQSekolah?.data])

  useEffect(() => {
    if (isErrorDetailFAQSekolah) {
      const errorMsg = errorDetailFAQSekolah as {
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
  }, [isErrorDetailFAQSekolah, errorDetailFAQSekolah])

  return (
    <div className="scrollbar flex h-full flex-col gap-32 overflow-y-auto rounded-3x bg-white p-48">
      <Breadcrumb />
      <div className="scrollbar flex flex-1 flex-col gap-32 overflow-y-auto">
        {loadingDetailFAQSekolah ? (
          <Loading />
        ) : (
          <div className="scrollbar flex h-full flex-col gap-12 overflow-y-auto phones:flex-col phones:items-start phones:gap-32">
            <div className="flex w-full justify-between">
              {dataDetailFAQ?.kategori && (
                <p className="rounded-2xl bg-warna-grey px-24 py-12 text-[1.8rem] text-white">
                  {dataDetailFAQ?.kategori}
                </p>
              )}
              <Link
                to={`/website/${secondPathname}/faq/edit`}
                onClick={() => {
                  localStorage.setItem('editID', dataDetailFAQ?.id)
                  localStorage.setItem(
                    'editData',
                    JSON.stringify(dataDetailFAQ),
                  )
                }}
                className="flex items-center gap-12 rounded-2xl bg-warna-primary px-24 py-12 text-[1.8rem] text-white hover:bg-opacity-80"
              >
                <FontAwesomeIcon icon={faPencil} />
                <p>Perbaharui Data</p>
              </Link>
            </div>
            <div className="flex flex-1 flex-col gap-12">
              {dataDetailFAQ?.pertanyaan && (
                <p className="font-roboto">{dataDetailFAQ?.pertanyaan}</p>
              )}
              {dataDetailFAQ?.jawaban && (
                <div
                  style={{ lineHeight: '130%' }}
                  dangerouslySetInnerHTML={{ __html: dataDetailFAQ?.jawaban }}
                  className="article-content"
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
