import { Breadcrumb } from '@/components/Breadcrumb'
import { Loading } from '@/components/Loading'
import { usePathname } from '@/hooks/usePathname'
import { useGetDetailHalamanQuery } from '@/store/slices/website/kontenAPI/halamanAPI'
import { HalamanType } from '@/types/website/konten/halamanType'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Bounce, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import DefaultImg from '@/assets/images/default.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil } from '@fortawesome/free-solid-svg-icons'

export default function DetailHalaman() {
  const navigate = useNavigate()
  const { secondPathname } = usePathname()

  const id = localStorage.getItem('editID') ?? null

  // --- Data DetailHalaman ---
  const [dataDetailHalaman, setDataDetailHalaman] = useState<HalamanType>()

  const {
    data: dataDetailHalamanSekolah,
    isFetching: isFetchingDetailHalamanSekolah,
    isLoading: isLoadingDetailHalamanSekolah,
    isError: isErrorDetailHalamanSekolah,
    error: errorDetailHalamanSekolah,
  } = useGetDetailHalamanQuery(
    {
      id: id,
      jenis: secondPathname,
    },
    { skip: !id },
  )

  const loadingDetailHalamanSekolah =
    isLoadingDetailHalamanSekolah || isFetchingDetailHalamanSekolah

  useEffect(() => {
    if (dataDetailHalamanSekolah?.data) {
      setDataDetailHalaman(dataDetailHalamanSekolah?.data)
    }
  }, [dataDetailHalamanSekolah?.data])

  useEffect(() => {
    if (isErrorDetailHalamanSekolah) {
      const errorMsg = errorDetailHalamanSekolah as {
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
  }, [isErrorDetailHalamanSekolah, errorDetailHalamanSekolah])

  return (
    <div className="scrollbar flex h-full flex-col gap-32 overflow-y-auto rounded-3x bg-white p-48">
      <Breadcrumb />
      <div className="scrollbar flex flex-1 flex-col gap-32 overflow-y-auto">
        {loadingDetailHalamanSekolah ? (
          <Loading />
        ) : (
          <div className="scrollbar flex h-full flex-col gap-48 overflow-y-auto phones:flex-col phones:items-start phones:gap-32">
            <img
              src={
                dataDetailHalaman?.url_gambar !== '' &&
                dataDetailHalaman?.url_gambar
                  ? dataDetailHalaman?.url_gambar
                  : DefaultImg
              }
              alt={dataDetailHalaman?.judul}
              className="h-[50rem] rounded-2xl object-cover filter phones:h-[20rem] phones:w-full"
              loading="lazy"
            />

            <div className="flex flex-1 flex-col gap-16">
              <div className="flex items-center justify-between phones:flex-col-reverse phones:items-start phones:justify-start phones:gap-24">
                {dataDetailHalaman?.judul && (
                  <p className="font-roboto">{dataDetailHalaman?.judul}</p>
                )}
                <Link
                  to={`/website/${secondPathname}/halaman/edit`}
                  onClick={() => {
                    localStorage.setItem('editID', dataDetailHalaman?.id)
                    localStorage.setItem(
                      'editData',
                      JSON.stringify(dataDetailHalaman),
                    )
                  }}
                  className="flex items-center gap-12 rounded-2xl bg-warna-primary px-24 py-12 text-[1.8rem] text-white hover:bg-opacity-80"
                >
                  <FontAwesomeIcon icon={faPencil} />
                  <p>Perbaharui Data</p>
                </Link>
              </div>
              <div className="flex flex-wrap items-center  gap-24">
                {dataDetailHalaman?.jenis && (
                  <p className="rounded-2xl bg-warna-grey px-24 py-12 text-[1.8rem] text-white">
                    {dataDetailHalaman?.jenis}
                  </p>
                )}
                {dataDetailHalaman?.isi && (
                  <div
                    style={{ lineHeight: '130%' }}
                    dangerouslySetInnerHTML={{ __html: dataDetailHalaman?.isi }}
                    className="article-content"
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
