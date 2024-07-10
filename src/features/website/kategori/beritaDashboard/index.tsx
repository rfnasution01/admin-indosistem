import { Loading } from '@/components/Loading'
import { useGetDashboardBeritaQuery } from '@/store/slices/website/kategoriAPI'
import { GetDashboardBerita } from '@/types/website/kategoriType'
import { useEffect, useState } from 'react'
import { CardBerita } from './CardBerita'
import { KategoriChart } from './KategoriChart'
import { KategoriStatistik } from './KategoriStatistik'

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
          {/* --- Statistik --- */}
          <div className="flex w-full gap-64 rounded-2x border border-warna-pale-grey p-32 text-warna-dark shadow phones:flex-col">
            <KategoriStatistik
              jlh_berita={dashboard?.jlh_berita}
              jumlah_share={dashboard?.jumlah_share}
              berita_dibaca={dashboard?.berita_dibaca}
              berita_baru={dashboard?.berita_baru}
            />
            <hr className="h-full w-2 bg-warna-pale-grey phones:hidden" />
            <KategoriChart
              data={dashboard?.kategori}
              title="Kategori Yang Paling Banyak Dibaca"
            />
          </div>
          {/* --- Berita --- */}
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
                        id={item?.id}
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
                        id={item?.id}
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
