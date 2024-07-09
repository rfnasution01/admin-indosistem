import { Loading } from '@/components/Loading'
import { useGetDashboardBeritaQuery } from '@/store/slices/website/kategoriAPI'
import { GetDashboardBerita } from '@/types/website/kategoriType'
import { useEffect, useState } from 'react'
import { CardBerita } from './CardBerita'

export function BeritaDashboard() {
  const [dashboard, setDashboard] = useState<GetDashboardBerita>()

  const {
    data: dataDashboard,
    isFetching: isFetchingDashboard,
    isLoading: isLoadingDashboard,
  } = useGetDashboardBeritaQuery()

  const isLoading = isFetchingDashboard || isLoadingDashboard

  useEffect(() => {
    if (dataDashboard) {
      setDashboard(dataDashboard?.data)
    }
  }, [dataDashboard?.data])

  return (
    <div className="scrollbar flex h-full w-full overflow-y-auto">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex w-full flex-col gap-32">
          <div className="flex w-full gap-32 phones:flex-col">
            <div className="flex w-full flex-col gap-32 rounded-2x border border-warna-pale-grey p-32 text-warna-dark shadow">
              <p className="font-roboto text-[2.4rem]">⭐ Berita Populer</p>
              {dashboard?.populer?.length === 0 ? (
                <p>Data tidak ditemukan</p>
              ) : (
                <div className="flex flex-col gap-16">
                  {dashboard?.populer?.slice(0, 4)?.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col gap-16 hover:cursor-pointer"
                    >
                      <CardBerita
                        gambar={item?.gambar}
                        penulis={item?.nama}
                        view={item?.hits}
                        judul={item?.judul}
                      />
                      {dashboard?.populer?.length - 1 !== idx && (
                        <hr className="border border-warna-pale-grey" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="flex w-full flex-col gap-32 rounded-2x border border-warna-pale-grey p-32 text-warna-dark shadow">
              <p className="font-roboto text-[2.4rem]">🕒 Berita Terkini</p>
              {dashboard?.terbaru?.length === 0 ? (
                <p>Data tidak ditemukan</p>
              ) : (
                <div className="flex flex-col gap-16">
                  {dashboard?.terbaru?.slice(0, 4)?.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col gap-16 hover:cursor-pointer"
                    >
                      <CardBerita
                        gambar={item?.gambar}
                        penulis={item?.nama}
                        view={item?.hits}
                        judul={item?.judul}
                      />
                      {dashboard?.terbaru?.length - 1 !== idx && (
                        <hr className="border border-warna-pale-grey" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
