import { useSimpegTambahPegawai } from '@/hooks/simpeg'
import { SimpegDetailPegawaiKop } from './DetailPegawaiKop'
import { SimpegDetailPegawaiMenu } from './DetailPegawaiMenu'
import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import clsx from 'clsx'

export default function SimpegDetailPegawai() {
  const { detailPegawai } = useSimpegTambahPegawai()
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <div className="scrollbar flex h-full w-full flex-col gap-32 overflow-y-auto px-64 py-32 phones:p-32">
      <p className="w-full rounded-2x bg-white p-32 font-roboto text-[2.4rem] text-primary-100">
        Detail Pegawai
      </p>

      <SimpegDetailPegawaiKop detailPegawai={detailPegawai} />

      <div className="flex flex-row gap-32 rounded-2xl bg-white p-32 phones:flex-col">
        <SimpegDetailPegawaiMenu setIsOpen={setIsOpen} isOpen={isOpen} />
        <div
          className={clsx('scrollbar flex h-full flex-1 overflow-y-auto', {
            'phones:hidden': isOpen,
            'phones:w-full': !isOpen,
          })}
        >
          <Outlet />
        </div>
      </div>
    </div>
  )
}
