import { ComingSoonPage } from '@/routes/loadables'
import { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { KontakDetail, KontakTab } from '@/features/website/kontak'
import { PesanMasukTable } from '@/features/website/kontak/Pesan'
import { useAkses } from '@/hooks/useAkses'

export default function Kontak() {
  const { isHakAksesUbah } = useAkses()

  const [menu, setMenu] = useState<string>('Kontak')

  return (
    <div className="scrollbar flex h-full flex-col gap-32 overflow-y-auto rounded-3x bg-white">
      <div className="flex">
        <KontakTab menu={menu} setMenu={setMenu} />
      </div>

      <div className="scrollbar flex h-full flex-1 overflow-y-auto px-48 pb-0">
        {menu === `Kontak` ? (
          <KontakDetail isUbah={isHakAksesUbah} />
        ) : menu === 'Pesan Masuk' ? (
          <PesanMasukTable />
        ) : (
          <ComingSoonPage />
        )}
      </div>

      <ToastContainer />
    </div>
  )
}
