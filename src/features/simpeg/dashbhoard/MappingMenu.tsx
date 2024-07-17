import { GetDashboardSimpeg } from '@/types/referensiType'
import clsx from 'clsx'
import { Dispatch, SetStateAction } from 'react'

export function MappingMenu({
  setMenu,
  menu,
  dashboardMenu,
  setId,
}: {
  setMenu: Dispatch<SetStateAction<string>>
  menu: string
  setId: Dispatch<SetStateAction<string>>
  dashboardMenu: GetDashboardSimpeg[]
}) {
  return (
    <div className="flex w-1/3 flex-col gap-12 text-center text-[2.2rem] phones:w-full">
      {dashboardMenu?.map((item, idx) => (
        <div
          onClick={() => {
            setMenu(item?.nama)
            setId(item?.id)
          }}
          className={clsx(
            'rounded-2xl border p-24 hover:cursor-pointer hover:bg-primary-100 hover:text-white',
            {
              'border-transparent bg-primary-100 text-white':
                item?.nama === menu,
              'border-primary-100 text-primary-100': item?.nama !== menu,
            },
          )}
          key={idx}
        >
          <p>{item?.nama}</p>
        </div>
      ))}
    </div>
  )
}
