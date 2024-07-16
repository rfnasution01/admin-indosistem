import { GetDashboardType } from '@/types/simpeg/dashboardType'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { useGetSimpegDashboradQuery } from '@/store/slices/simpeg/dashboardType'
import { convertToSnakeCase } from '@/utils/formatText'
import { Bounce, toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { Loading } from '@/components/Loading'
import { DashboardChart, MappingMenu } from '@/features/simpeg/dashbhoard'

export default function DashboardSimpeg() {
  const navigate = useNavigate()

  const [menu, setMenu] = useState<string>('Kategori Kepegawaian')
  const [dashboard, setDashboard] = useState<GetDashboardType>()

  const {
    data: dataDashboard,
    isFetching: isFetchingDashboard,
    isLoading: isLoadingDashboard,
    isError: isErrorDashboard,
    error: errorDashboard,
  } = useGetSimpegDashboradQuery({
    jenis: convertToSnakeCase(menu),
  })

  const loadingDashboard = isLoadingDashboard || isFetchingDashboard

  useEffect(() => {
    if (dataDashboard?.data) {
      setDashboard(dataDashboard?.data)
    }
  }, [dataDashboard?.data, menu])

  useEffect(() => {
    if (isErrorDashboard) {
      const errorMsg = errorDashboard as { data?: { message?: string } }

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
  }, [isErrorDashboard, errorDashboard])

  return (
    <div className="scrollbar flex h-full w-full overflow-y-auto px-64 py-32 phones:p-32">
      {loadingDashboard ? (
        <Loading />
      ) : (
        <div className="flex w-full flex-col gap-32 rounded-3x bg-white p-32">
          <p className="text-[3.2rem]">
            Selamat datang,{' '}
            <span className="font-bold text-primary-100">Zhong Xina</span>
          </p>

          <div className="flex flex-col gap-8">
            <p className="text-[2.4rem]">
              Satuan Kerja:{' '}
              <span className="font-roboto text-primary-100">
                {dashboard?.nama_organisasi}
              </span>
            </p>
            <p className="text-[2.4rem]">
              <span className="font-roboto text-primary-100">
                Total Pegawai: {dashboard?.jlh_pegawai} Orang
              </span>
            </p>
          </div>
          <div className="scrollbar flex h-full flex-1 gap-32 overflow-y-auto phones:flex-col">
            <MappingMenu menu={menu} setMenu={setMenu} />
            <DashboardChart menu={menu} item={dashboard?.chart} />
          </div>
        </div>
      )}
    </div>
  )
}
