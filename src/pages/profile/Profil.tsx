import 'react-toastify/dist/ReactToastify.css'
import { Bounce, toast } from 'react-toastify'
import { useProfil } from '@/hooks/useProfil'
import { useEffect } from 'react'
import Cookies from 'js-cookie'
import { Link, useNavigate } from 'react-router-dom'
import { Loading } from '@/components/Loading'
import { LabelList } from '@/components/LabelComponent/LabelList'

export default function Profil() {
  const navigate = useNavigate()

  const { profil, isError, loading, error } = useProfil()

  useEffect(() => {
    if (isError) {
      const errorMsg = error as { data?: { message?: string } }

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
  }, [isError, error])

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <p className="font-roboto text-[2.8rem] text-primary-100">Profil</p>
          <div className="flex gap-32 phones:flex-col">
            <div className="flex w-1/3 flex-col gap-12 phones:w-full">
              <p className="font-roboto text-[2.4rem] text-primary-100">
                Foto Profil
              </p>
              <img
                src={profil?.gambar}
                alt={profil?.nama}
                className="w-2/3 rounded-2x filter phones:w-full"
                loading="lazy"
              />
            </div>
            <div className="flex w-2/3 flex-col gap-12 phones:w-full">
              <p className="font-roboto text-[2.4rem] text-primary-100">
                Biodata
              </p>
              <div className="flex flex-col gap-8">
                <LabelList label="Nama" value={profil?.nama} />
                <LabelList label="Email" value={profil?.email} />
                <LabelList label="No. Hp" value={profil?.hp} />
              </div>
              <div className="flex gap-32 py-12">
                <div
                  onClick={() => navigate(-1)}
                  className="rounded-2xl bg-warna-red px-24 py-12 text-white hover:cursor-pointer hover:bg-opacity-80"
                >
                  Kembali
                </div>
                <Link
                  to="edit"
                  className="bg-primary-200 rounded-2xl px-24 py-12 text-white hover:bg-opacity-80"
                >
                  Edit Profil
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
