import {
  IdentitasSekolah,
  PreviewMain,
  ProfilSekolah,
  TentangSekolahTab,
} from '@/features/website/profil/tentangSekolah'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { GetTentangSekolahType } from '@/types/website/profil/tentangSekolahType'
import {
  useDeleteTentangSekolahMutation,
  useGetTentangSekolahQuery,
} from '@/store/slices/website/profilAPI/tentangAPI'
import { Bounce, toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Loading } from '@/components/Loading'
import { ComingSoonPage } from '@/routes/loadables'

export default function TentangSekolah() {
  const navigate = useNavigate()

  const [menu, setMenu] = useState<string>('Preview')

  // --- Data Tentang ---
  const [dataTentang, setDataTentang] = useState<GetTentangSekolahType>()

  const {
    data: dataTentangSekolah,
    isFetching: isFetchingTentangSekolah,
    isLoading: isLoadingTentangSekolah,
    isError: isErrorTentangSekolah,
    error: errorTentangSekolah,
  } = useGetTentangSekolahQuery()

  const loadingTentangSekolah =
    isLoadingTentangSekolah || isFetchingTentangSekolah

  useEffect(() => {
    if (dataTentangSekolah?.data) {
      setDataTentang(dataTentangSekolah?.data)
    }
  }, [dataTentangSekolah?.data])

  useEffect(() => {
    if (isErrorTentangSekolah) {
      const errorMsg = errorTentangSekolah as { data?: { message?: string } }

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
  }, [isErrorTentangSekolah, errorTentangSekolah])

  // --- Delete ---
  const [
    deleteTentang,
    {
      isError: isErrorDeleteTentang,
      isLoading: isLoadingDeleteTentang,
      isSuccess: isSuccessDeleteTentang,
      error: errorDeleteTentang,
    },
  ] = useDeleteTentangSekolahMutation()

  const handleSubmitDelete = async (id: string) => {
    try {
      await deleteTentang({ id: id })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (isSuccessDeleteTentang) {
      toast.success('Delete berhasil', {
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
      setMenu('Preview')
    }
  }, [isSuccessDeleteTentang])

  useEffect(() => {
    if (isErrorDeleteTentang) {
      const errorMsg = errorDeleteTentang as { data?: { message?: string } }

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
    }
  }, [isErrorDeleteTentang, errorDeleteTentang])

  return (
    <div className="scrollbar flex h-full flex-col gap-32 overflow-y-auto">
      {loadingTentangSekolah ? (
        <Loading />
      ) : (
        <>
          <div className="flex">
            <TentangSekolahTab
              menu={menu}
              setMenu={setMenu}
              data={dataTentang}
            />
          </div>
          <div className="scrollbar flex h-full flex-1 overflow-y-auto px-48 pb-48">
            {menu === 'Preview' ? (
              <PreviewMain
                data={dataTentang}
                setMenu={setMenu}
                handleSubmitDelete={handleSubmitDelete}
                isLoadingDelete={isLoadingDeleteTentang}
              />
            ) : menu === 'Identitas' ? (
              <IdentitasSekolah />
            ) : menu === 'Tujuan' || menu === 'Sasaran' || menu === 'Hasil' ? (
              <ProfilSekolah />
            ) : (
              <ComingSoonPage />
            )}
          </div>
        </>
      )}
      <ToastContainer />
    </div>
  )
}
