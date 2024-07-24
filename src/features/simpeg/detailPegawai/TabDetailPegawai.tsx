import clsx from 'clsx'
import { Dispatch, SetStateAction } from 'react'

export function TabDetailPegawai({
  listMenu,
  menu,
  setMenu,
}: {
  listMenu: string[]
  menu: string
  setMenu: Dispatch<SetStateAction<string>>
}) {
  return (
    <div className="scrollbar flex w-full gap-12 overflow-x-auto">
      {listMenu?.map((item, idx) => (
        <div
          onClick={() => setMenu(item)}
          className={clsx(
            'flex text-nowrap rounded-2xl px-24 py-12 hover:cursor-pointer',
            {
              'bg-primary-100 text-white': menu === item,
            },
          )}
          key={idx}
        >
          {item}
        </div>
      ))}
    </div>
  )
}
