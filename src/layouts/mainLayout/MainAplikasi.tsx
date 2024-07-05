import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { Bounce, toast } from 'react-toastify'
import { Skeleton } from '@/components/Skeleton'
import clsx from 'clsx'
import { useGetAplikasiQuery } from '@/store/slices/portalAdminAPI'
import { GetAplikasiType } from '@/types/portalAdminType'
import { convertToSlug } from '@/utils/formatText'

export function MainAplikasi({
  setFitur,
}: {
  setFitur: Dispatch<SetStateAction<string>>
}) {
  const navigate = useNavigate()

  const [aplikasi, setAplikasi] = useState<GetAplikasiType[]>([])

  const {
    data: dataAplikasi,
    isFetching: isFetchingAplikasi,
    isLoading: isLoadingAplikasi,
    isError: isErrorAplikasi,
    error: errorAplikasi,
  } = useGetAplikasiQuery()

  const loadingAplikasi = isFetchingAplikasi || isLoadingAplikasi

  useEffect(() => {
    if (dataAplikasi?.data) {
      const sortedData = [...dataAplikasi.data]?.sort((a, b) => {
        return parseInt(a?.urutan) - parseInt(b?.urutan)
      })
      setFitur(sortedData?.[0]?.deskripsi)
      setAplikasi(sortedData)
    }
  }, [dataAplikasi?.data])

  useEffect(() => {
    if (isErrorAplikasi) {
      const errorMsg = errorAplikasi as { data?: { message?: string } }

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
        }, 5000)
      }
    }
  }, [isErrorAplikasi, errorAplikasi])

  return (
    <div className="flex flex-col gap-32">
      <p className="font-roboto text-[3.2rem] text-warna-dark">Menu Fitur</p>
      {loadingAplikasi ? (
        <div className="flex gap-32">
          <Skeleton width="w-1/4" height="h-[20rem]" classname="rounded-2xl" />
          <Skeleton width="w-1/4" height="h-[20rem]" classname="rounded-2xl" />
          <Skeleton width="w-1/4" height="h-[20rem]" classname="rounded-2xl" />
          <Skeleton width="w-1/4" height="h-[20rem]" classname="rounded-2xl" />
        </div>
      ) : (
        <div className="grid grid-cols-12 gap-32">
          {aplikasi?.map((item, idx) => (
            <Link
              to={`/${convertToSlug(item?.folder)}`}
              key={idx}
              className={clsx(
                'col-span-4 flex items-center justify-center rounded-2x border border-warna-pale-grey bg-white p-24 text-center hover:cursor-pointer hover:border-warna-primary phones:col-span-6',
              )}
              onMouseEnter={() => setFitur(item?.deskripsi)}
            >
              <div className="flex flex-col items-center justify-center gap-16">
                <img
                  src={item?.gambar ?? '/logo.png'}
                  alt={item?.nama_aplikasi}
                  loading="lazy"
                  className="h-[8rem] w-[8rem]"
                />
                <p className="font-sf-pro text-warna-dark">
                  {item?.nama_aplikasi}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
