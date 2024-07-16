import { ChartDoughnut } from '@/components/Chart/ChartDoughnut'
import { KategoriType } from '@/types/website/kategoriType'
import { getColor } from '@/utils/formatColor'

export function DashboardChart({
  data,
  title,
  className,
  widthChart,
}: {
  data: KategoriType[]
  title: string
  className?: string
  widthChart?: string
}) {
  return (
    <div
      className={`flex ${className ?? 'w-2/5'} gap-64 rounded-2x bg-white p-0 phones:w-full phones:flex-col-reverse `}
    >
      <ChartDoughnut jsonData={data} className={widthChart} />
      <div className="flex flex-1 flex-col gap-12 phones:w-full">
        <p className="text-sim-grey font-bold">{title}</p>
        <div className="flex gap-32">
          {data?.length === 0 && <p>Belum Ada Data</p>}
          <div className="flex flex-col gap-4">
            {data?.slice(0, 2)?.map((item, idx) => (
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
          {data?.length > 2 && (
            <div className="flex flex-col gap-4">
              {data?.slice(2, 4)?.map((item, idx) => (
                <div
                  className={`flex items-center gap-12`}
                  key={idx}
                  style={{
                    lineHeight: '130%',
                  }}
                >
                  <div
                    className="h-8 w-8 rounded-full"
                    style={{ backgroundColor: getColor(idx + 2) }}
                  />
                  <p className="text-sim-dark line-clamp-1">
                    {item?.nama}: {item?.jlh}
                  </p>
                </div>
              ))}
            </div>
          )}
          {data?.length > 4 && (
            <div className="flex flex-col gap-4">
              {data?.slice(4, 6)?.map((item, idx) => (
                <div
                  className={`flex items-center gap-12`}
                  key={idx}
                  style={{
                    lineHeight: '130%',
                  }}
                >
                  {data?.length > 6 && idx === 1 ? (
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
