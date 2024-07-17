import { GetDashboardType } from '@/types/simpeg/dashboardType'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { useGetSimpegDashboradQuery } from '@/store/slices/simpeg/dashboardType'
import { Bounce, toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { Loading } from '@/components/Loading'
import { DashboardChart, MappingMenu } from '@/features/simpeg/dashbhoard'
import { GetDashboardSimpeg } from '@/types/referensiType'
import { useGetSimpegDashboardQuery } from '@/store/slices/referensiAPI'

export default function DashboardSimpeg() {
  const navigate = useNavigate()

  const [dashboardMenu, setDashboardMenu] = useState<GetDashboardSimpeg[]>([])
  const { data: dataDashboardMenu } = useGetSimpegDashboardQuery()

  useEffect(() => {
    if (dataDashboardMenu?.data) {
      setDashboardMenu(dataDashboardMenu.data)
    }
  }, [dataDashboardMenu])

  const initialMenu = dashboardMenu?.[0]?.nama ?? 'Kategori Kepegawaian'
  const initialId = dashboardMenu?.[0]?.id ?? ''

  const [menu, setMenu] = useState<string>(initialMenu)
  const [id, setId] = useState<string>(initialId)

  const [dashboard, setDashboard] = useState<GetDashboardType>()

  const {
    data: dataDashboard,
    isFetching: isFetchingDashboard,
    isLoading: isLoadingDashboard,
    isError: isErrorDashboard,
    error: errorDashboard,
  } = useGetSimpegDashboradQuery(
    {
      jenis: id,
    },
    { skip: !dashboardMenu.length && !id },
  )

  const loadingDashboard = isLoadingDashboard || isFetchingDashboard

  useEffect(() => {
    if (dataDashboard?.data) {
      setDashboard(dataDashboard?.data)
    }
  }, [dataDashboard?.data, menu, id, dashboardMenu])

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
            <MappingMenu
              menu={menu}
              setMenu={setMenu}
              dashboardMenu={dashboardMenu}
              setId={setId}
            />
            <DashboardChart menu={menu} item={dashboard?.chart} />
          </div>
        </div>
      )}
    </div>
  )
}
