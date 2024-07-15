import { Breadcrumb } from '@/components/Breadcrumb'
import { Loading } from '@/components/Loading'
import { usePathname } from '@/hooks/usePathname'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Bounce, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import DefaultImg from '@/assets/images/default.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink, faPencil } from '@fortawesome/free-solid-svg-icons'
import { DownloadType } from '@/types/website/konten/downloadType'
import { useGetDetailDownloadQuery } from '@/store/slices/website/kontenAPI/downloadAPI'
import { useAkses } from '@/hooks/useAkses'

export default function DetailDownload() {
  const navigate = useNavigate()
  const { secondPathname } = usePathname()
  const { isHakAksesUbah } = useAkses()

  const id = localStorage.getItem('editID') ?? null

  // --- Data DetailDownload ---
  const [dataDetailDownload, setDataDetailDownload] = useState<DownloadType>()

  const {
    data: dataDetailDownloadSekolah,
    isFetching: isFetchingDetailDownloadSekolah,
    isLoading: isLoadingDetailDownloadSekolah,
    isError: isErrorDetailDownloadSekolah,
    error: errorDetailDownloadSekolah,
  } = useGetDetailDownloadQuery(
    {
      id: id,
      jenis: secondPathname,
    },
    { skip: !id },
  )

  const loadingDetailDownloadSekolah =
    isLoadingDetailDownloadSekolah || isFetchingDetailDownloadSekolah

  useEffect(() => {
    if (dataDetailDownloadSekolah?.data) {
      setDataDetailDownload(dataDetailDownloadSekolah?.data)
    }
  }, [dataDetailDownloadSekolah?.data])

  useEffect(() => {
    if (isErrorDetailDownloadSekolah) {
      const errorMsg = errorDetailDownloadSekolah as {
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
  }, [isErrorDetailDownloadSekolah, errorDetailDownloadSekolah])

  return (
    <div className="scrollbar flex h-full flex-col gap-32 overflow-y-auto rounded-3x bg-white p-48">
      <Breadcrumb />
      <div className="scrollbar flex flex-1 flex-col gap-32 overflow-y-auto">
        {loadingDetailDownloadSekolah ? (
          <Loading />
        ) : (
          <div className="scrollbar flex h-full flex-col gap-48 overflow-y-auto phones:flex-col phones:items-start phones:gap-32">
            {dataDetailDownload?.jenis_file === 'Link' && (
              <div className="flex justify-end">
                {isHakAksesUbah && (
                  <Link
                    to={`/website/${secondPathname}/download/edit`}
                    onClick={() => {
                      localStorage.setItem('editID', dataDetailDownload?.id)
                      localStorage.setItem(
                        'editData',
                        JSON.stringify(dataDetailDownload),
                      )
                    }}
                    className="flex items-center gap-12 rounded-2xl bg-warna-primary px-24 py-12 text-[1.8rem] text-white hover:bg-opacity-80"
                  >
                    <FontAwesomeIcon icon={faPencil} />
                    <p>Perbaharui Data</p>
                  </Link>
                )}
              </div>
            )}
            {dataDetailDownload?.jenis_file === 'Upload' && (
              <img
                src={
                  dataDetailDownload?.url_file !== '' &&
                  dataDetailDownload?.url_file
                    ? dataDetailDownload?.url_file
                    : DefaultImg
                }
                alt={dataDetailDownload?.judul}
                className="h-[30rem] rounded-2xl filter phones:h-[20rem] phones:w-full"
                loading="lazy"
              />
            )}

            <div className="flex flex-1 flex-col gap-16">
              <div className="flex items-center justify-between gap-32 phones:flex-col-reverse phones:items-start">
                {dataDetailDownload?.judul && (
                  <p className="font-roboto">{dataDetailDownload?.judul}</p>
                )}
                {dataDetailDownload?.jenis_file === 'Upload' && (
                  <Link
                    to={`/website/${secondPathname}/download/edit`}
                    onClick={() => {
                      localStorage.setItem('editID', dataDetailDownload?.id)
                      localStorage.setItem(
                        'editData',
                        JSON.stringify(dataDetailDownload),
                      )
                    }}
                    className="flex items-center gap-12 rounded-2xl bg-warna-primary px-24 py-12 text-[1.8rem] text-white hover:bg-opacity-80"
                  >
                    <FontAwesomeIcon icon={faPencil} />
                    <p>Perbaharui Data</p>
                  </Link>
                )}
              </div>
              <div className="flex flex-wrap items-center  gap-24">
                <div className="flex items-center gap-12">
                  {dataDetailDownload?.kategori && (
                    <p className="rounded-2xl bg-warna-grey px-24 py-12 text-[1.8rem] text-white">
                      {dataDetailDownload?.kategori}
                    </p>
                  )}
                  {dataDetailDownload?.jenis_file && (
                    <p className="rounded-2xl bg-warna-primary px-24 py-12 text-[1.8rem] text-white">
                      {dataDetailDownload?.jenis_file}
                    </p>
                  )}
                </div>
              </div>
              {dataDetailDownload?.jenis_file === 'Link' && (
                <Link
                  to={dataDetailDownload?.url_file}
                  target="_blank"
                  className="flex items-center gap-12 text-warna-dark"
                >
                  <FontAwesomeIcon icon={faLink} />
                  <p>{dataDetailDownload?.url_file}</p>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
