import { Loading } from '@/components/Loading'
import { CardBerita } from './CardBerita'
import { KategoriChart } from './KategoriChart'
import { KategoriStatistik } from './KategoriStatistik'
import { useWebsiteKategori } from '@/hooks/website/useWebsiteKategori'

export function BeritaDashboard() {
  const { isLoadingBeritaDashboard, dataDashboard } = useWebsiteKategori()

  return (
    <div className="scrollbar flex h-full w-full overflow-y-auto">
      {isLoadingBeritaDashboard ? (
        <Loading />
      ) : (
        <div className="flex w-full flex-col gap-32">
          {/* --- Statistik --- */}
          <div className="flex w-full gap-64 rounded-2x border border-warna-pale-grey p-32 text-warna-dark shadow phones:flex-col">
            <KategoriStatistik
              jlh_berita={dataDashboard?.jlh_berita}
              jumlah_share={dataDashboard?.jumlah_share}
              berita_dibaca={dataDashboard?.berita_dibaca}
              berita_baru={dataDashboard?.berita_baru}
            />
            <hr className="h-full w-2 bg-warna-pale-grey phones:hidden" />
            <KategoriChart
              data={dataDashboard?.kategori}
              title="Kategori Yang Paling Banyak Dibaca"
            />
          </div>
          {/* --- Berita --- */}
          <div className="flex w-full gap-32 phones:flex-col">
            <div className="flex w-full flex-col gap-32 rounded-2x border border-warna-pale-grey p-32 text-warna-dark shadow">
              <p className="font-roboto text-[2.4rem]">⭐ Berita Populer</p>
              {dataDashboard?.populer?.length === 0 ? (
                <p>Tidak ada data</p>
              ) : (
                <div className="flex flex-col gap-16">
                  {dataDashboard?.populer?.slice(0, 4)?.map((item, idx) => (
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
                      {dataDashboard?.populer?.length - 1 !== idx && (
                        <hr className="border border-warna-pale-grey" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="flex w-full flex-col gap-32 rounded-2x border border-warna-pale-grey p-32 text-warna-dark shadow">
              <p className="font-roboto text-[2.4rem]">🕒 Berita Terkini</p>
              {dataDashboard?.terbaru?.length === 0 ? (
                <p>Tidak ada data</p>
              ) : (
                <div className="flex flex-col gap-16">
                  {dataDashboard?.terbaru?.slice(0, 4)?.map((item, idx) => (
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
                      {dataDashboard?.terbaru?.length - 1 !== idx && (
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
