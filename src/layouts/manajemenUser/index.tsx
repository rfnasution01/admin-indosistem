import Helmet from 'react-helmet'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'
import clsx from 'clsx'
import { GetUserIdentitasType } from '@/types/user/identitasType'
import { useGetUserIdentitasQuery } from '@/store/slices/user/identitasType'
import { UserMainHeader } from './MainLayoutAside'

export default function WebsiteMainLayout() {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const [identitas, setIdentitas] = useState<GetUserIdentitasType>()
  const { data } = useGetUserIdentitasQuery()

  useEffect(() => {
    if (data?.data) {
      setIdentitas(data?.data)
    }
  }, [data])

  return (
    <div className="flex h-screen w-full bg-warna-pale-blue text-[2rem] phones:flex-col phones:text-[2.4rem]">
      {/* --- Aside --- */}
      <UserMainHeader isOpen={isOpen} setIsOpen={setIsOpen} />
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
        <title>{identitas?.nama_aplikasi}</title>
        <link rel="canonical" href="https://demolaman1.avnet.id/" />
        <meta name="description" content={identitas?.deskripsi} />
        <meta name="keywords" content="keyword1, keyword2, keyword3" />
        <meta property="og:title" content={identitas?.nama_aplikasi} />
        <meta property="og:description" content={identitas?.deskripsi} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://demolaman1.avnet.id/" />
        <meta property="og:image" content={identitas?.logo} />
        <meta name="twitter:card" content={identitas?.nama_aplikasi} />
        <meta name="twitter:title" content={identitas?.nama_aplikasi} />
        <meta name="twitter:description" content={identitas?.deskripsi} />
        <meta name="twitter:image" content={identitas?.logo} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={identitas?.favicon} type="image/x-icon" />
        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "url": "https://demolaman1.avnet.id/",
            "name": "Nama Website",
            "description": "Deskripsi singkat tentang website."
          }
        `}
        </script>
      </Helmet>
      <ToastContainer />
    </div>
  )
}
