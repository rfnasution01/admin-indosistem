import clsx from 'clsx'
import { Dispatch, SetStateAction } from 'react'

export function MappingMenu({
  setMenu,
  menu,
}: {
  setMenu: Dispatch<SetStateAction<string>>
  menu: string
}) {
  const listMenu = [
    'Kategori Kepegawaian',
    'Jenis Kepegawaian',
    'Rekap Golongan CPNS/PNS',
    'Tingkat Pendidikan',
    'Proyeksi Pensiun',
    'Rekap Vaksin Pegawai',
  ]
  return (
    <div className="flex w-1/3 flex-col gap-12 text-center text-[2.2rem] phones:w-full">
      {listMenu?.map((item, idx) => (
        <div
          onClick={() => {
            setMenu(item)
          }}
          className={clsx(
            'rounded-2xl border p-24 hover:cursor-pointer hover:bg-primary-100 hover:text-white',
            {
              'border-transparent bg-primary-100 text-white': item === menu,
              'border-primary-100 text-primary-100': item !== menu,
            },
          )}
          key={idx}
        >
          <p>{item}</p>
        </div>
      ))}
    </div>
  )
}
