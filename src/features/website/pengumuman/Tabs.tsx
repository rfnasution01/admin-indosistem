import clsx from 'clsx'
import { Dispatch, SetStateAction } from 'react'

export function PengumumanTab({
  menu,
  setMenu,
}: {
  menu: string
  setMenu: Dispatch<SetStateAction<string>>
}) {
  return (
    <div className="scrollbar flex items-center gap-32 overflow-x-auto border-b border-warna-pale-grey px-48 pt-48">
      {['Riwayat Pengumuman', 'Buat Pengumuman'].map((item, idx) => (
        <p
          key={idx}
          onClick={() => setMenu(item)}
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
