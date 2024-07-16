import { ChartDoughnut } from '@/components/Chart/ChartDoughnut'
import { GetChartType } from '@/types/simpeg/dashboardType'
import { getColor } from '@/utils/formatColor'

export function DashboardChart({
  menu,
  item,
}: {
  menu: string
  item: GetChartType[]
}) {
  function convertKeys(arr) {
    return arr?.map((item) => {
      return {
        nama: item.label,
        jlh: item.jumlah,
      }
    })
  }

  const data = convertKeys(item)

  return (
    <div className="flex h-full w-full flex-col gap-32 rounded-3x border border-[#E0E0E0] p-32 phones:w-full">
      <p className="font-roboto text-[2.8rem] text-primary-100">{menu}</p>
      <div className="flex w-full flex-col items-center justify-center gap-24">
        {data?.length > 0 && <ChartDoughnut jsonData={data} />}
        <div className="flex gap-64">
          {data?.length === 0 && <p>Belum Ada item</p>}
          <div className="flex flex-col gap-4">
            {data?.slice(0, 4)?.map((item, idx) => (
              <div
                className={`flex items-center gap-12`}
                key={idx}
                style={{
                  lineHeight: '130%',
                }}
              >
                <div
                  className="h-8 w-8 rounded-full"
                  style={{ backgroundColor: getColor(idx) }}
                />

                <p className="text-sim-dark line-clamp-1">
                  {item?.nama}: {item?.jlh}
                </p>
              </div>
            ))}
          </div>
          {data?.length > 4 && (
            <div className="flex flex-col gap-4">
              {data?.slice(4, 8)?.map((item, idx) => (
                <div
                  className={`flex items-center gap-12`}
                  key={idx}
                  style={{
                    lineHeight: '130%',
                  }}
                >
                  {data?.length > 8 && idx === 3 ? (
                    <p>...</p>
                  ) : (
                    <>
                      <div
                        className="h-8 w-8 rounded-full"
                        style={{ backgroundColor: getColor(idx + 4) }}
                      />
                      <p className="text-sim-dark line-clamp-1">
                        {item?.nama}: {item?.jlh}
                      </p>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
