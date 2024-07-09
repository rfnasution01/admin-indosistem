import { usePathname } from '@/hooks/usePathname'
import clsx from 'clsx'
import { Dispatch, SetStateAction } from 'react'

const tabs = {
  pengumuman: ['Publish', 'Draft', 'Semua Pengumuman'],
  mading: ['Publish', 'Draft', 'Semua Mading'],
  berita: ['Dashboard', 'Publish', 'Draft', 'Semua Berita'],
  agenda: ['Publish', 'Draft', 'Semua Agenda'],
  prestasi: ['Publish', 'Draft', 'Semua Prestasi'],
}

export function KategoriTab({
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
  const { secondPathname } = usePathname()

  const getTab = (path) => tabs[path] || []

  const tab = getTab(secondPathname)

  return (
    <div className="scrollbar flex items-center gap-32 overflow-x-auto border-b border-warna-pale-grey px-48 pt-48">
      {tab.map((item, idx) => (
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
