import clsx from 'clsx'
import { Dispatch, SetStateAction } from 'react'

export function GaleriTab({
  menu,
  setMenu,
  setPageSize,
  setPageNumber,
  setSearch,
}: {
  menu: string
  setMenu: Dispatch<SetStateAction<string>>
  setSearch: Dispatch<SetStateAction<string>>
  setPageSize: Dispatch<SetStateAction<number>>
  setPageNumber: Dispatch<SetStateAction<number>>
}) {
  return (
    <div className="scrollbar flex w-full items-center gap-32 overflow-x-auto border-b border-warna-pale-grey px-48 pt-48">
      {['Album'].map((item, idx) => (
        <p
          key={idx}
          onClick={() => {
            setSearch('')
            setPageNumber(1)
            setPageSize(5)
            setMenu(item)
          }}
          className={clsx(
            'text-nowrap pb-16 font-roboto text-[2.4rem] transition-colors duration-300 ease-in-out hover:cursor-pointer',
            {
              'border-b-2 border-warna-primary text-warna-primary':
                menu === item,
              'border-b-2 border-transparent text-warna-grey': menu !== item,
            },
          )}
        >
          {item}
        </p>
      ))}
    </div>
  )
}
