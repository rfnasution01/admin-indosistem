import {
  useGetLayananQuery,
  useGetProgramQuery,
} from '@/store/slices/website/profilAPI/programLayananAPI'
import {
  GetLayananType,
  GetProgramType,
} from '@/types/website/profil/programLayananType'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bounce, toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Cookies from 'js-cookie'
import { ProgramCard } from '@/features/website/profil/programLayanan/ProgramCard'
import { LayananCard } from '@/features/website/profil/programLayanan/LayananCard'

export default function ProgramLayanan() {
  const navigate = useNavigate()

  const [program, setProgram] = useState<GetProgramType[]>([])

  const {
    data: dataProgram,
    isFetching: isFetchingProgram,
    isLoading: isLoadingProgram,
    isError: isErrorProgram,
    error: errorProgram,
  } = useGetProgramQuery()

  const loadingProgram = isLoadingProgram || isFetchingProgram

  useEffect(() => {
    if (dataProgram?.data) {
      setProgram(dataProgram?.data)
    }
  }, [dataProgram?.data])

  useEffect(() => {
    if (isErrorProgram) {
      const errorMsg = errorProgram as { data?: { message?: string } }

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
  }, [isErrorProgram, errorProgram])

  const [layanan, setLayanan] = useState<GetLayananType[]>([])

  const {
    data: dataLayanan,
    isFetching: isFetchingLayanan,
    isLoading: isLoadingLayanan,
  } = useGetLayananQuery()

  const loadingLayanan = isLoadingLayanan || isFetchingLayanan

  useEffect(() => {
    if (dataLayanan?.data) {
      setLayanan(dataLayanan?.data)
    }
  }, [dataLayanan?.data])

  return (
    <div className="scrollbar flex h-full flex-col gap-32 overflow-y-auto rounded-3x bg-white p-48">
      <div className="grid grid-cols-3 gap-32">
        <ProgramCard program={program} loadingProgram={loadingProgram} />
        <LayananCard layanan={layanan} loadingLayanan={loadingLayanan} />
      </div>
      <ToastContainer />
    </div>
  )
}
