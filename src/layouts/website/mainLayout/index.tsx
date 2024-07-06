import Helmet from 'react-helmet'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { Outlet } from 'react-router-dom'
import { WebsiteMainHeader } from './MainLayoutAside'
import { useState } from 'react'
import clsx from 'clsx'

export default function WebsiteMainLayout() {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <div className="flex h-screen w-full bg-warna-pale-blue text-[2rem] phones:flex-col phones:text-[2.4rem]">
      {/* --- Aside --- */}
      <WebsiteMainHeader isOpen={isOpen} setIsOpen={setIsOpen} />
      <div
        className={clsx(
          'scrollbar flex h-full flex-1 flex-col overflow-y-auto p-32',
          {
            'phones:hidden': isOpen,
          },
        )}
      >
        <Outlet />
      </div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Website</title>
        <link rel="canonical" href="https://demolaman1.avnet.id/" />
      </Helmet>
      <ToastContainer />
    </div>
  )
}
